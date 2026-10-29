import { LitElement as g, nothing as l, html as n } from "lit";
import { property as x, state as c } from "lit/decorators.js";
import { unsafeHTML as h } from "lit/directives/unsafe-html.js";
import { b as w, a as k } from "./buy-CytI00LM.js";
import { e as $, a as q, m as S, q as I, d as H, n as y, b as B, u as C, r as P, v as E, t as u, s as z, c as L } from "./styles-Bs7TKm5O.js";
var O = Object.defineProperty, a = (b, t, r, e) => {
  for (var s = void 0, i = b.length - 1, m; i >= 0; i--)
    (m = b[i]) && (s = m(t, r, s) || s);
  return s && O(t, r, s), s;
};
const j = `
.rm-sb { position: fixed; inset-inline: 0; bottom: 0; z-index: 40; padding-bottom: env(safe-area-inset-bottom);
  background: color-mix(in srgb, var(--rm-bg) 92%, transparent); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 -1px 0 color-mix(in srgb, var(--rm-text) 12%, transparent), 0 -12px 32px -24px rgb(0 0 0 / 45%);
  transform: translateY(110%); visibility: hidden; transition: transform .35s ease, visibility 0s linear .35s; }
.rm-sb.is-shown { transform: none; visibility: visible; transition: transform .35s ease; }
/* In the editor and previews the bar sits in the page, so the merchant can see and edit it */
.rm-sb--inline { position: static; transform: none; visibility: visible; transition: none; }
@media (prefers-reduced-motion: reduce) { .rm-sb, .rm-sb.is-shown { transition: none; } }
.rm-sb__inner { display: flex; align-items: center; gap: .75rem; max-width: 1200px; margin-inline: auto; padding: .625rem 1rem; }
.rm-sb__info { display: flex; align-items: center; gap: .75rem; flex: 1 1 auto; min-width: 0; }
.rm-sb__img { width: 2.75rem; height: 2.75rem; flex: 0 0 auto; border-radius: .5rem; object-fit: cover; background: var(--rm-card); }
.rm-sb__name { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-weight: 700; font-size: .9375rem; color: var(--rm-title); }
.rm-sb__price { display: flex; align-items: baseline; gap: .375rem; font-size: .875rem; color: var(--rm-text); }
.rm-sb__price b { color: var(--rm-title); font-size: 1rem; }
.rm-sb__price s { opacity: .7; }
.rm-sb__qty { display: flex; align-items: center; height: 2.75rem; flex: 0 0 auto; border: 1px solid color-mix(in srgb, var(--rm-text) 25%, transparent); border-radius: .625rem; }
.rm-sb__qty button { width: 2.5rem; height: 100%; border: 0; background: none; color: var(--rm-title); font-size: 1.25rem; cursor: pointer; }
.rm-sb__qty button:disabled { opacity: .35; cursor: default; }
.rm-sb__qty output { min-width: 1.75rem; text-align: center; font-weight: 700; color: var(--rm-title); }
.rm-sb__buy { flex: 0 0 auto; }
@media (max-width: 767px) {
  .rm-sb--desktop { display: none; }
  .rm-sb__img { display: none; }
  .rm-sb__buy { flex: 1 1 auto; }
  .rm-sb__info { flex: 0 1 auto; max-width: 40%; flex-direction: column; align-items: flex-start; gap: 0; }
}
@media (min-width: 768px) { .rm-sb--mobile { display: none; } }
`;
class o extends g {
  constructor() {
    super(...arguments), this.product = null, this.pastHero = !1, this.checkoutInView = !1, this.quantity = 1, this.busy = !1, this.error = "", this.observers = [], this.noHero = !1, this.onScroll = () => {
      this.noHero && (this.pastHero = (window.scrollY || document.documentElement.scrollTop) > 600);
    };
  }
  createRenderRoot() {
    return this;
  }
  async connectedCallback() {
    super.connectedCallback(), this.classList.add("rm-host"), $(), q("rm-sticky-buy", j), window.setTimeout(() => this.watch(), 0), this.product = await S(I());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.observers.forEach((t) => t.disconnect()), this.observers = [], window.removeEventListener("scroll", this.onScroll), document.documentElement.style.removeProperty("--rm-sb-h");
  }
  updated() {
    const t = this.querySelector(".rm-sb"), r = !!(t != null && t.classList.contains("is-shown"));
    document.documentElement.style.setProperty("--rm-sb-h", r ? `${t.offsetHeight}px` : "0px");
  }
  inline() {
    return !!this.closest(".component-card");
  }
  watch() {
    if (typeof IntersectionObserver > "u") {
      this.pastHero = !0;
      return;
    }
    const t = document.querySelector("[data-rm-hero]");
    if (t) {
      const e = new IntersectionObserver(([s]) => {
        this.pastHero = !s.isIntersecting && s.boundingClientRect.bottom < 0;
      });
      e.observe(t), this.observers.push(e);
    } else
      this.noHero = !0, window.addEventListener("scroll", this.onScroll, { passive: !0 }), this.onScroll();
    const r = document.querySelector(".s-block--fast-checkout");
    if (r) {
      const e = new IntersectionObserver(([s]) => {
        this.checkoutInView = s.isIntersecting;
      });
      e.observe(r), this.observers.push(e);
    }
  }
  async onBuy() {
    var r, e;
    if (this.busy) return;
    this.busy = !0, this.error = "";
    let t;
    try {
      t = await w({ quantity: this.quantity, product: this.product });
    } finally {
      this.busy = !1;
    }
    t.kind === "error" && (this.error = t.message || "", (e = (r = H()) == null ? void 0 : r.error) == null || e.call(r, t.message));
  }
  renderPrice() {
    const t = this.product, r = Number(t.is_on_sale ? t.sale_price : t.price) || 0, e = Number(t.regular_price) || 0;
    return n`<span class="rm-sb__price"><b>${h(y(r))}</b>
      ${t.is_on_sale && e > r ? n`<s>${h(y(e))}</s>` : l}</span>`;
  }
  render() {
    var p;
    const t = B(this.config), r = k();
    if (r === "none") return l;
    const e = this.product, s = this.inline(), i = s || this.pastHero && !this.checkoutInView, m = String(C(t.show_on) || "both"), f = P(t.buy_text) || (r === "link" ? E().text : "") || u({ ar: "اشتري الآن", en: "Buy now" }), d = Number(e == null ? void 0 : e.max_quantity) || 99, _ = t.show_quantity !== !1 && r !== "link", v = [
      "rm-block rm-sb",
      z(t),
      s ? "rm-sb--inline" : "",
      m === "mobile" ? "rm-sb--mobile" : m === "desktop" ? "rm-sb--desktop" : "",
      i ? "is-shown" : ""
    ].filter(Boolean).join(" ");
    return n`<div class=${v} style=${L(t)} role="region" aria-label=${u({ ar: "شراء سريع", en: "Quick buy" })} aria-hidden=${i ? "false" : "true"}>
      <div class="rm-sb__inner">
        ${e ? n`<div class="rm-sb__info">
              ${(p = e.image) != null && p.url ? n`<img class="rm-sb__img" src=${e.image.url} alt="" loading="lazy" />` : l}
              <div style="min-width:0">
                <div class="rm-sb__name">${e.name}</div>
                ${t.show_price !== !1 ? this.renderPrice() : l}
              </div>
            </div>` : n`<div class="rm-sb__info"></div>`}
        ${_ ? n`<div class="rm-sb__qty" role="group" aria-label=${u({ ar: "الكمية", en: "Quantity" })}>
              <button type="button" aria-label=${u({ ar: "زيادة الكمية", en: "Increase quantity" })} tabindex=${i ? 0 : -1} ?disabled=${this.quantity >= d} @click=${() => this.quantity = Math.min(d, this.quantity + 1)}>+</button>
              <output aria-live="polite">${this.quantity}</output>
              <button type="button" aria-label=${u({ ar: "تقليل الكمية", en: "Decrease quantity" })} tabindex=${i ? 0 : -1} ?disabled=${this.quantity <= 1} @click=${() => this.quantity = Math.max(1, this.quantity - 1)}>−</button>
            </div>` : l}
        <button type="button" class="rm-btn rm-sb__buy" tabindex=${i ? 0 : -1} aria-busy=${this.busy ? "true" : "false"} @click=${() => this.onBuy()}>${f}</button>
      </div>
      ${this.error ? n`<p class="rm-error rm-container" role="alert">${this.error}</p>` : l}
    </div>`;
  }
}
a([
  x({ type: Object })
], o.prototype, "config");
a([
  c()
], o.prototype, "product");
a([
  c()
], o.prototype, "pastHero");
a([
  c()
], o.prototype, "checkoutInView");
a([
  c()
], o.prototype, "quantity");
a([
  c()
], o.prototype, "busy");
a([
  c()
], o.prototype, "error");
typeof o < "u" && o.registerSallaComponent("salla-sticky-buy");
export {
  o as default
};
