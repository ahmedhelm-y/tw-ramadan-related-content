import { html, nothing } from "lit";
import { state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { getCollectionItems, resolveText, t } from "../../utils/config";
import { DealSection } from "../../utils/deals";
import { ensureDrawer } from "../../utils/drawer";
import { fetchProduct, isLandingPage, money } from "../../utils/landing";
import { discountPercent } from "../../utils/price";
import { patternCss } from "../../utils/season";

type Item = { product: unknown; title: unknown; image: unknown; items: unknown; badge: unknown };
type Bundle = { product: any; title: string; image: string; items: string[]; badge: string };

const css = `
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

export default class RamadanBundle extends DealSection {
  protected readonly styleId = "ramadan-bundle";
  @state() private bundles: Bundle[] = [];
  @state() private loaded = false;

  protected styles() {
    return css + patternCss;
  }

  async connectedCallback() {
    super.connectedCallback();
    ensureDrawer();
    const items = getCollectionItems<Item>(this.cfg().bundles, "bundles").slice(0, 3);
    const loaded = await Promise.all(items.map(async (b) => {
      const value = Array.isArray(b.product) ? b.product[0] : b.product;
      const id = value && typeof value === "object" ? (value as any).value ?? (value as any).id : value;
      const product = id ? await fetchProduct(String(id)) : null;
      return product
        ? { product, title: resolveText(b.title) || product.name, image: String(b.image || "") || product.images?.[0]?.url || product.image?.url || "",
            items: resolveText(b.items).split(/\n|،\s*(?=\S)/).map((x) => x.trim()).filter(Boolean).slice(0, 10), badge: resolveText(b.badge) }
        : null;
    }));
    this.bundles = loaded.filter(Boolean) as Bundle[];
    this.loaded = true;
  }

  render() {
    if (!this.bundles.length) {
      if (!this.loaded || isLandingPage()) return nothing;
      return this.frame(html`<p class="rm-empty">${t({ ar: "اختر منتج كل باقة واكتب محتوياتها من إعدادات هذا القسم", en: "Pick each bundle's product and list what is inside in this section's settings" })}</p>`);
    }
    const ask = this.cfg().ask_gift !== false;
    return this.frame(html`<ul class="rm-bu__list">${this.bundles.map((b) => {
      const p = b.product;
      const price = Number(p.sale_price || p.price) || 0;
      const regular = Number(p.regular_price) || 0;
      const off = discountPercent(p);
      return html`<li class="rm-bu__card" data-card=${String(p.id)}>
        <div class="rm-bu__media">${b.image ? html`<img src=${b.image} alt="" loading="lazy" />` : nothing}
          ${b.badge ? html`<span class="rm-bu__badge">${b.badge}</span>` : nothing}</div>
        <div class="rm-bu__body rm-pattern">
          <h3 class="rm-bu__title">${b.title}</h3>
          ${b.items.length ? html`<ul class="rm-bu__items">${b.items.map((x) => html`<li>${x}</li>`)}</ul>` : nothing}
          <div class="rm-bu__price">${unsafeHTML(money(price))}${regular > price ? html`<s>${unsafeHTML(money(regular))}</s>` : nothing}
            ${off ? html`<em>${t({ ar: `وفّر ${off}%`, en: `Save ${off}%` })}</em>` : nothing}</div>
          <div class="rm-bu__buy">${this.renderPickers(p)}${this.renderBuy(p, resolveText(this.cfg().buy_text) || t({ ar: "أضف الباقة للسلة", en: "Add the bundle" }))}
            ${ask ? this.askLink(p) : nothing}</div>
        </div>
      </li>`;
    })}</ul>`, { extraClass: "rm-bu" });
  }
}
