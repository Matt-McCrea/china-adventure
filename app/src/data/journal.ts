import { STOPS } from "./itinerary";

/**
 * Journal posts arrive by email (scripts/ingest-mail.ts) and are stored in
 * public/journal/entries.json. The site fetches that file at runtime.
 */
export type JournalPhoto = {
  src: string; // path relative to the site root, e.g. "journal/img/2026-10-04-a1b2-1.jpg"
  thumb: string;
  w: number;
  h: number;
  lat?: number;
  lon?: number;
};

export type JournalEntry = {
  id: string;
  /** ISO timestamp the email was sent */
  date: string;
  title: string;
  text: string;
  lat?: number;
  lon?: number;
  /** where the location came from: typed in the email, photo metadata, or the planned stop for that date */
  locSource: "email" | "photo" | "plan";
  /** planned stop for the date the post was sent (China time) */
  stopId: string;
  photos: JournalPhoto[];
  hidden?: boolean;
};

export type JournalFile = { updated: string; entries: JournalEntry[] };

/** Calendar date in China (UTC+8), as YYYY-MM-DD. */
export const chinaDate = (iso: string) => new Date(new Date(iso).getTime() + 8 * 3600e3).toISOString().slice(0, 10);

/** The planned stop for a date: the stop whose dates contain it, else the last stop that started before it. */
export function stopForDate(ymd: string): string {
  const inside = STOPS.filter((s) => s.dateStart <= ymd && ymd <= s.dateEnd);
  if (inside.length) return inside[inside.length - 1].id;
  const before = STOPS.filter((s) => s.dateStart <= ymd);
  return (before[before.length - 1] ?? STOPS[0]).id;
}

/**
 * Finds coordinates typed into an email:
 *   "@ 41.7135, 82.9544"  ·  "41.7135 N 82.9544 E"  ·  Apple Maps / Google Maps links
 */
export function parseCoords(text: string): { lat: number; lon: number; match: string } | null {
  const ok = (lat: number, lon: number) => Math.abs(lat) <= 90 && Math.abs(lon) <= 180 && !(lat === 0 && lon === 0);
  const patterns: RegExp[] = [
    /[?&](?:ll|q|sll|coordinate)=(-?\d{1,2}\.\d+),\s*(-?\d{1,3}\.\d+)/i, // maps.apple.com
    /@(-?\d{1,2}\.\d+),(-?\d{1,3}\.\d+)/, // google.com/maps/@lat,lon
    /(?:^|\s)@?\s*(-?\d{1,2}\.\d{2,})\s*°?\s*([NS])?\s*[,;\s]\s*(-?\d{1,3}\.\d{2,})\s*°?\s*([EW])?/im,
  ];
  for (const re of patterns) {
    const m = re.exec(text);
    if (!m) continue;
    let lat: number, lon: number;
    if (m.length > 3) {
      lat = parseFloat(m[1]) * (m[2]?.toUpperCase() === "S" ? -1 : 1);
      lon = parseFloat(m[3]) * (m[4]?.toUpperCase() === "W" ? -1 : 1);
    } else {
      lat = parseFloat(m[1]);
      lon = parseFloat(m[2]);
    }
    if (ok(lat, lon)) return { lat, lon, match: m[0] };
  }
  return null;
}
