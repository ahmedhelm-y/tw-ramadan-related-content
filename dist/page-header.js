import { html as n, LitElement as k, nothing as c } from "lit";
import { property as $, state as g } from "lit/decorators.js";
import { b as M, a as C } from "./buy-CytI00LM.js";
import { b as l, e as B, a as P, p as j, f as E, h as S, u as y, j as K, d as b, g as z, k as L, r as _, t as p } from "./styles-Bs7TKm5O.js";
var O = Object.defineProperty, h = (d, e, t, o) => {
  for (var r = void 0, s = d.length - 1, a; s >= 0; s--)
    (a = d[s]) && (r = a(e, t, r) || r);
  return r && O(e, t, r), r;
};
const v = (d) => `
${d} .rm-hd__logo--light.has-dark { display: none; }
${d} .rm-hd__logo--dark { display: block; }
${d} .rm-hd__logo--light:not(.has-dark) { filter: brightness(0) invert(1); }`, T = `
.rm-hd { position: relative; }
.rm-hd--shadow { box-shadow: 0 1px 0 color-mix(in srgb, var(--rm-text) 12%, transparent); }
.rm-hd--trans:not(.is-solid) { background: transparent; box-shadow: none; --rm-title: #fff; --rm-text: #fff; }
.rm-hd.is-solid { background: color-mix(in srgb, var(--rm-bg) 78%, transparent); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  box-shadow: 0 1px 0 color-mix(in srgb, var(--rm-text) 10%, transparent); }
/* Previews clip the section list with overflow: hidden, which blocks sticky; clip does not */
.components-grid:has(.rm-hd--sticky) { overflow: clip; }
.rm-hd__inner { display: flex; align-items: center; gap: .75rem 1.25rem; flex-wrap: wrap; max-width: 1200px; margin-inline: auto;
  padding: .625rem 1rem; min-height: calc(var(--rm-hd-logo, 56px) + 1.25rem); }
.rm-hd__brand { display: inline-flex; align-items: center; flex: 0 0 auto; text-decoration: none; }
.rm-hd__logo { display: block; height: var(--rm-hd-logo, 56px); width: auto; max-width: 45vw; object-fit: contain; }
.rm-hd .rm-hd__logo--dark { display: none; }
.rm-hd__name { font-size: 1.25rem; font-weight: 800; color: var(--rm-title); }
.rm-hd__nav { display: flex; gap: .25rem; flex: 1 1 auto; justify-content: center; min-width: 0; }
.rm-hd__nav a { display: inline-flex; align-items: center; min-height: 2.75rem; padding: 0 .75rem; border-radius: 999px; color: var(--rm-text);
  font-weight: 600; font-size: .9375rem; text-decoration: none; white-space: nowrap; }
.rm-hd__nav a:hover { background: color-mix(in srgb, var(--rm-text) 8%, transparent); }
.rm-hd__nav a:focus-visible, .rm-hd__toggle:focus-visible { outline: 2px solid var(--rm-accent-ink); outline-offset: 2px; }
.rm-hd__actions { display: flex; align-items: center; gap: .5rem; margin-inline-start: auto; }
.rm-hd__toggle { width: 2.75rem; height: 2.75rem; display: grid; place-items: center; padding: 0; border: 0; border-radius: 999px; background: none;
  color: var(--rm-title); cursor: pointer; }
.rm-hd__toggle svg { width: 22px; height: 22px; }
.rm-hd__buy { min-height: 2.75rem; padding: .5rem 1.25rem; font-size: .9375rem; }
/* Centered logo: links on one side, actions on the other */
@container (min-width: 768px) {
  .rm-hd--center .rm-hd__inner { display: grid; grid-template-columns: 1fr auto 1fr; }
  .rm-hd--center .rm-hd__brand { grid-column: 2; grid-row: 1; }
  .rm-hd--center .rm-hd__nav { grid-column: 1; grid-row: 1; justify-content: flex-start; }
  .rm-hd--center .rm-hd__actions { grid-column: 3; grid-row: 1; }
}
/* Phones: links move to their own scrolling row under the logo */
@container (max-width: 767px) {
  .rm-hd__nav { order: 3; flex-basis: 100%; justify-content: flex-start; overflow-x: auto; scrollbar-width: none; margin-inline: -1rem; padding-inline: 1rem; }
  .rm-hd__nav::-webkit-scrollbar { display: none; }
  .rm-hd--center .rm-hd__brand { order: 0; }
}
${["html.rm-mode-dark .rm-hd.rm-auto", ".rm-hd.rm-hd--trans:not(.is-solid)"].map(v).join("")}
@media (prefers-color-scheme: dark) { ${v("html:not(.rm-mode-light) .rm-hd.rm-auto")} }
`, V = n`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
  <circle cx="12" cy="12" r="4.5" /><path d="M12 1.5v2M12 20.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1.5 12h2M20.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>`, R = n`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" /></svg>`;
function I() {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}
class m extends k {
  constructor() {
    super(...arguments), this.store = { logo: "", name: "" }, this.mode = "light", this.solid = !1, this.busy = !1, this.modeKey = "", this.paletteKey = "", this.paletteVars = [], this.onScroll = () => {
      const e = !!l(this.config).sticky && this.getBoundingClientRect().top <= 1 && I() > 1;
      e !== this.solid && (this.solid = e);
    };
  }
  createRenderRoot() {
    return this;
  }
  async connectedCallback() {
    var t, o, r;
    super.connectedCallback(), this.classList.add("rm-host"), B(), P("rm-page-header", T), document.addEventListener("scroll", this.onScroll, { capture: !0, passive: !0 }), this.resizer = new ResizeObserver(() => this.frame()), this.resizer.observe(this);
    for (const s of [300, 1500]) window.setTimeout(() => this.requestUpdate(), s);
    const e = b();
    await ((t = e == null ? void 0 : e.onReady) == null ? void 0 : t.call(e)), this.store = { logo: ((o = e == null ? void 0 : e.config) == null ? void 0 : o.get("store.logo")) || "", name: ((r = e == null ? void 0 : e.config) == null ? void 0 : r.get("store.name")) || "" };
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), document.removeEventListener("scroll", this.onScroll, { capture: !0 }), (e = this.resizer) == null || e.disconnect(), this.unframe(), this.clearPalette(), this.modeKey = this.paletteKey = "", document.documentElement.classList.remove("rm-mode-dark", "rm-mode-light", "rm-mode-ready");
  }
  // Palette and mode are applied before the first paint, so the page never flashes the wrong colors
  willUpdate() {
    const e = l(this.config), t = j(e), o = JSON.stringify(t);
    if (o !== this.paletteKey) {
      this.paletteKey = o, this.clearPalette();
      for (const [s, a] of Object.entries(t)) document.documentElement.style.setProperty(s, a);
      this.paletteVars = Object.keys(t);
    }
    const r = `${this.baseMode()}|${this.toggleShown()}`;
    r !== this.modeKey && (this.modeKey = r, this.applyMode(E(this.baseMode(), this.toggleShown(), S(this.baseMode()))));
  }
  updated() {
    this.frame(), this.onScroll();
  }
  clearPalette() {
    for (const e of this.paletteVars) document.documentElement.style.removeProperty(e);
    this.paletteVars = [];
  }
  baseMode() {
    return String(y(l(this.config).default_mode) || "light");
  }
  toggleShown() {
    return l(this.config).show_mode_toggle !== !1;
  }
  applyMode(e) {
    this.mode = e, document.documentElement.classList.toggle("rm-mode-dark", e === "dark"), document.documentElement.classList.toggle("rm-mode-light", e === "light");
  }
  toggleMode() {
    const e = this.mode === "dark" ? "light" : "dark";
    document.documentElement.classList.add("rm-mode-ready"), this.applyMode(e), K(e, this.baseMode());
  }
  /**
   * White-on-image only works over the hero: without one, the header would put white text on the page
   * background, so it stays solid.
   */
  transparent() {
    if (!l(this.config).transparent) return !1;
    const e = document.querySelector(".rm-section");
    return !!(e != null && e.matches("[data-rm-hero].rm-hero--overlay"));
  }
  /** Sticky and the transparent overlap go on the outermost box of the section, the editor's card included. */
  frame() {
    const e = l(this.config), t = this.closest(".component-card") || this;
    this.framed && this.framed !== t && this.unframe();
    const o = !!e.sticky, r = this.transparent();
    t.style.position = o ? "sticky" : r ? "relative" : "", t.style.top = o ? "0" : "", t.style.zIndex = o || r ? "30" : "", t.style.marginBottom = r ? `-${this.offsetHeight}px` : "", document.documentElement.style.setProperty("--rm-hd-h", o ? `${this.offsetHeight}px` : "0px"), this.framed = t;
  }
  unframe() {
    this.framed && (this.framed.style.position = this.framed.style.top = this.framed.style.zIndex = this.framed.style.marginBottom = "", document.documentElement.style.removeProperty("--rm-hd-h"), this.framed = void 0);
  }
  goTo(e, t) {
    var r;
    const o = document.querySelector(`[data-rm-section="${CSS.escape(t)}"]`);
    o && (e.preventDefault(), o.scrollIntoView({ behavior: (r = window.matchMedia) != null && r.call(window, "(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
  }
  async onBuy() {
    var t, o;
    if (this.busy) return;
    this.busy = !0;
    let e;
    try {
      e = await M();
    } finally {
      this.busy = !1;
    }
    e.kind === "error" && ((o = (t = b()) == null ? void 0 : t.error) == null || o.call(t, e.message));
  }
  render() {
    const e = l(this.config), t = Math.min(Math.max(Number(e.logo_height) || 56, 24), 140), o = [
      "rm-block rm-hd rm-auto",
      y(e.align) === "start" ? "" : "rm-hd--center",
      e.show_shadow !== !1 ? "rm-hd--shadow" : "",
      this.transparent() ? "rm-hd--trans" : "",
      e.sticky ? "rm-hd--sticky" : "",
      this.solid ? "is-solid" : ""
    ].filter(Boolean).join(" "), r = e.logo || this.store.logo, s = e.logo_dark || "", a = this.store.name, u = z(e.nav, "nav").map((i) => ({ label: _(i.label), target: L(i.target) })).filter((i) => i.label && i.target), w = e.show_buy !== !1 && C() !== "none", f = this.mode === "dark";
    return n`<header class=${o} style=${`--rm-hd-logo:${t}px`}>
      <div class="rm-hd__inner">
        <span class="rm-hd__brand">
          ${r ? n`<img class="rm-hd__logo rm-hd__logo--light${s ? " has-dark" : ""}" src=${r} alt=${a} />
                ${s ? n`<img class="rm-hd__logo rm-hd__logo--dark" src=${s} alt=${a} />` : c}` : n`<span class="rm-hd__name">${a}</span>`}
        </span>
        ${u.length ? n`<nav class="rm-hd__nav" aria-label=${p({ ar: "أقسام الصفحة", en: "Page sections" })}>
              ${u.map((i) => n`<a href=${`#${i.target}`} @click=${(x) => this.goTo(x, i.target)}>${i.label}</a>`)}
            </nav>` : c}
        <div class="rm-hd__actions">
          ${this.toggleShown() ? n`<button type="button" class="rm-hd__toggle" @click=${() => this.toggleMode()} aria-pressed=${f ? "true" : "false"}
                aria-label=${p({ ar: "الوضع الداكن", en: "Dark mode" })}>${f ? V : R}</button>` : c}
          ${w ? n`<button type="button" class="rm-btn rm-hd__buy" aria-busy=${this.busy ? "true" : "false"} @click=${() => this.onBuy()}>
                ${_(e.buy_text) || p({ ar: "اشتري الآن", en: "Buy now" })}</button>` : c}
        </div>
      </div>
    </header>`;
  }
}
h([
  $({ type: Object })
], m.prototype, "config");
h([
  g()
], m.prototype, "store");
h([
  g()
], m.prototype, "mode");
h([
  g()
], m.prototype, "solid");
h([
  g()
], m.prototype, "busy");
typeof m < "u" && m.registerSallaComponent("salla-page-header");
export {
  m as default
};
