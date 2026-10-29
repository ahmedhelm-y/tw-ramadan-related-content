import { html, nothing } from "lit";
import { state } from "lit/decorators.js";
import { resolveText, t } from "../../utils/config";
import { cardCss, DealSection, loadProducts, productIds } from "../../utils/deals";
import { ensureDrawer } from "../../utils/drawer";
import { lowStock, remaining } from "../../utils/fit";
import { saudiMidnight } from "../../utils/hijri";
import { isLandingPage } from "../../utils/landing";
import { hms } from "../../utils/prayer";
import { inRamadan, season } from "../../utils/season";

const css = `
.rm-lp .rm-lp__cutoff { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: .5rem 1rem; margin-bottom: 1.5rem; padding: .875rem 1.25rem; border-radius: 1rem;
  background: var(--rm-title); color: var(--rm-bg); text-align: center; font-weight: 800; }
.rm-lp .rm-lp__cutoff b { color: var(--rm-accent); font-variant-numeric: tabular-nums; }
.rm-lp .rm-lp__cutoff.is-late { background: var(--rm-card); color: var(--rm-title); }
.rm-lp__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .875rem; margin: 0; padding: 0; list-style: none; }
@container (min-width: 768px) { .rm-lp__grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.25rem; } }
.rm-lp__left { font-size: .8125rem; font-weight: 800; color: #d92d20; }
`;

export default class LastPieces extends DealSection {
  protected readonly styleId = "last-pieces";
  @state() private products: any[] = [];
  @state() private loaded = false;
  @state() private now = Date.now();
  private timer?: number;

  protected styles() {
    return css + cardCss;
  }

  async connectedCallback() {
    super.connectedCallback();
    ensureDrawer();
    this.timer = window.setInterval(() => (this.now = Date.now()), 1000);
    this.products = await loadProducts(productIds(this.cfg().products, 12));
    this.loaded = true;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
  }

  private renderCutoff() {
    const cfg = this.cfg();
    if (cfg.show_cutoff === false) return nothing;
    const s = season(this.now);
    const cutoff = Math.min(Math.max(Math.round(Number(cfg.cutoff_day) || 24), 10), 29);
    if (s.phase === "before") {
      return html`<p class="rm-lp__cutoff">🚚 ${t({ ar: `آخر موعد لطلبات العيد: ${cutoff} رمضان`, en: `Last day for Eid orders: ${cutoff} Ramadan` })}</p>`;
    }
    if (!inRamadan(s)) return nothing;
    if (s.h.d <= cutoff) {
      const until = saudiMidnight(this.now, cutoff - s.h.d + 1);
      return html`<p class="rm-lp__cutoff" role="timer">🚚 ${t({ ar: `اطلب قبل نهاية ${cutoff} رمضان ليصلك قبل العيد`, en: `Order by the end of ${cutoff} Ramadan to receive it before Eid` })}
        <b>${hms(until - this.now, t({ ar: "يوم", en: "d" }))}</b></p>`;
    }
    const late = resolveText(cfg.late_text) || t({ ar: "الطلبات الجديدة توصل بعد العيد إن شاء الله", en: "New orders arrive after Eid" });
    return html`<p class="rm-lp__cutoff is-late">${late}</p>`;
  }

  render() {
    if (!this.products.length) {
      if (!this.loaded || isLandingPage()) return nothing;
      return this.frame(html`<p class="rm-empty">${t({ ar: "اختر منتجات آخر القطع من إعدادات هذا القسم", en: "Pick the last pieces in this section's settings" })}</p>`);
    }
    const cfg = this.cfg();
    const tag = resolveText(cfg.badge) || t({ ar: "آخر القطع", en: "Last pieces" });
    const threshold = Math.max(1, Number(cfg.low_stock) || 5);
    const ask = cfg.ask_gift !== false;
    return this.frame(html`${this.renderCutoff()}
      <ul class="rm-lp__grid">${this.products.map((p) => {
        // The count shows only when the store shows its real stock
        const left = lowStock(remaining(p), threshold);
        return this.renderCard(p, { tag, ask, extra: left ? html`<span class="rm-lp__left">${t({ ar: `باقي ${left} فقط`, en: `Only ${left} left` })}</span>` : nothing });
      })}</ul>`, { extraClass: "rm-lp" });
  }
}
