import { nothing as m, html as r } from "lit";
import { g as n, r as s, i as l, t as o } from "./styles-Bs7TKm5O.js";
import { R as f } from "./section-CceEqpTO.js";
const d = `
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
class i extends f {
  constructor() {
    super(...arguments), this.styleId = "faq";
  }
  styles() {
    return d;
  }
  render() {
    const t = n(this.cfg().faqs, "faqs").map((e) => ({ q: s(e.q), a: s(e.a) })).filter((e) => e.q && e.a);
    return t.length ? this.frame(r`<div class="rm-fq__list">${t.map((e, a) => r`<details ?open=${a === 0}><summary>${e.q}</summary><p>${e.a}</p></details>`)}</div>`, { extraClass: "rm-fq" }) : l() ? m : this.frame(r`<p class="rm-empty">${o({ ar: "أضف الأسئلة من إعدادات هذا القسم", en: "Add the questions in this section's settings" })}</p>`);
  }
}
typeof i < "u" && i.registerSallaComponent("salla-faq");
export {
  i as default
};
