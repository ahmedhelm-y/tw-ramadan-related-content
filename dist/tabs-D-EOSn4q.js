import { nothing as c, html as i } from "lit";
import { state as b } from "lit/decorators.js";
import { g as h, u, r as f, i as _, t as l } from "./styles-Bs7TKm5O.js";
import { D as v, c as y, e as w, p as k, l as x } from "./deals-DRqWXXPq.js";
import { C as d, s as $, d as C } from "./prayer-5zE4Yu9W.js";
import { s as T, i as j } from "./season-DLTLY4O1.js";
var I = Object.defineProperty, p = (o, t, a, e) => {
  for (var r = void 0, n = o.length - 1, s; n >= 0; n--)
    (s = o[n]) && (r = s(t, a, r) || r);
  return r && I(t, a, r), r;
};
const S = `
.rm-tb__tabs { display: flex; gap: .75rem; overflow-x: auto; padding: .25rem .25rem 1rem; margin-bottom: .5rem; scrollbar-width: thin; }
.rm-tb--round .rm-tb__tabs { justify-content: safe center; gap: 1rem; }
.rm-tb__tab { flex: 0 0 auto; display: grid; justify-items: center; gap: .5rem; padding: 0; border: 0; background: none; color: var(--rm-title); font: inherit; font-weight: 800; cursor: pointer; }
.rm-tb__tab:focus-visible { outline: 3px solid var(--rm-accent-ink); outline-offset: 3px; border-radius: 1rem; }
.rm-tb__ring { width: 6.5rem; height: 6.5rem; padding: .25rem; border: 3px solid transparent; border-radius: 999px; background: var(--rm-bg); transition: border-color .2s ease; }
.rm-tb__ring img, .rm-tb__ring span { width: 100%; height: 100%; display: grid; place-items: center; border-radius: 999px; object-fit: cover; background: var(--rm-card); font-size: 2rem; }
.rm-tb__tab[aria-selected="true"] .rm-tb__ring { border-color: var(--rm-accent); }
.rm-tb__now { font-size: .6875rem; font-weight: 800; color: var(--rm-accent-ink); }
.rm-tb--pills .rm-tb__tabs { justify-content: safe center; }
.rm-tb--pills .rm-tb__tab { min-height: 2.75rem; padding: 0 1.25rem; border: 1.5px solid color-mix(in srgb, var(--rm-text) 25%, transparent); border-radius: 999px; display: flex; align-items: center; }
.rm-tb--pills .rm-tb__tab[aria-selected="true"] { border-color: var(--rm-accent-ink); background: var(--rm-accent); color: var(--rm-accent-text); }
.rm-tb__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .875rem; margin: 0; padding: 0; list-style: none; }
@container (min-width: 768px) { .rm-tb__grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.25rem; } }
.rm-tb .rm-tb__loading { padding: 2rem; text-align: center; }
`;
function D(o, t, a) {
  const e = C(o, t, a), r = Math.floor(((o / 6e4 + 180) % 1440 + 1440) % 1440);
  return r < e.fajr ? "suhoor" : r >= e.maghrib && r < e.maghrib + 90 ? "iftar" : r >= e.maghrib + 90 ? "taraweeh" : "";
}
class g extends v {
  constructor() {
    super(...arguments), this.active = -1, this.cache = {}, this.loading = /* @__PURE__ */ new Set();
  }
  styles() {
    return S + y;
  }
  connectedCallback() {
    super.connectedCallback(), w();
  }
  tabs() {
    return h(this.cfg().tabs, "tabs").map((t) => ({ label: f(t.label), image: String(t.image || ""), ids: k(t.products, 12), moment: u(t.moment) || "" })).filter((t) => t.label && t.ids.length).slice(0, 6);
  }
  /** The tab that opens first: the one for this moment of the night (or Eid), else the first. */
  firstTab(t) {
    if (this.look !== "round") return 0;
    const a = T(), e = d[$()] || d[0], r = a.phase === "eid" ? "eid" : j(a) ? D(Date.now(), e.lat, e.lng) : "", n = r ? t.findIndex((s) => s.moment === r) : -1;
    return n >= 0 ? n : 0;
  }
  async load(t, a) {
    if (this.cache[t] || this.loading.has(t) || !a[t]) return;
    this.loading.add(t);
    const e = await x(a[t].ids);
    this.loading.delete(t), this.cache = { ...this.cache, [t]: e };
  }
  render() {
    const t = this.tabs();
    if (!t.length)
      return _() ? c : this.frame(i`<p class="rm-empty">${l({ ar: "أضف التبويبات ومنتجات كل تبويب من إعدادات هذا القسم", en: "Add the tabs and their products in this section's settings" })}</p>`);
    const a = this.firstTab(t), e = this.active >= 0 && this.active < t.length ? this.active : a;
    this.load(e, t);
    const r = this.cache[e], n = this.cfg().ask_gift !== !1;
    return this.frame(i`
      <div class="rm-tb__tabs" role="tablist">
        ${t.map((s, m) => i`<button type="button" class="rm-tb__tab" role="tab" aria-selected=${m === e ? "true" : "false"} @click=${() => this.active = m}>
          ${this.look === "round" ? i`<span class="rm-tb__ring">${s.image ? i`<img src=${s.image} alt="" loading="lazy" />` : i`<span aria-hidden="true">🌙</span>`}</span>` : c}
          <span>${s.label}</span>
          ${this.look === "round" && m === a && s.moment ? i`<span class="rm-tb__now">${l({ ar: "وقته الآن", en: "Right now" })}</span>` : c}
        </button>`)}
      </div>
      ${r ? r.length ? i`<ul class="rm-tb__grid" role="tabpanel">${r.map((s) => this.renderCard(s, { ask: n }))}</ul>` : i`<p class="rm-tb__loading">${l({ ar: "المنتجات غير متوفرة حالياً", en: "These products are not available now" })}</p>` : i`<p class="rm-tb__loading" aria-busy="true">…</p>`}`, { extraClass: `rm-tb rm-tb--${this.look}` });
  }
}
p([
  b()
], g.prototype, "active");
p([
  b()
], g.prototype, "cache");
export {
  g as T
};
