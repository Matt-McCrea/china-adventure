import { useEffect, useRef } from "react";
import type { JournalEntry } from "../data/journal";
import { STOPS } from "../data/itinerary";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "16 Oct · 21:30" in China time (UTC+8), where the post was written. */
export function postTime(iso: string) {
  const d = new Date(new Date(iso).getTime() + 8 * 3600e3);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} · ${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}`;
}

export function timeAgo(iso: string) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 90) return "just now";
  if (s < 3600) return `${Math.round(s / 60)} min ago`;
  if (s < 86400 * 1.5) return `${Math.round(s / 3600)} h ago`;
  return `${Math.round(s / 86400)} days ago`;
}

const cityOf = (id: string) => STOPS.find((s) => s.id === id)?.city ?? "";

function where(e: JournalEntry) {
  if (e.locSource === "plan") return `Around ${cityOf(e.stopId)} · no exact location sent`;
  const lat = `${Math.abs(e.lat!).toFixed(3)}° ${e.lat! >= 0 ? "N" : "S"}`;
  const lon = `${Math.abs(e.lon!).toFixed(3)}° ${e.lon! >= 0 ? "E" : "W"}`;
  return `${lat}, ${lon} · ${e.locSource === "photo" ? "from photo" : "sent from the road"}`;
}

export function PostThumbs({ posts, onOpen }: { posts: JournalEntry[]; onOpen: (id: string) => void }) {
  return (
    <ul className="post-list">
      {posts.map((p) => (
        <li key={p.id}>
          <button type="button" className="post-row" onClick={() => onOpen(p.id)}>
            {p.photos[0] ? <img src={p.photos[0].thumb} alt="" loading="lazy" width={56} height={56} /> : <span className="post-nophoto" aria-hidden="true" />}
            <span className="post-row-body">
              <b>{p.title}</b>
              <small>{postTime(p.date)} · {cityOf(p.stopId)}</small>
              {p.text && <span className="post-snippet">{p.text.slice(0, 90)}{p.text.length > 90 ? "…" : ""}</span>}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export function PostViewer({ post, onClose, onPrev, onNext }: { post: JournalEntry; onClose: () => void; onPrev?: () => void; onNext?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, [post.id]);
  return (
    <div className="post-backdrop" onClick={onClose} data-map-ui>
      <div
        ref={ref}
        className="post"
        role="dialog"
        aria-modal="true"
        aria-labelledby="post-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
          if (e.key === "ArrowLeft" && onPrev) onPrev();
          if (e.key === "ArrowRight" && onNext) onNext();
        }}
      >
        <header className="post-head">
          <span className="post-kicker">From the road · {postTime(post.date)} China time</span>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close post">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 2l10 10M12 2L2 12" /></svg>
          </button>
        </header>
        <h2 id="post-title" className="post-title">{post.title}</h2>
        <p className="post-where">{where(post)}</p>
        {post.photos.length > 0 && (
          <div className="post-photos">
            {post.photos.map((ph, i) => (
              <a key={ph.src} href={ph.src} target="_blank" rel="noreferrer">
                <img src={ph.src} alt={`Photo ${i + 1} of ${post.photos.length}: ${post.title}`} width={ph.w} height={ph.h} loading={i ? "lazy" : "eager"} />
              </a>
            ))}
          </div>
        )}
        {post.text && <div className="post-text">{post.text.split(/\n{2,}/).map((para, i) => <p key={i}>{para}</p>)}</div>}
        {(onPrev || onNext) && (
          <nav className="card-nav" aria-label="Posts">
            <button type="button" className="nav-btn" disabled={!onPrev} onClick={onPrev}>← Earlier</button>
            <button type="button" className="nav-btn nav-next" disabled={!onNext} onClick={onNext}>Later →</button>
          </nav>
        )}
      </div>
    </div>
  );
}

export function NewPopup({ posts, firstVisit, onOpen, onDismiss }: { posts: JournalEntry[]; firstVisit: boolean; onOpen: (id: string) => void; onDismiss: () => void }) {
  const latest = [...posts].reverse().slice(0, 3);
  return (
    <aside className="news" role="dialog" aria-labelledby="news-title" data-map-ui>
      <header className="news-head">
        <span className="news-dot" aria-hidden="true" />
        <h2 id="news-title">{firstVisit ? "Latest from the road" : `${posts.length} new since your last visit`}</h2>
        <button type="button" className="icon-btn" onClick={onDismiss} aria-label="Dismiss">
          <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 2l10 10M12 2L2 12" /></svg>
        </button>
      </header>
      <p className="news-sub">Updated {timeAgo(posts[posts.length - 1].date)}</p>
      <PostThumbs posts={latest} onOpen={onOpen} />
    </aside>
  );
}

export function JournalPanel({ posts, onOpen, onClose }: { posts: JournalEntry[]; onOpen: (id: string) => void; onClose: () => void }) {
  return (
    <aside className="news news-panel" role="dialog" aria-labelledby="jp-title" data-map-ui>
      <header className="news-head">
        <h2 id="jp-title">Journal · {posts.length} {posts.length === 1 ? "post" : "posts"}</h2>
        <button type="button" className="icon-btn" onClick={onClose} aria-label="Close journal">
          <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 2l10 10M12 2L2 12" /></svg>
        </button>
      </header>
      {posts.length ? <PostThumbs posts={[...posts].reverse()} onOpen={onOpen} /> : <p className="news-sub">Nothing yet. Posts appear here once the trip starts on 2 October.</p>}
    </aside>
  );
}
