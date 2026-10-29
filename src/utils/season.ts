// The page's Ramadan season, shared by every section: the Hijri date with the merchant's moon-sighting shift,
// the phase, and the preview phase the editor shows. Plus the light decorations: crescent, star and lantern.
import { svg } from "lit";
import { daysToEid, daysToRamadan, hijri, phaseOf, type Hijri, type Phase } from "./hijri";
import { isLandingPage } from "./landing";

export type Season = { h: Hijri; phase: Phase; toRamadan: number | null; toEid: number | null };

/** The shift and preview phase the hero publishes; other sections read them. */
export function publishSeason(o: { shift: number; preview: Phase | "" }): void {
  (window as any).__rmSeason = o;
  window.dispatchEvent(new Event("rm:season"));
}

function settings(): { shift: number; preview: Phase | "" } {
  return (window as any).__rmSeason || { shift: 0, preview: "" };
}

/** Today's season. In the editor and previews the merchant's preview phase wins, so each state can be seen. */
export function season(now = Date.now()): Season {
  const { shift, preview } = settings();
  const h = hijri(now, shift);
  const real = phaseOf(h);
  const phase = !isLandingPage() && preview ? preview : real;
  // A previewed phase gets a matching sample date, so its texts read right
  const shown: Hijri = phase === real ? h : phase === "ramadan" ? { d: 14, m: 9, y: h.y } : phase === "last-ten" ? { d: 27, m: 9, y: h.y } : phase === "eid" ? { d: 1, m: 10, y: h.y } : h;
  return {
    h: shown,
    phase,
    toRamadan: phase === "before" ? (phase === real ? daysToRamadan(now, shift) : 12) : 0,
    toEid: phase === "ramadan" || phase === "last-ten" ? (phase === real ? daysToEid(now, shift) : 30 - shown.d + 1) : 0,
  };
}

/** True during Ramadan and its last ten nights. */
export const inRamadan = (s: Season) => s.phase === "ramadan" || s.phase === "last-ten";

export const crescent = (cls = "") => svg`<svg class=${cls} viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" d="M40 6a26 26 0 1 0 18 44A22 22 0 1 1 40 6z"/></svg>`;
export const star = (cls = "") => svg`<svg class=${cls} viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 1.5l2.6 7.1 7.4.3-5.8 4.6 2 7.2L12 16.6l-6.2 4.1 2-7.2L2 8.9l7.4-.3z"/></svg>`;

/** A hanging lantern on its string; `len` is the string length in viewBox units. */
export const lantern = (cls = "", len = 40) => svg`<svg class=${cls} viewBox=${`0 0 40 ${len + 74}`} aria-hidden="true">
  <path d=${`M20 0v${len}`} stroke="currentColor" stroke-width="1.5"/>
  <g transform=${`translate(0 ${len})`} fill="currentColor">
    <circle cx="20" cy="4" r="4"/><path d="M12 10h16l3 6H9z"/>
    <path d="M10 18h20l-2 30H12z" opacity=".35"/><path d="M10 18h20l-2 30H12zM14 22v22M20 21v24M26 22v22" fill="none" stroke="currentColor" stroke-width="1.6"/>
    <path d="M9 50h22l-4 8H13z"/><circle cx="20" cy="66" r="3"/><path d="M20 58v5" stroke="currentColor" stroke-width="1.5"/>
  </g></svg>`;

/** A soft eight-point star pattern for section backgrounds, drawn in the section's text colour. */
export const patternCss = `
.rm-pattern { position: relative; isolation: isolate; }
.rm-pattern::before { content: ""; position: absolute; inset: 0; z-index: -1; opacity: .07; pointer-events: none;
  background-color: var(--rm-text);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cpath d='M28 6l6 16 16 6-16 6-6 16-6-16-16-6 16-6z' fill='none' stroke='%23000' stroke-width='1.5'/%3E%3C/svg%3E") repeat center / 56px;
          mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cpath d='M28 6l6 16 16 6-16 6-6 16-6-16-16-6 16-6z' fill='none' stroke='%23000' stroke-width='1.5'/%3E%3C/svg%3E") repeat center / 56px; }
`;
