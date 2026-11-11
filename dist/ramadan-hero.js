import { nothing as m, html as o } from "lit";
import { state as b } from "lit/decorators.js";
import { p as w, u as v, l as y, r as l, n as u, a as $, t as h } from "./styles-BzE_GqTJ.js";
import { d as x, s as k, r as C, l as P, c as _, h as R, b as S } from "./season-CqOYjCzR.js";
import { R as j } from "./section-DHdMqSpN.js";
let g = "", p = [];
function z(s) {
  const r = w(s), e = String(v(s.default_mode) || "light"), a = `${JSON.stringify(r)}|${e}`, t = document.documentElement, n = y(e);
  if (a === g) return n;
  g = a;
  for (const i of p) t.style.removeProperty(i);
  for (const [i, d] of Object.entries(r)) t.style.setProperty(i, d);
  return p = Object.keys(r), t.classList.toggle("rm-mode-dark", n === "dark"), t.classList.toggle("rm-mode-light", n === "light"), n;
}
function D() {
  const s = document.documentElement;
  for (const r of p) s.style.removeProperty(r);
  p = [], g = "", s.classList.remove("rm-mode-dark", "rm-mode-light");
}
var E = Object.defineProperty, I = (s, r, e, a) => {
  for (var t = void 0, n = s.length - 1, i; n >= 0; n--)
    (i = s[n]) && (t = i(r, e, t) || t);
  return t && E(r, e, t), t;
};
const L = `
.rm-hero { position: relative; overflow: hidden; }
.rm-hero__wrap { position: relative; display: grid; gap: 2rem; align-items: center; padding-block: 3rem 3.5rem; }
@container (min-width: 900px) { .rm-hero__wrap { grid-template-columns: 1.1fr 1fr; gap: 3rem; padding-block: 4.5rem 5rem; } }
.rm-hero__text { position: relative; z-index: 1; display: grid; gap: 1rem; justify-items: start; }
.rm-hero__pill { display: inline-flex; flex-wrap: wrap; align-items: center; gap: .5rem; padding: .375rem .875rem; border-radius: 999px;
  background: color-mix(in srgb, var(--rm-accent) 16%, var(--rm-bg)); color: var(--rm-title); font-size: .875rem; font-weight: 700; }
.rm-hero__pill svg { width: 1rem; height: 1rem; color: var(--rm-accent-ink); }
.rm-hero__pill b { color: var(--rm-accent-ink); }
.rm-hero__title { margin: 0; font-size: clamp(2.25rem, 7cqi, 4rem); line-height: 1.15; font-weight: 900; color: var(--rm-title); }
.rm-hero__sub { margin: 0; max-width: 34rem; font-size: 1.0625rem; line-height: 1.9; }
.rm-hero__count { display: flex; align-items: baseline; gap: .5rem; color: var(--rm-title); }
.rm-hero__count b { font-size: 3rem; font-weight: 900; line-height: 1; color: var(--rm-accent-ink); }
.rm-hero__count span { font-weight: 800; }
.rm-hero__arches { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; align-items: end; min-height: 18rem; }
.rm-hero__arch { position: relative; overflow: hidden; border-radius: 999px 999px 1.5rem 1.5rem; background: var(--rm-card); aspect-ratio: 3 / 4.4; }
.rm-hero__arch:nth-child(2) { transform: translateY(-2.5rem); }
.rm-hero__arch img { width: 100%; height: 100%; object-fit: cover; }
.rm-hero__arch--empty { display: grid; place-items: center; color: var(--rm-accent-ink); }
.rm-hero__arch--empty svg { width: 40%; }
.rm-hero__moon { position: absolute; top: -1.5rem; inset-inline-end: 8%; width: 4.5rem; color: var(--rm-accent); transform: rotate(-20deg); }
.rm-hero__star { position: absolute; top: 12%; inset-inline-start: 2%; width: 1.25rem; color: var(--rm-accent); }
.rm-hero__lanterns { position: absolute; top: 0; inset-inline: 0; display: flex; justify-content: space-between; padding-inline: 4%; pointer-events: none; color: var(--rm-accent); }
.rm-hero__lanterns svg { width: 2.25rem; transform-origin: top center; animation: rm-swing 4s ease-in-out infinite; }
.rm-hero__lanterns svg:nth-child(2n) { animation-delay: -2s; width: 1.75rem; }
@keyframes rm-swing { 0%, 100% { transform: rotate(3deg); } 50% { transform: rotate(-3deg); } }
@media (prefers-reduced-motion: reduce) { .rm-hero__lanterns svg { animation: none; } }
@container (max-width: 520px) { .rm-hero__lanterns svg:nth-child(n + 4) { display: none; } }
`;
class f extends j {
  constructor() {
    super(...arguments), this.styleId = "ramadan-hero", this.now = Date.now();
  }
  styles() {
    return L;
  }
  connectedCallback() {
    super.connectedCallback(), this.timer = window.setInterval(() => this.now = Date.now(), 6e4);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this.timer), D();
  }
  willUpdate() {
    const r = this.cfg();
    z({ brand_color: r.brand_color, default_mode: r.default_mode }), x({ shift: Math.max(-2, Math.min(2, Number(r.day_shift) || 0)), preview: v(r.preview_phase) || "" });
  }
  texts(r) {
    const e = this.cfg(), a = r === "last-ten" ? "last" : r, t = { badge: l(e[`${a}_badge`]), title: l(e[`${a}_title`]), subtitle: l(e[`${a}_subtitle`]) };
    return t.title ? t : { badge: l(e.ramadan_badge), title: l(e.ramadan_title), subtitle: l(e.ramadan_subtitle) };
  }
  go(r) {
    var t;
    const e = u(this.cfg().button_target), a = e && document.querySelector(`[data-rm-section="${e}"]`);
    a && (r.preventDefault(), a.scrollIntoView({ behavior: (t = window.matchMedia) != null && t.call(window, "(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
  }
  render() {
    const r = this.cfg(), e = k(this.now), a = this.texts(e.phase), t = $(), n = [String(r.image_1 || ""), String(r.image_2 || "")], i = C(e.h), d = l(r.button_text);
    return this.frame(o`
      ${r.show_lanterns !== !1 ? o`<div class="rm-hero__lanterns" aria-hidden="true">${[46, 80, 30, 64, 40].map((c) => P("", c))}</div>` : m}
      <div class="rm-hero__wrap">
        <div class="rm-hero__text">
          <span class="rm-hero__pill">${_()} ${R(e.h, t)}
            ${i ? o`· <b>${h({ ar: `اليوم ${i} من رمضان`, en: `Day ${i} of Ramadan` })}</b>` : m}
            ${e.phase === "last-ten" ? o`· <b>${h({ ar: "العشر الأواخر", en: "The last ten nights" })}</b>` : m}</span>
          ${a.badge ? o`<span class="rm-hero__pill">${a.badge}</span>` : m}
          ${a.title ? o`<h1 class="rm-hero__title">${a.title}</h1>` : m}
          ${a.subtitle ? o`<p class="rm-hero__sub">${a.subtitle}</p>` : m}
          ${e.phase === "before" && e.toRamadan ? o`<div class="rm-hero__count"><b>${e.toRamadan}</b><span>${h({ ar: (e.toRamadan === 1, "يوم على رمضان"), en: "days to Ramadan" })}</span></div>` : (e.phase === "ramadan" || e.phase === "last-ten") && e.toEid ? o`<div class="rm-hero__count"><b>${e.toEid}</b><span>${h({ ar: "يوم على العيد", en: "days to Eid" })}</span></div>` : m}
          ${d ? o`<a class="rm-btn" href=${`#${u(r.button_target)}`} @click=${(c) => this.go(c)}>${d}</a>` : m}
        </div>
        <div class="rm-hero__arches">
          ${_("rm-hero__moon")}
          ${S("rm-hero__star")}
          ${n.map((c) => c ? o`<div class="rm-hero__arch"><img src=${c} alt="" fetchpriority="high" /></div>` : o`<div class="rm-hero__arch rm-hero__arch--empty">${_()}</div>`)}
        </div>
      </div>`, { hero: !0, title: !1, extraClass: "rm-hero" });
  }
}
I([
  b()
], f.prototype, "now");
typeof f < "u" && f.registerSallaComponent("salla-ramadan-hero");
export {
  f as default
};
