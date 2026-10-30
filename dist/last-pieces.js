import { nothing as c, html as i } from "lit";
import { state as m } from "lit/decorators.js";
import { t as n, r as f, i as u } from "./styles-Bs7TKm5O.js";
import { D as h, c as g, e as _, l as w, p as b, a as v, r as y } from "./deals-XKcCQumn.js";
import { s as x, i as $, a as k } from "./season-DLTLY4O1.js";
import { h as C } from "./prayer-5zE4Yu9W.js";
var P = Object.defineProperty, p = (d, t, e, a) => {
  for (var r = void 0, s = d.length - 1, o; s >= 0; s--)
    (o = d[s]) && (r = o(t, e, r) || r);
  return r && P(t, e, r), r;
};
const D = `
.rm-lp .rm-lp__cutoff { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: .5rem 1rem; margin-bottom: 1.5rem; padding: .875rem 1.25rem; border-radius: 1rem;
  background: var(--rm-title); color: var(--rm-bg); text-align: center; font-weight: 800; }
.rm-lp .rm-lp__cutoff b { color: var(--rm-accent); font-variant-numeric: tabular-nums; }
.rm-lp .rm-lp__cutoff.is-late { background: var(--rm-card); color: var(--rm-title); }
.rm-lp__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .875rem; margin: 0; padding: 0; list-style: none; }
@container (min-width: 768px) { .rm-lp__grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.25rem; } }
.rm-lp__left { font-size: .8125rem; font-weight: 800; color: #d92d20; }
`;
class l extends h {
  constructor() {
    super(...arguments), this.styleId = "last-pieces", this.products = [], this.loaded = !1, this.now = Date.now();
  }
  styles() {
    return D + g;
  }
  async connectedCallback() {
    super.connectedCallback(), _(), this.timer = window.setInterval(() => this.now = Date.now(), 1e3), this.products = await w(b(this.cfg().products, 12)), this.loaded = !0;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this.timer);
  }
  renderCutoff() {
    const t = this.cfg();
    if (t.show_cutoff === !1) return c;
    const e = x(this.now), a = Math.min(Math.max(Math.round(Number(t.cutoff_day) || 24), 10), 29);
    if (e.phase === "before")
      return i`<p class="rm-lp__cutoff">🚚 ${n({ ar: `آخر موعد لطلبات العيد: ${a} رمضان`, en: `Last day for Eid orders: ${a} Ramadan` })}</p>`;
    if (!$(e)) return c;
    if (e.h.d <= a) {
      const s = k(this.now, a - e.h.d + 1);
      return i`<p class="rm-lp__cutoff" role="timer">🚚 ${n({ ar: `اطلب قبل نهاية ${a} رمضان ليصلك قبل العيد`, en: `Order by the end of ${a} Ramadan to receive it before Eid` })}
        <b>${C(s - this.now, n({ ar: "يوم", en: "d" }))}</b></p>`;
    }
    const r = f(t.late_text) || n({ ar: "الطلبات الجديدة توصل بعد العيد إن شاء الله", en: "New orders arrive after Eid" });
    return i`<p class="rm-lp__cutoff is-late">${r}</p>`;
  }
  render() {
    if (!this.products.length)
      return !this.loaded || u() ? c : this.frame(i`<p class="rm-empty">${n({ ar: "اختر منتجات آخر القطع من إعدادات هذا القسم", en: "Pick the last pieces in this section's settings" })}</p>`);
    const t = this.cfg(), e = f(t.badge) || n({ ar: "آخر القطع", en: "Last pieces" }), a = Math.max(1, Number(t.low_stock) || 5), r = t.ask_gift !== !1;
    return this.frame(i`${this.renderCutoff()}
      <ul class="rm-lp__grid">${this.products.map((s) => {
      const o = v(y(s), a);
      return this.renderCard(s, { tag: e, ask: r, extra: o ? i`<span class="rm-lp__left">${n({ ar: `باقي ${o} فقط`, en: `Only ${o} left` })}</span>` : c });
    })}</ul>`, { extraClass: "rm-lp" });
  }
}
p([
  m()
], l.prototype, "products");
p([
  m()
], l.prototype, "loaded");
p([
  m()
], l.prototype, "now");
typeof l < "u" && l.registerSallaComponent("salla-last-pieces");
export {
  l as default
};
