import { html, nothing, type TemplateResult } from "lit";
import { state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { isAvailable } from "./bundle";
import { buyAction } from "./buy";
import { addAndStay } from "./cart";
import { getLocale, t } from "./config";
import { optionLabel } from "./fit";
import { fetchProduct, getSalla, money } from "./landing";
import { ensureDrawer, openDrawer } from "./drawer";
import { discountPercent } from "./price";
import { RmSection } from "./section";

/** Product ids from the editor's multi-select, a single value, or "1,2,3". */
export function productIds(value: unknown, max = 24): string[] {
  const list = Array.isArray(value) ? value : typeof value === "string" ? value.split(",") : value ? [value] : [];
  return [...new Set(list.map((item: any) => String((item && typeof item === "object" ? item.value ?? item.id : item) ?? "").trim()).filter(Boolean))].slice(0, max);
}

/** Loads products in order, dropping missing and sold out ones. */
export async function loadProducts(ids: string[]): Promise<any[]> {
  return (await Promise.all(ids.map((id) => fetchProduct(id)))).filter((p) => p && isAvailable(p));
}

export const cardCss = `
.rm-card { display: flex; flex-direction: column; min-width: 0; border-radius: 1.25rem; background: var(--rm-card); overflow: hidden; }
.rm-card__img { position: relative; aspect-ratio: 1 / 1; background: var(--rm-bg); }
.rm-card__img img { width: 100%; height: 100%; object-fit: cover; }
.rm-card__off { position: absolute; top: .625rem; inset-inline-start: .625rem; padding: .25rem .625rem; border-radius: .5rem; background: #d92d20; color: #fff;
  font-size: .8125rem; font-weight: 800; }
.rm-card__tag { position: absolute; bottom: .625rem; inset-inline-start: .625rem; padding: .125rem .625rem; border-radius: 999px; background: var(--rm-title);
  color: var(--rm-bg); font-size: .75rem; font-weight: 700; }
.rm-card__body { display: flex; flex-direction: column; gap: .5rem; padding: .875rem; flex: 1 1 auto; }
.rm-card__name { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-weight: 700; font-size: .9375rem; line-height: 1.5; color: var(--rm-title); }
.rm-card__price { display: flex; flex-wrap: wrap; gap: .5rem; align-items: baseline; font-weight: 900; font-size: 1.125rem; color: #d92d20; }
.rm-block.rm-dark .rm-card__price, html.rm-mode-dark .rm-auto .rm-card__price { color: #ff8a80; }
.rm-card__price s { font-weight: 500; font-size: .8125rem; color: var(--rm-text); opacity: .75; }
.rm-card__body select { width: 100%; min-height: 2.75rem; padding: 0 .625rem; border: 1px solid color-mix(in srgb, var(--rm-text) 25%, transparent); border-radius: .625rem;
  background: var(--rm-bg); color: var(--rm-title); font: inherit; font-size: .875rem; }
.rm-card__body select[aria-invalid="true"] { border-color: #d92d20; }
.rm-card__ask { align-self: center; padding: .25rem; color: var(--rm-title); font-size: .875rem; font-weight: 700; text-decoration: underline; text-underline-offset: .25rem; }
.rm-card__body .rm-btn { margin-top: auto; padding-inline: .75rem; font-size: .9375rem; }
`;

/** A section that sells product cards: each card keeps its own option picks and buys on its own. */
export abstract class DealSection extends RmSection {
  @state() protected picks: Record<string, Record<string, number>> = {};
  @state() protected invalid: Record<string, number[]> = {};
  @state() protected pressing = "";

  connectedCallback() {
    super.connectedCallback();
    ensureDrawer();
  }

  protected pick(id: string, optionId: number, value: string) {
    const current = { ...(this.picks[id] || {}) };
    if (value) current[String(optionId)] = Number(value);
    else delete current[String(optionId)];
    this.picks = { ...this.picks, [id]: current };
    if (this.invalid[id]) this.invalid = { ...this.invalid, [id]: this.invalid[id].filter((o) => o !== optionId) };
  }

  /**
   * Adds the card's product to the cart and opens the side cart. Options the section already chose (a warmth
   * level, a bed size) come in preset; the shopper's own picks win. Extras are simple products added after it.
   */
  protected async buyCard(product: any, o: { options?: Record<string, number>; extras?: any[] } = {}) {
    const id = String(product.id);
    const chosen = { ...(o.options || {}), ...(this.picks[id] || {}) };
    // Every piece is checked before anything goes in, so a missed choice never leaves half the set in the cart
    const pieces = [{ product, chosen }, ...(o.extras || []).map((x) => ({ product: x, chosen: this.picks[String(x.id)] || {} }))];
    const invalid: Record<string, number[]> = {};
    for (const piece of pieces) {
      const missing = (piece.product.options || []).filter((opt: any) => opt?.required && (opt.details || []).length && !piece.chosen[String(opt.id)]).map((opt: any) => Number(opt.id));
      if (missing.length) invalid[String(piece.product.id)] = missing;
    }
    if (Object.keys(invalid).length) {
      this.invalid = { ...this.invalid, ...invalid };
      await this.updateComplete;
      this.querySelector<HTMLSelectElement>('select[aria-invalid="true"]')?.focus();
      return;
    }
    if (this.pressing) return;
    // The product goes into the cart and the side cart opens, so the shopper can keep adding
    this.pressing = id;
    this.error = "";
    try {
      for (const piece of pieces) await addAndStay(piece.product, piece.chosen, 1, getLocale());
      openDrawer();
    } catch (error: any) {
      this.error = error?.message || "";
      (getSalla() as any)?.error?.(this.error);
    } finally {
      this.pressing = "";
    }
  }

  /** The required option pickers of a product, each tied to its card for focus on a missed choice. */
  protected renderPickers(p: any, skip: Record<string, number> = {}) {
    const id = String(p.id);
    const invalid = this.invalid[id] || [];
    // An option the section already chose has no picker of its own
    const selects = (p.options || []).filter((opt: any) => opt?.required && (opt.details || []).length && !(String(opt.id) in skip));
    return selects.map((opt: any) => {
      const sid = `rm-${this.styleId}-${id}-${opt.id}`;
      const label = optionLabel(opt, getLocale());
      return html`<label class="rm-visually-hidden" for=${sid}>${label}</label>
        <select id=${sid} aria-invalid=${invalid.includes(Number(opt.id)) ? "true" : "false"} @change=${(e: Event) => this.pick(id, opt.id, (e.target as HTMLSelectElement).value)}>
          <option value="">${t({ ar: `اختر ${label}`, en: `Choose ${label}` })}</option>
          ${(opt.details as any[]).map((v) => html`<option value=${v.id} ?disabled=${v.is_out}>${v.name}</option>`)}
        </select>`;
    });
  }

  protected renderBuy(p: any, text?: string, o: { options?: Record<string, number>; extras?: any[] } = {}) {
    const id = String(p.id);
    return buyAction({ items: [{ id, quantity: 1 }] }) !== "none"
      ? html`<button type="button" class="rm-btn" aria-busy=${this.pressing === id ? "true" : "false"} @click=${() => this.buyCard(p, o)}>${text || this.buyLabel()}</button>`
      : nothing;
  }

  /** "Ask for it as a gift": WhatsApp opens with the product and this page, ready to send to family. */
  protected askLink(p: any) {
    const text = t({ ar: `ودّي بهذي هدية رمضان 🌙\n${p.name}\n${location.href.split("#")[0]}`, en: `I'd love this as a Ramadan gift 🌙\n${p.name}\n${location.href.split("#")[0]}` });
    return html`<a class="rm-card__ask" href=${`https://wa.me/?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener">🎁 ${t({ ar: "اطلبها هدية", en: "Ask for it as a gift" })}</a>`;
  }

  protected renderCard(p: any, o: { tag?: string; buyText?: string; extra?: TemplateResult | typeof nothing; ask?: boolean } = {}) {
    const id = String(p.id);
    const price = Number(p.sale_price || p.price) || 0;
    const regular = Number(p.regular_price) || 0;
    const off = discountPercent(p);
    const image = p.images?.[0]?.url || p.image?.url;
    return html`<li class="rm-card" data-card=${id}>
      <div class="rm-card__img">
        ${image ? html`<img src=${image} alt=${p.image?.alt || ""} loading="lazy" />` : nothing}
        ${off ? html`<span class="rm-card__off">${t({ ar: `خصم ${off}%`, en: `${off}% off` })}</span>` : nothing}
        ${o.tag ? html`<span class="rm-card__tag">${o.tag}</span>` : nothing}
      </div>
      <div class="rm-card__body">
        <span class="rm-card__name">${p.name}</span>
        <span class="rm-card__price">${unsafeHTML(money(price))}${regular > price ? html`<s>${unsafeHTML(money(regular))}</s>` : nothing}</span>
        ${o.extra ?? nothing}
        ${this.renderPickers(p)}
        ${this.renderBuy(p, o.buyText)}
        ${o.ask ? this.askLink(p) : nothing}
      </div>
    </li>`;
  }
}
