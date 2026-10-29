// Product tabs shared by "shop by Ramadan moment" (round photo tabs that follow the time of night) and
// "for the whole family" (pill tabs). Each tab loads its products when first opened.
import { html, nothing } from "lit";
import { state } from "lit/decorators.js";
import { getCollectionItems, resolveText, t, unwrapValue } from "./config";
import { cardCss, DealSection, loadProducts, productIds } from "./deals";
import { ensureDrawer } from "./drawer";
import { isLandingPage } from "./landing";
import { CITIES, dayTimes, savedCity } from "./prayer";
import { inRamadan, season } from "./season";

export type Moment = "" | "suhoor" | "iftar" | "taraweeh" | "eid";
export type Tab = { label: string; image: string; ids: string[]; moment: Moment };

const css = `
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

/** The moment of the night in Saudi time for a city: suhoor before Fajr, iftar for 90 minutes after Maghrib, then Taraweeh. */
export function momentNow(now: number, lat: number, lng: number): Moment {
  const times = dayTimes(now, lat, lng);
  const minutes = Math.floor(((now / 60000 + 180) % 1440 + 1440) % 1440);
  if (minutes < times.fajr) return "suhoor";
  if (minutes >= times.maghrib && minutes < times.maghrib + 90) return "iftar";
  if (minutes >= times.maghrib + 90) return "taraweeh";
  return "";
}

export abstract class TabbedShop extends DealSection {
  protected abstract readonly look: "round" | "pills";
  @state() protected active = -1;
  @state() protected cache: Record<number, any[]> = {};
  private loading = new Set<number>();

  protected styles() {
    return css + cardCss;
  }

  connectedCallback() {
    super.connectedCallback();
    ensureDrawer();
  }

  protected tabs(): Tab[] {
    return getCollectionItems<{ label: unknown; image: unknown; products: unknown; moment: unknown }>(this.cfg().tabs, "tabs")
      .map((x) => ({ label: resolveText(x.label), image: String(x.image || ""), ids: productIds(x.products, 12), moment: (unwrapValue(x.moment) || "") as Moment }))
      .filter((x) => x.label && x.ids.length)
      .slice(0, 6);
  }

  /** The tab that opens first: the one for this moment of the night (or Eid), else the first. */
  protected firstTab(tabs: Tab[]): number {
    if (this.look !== "round") return 0;
    const s = season();
    const city = CITIES[savedCity()] || CITIES[0];
    // The nights of Ramadan pick their moment; Eid picks Eid; the rest of the year opens the first tab
    const now = s.phase === "eid" ? "eid" : inRamadan(s) ? momentNow(Date.now(), city.lat, city.lng) : "";
    const i = now ? tabs.findIndex((x) => x.moment === now) : -1;
    return i >= 0 ? i : 0;
  }

  private async load(i: number, tabs: Tab[]) {
    if (this.cache[i] || this.loading.has(i) || !tabs[i]) return;
    this.loading.add(i);
    const products = await loadProducts(tabs[i].ids);
    this.loading.delete(i);
    this.cache = { ...this.cache, [i]: products };
  }

  render() {
    const tabs = this.tabs();
    if (!tabs.length) {
      if (isLandingPage()) return nothing;
      return this.frame(html`<p class="rm-empty">${t({ ar: "أضف التبويبات ومنتجات كل تبويب من إعدادات هذا القسم", en: "Add the tabs and their products in this section's settings" })}</p>`);
    }
    const now = this.firstTab(tabs);
    const active = this.active >= 0 && this.active < tabs.length ? this.active : now;
    void this.load(active, tabs);
    const products = this.cache[active];
    const ask = this.cfg().ask_gift !== false;
    return this.frame(html`
      <div class="rm-tb__tabs" role="tablist">
        ${tabs.map((x, i) => html`<button type="button" class="rm-tb__tab" role="tab" aria-selected=${i === active ? "true" : "false"} @click=${() => (this.active = i)}>
          ${this.look === "round"
            ? html`<span class="rm-tb__ring">${x.image ? html`<img src=${x.image} alt="" loading="lazy" />` : html`<span aria-hidden="true">🌙</span>`}</span>`
            : nothing}
          <span>${x.label}</span>
          ${this.look === "round" && i === now && x.moment ? html`<span class="rm-tb__now">${t({ ar: "وقته الآن", en: "Right now" })}</span>` : nothing}
        </button>`)}
      </div>
      ${products
        ? products.length
          ? html`<ul class="rm-tb__grid" role="tabpanel">${products.map((p) => this.renderCard(p, { ask }))}</ul>`
          : html`<p class="rm-tb__loading">${t({ ar: "المنتجات غير متوفرة حالياً", en: "These products are not available now" })}</p>`
        : html`<p class="rm-tb__loading" aria-busy="true">…</p>`}`, { extraClass: `rm-tb rm-tb--${this.look}` });
  }
}
