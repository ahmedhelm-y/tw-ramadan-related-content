import { html, nothing } from "lit";
import { getCollectionItems, resolveText, t } from "../../utils/config";
import { isLandingPage } from "../../utils/landing";
import { RmSection } from "../../utils/section";

const css = `
.rm-fq__list { display: grid; gap: .5rem; max-width: 52rem; margin-inline: auto; }
.rm-fq__list details { border-radius: 1rem; background: var(--rm-card); }
.rm-fq__list summary { display: flex; align-items: center; justify-content: space-between; gap: 1rem; min-height: 3.25rem; padding: .75rem 1.125rem;
  font-weight: 800; color: var(--rm-title); cursor: pointer; list-style: none; }
.rm-fq__list summary::-webkit-details-marker { display: none; }
.rm-fq__list summary::after { content: "+"; font-size: 1.375rem; line-height: 1; color: var(--rm-accent-ink); }
.rm-fq__list details[open] summary::after { content: "−"; }
.rm-fq__list summary:focus-visible { outline: 2px solid var(--rm-accent-ink); outline-offset: -2px; border-radius: 1rem; }
.rm-fq__list p { margin: 0; padding: 0 1.125rem 1rem; line-height: 1.8; white-space: pre-line; }
`;

export default class Faq extends RmSection {
  protected readonly styleId = "faq";

  protected styles() {
    return css;
  }

  render() {
    const faqs = getCollectionItems<{ q: unknown; a: unknown }>(this.cfg().faqs, "faqs").map((f) => ({ q: resolveText(f.q), a: resolveText(f.a) })).filter((f) => f.q && f.a);
    if (!faqs.length) {
      if (isLandingPage()) return nothing;
      return this.frame(html`<p class="rm-empty">${t({ ar: "أضف الأسئلة من إعدادات هذا القسم", en: "Add the questions in this section's settings" })}</p>`);
    }
    return this.frame(html`<div class="rm-fq__list">${faqs.map((f, i) => html`<details ?open=${i === 0}><summary>${f.q}</summary><p>${f.a}</p></details>`)}</div>`, { extraClass: "rm-fq" });
  }
}
