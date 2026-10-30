import { nothing as n, html as s } from "lit";
import { state as f } from "lit/decorators.js";
import { unsafeHTML as b } from "lit/directives/unsafe-html.js";
import { g as v, m as $, r as d, i as w, t as u, n as _ } from "./styles-Bs7TKm5O.js";
import { D as x, e as k, d as z } from "./deals-XKcCQumn.js";
import { p as P } from "./season-DLTLY4O1.js";
var C = Object.defineProperty, h = (c, l, t, e) => {
  for (var r = void 0, a = c.length - 1, i; a >= 0; a--)
    (i = c[a]) && (r = i(l, t, r) || r);
  return r && C(l, t, r), r;
};
const S = `
.rm-bu__list { display: grid; gap: 1.25rem; margin: 0; padding: 0; list-style: none; }
.rm-bu__card { display: grid; overflow: hidden; border-radius: 1.5rem; background: var(--rm-card); }
@container (min-width: 820px) { .rm-bu__card { grid-template-columns: 5fr 6fr; } .rm-bu__card:nth-child(2n) .rm-bu__media { order: 2; } }
.rm-bu__media { position: relative; min-height: 16rem; background: var(--rm-bg); }
.rm-bu__media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.rm-bu__badge { position: absolute; top: 1rem; inset-inline-start: 1rem; padding: .375rem .875rem; border-radius: 999px; background: var(--rm-accent); color: var(--rm-accent-text); font-size: .8125rem; font-weight: 800; }
.rm-bu__body { display: grid; align-content: center; gap: .875rem; padding: 1.75rem 1.5rem; }
.rm-bu__title { margin: 0; font-size: 1.5rem; font-weight: 900; color: var(--rm-title); }
.rm-bu__items { display: grid; gap: .5rem; margin: 0; padding: 0; list-style: none; }
.rm-bu__items li { display: flex; gap: .625rem; align-items: baseline; line-height: 1.6; }
.rm-bu__items li::before { content: "✦"; color: var(--rm-accent-ink); font-size: .8125rem; }
.rm-bu__price { display: flex; flex-wrap: wrap; align-items: baseline; gap: .625rem; font-size: 1.625rem; font-weight: 900; color: var(--rm-title); }
.rm-bu__price s { font-size: 1rem; font-weight: 500; opacity: .7; }
.rm-bu__price em { padding: .125rem .5rem; border-radius: .5rem; background: #d92d20; color: #fff; font-size: .8125rem; font-style: normal; font-weight: 800; }
.rm-bu__buy { display: flex; flex-wrap: wrap; gap: .625rem; align-items: center; }
.rm-bu__buy select { min-height: 2.75rem; padding: 0 .75rem; border: 1px solid color-mix(in srgb, var(--rm-text) 25%, transparent); border-radius: .625rem; background: var(--rm-bg); color: var(--rm-title); font: inherit; }
.rm-bu__buy select[aria-invalid="true"] { border-color: #d92d20; }
.rm-bu__buy .rm-card__ask { color: var(--rm-title); font-weight: 700; font-size: .875rem; text-underline-offset: .25rem; }
`;
class o extends x {
  constructor() {
    super(...arguments), this.styleId = "ramadan-bundle", this.bundles = [], this.loaded = !1;
  }
  styles() {
    return S + P;
  }
  async connectedCallback() {
    super.connectedCallback(), k();
    const l = v(this.cfg().bundles, "bundles").slice(0, 3), t = await Promise.all(l.map(async (e) => {
      var m, p, g;
      const r = Array.isArray(e.product) ? e.product[0] : e.product, a = r && typeof r == "object" ? r.value ?? r.id : r, i = a ? await $(String(a)) : null;
      return i ? {
        product: i,
        title: d(e.title) || i.name,
        image: String(e.image || "") || ((p = (m = i.images) == null ? void 0 : m[0]) == null ? void 0 : p.url) || ((g = i.image) == null ? void 0 : g.url) || "",
        items: d(e.items).split(/\n|،\s*(?=\S)/).map((y) => y.trim()).filter(Boolean).slice(0, 10),
        badge: d(e.badge)
      } : null;
    }));
    this.bundles = t.filter(Boolean), this.loaded = !0;
  }
  render() {
    if (!this.bundles.length)
      return !this.loaded || w() ? n : this.frame(s`<p class="rm-empty">${u({ ar: "اختر منتج كل باقة واكتب محتوياتها من إعدادات هذا القسم", en: "Pick each bundle's product and list what is inside in this section's settings" })}</p>`);
    const l = this.cfg().ask_gift !== !1;
    return this.frame(s`<ul class="rm-bu__list">${this.bundles.map((t) => {
      const e = t.product, r = Number(e.sale_price || e.price) || 0, a = Number(e.regular_price) || 0, i = z(e);
      return s`<li class="rm-bu__card" data-card=${String(e.id)}>
        <div class="rm-bu__media">${t.image ? s`<img src=${t.image} alt="" loading="lazy" />` : n}
          ${t.badge ? s`<span class="rm-bu__badge">${t.badge}</span>` : n}</div>
        <div class="rm-bu__body rm-pattern">
          <h3 class="rm-bu__title">${t.title}</h3>
          ${t.items.length ? s`<ul class="rm-bu__items">${t.items.map((m) => s`<li>${m}</li>`)}</ul>` : n}
          <div class="rm-bu__price">${b(_(r))}${a > r ? s`<s>${b(_(a))}</s>` : n}
            ${i ? s`<em>${u({ ar: `وفّر ${i}%`, en: `Save ${i}%` })}</em>` : n}</div>
          <div class="rm-bu__buy">${this.renderPickers(e)}${this.renderBuy(e, d(this.cfg().buy_text) || u({ ar: "أضف الباقة للسلة", en: "Add the bundle" }))}
            ${l ? this.askLink(e) : n}</div>
        </div>
      </li>`;
    })}</ul>`, { extraClass: "rm-bu" });
  }
}
h([
  f()
], o.prototype, "bundles");
h([
  f()
], o.prototype, "loaded");
typeof o < "u" && o.registerSallaComponent("salla-ramadan-bundle");
export {
  o as default
};
