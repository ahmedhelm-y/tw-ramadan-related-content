import { LitElement as u, nothing as m, html as r } from "lit";
import { property as b, state as x } from "lit/decorators.js";
import { e as k, a as w, b as z, r as d, g as C, w as j, s as L, c as P, t as _, d as R } from "./styles-Bs7TKm5O.js";
var F = Object.defineProperty, $ = (c, t, l, n) => {
  for (var e = void 0, o = c.length - 1, s; o >= 0; o--)
    (s = c[o]) && (e = s(t, l, e) || e);
  return e && F(t, l, e), e;
};
const h = (c) => `
${c} .rm-ft__logo--light.has-dark { display: none; }
${c} .rm-ft__logo--dark { display: block; }
${c} .rm-ft__logo--light:not(.has-dark) { filter: brightness(0) invert(1); }`, O = `
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
${[".rm-ft.rm-dark", "html.rm-mode-dark .rm-ft.rm-auto"].map(h).join("")}
@media (prefers-color-scheme: dark) { ${h("html:not(.rm-mode-light) .rm-ft.rm-auto")} }
`;
class f extends u {
  constructor() {
    super(...arguments), this.store = { logo: "", name: "", payments: [] };
  }
  createRenderRoot() {
    return this;
  }
  async connectedCallback() {
    var n, e, o, s;
    super.connectedCallback(), this.classList.add("rm-host"), k(), w("rm-page-footer", O);
    const t = R();
    await ((n = t == null ? void 0 : t.onReady) == null ? void 0 : n.call(t));
    const l = ((e = t == null ? void 0 : t.config) == null ? void 0 : e.get("store.settings.payments")) || [];
    this.store = {
      logo: ((o = t == null ? void 0 : t.config) == null ? void 0 : o.get("store.logo")) || "",
      name: ((s = t == null ? void 0 : t.config) == null ? void 0 : s.get("store.name")) || "",
      payments: l.map((i) => {
        var p, g;
        return { src: ((g = (p = t == null ? void 0 : t.url) == null ? void 0 : p.cdn) == null ? void 0 : g.call(p, `images/payment/${i}_mini.png`, 116, 116)) || "", name: i };
      }).filter((i) => i.src)
    };
  }
  render() {
    const t = z(this.config), l = t.logo || this.store.logo, n = this.store.name, e = d(t.about), o = String(t.phone || "").trim(), s = String(t.whatsapp || "").replace(/[^\d]/g, ""), i = String(t.email || "").trim(), p = C(t.social, "social").map((a) => ({ icon: String(a.icon || "sicon-link"), url: j(a.url) })).filter((a) => a.url), g = (/* @__PURE__ */ new Date()).getFullYear(), y = (d(t.copyright) || "© {year} {store}").replace("{year}", String(g)).replace("{store}", n), v = o || s || i;
    return r`<footer class=${`rm-block rm-ft ${L(t)}`} style=${P(t)}>
      <div class="rm-container">
        <div class="rm-ft__top">
          <div>
            ${l ? r`<img class="rm-ft__logo rm-ft__logo--light${t.logo_dark ? " has-dark" : ""}" src=${l} alt=${n} loading="lazy" />
                  ${t.logo_dark ? r`<img class="rm-ft__logo rm-ft__logo--dark" src=${t.logo_dark} alt=${n} loading="lazy" />` : m}` : r`<span class="rm-ft__name">${n}</span>`}
            ${e ? r`<p class="rm-ft__about">${e}</p>` : m}
            ${p.length ? r`<div class="rm-ft__social">${p.map((a) => r`<a href=${a.url} target="_blank" rel="noopener" aria-label=${a.icon.replace(/^sicon-/, "")}><i class=${a.icon}></i></a>`)}</div>` : m}
          </div>
          ${v ? r`<div class="rm-ft__contact" aria-label=${_({ ar: "تواصل معنا", en: "Contact us" })}>
                ${o ? r`<a href=${`tel:${o.replace(/[^\d+]/g, "")}`}><i class="sicon-phone"></i><span dir="ltr">${o}</span></a>` : m}
                ${s ? r`<a href=${`https://wa.me/${s}`} target="_blank" rel="noopener"><i class="sicon-whatsapp"></i>${_({ ar: "واتساب", en: "WhatsApp" })}</a>` : m}
                ${i ? r`<a href=${`mailto:${i}`}><i class="sicon-mail"></i><span dir="ltr">${i}</span></a>` : m}
              </div>` : m}
        </div>
        <div class="rm-ft__bottom">
          ${t.show_payments !== !1 && this.store.payments.length ? r`<div class="rm-ft__payments">${this.store.payments.map((a) => r`<img src=${a.src} alt=${a.name} loading="lazy" />`)}</div>` : m}
          <p class="rm-ft__copy">${y}</p>
        </div>
      </div>
    </footer>`;
  }
}
$([
  b({ type: Object })
], f.prototype, "config");
$([
  x()
], f.prototype, "store");
typeof f < "u" && f.registerSallaComponent("salla-page-footer");
export {
  f as default
};
