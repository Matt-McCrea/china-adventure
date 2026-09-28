/**
 * Turns emails into journal posts.
 *
 * Runs on GitHub Actions every ~15 minutes (.github/workflows/site.yml):
 *   reads unread mail in the journal inbox (IMAP) → keeps only mail from JOURNAL_SENDERS
 *   that passes SPF/DKIM → writes public/journal/entries.json + resized photos.
 *
 * Email format (all optional except sending it):
 *   Subject  → post title
 *   Body     → post text. A line like "@ 41.7135, 82.9544" (or an Apple/Google Maps link) pins the post there.
 *   Photos   → attached; resized, metadata stripped. Photo GPS is used if the email has no coordinates.
 *   Subject "HIDE <title>" hides the post with that title; "SHOW <title>" brings it back.
 *
 * Local test:  npx tsx scripts/ingest-mail.ts --eml path/to/message.eml
 * Env:         JOURNAL_IMAP_USER, JOURNAL_IMAP_PASS, JOURNAL_SENDERS (comma-separated), JOURNAL_IMAP_HOST (default imap.gmail.com)
 */
import { ImapFlow } from "imapflow";
import { simpleParser, type ParsedMail } from "mailparser";
import sharp from "sharp";
import exifr from "exifr";
import heicConvert from "heic-convert";
import { createHash } from "node:crypto";
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { STOPS } from "../src/data/itinerary";
import { chinaDate, parseCoords, parseStopTag, stopForDate, type JournalEntry, type JournalFile, type JournalPhoto } from "../src/data/journal";

const OUT_DIR = "public/journal";
const IMG_DIR = `${OUT_DIR}/img`;
const FILE = `${OUT_DIR}/entries.json`;

const senders = (process.env.JOURNAL_SENDERS ?? "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);

function load(): JournalFile & { seen: string[] } {
  if (!existsSync(FILE)) return { updated: new Date(0).toISOString(), entries: [], seen: [] };
  const j = JSON.parse(readFileSync(FILE, "utf8"));
  return { seen: [], ...j };
}

const hash = (s: string) => createHash("sha256").update(s).digest("hex");

/** Only accept mail from an allowed sender whose domain passed SPF or DKIM at the receiving server. */
function authorised(mail: ParsedMail): { ok: boolean; why: string } {
  const from = mail.from?.value?.[0]?.address?.toLowerCase() ?? "";
  if (!senders.includes(from)) return { ok: false, why: `sender ${from || "?"} not in JOURNAL_SENDERS` };
  const domain = from.split("@")[1];
  const auth = [mail.headers.get("authentication-results")].flat().filter(Boolean).map(String).join(" ").toLowerCase();
  if (!auth) return { ok: !process.env.GITHUB_ACTIONS, why: "no Authentication-Results header (allowed only for local tests)" };
  const passed =
    new RegExp(`dkim=pass[^;]*header\\.(?:i|d)=@?[^;\\s]*${domain.replace(/\./g, "\\.")}`).test(auth) ||
    new RegExp(`spf=pass[^;]*smtp\\.mailfrom=[^;\\s]*${domain.replace(/\./g, "\\.")}`).test(auth);
  return passed ? { ok: true, why: "" } : { ok: false, why: `SPF/DKIM did not pass for ${domain}` };
}

function cleanText(raw: string, ...strip: (string | undefined)[]) {
  let t = raw.replace(/\r/g, "");
  for (const m of strip) if (m) t = t.replace(m, "");
  t = t.split(/\n(?:On .+ wrote:|-{2,}\s*Original Message|Sent from my (?:iPhone|iPad|phone)|Get Outlook for)/i)[0];
  return t.replace(/\n{3,}/g, "\n\n").trim();
}

async function toJpeg(buf: Buffer, type: string): Promise<Buffer> {
  if (/heic|heif/i.test(type)) return Buffer.from(await heicConvert({ buffer: buf, format: "JPEG", quality: 0.9 }));
  return buf;
}

async function savePhotos(mail: ParsedMail, id: string): Promise<JournalPhoto[]> {
  mkdirSync(IMG_DIR, { recursive: true });
  const out: JournalPhoto[] = [];
  const atts = mail.attachments.filter((a) => /^image\//i.test(a.contentType) || /\.(heic|heif|jpe?g|png)$/i.test(a.filename ?? ""));
  for (const [i, a] of atts.entries()) {
    try {
      const src = await toJpeg(a.content, `${a.contentType} ${a.filename}`);
      let lat: number | undefined, lon: number | undefined;
      try {
        const gps = await exifr.gps(src);
        if (gps && Number.isFinite(gps.latitude) && Number.isFinite(gps.longitude)) ({ latitude: lat, longitude: lon } = gps);
      } catch { /* no EXIF */ }
      const base = `${id}-${i + 1}`;
      // .rotate() applies EXIF orientation; output has no metadata (location stays private unless used above)
      const full = await sharp(src).rotate().resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true }).toBuffer({ resolveWithObject: true });
      await sharp(full.data).resize({ width: 480, height: 480, fit: "inside" }).jpeg({ quality: 70, mozjpeg: true }).toFile(`${IMG_DIR}/${base}-t.jpg`);
      writeFileSync(`${IMG_DIR}/${base}.jpg`, full.data);
      out.push({ src: `journal/img/${base}.jpg`, thumb: `journal/img/${base}-t.jpg`, w: full.info.width, h: full.info.height, lat, lon });
    } catch (e) {
      console.warn(`  ! skipped attachment ${a.filename}: ${(e as Error).message}`);
    }
  }
  return out;
}

async function process1(raw: Buffer, db: ReturnType<typeof load>): Promise<"added" | "command" | "skipped"> {
  const mail = await simpleParser(raw);
  const mid = hash(mail.messageId ?? raw.toString("utf8", 0, 2000));
  if (db.seen.includes(mid)) return "skipped";
  const auth = authorised(mail);
  if (!auth.ok) {
    console.log(`  - ignored a message: ${auth.why.replace(/\S+@\S+/g, "<address>")}`);
    db.seen.push(mid);
    return "skipped";
  }
  db.seen.push(mid);
  const subject = (mail.subject ?? "").trim();

  const cmd = /^(HIDE|SHOW)\s+(.+)$/i.exec(subject);
  if (cmd) {
    const target = cmd[2].trim().toLowerCase();
    const hits = db.entries.filter((e) => e.title.toLowerCase() === target);
    hits.forEach((e) => (e.hidden = cmd[1].toUpperCase() === "HIDE"));
    console.log(`  ${cmd[1].toUpperCase()} "${cmd[2]}": ${hits.length} post(s)`);
    return hits.length ? "command" : "skipped";
  }

  const date = (mail.date ?? new Date()).toISOString();
  const day = chinaDate(date);
  const id = `${day}-${mid.slice(0, 6)}`;
  const body = (mail.text ?? "").replace(/\r/g, "");
  const coords = parseCoords(body);
  // "@ stop 1" / "@ Chongqing" puts the post under that stop, whatever the date
  const bodyTag = parseStopTag(body);
  const subjectTag = bodyTag ? null : parseStopTag(subject);
  const photos = await savePhotos(mail, id);
  const text = cleanText(body, coords?.match, bodyTag?.match);
  const stopId = bodyTag?.stopId ?? subjectTag?.stopId ?? stopForDate(day);
  const stop = STOPS.find((s) => s.id === stopId)!;
  const photoLoc = photos.find((p) => p.lat != null);

  const entry: JournalEntry = {
    id, date,
    title: (subjectTag ? subject.replace(subjectTag.match, "").trim() : subject) || text.split("\n")[0].slice(0, 80) || `Update from ${stop.city}`,
    text,
    ...(coords
      ? { lat: coords.lat, lon: coords.lon, locSource: "email" as const }
      : photoLoc
        ? { lat: photoLoc.lat, lon: photoLoc.lon, locSource: "photo" as const }
        : { lat: stop.latitude, lon: stop.longitude, locSource: "plan" as const }),
    stopId,
    photos,
  };
  db.entries.push(entry);
  console.log(`  + "${entry.title}" (${day}, ${photos.length} photo(s), location from ${entry.locSource})`);
  return "added";
}

async function main() {
  const db = load();
  let changed = 0;
  const emlIdx = process.argv.indexOf("--eml");
  if (emlIdx > 0) {
    if (!senders.length) senders.push("test@example.com");
    const r = await process1(readFileSync(process.argv[emlIdx + 1]), db);
    if (r !== "skipped") changed++;
  } else {
    const { JOURNAL_IMAP_USER: user, JOURNAL_IMAP_PASS: pass } = process.env;
    if (!user || !pass || !senders.length) {
      console.log("Journal inbox not configured (JOURNAL_IMAP_USER / JOURNAL_IMAP_PASS / JOURNAL_SENDERS); nothing to do.");
      return;
    }
    const client = new ImapFlow({ host: process.env.JOURNAL_IMAP_HOST ?? "imap.gmail.com", port: 993, secure: true, auth: { user, pass }, logger: false });
    await client.connect();
    const lock = await client.getMailboxLock("INBOX");
    try {
      const uids = (await client.search({ seen: false }, { uid: true })) || [];
      console.log(`${uids.length} unread message(s)`);
      for (const uid of uids) {
        const msg = await client.fetchOne(String(uid), { source: true }, { uid: true });
        if (!msg || !msg.source) continue;
        try {
          const r = await process1(msg.source, db);
          if (r !== "skipped") changed++;
        } catch (e) {
          console.error(`  ! failed on message ${uid}: ${(e as Error).message}`);
          continue; // leave unread so the next run retries
        }
        await client.messageFlagsAdd(String(uid), ["\\Seen"], { uid: true });
      }
    } finally {
      lock.release();
      await client.logout();
    }
  }

  db.entries.sort((a, b) => a.date.localeCompare(b.date));
  if (changed) db.updated = new Date().toISOString();
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(FILE, JSON.stringify(db, null, 1));
  console.log(changed ? `${changed} change(s) written` : "no changes");
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changed ? "true" : "false"}\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
