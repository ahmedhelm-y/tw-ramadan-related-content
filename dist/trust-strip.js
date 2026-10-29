import { nothing as s, html as e } from "lit";
import { g as o, r as n, i as p, t as l, u as c } from "./styles-Bs7TKm5O.js";
import { p as g } from "./season-DLTLY4O1.js";
import { R as _ } from "./section-CceEqpTO.js";
const u = `
.rm-ts__badges { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 9.5rem), 1fr)); gap: .75rem; }
.rm-ts__badges--pattern { position: relative; padding: 1rem; border-radius: 1.25rem; isolation: isolate; }
.rm-ts__badges--pattern::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: color-mix(in srgb, var(--rm-accent) 10%, var(--rm-bg)); }
.rm-ts__badge { display: flex; align-items: center; gap: .75rem; padding: .875rem 1rem; border-radius: 1rem; background: var(--rm-card); }
.rm-ts__badge i { flex: 0 0 auto; width: 2.5rem; height: 2.5rem; display: grid; place-items: center; border-radius: 999px;
  background: color-mix(in srgb, var(--rm-accent) 14%, var(--rm-bg)); color: var(--rm-accent-ink); font-size: 1.25rem; font-style: normal; }
.rm-ts__badge span { font-weight: 700; font-size: .9375rem; line-height: 1.5; color: var(--rm-title); }
.rm-ts__steps { display: grid; gap: 1rem; margin-top: 2rem; padding: 0; list-style: none; counter-reset: step; }
@container (min-width: 768px) { .rm-ts__steps { grid-template-columns: repeat(var(--rm-ts-cols, 4), minmax(0, 1fr)); gap: 1.25rem; } }
.rm-ts__step { position: relative; display: grid; gap: .5rem; padding: 1.25rem; border-radius: 1.25rem; background: var(--rm-card); counter-increment: step; }
.rm-ts__step::before { content: counter(step); width: 2rem; height: 2rem; display: grid; place-items: center; border-radius: 999px;
  background: var(--rm-accent); color: var(--rm-accent-text); font-weight: 800; }
.rm-ts__step h3 { margin: 0; font-size: 1.0625rem; font-weight: 800; color: var(--rm-title); }
.rm-ts__step p { margin: 0; font-size: .9375rem; line-height: 1.7; }
.rm-ts__step img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: .875rem; }
.rm-section.rm-ts--compact { padding-block: 1.5rem; }
.rm-ts__empty { padding: 2rem; border: 1px dashed color-mix(in srgb, var(--rm-text) 35%, transparent); border-radius: 1rem; text-align: center; }
`;
class d extends _ {
  constructor() {
    super(...arguments), this.styleId = "trust-strip";
  }
  styles() {
    return u + g;
  }
  render() {
    const a = this.cfg(), i = o(a.badges, "badges").map((t) => ({ icon: String(t.icon || "sicon-check"), text: n(t.text) })).filter((t) => t.text), r = o(a.steps, "steps").map((t) => ({ title: n(t.title), text: n(t.text), image: String(t.image || "") })).filter((t) => t.title);
    if (!i.length && !r.length)
      return p() ? s : this.frame(e`<p class="rm-ts__empty">${l({ ar: "أضف المميزات أو خطوات الصناعة من إعدادات هذا القسم", en: "Add badges or steps in this section's settings" })}</p>`);
    const m = c(a.layout) === "compact" && !r.length;
    return this.frame(e`
      ${i.length ? e`<div class=${`rm-ts__badges${a.pattern === !1 ? "" : " rm-ts__badges--pattern"}`}>${i.map((t) => e`<div class="rm-ts__badge"><i class=${t.icon} aria-hidden="true"></i><span>${t.text}</span></div>`)}</div>` : s}
      ${r.length ? e`<ol class="rm-ts__steps" style=${`--rm-ts-cols:${Math.min(r.length, 4)}`}>${r.map((t) => e`<li class="rm-ts__step">
            ${t.image ? e`<img src=${t.image} alt="" loading="lazy" />` : s}
            <h3>${t.title}</h3>${t.text ? e`<p>${t.text}</p>` : s}</li>`)}</ol>` : s}`, { extraClass: `rm-ts${m ? " rm-ts--compact" : ""}`, title: !m });
  }
}
typeof d < "u" && d.registerSallaComponent("salla-trust-strip");
export {
  d as default
};
