import { nothing as n, html as i } from "lit";
import { state as f } from "lit/decorators.js";
import { u, r as o, k as g, l as v, t as c } from "./styles-Bs7TKm5O.js";
import { d as b, s as w, r as $, l as y, c as d, h as x, b as k } from "./season-DLTLY4O1.js";
import { R } from "./section-CceEqpTO.js";
var C = Object.defineProperty, S = (h, r, e, t) => {
  for (var a = void 0, l = h.length - 1, s; l >= 0; l--)
    (s = h[l]) && (a = s(r, e, a) || a);
  return a && C(r, e, a), a;
};
const j = `
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
class p extends R {
  constructor() {
    super(...arguments), this.styleId = "ramadan-hero", this.now = Date.now();
  }
  styles() {
    return j;
  }
  connectedCallback() {
    super.connectedCallback(), this.timer = window.setInterval(() => this.now = Date.now(), 6e4);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this.timer);
  }
  willUpdate() {
    const r = this.cfg();
    b({ shift: Math.max(-2, Math.min(2, Number(r.day_shift) || 0)), preview: u(r.preview_phase) || "" });
  }
  texts(r) {
    const e = this.cfg(), t = r === "last-ten" ? "last" : r, a = { badge: o(e[`${t}_badge`]), title: o(e[`${t}_title`]), subtitle: o(e[`${t}_subtitle`]) };
    return a.title ? a : { badge: o(e.ramadan_badge), title: o(e.ramadan_title), subtitle: o(e.ramadan_subtitle) };
  }
  go(r) {
    var a;
    const e = g(this.cfg().button_target), t = e && document.querySelector(`[data-rm-section="${e}"]`);
    t && (r.preventDefault(), t.scrollIntoView({ behavior: (a = window.matchMedia) != null && a.call(window, "(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
  }
  render() {
    const r = this.cfg(), e = w(this.now), t = this.texts(e.phase), a = v(), l = [String(r.image_1 || ""), String(r.image_2 || "")], s = $(e.h), _ = o(r.button_text);
    return this.frame(i`
      ${r.show_lanterns !== !1 ? i`<div class="rm-hero__lanterns" aria-hidden="true">${[46, 80, 30, 64, 40].map((m) => y("", m))}</div>` : n}
      <div class="rm-hero__wrap">
        <div class="rm-hero__text">
          <span class="rm-hero__pill">${d()} ${x(e.h, a)}
            ${s ? i`· <b>${c({ ar: `اليوم ${s} من رمضان`, en: `Day ${s} of Ramadan` })}</b>` : n}
            ${e.phase === "last-ten" ? i`· <b>${c({ ar: "العشر الأواخر", en: "The last ten nights" })}</b>` : n}</span>
          ${t.badge ? i`<span class="rm-hero__pill">${t.badge}</span>` : n}
          ${t.title ? i`<h1 class="rm-hero__title">${t.title}</h1>` : n}
          ${t.subtitle ? i`<p class="rm-hero__sub">${t.subtitle}</p>` : n}
          ${e.phase === "before" && e.toRamadan ? i`<div class="rm-hero__count"><b>${e.toRamadan}</b><span>${c({ ar: (e.toRamadan === 1, "يوم على رمضان"), en: "days to Ramadan" })}</span></div>` : (e.phase === "ramadan" || e.phase === "last-ten") && e.toEid ? i`<div class="rm-hero__count"><b>${e.toEid}</b><span>${c({ ar: "يوم على العيد", en: "days to Eid" })}</span></div>` : n}
          ${_ ? i`<a class="rm-btn" href=${`#${g(r.button_target)}`} @click=${(m) => this.go(m)}>${_}</a>` : n}
        </div>
        <div class="rm-hero__arches">
          ${d("rm-hero__moon")}
          ${k("rm-hero__star")}
          ${l.map((m) => m ? i`<div class="rm-hero__arch"><img src=${m} alt="" fetchpriority="high" /></div>` : i`<div class="rm-hero__arch rm-hero__arch--empty">${d()}</div>`)}
        </div>
      </div>`, { hero: !0, title: !1, extraClass: "rm-hero" });
  }
}
S([
  f()
], p.prototype, "now");
typeof p < "u" && p.registerSallaComponent("salla-ramadan-hero");
export {
  p as default
};
