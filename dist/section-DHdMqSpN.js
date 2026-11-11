import { LitElement as p, nothing as a, html as n } from "lit";
import { property as y, state as h } from "lit/decorators.js";
import { c as b, d as g, z as $, s as v, r as l, t as S, q as _, b as C, n as d, x, y as k } from "./styles-BzE_GqTJ.js";
var w = Object.defineProperty, u = (c, e, t, r) => {
  for (var s = void 0, o = c.length - 1, i; o >= 0; o--)
    (i = c[o]) && (s = i(e, t, s) || s);
  return s && w(e, t, s), s;
};
function j(c) {
  var r;
  const e = document.querySelector(`[data-rm-section="${CSS.escape(c)}"]`), t = (r = window.matchMedia) == null ? void 0 : r.call(window, "(prefers-reduced-motion: reduce)").matches;
  e == null || e.scrollIntoView({ behavior: t ? "auto" : "smooth", block: "start" });
}
class m extends p {
  constructor() {
    super(...arguments), this.busy = !1, this.error = "";
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("rm-host"), b(), g(`rm-${this.styleId}`, this.styles());
  }
  firstUpdated() {
    const e = this.querySelector(".rm-section:not([data-rm-hero]) > .rm-container");
    e && $(e);
  }
  cfg() {
    return v(this.config);
  }
  styles() {
    return "";
  }
  buyLabel() {
    return l(this.cfg().buy_text) || S({ ar: "أضف للسلة", en: "Add to cart" });
  }
  async press(e = {}) {
    var r, s;
    if (this.busy) return;
    this.busy = !0, this.error = "";
    let t;
    try {
      t = await _(e);
    } finally {
      this.busy = !1;
    }
    t.kind === "error" && (this.error = t.message || "", (s = (r = C()) == null ? void 0 : r.error) == null || s.call(r, t.message));
  }
  /**
   * The page's one primary action, repeated at the end of a section: the same button that takes the
   * shopper to the Ramadan products. Hidden when the merchant clears its text.
   */
  renderCta() {
    const e = this.cfg(), t = l(e.cta_text), r = d(e.cta_target) || "moments";
    return !t || e.show_cta === !1 ? a : n`<div class="rm-cta"><button type="button" class="rm-btn" @click=${() => j(r)}>${t}</button></div>`;
  }
  frame(e, t = {}) {
    const r = this.cfg(), s = t.title === !1 ? "" : l(r.title), o = t.title === !1 ? "" : l(r.subtitle), i = d(r.section_id), f = ["rm-block rm-section", x(r), t.extraClass || ""].filter(Boolean).join(" ");
    return n`<section class=${f} style=${k(r)} data-rm-section=${i || a}
      ?data-rm-hero=${!!t.hero}>
      <div class="rm-container">
        ${s || o ? n`<div class="rm-title">${s ? n`<h2>${s}</h2>` : a}${o ? n`<p>${o}</p>` : a}</div>` : a}
        ${e}
        ${this.error && !t.noError ? n`<p class="rm-error" role="alert">${this.error}</p>` : a}
      </div>
    </section>`;
  }
}
u([
  y({ type: Object })
], m.prototype, "config");
u([
  h()
], m.prototype, "busy");
u([
  h()
], m.prototype, "error");
export {
  m as R
};
