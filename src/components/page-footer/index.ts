import { html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { getCollectionItems, getConfig, resolveText, t, webUrl } from "../../utils/config";
import { schemeClass, sectionStyle } from "../../utils/colors";
import { getSalla } from "../../utils/landing";
import { ensureBase, injectStyles } from "../../utils/styles";

const darkLogo = (scope: string) => `
${scope} .rm-ft__logo--light.has-dark { display: none; }
${scope} .rm-ft__logo--dark { display: block; }
${scope} .rm-ft__logo--light:not(.has-dark) { filter: brightness(0) invert(1); }`;

const css = `
.rm-ft { padding-block: 2.5rem 1.25rem; border-top: 1px solid color-mix(in srgb, var(--rm-text) 12%, transparent); }
.rm-ft__top { display: grid; gap: 1.75rem; }
@container (min-width: 768px) { .rm-ft__top { grid-template-columns: 2fr 1fr; align-items: start; } }
.rm-ft__logo { display: block; height: 48px; width: auto; max-width: 60%; object-fit: contain; }
.rm-ft .rm-ft__logo--dark { display: none; }
.rm-ft__name { font-size: 1.25rem; font-weight: 800; color: var(--rm-title); }
.rm-ft__about { margin-top: .75rem; max-width: 36rem; font-size: .9375rem; line-height: 1.8; color: var(--rm-text); }
.rm-ft__contact { display: grid; gap: .25rem; }
.rm-ft__contact a { display: inline-flex; align-items: center; gap: .5rem; min-height: 2.75rem; color: var(--rm-text); text-decoration: none; font-weight: 600; }
.rm-ft__contact a:hover { color: var(--rm-accent-ink); }
.rm-ft__contact i { font-size: 1.125rem; color: var(--rm-accent-ink); }
.rm-ft__social { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: .75rem; }
.rm-ft__social a { width: 2.75rem; height: 2.75rem; display: grid; place-items: center; border-radius: 999px; background: var(--rm-card);
  color: var(--rm-title); font-size: 1.125rem; text-decoration: none; }
.rm-ft__social a:hover { background: var(--rm-accent); color: var(--rm-accent-text); }
.rm-ft a:focus-visible { outline: 2px solid var(--rm-accent-ink); outline-offset: 2px; }
.rm-ft__bottom { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-top: 2rem; padding-top: 1.25rem;
  border-top: 1px solid color-mix(in srgb, var(--rm-text) 10%, transparent); }
.rm-ft__payments { display: flex; flex-wrap: wrap; gap: .5rem; }
.rm-ft__payments img { width: 3rem; height: 2rem; object-fit: contain; padding: .25rem; border-radius: .375rem; background: #fff; }
.rm-ft__copy { font-size: .8125rem; color: var(--rm-text); }
${[".rm-ft.rm-dark", "html.rm-mode-dark .rm-ft.rm-auto"].map(darkLogo).join("")}
@media (prefers-color-scheme: dark) { ${darkLogo("html:not(.rm-mode-light) .rm-ft.rm-auto")} }
`;

type Social = { icon: string; url: string };

export default class PageFooter extends LitElement {
  @property({ type: Object }) config?: Record<string, any>;
  @state() private store = { logo: "", name: "", payments: [] as { src: string; name: string }[] };

  protected createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.classList.add("rm-host");
    ensureBase();
    injectStyles("rm-page-footer", css);
    const Salla = getSalla() as any;
    await Salla?.onReady?.();
    const slugs: string[] = Salla?.config?.get("store.settings.payments") || [];
    this.store = {
      logo: Salla?.config?.get("store.logo") || "",
      name: Salla?.config?.get("store.name") || "",
      payments: slugs.map((slug) => ({ src: Salla?.url?.cdn?.(`images/payment/${slug}_mini.png`, 116, 116) || "", name: slug })).filter((p) => p.src),
    };
  }

  render() {
    const cfg = getConfig(this.config);
    const logo = cfg.logo || this.store.logo;
    const name = this.store.name;
    const about = resolveText(cfg.about);
    const phone = String(cfg.phone || "").trim();
    const whatsapp = String(cfg.whatsapp || "").replace(/[^\d]/g, "");
    const email = String(cfg.email || "").trim();
    const social = getCollectionItems<Social>(cfg.social, "social")
      .map((item) => ({ icon: String(item.icon || "sicon-link"), url: webUrl(item.url) }))
      .filter((item) => item.url);
    const year = new Date().getFullYear();
    const copyright = (resolveText(cfg.copyright) || "© {year} {store}").replace("{year}", String(year)).replace("{store}", name);
    const contact = phone || whatsapp || email;

    return html`<footer class=${`rm-block rm-ft ${schemeClass(cfg)}`} style=${sectionStyle(cfg)}>
      <div class="rm-container">
        <div class="rm-ft__top">
          <div>
            ${logo
              ? html`<img class="rm-ft__logo rm-ft__logo--light${cfg.logo_dark ? " has-dark" : ""}" src=${logo} alt=${name} loading="lazy" />
                  ${cfg.logo_dark ? html`<img class="rm-ft__logo rm-ft__logo--dark" src=${cfg.logo_dark} alt=${name} loading="lazy" />` : nothing}`
              : html`<span class="rm-ft__name">${name}</span>`}
            ${about ? html`<p class="rm-ft__about">${about}</p>` : nothing}
            ${social.length
              ? html`<div class="rm-ft__social">${social.map((s) => html`<a href=${s.url} target="_blank" rel="noopener" aria-label=${s.icon.replace(/^sicon-/, "")}><i class=${s.icon}></i></a>`)}</div>`
              : nothing}
          </div>
          ${contact
            ? html`<div class="rm-ft__contact" aria-label=${t({ ar: "تواصل معنا", en: "Contact us" })}>
                ${phone ? html`<a href=${`tel:${phone.replace(/[^\d+]/g, "")}`}><i class="sicon-phone"></i><span dir="ltr">${phone}</span></a>` : nothing}
                ${whatsapp ? html`<a href=${`https://wa.me/${whatsapp}`} target="_blank" rel="noopener"><i class="sicon-whatsapp"></i>${t({ ar: "واتساب", en: "WhatsApp" })}</a>` : nothing}
                ${email ? html`<a href=${`mailto:${email}`}><i class="sicon-mail"></i><span dir="ltr">${email}</span></a>` : nothing}
              </div>`
            : nothing}
        </div>
        <div class="rm-ft__bottom">
          ${cfg.show_payments !== false && this.store.payments.length
            ? html`<div class="rm-ft__payments">${this.store.payments.map((p) => html`<img src=${p.src} alt=${p.name} loading="lazy" />`)}</div>`
            : nothing}
          <p class="rm-ft__copy">${copyright}</p>
        </div>
      </div>
    </footer>`;
  }
}
