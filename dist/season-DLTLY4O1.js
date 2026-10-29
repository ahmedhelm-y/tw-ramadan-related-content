import { svg as d } from "lit";
import { i as u } from "./styles-Bs7TKm5O.js";
const s = 864e5;
let l = null;
function h() {
  return l || (l = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura-nu-latn", { day: "numeric", month: "numeric", year: "numeric", timeZone: "Asia/Riyadh" })), l;
}
function c(t, a = 0) {
  const n = h().formatToParts(new Date(t + a * s)), e = (o) => {
    var r;
    return Number((r = n.find((i) => i.type === o)) == null ? void 0 : r.value.replace(/\D/g, "")) || 0;
  };
  return { d: e("day"), m: e("month"), y: e("year") };
}
function p(t) {
  return t.m === 9 ? t.d >= 21 ? "last-ten" : "ramadan" : t.m === 10 && t.d <= 3 ? "eid" : t.m < 9 ? "before" : "after";
}
function m(t, a, n) {
  for (let e = 0; e <= 400; e++) if (n(c(t + e * s, a))) return e;
  return null;
}
const f = (t, a = 0) => m(t, a, (n) => n.m === 9 && n.d === 1), w = (t, a = 0) => m(t, a, (n) => n.m === 10 && n.d === 1);
function b(t, a = 0) {
  const n = t + 108e5;
  return Math.floor(n / s) * s - 3 * 36e5 + a * s;
}
const v = ["محرم", "صفر", "ربيع الأول", "ربيع الآخر", "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"], g = ["Muharram", "Safar", "Rabi I", "Rabi II", "Jumada I", "Jumada II", "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhu al-Qadah", "Dhu al-Hijjah"];
function k(t, a = "ar") {
  const n = (a === "en" ? g : v)[t.m - 1] || "";
  return `${t.d} ${n} ${t.y}${a === "en" ? " AH" : " هـ"}`;
}
function C(t) {
  return t.m === 9 ? t.d : 0;
}
function $(t) {
  window.__rmSeason = t, window.dispatchEvent(new Event("rm:season"));
}
function y() {
  return window.__rmSeason || { shift: 0, preview: "" };
}
function E(t = Date.now()) {
  const { shift: a, preview: n } = y(), e = c(t, a), o = p(e), r = !u() && n ? n : o, i = r === o ? e : r === "ramadan" ? { d: 14, m: 9, y: e.y } : r === "last-ten" ? { d: 27, m: 9, y: e.y } : r === "eid" ? { d: 1, m: 10, y: e.y } : e;
  return {
    h: i,
    phase: r,
    toRamadan: r === "before" ? r === o ? f(t, a) : 12 : 0,
    toEid: r === "ramadan" || r === "last-ten" ? r === o ? w(t, a) : 30 - i.d + 1 : 0
  };
}
const z = (t) => t.phase === "ramadan" || t.phase === "last-ten", R = (t = "") => d`<svg class=${t} viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" d="M40 6a26 26 0 1 0 18 44A22 22 0 1 1 40 6z"/></svg>`, D = (t = "") => d`<svg class=${t} viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 1.5l2.6 7.1 7.4.3-5.8 4.6 2 7.2L12 16.6l-6.2 4.1 2-7.2L2 8.9l7.4-.3z"/></svg>`, H = (t = "", a = 40) => d`<svg class=${t} viewBox=${`0 0 40 ${a + 74}`} aria-hidden="true">
  <path d=${`M20 0v${a}`} stroke="currentColor" stroke-width="1.5"/>
  <g transform=${`translate(0 ${a})`} fill="currentColor">
    <circle cx="20" cy="4" r="4"/><path d="M12 10h16l3 6H9z"/>
    <path d="M10 18h20l-2 30H12z" opacity=".35"/><path d="M10 18h20l-2 30H12zM14 22v22M20 21v24M26 22v22" fill="none" stroke="currentColor" stroke-width="1.6"/>
    <path d="M9 50h22l-4 8H13z"/><circle cx="20" cy="66" r="3"/><path d="M20 58v5" stroke="currentColor" stroke-width="1.5"/>
  </g></svg>`, S = `
.rm-pattern { position: relative; isolation: isolate; }
.rm-pattern::before { content: ""; position: absolute; inset: 0; z-index: -1; opacity: .07; pointer-events: none;
  background-color: var(--rm-text);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cpath d='M28 6l6 16 16 6-16 6-6 16-6-16-16-6 16-6z' fill='none' stroke='%23000' stroke-width='1.5'/%3E%3C/svg%3E") repeat center / 56px;
          mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cpath d='M28 6l6 16 16 6-16 6-6 16-6-16-16-6 16-6z' fill='none' stroke='%23000' stroke-width='1.5'/%3E%3C/svg%3E") repeat center / 56px; }
`;
export {
  b as a,
  D as b,
  R as c,
  $ as d,
  k as h,
  z as i,
  H as l,
  S as p,
  C as r,
  E as s
};
