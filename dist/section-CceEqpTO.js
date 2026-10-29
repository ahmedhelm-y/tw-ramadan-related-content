import { LitElement as d, nothing as a, html as i } from "lit";
import { property as p, state as f } from "lit/decorators.js";
import { b as y } from "./buy-CytI00LM.js";
import { e as b, a as g, x as $, b as v, r as c, t as x, d as C, k as _, s as k, c as S } from "./styles-Bs7TKm5O.js";
var j = Object.defineProperty, h = (l, s, t, r) => {
  for (var e = void 0, o = l.length - 1, n; o >= 0; o--)
    (n = l[o]) && (e = n(s, t, e) || e);
  return e && j(s, t, e), e;
};
class m extends d {
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
    const s = this.querySelector(".rm-section:not([data-rm-hero]) > .rm-container");
    s && $(s);
  }
  cfg() {
    return v(this.config);
  }
  styles() {
    return "";
  }
  buyLabel() {
    return c(this.cfg().buy_text) || x({ ar: "أضف للسلة", en: "Add to cart" });
  }
  async press(s = {}) {
    var r, e;
    if (this.busy) return;
    this.busy = !0, this.error = "";
    let t;
    try {
      t = await y(s);
    } finally {
      this.busy = !1;
    }
    t.kind === "error" && (this.error = t.message || "", (e = (r = C()) == null ? void 0 : r.error) == null || e.call(r, t.message));
  }
  frame(s, t = {}) {
    const r = this.cfg(), e = t.title === !1 ? "" : c(r.title), o = t.title === !1 ? "" : c(r.subtitle), n = _(r.section_id), u = ["rm-block rm-section", k(r), t.extraClass || ""].filter(Boolean).join(" ");
    return i`<section class=${u} style=${S(r)} data-rm-section=${n || a}
      ?data-rm-hero=${!!t.hero}>
      <div class="rm-container">
        ${e || o ? i`<div class="rm-title">${e ? i`<h2>${e}</h2>` : a}${o ? i`<p>${o}</p>` : a}</div>` : a}
        ${s}
        ${this.error && !t.noError ? i`<p class="rm-error" role="alert">${this.error}</p>` : a}
      </div>
    </section>`;
  }
}
h([
  p({ type: Object })
], m.prototype, "config");
h([
  f()
], m.prototype, "busy");
h([
  f()
], m.prototype, "error");
export {
  m as R
};
