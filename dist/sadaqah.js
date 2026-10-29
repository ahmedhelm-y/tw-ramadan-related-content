import { nothing as e, html as r } from "lit";
import { unsafeHTML as g } from "lit/directives/unsafe-html.js";
import { r as o, i as f, t, w as u, n as h } from "./styles-Bs7TKm5O.js";
import { p as v, c as b } from "./season-DLTLY4O1.js";
import { R as q } from "./section-CceEqpTO.js";
const y = `
.rm-sq__card { display: grid; gap: 1.25rem; padding: 1.75rem 1.5rem; border-radius: 1.5rem; background: var(--rm-card); }
@container (min-width: 820px) { .rm-sq__card { grid-template-columns: 1.2fr 1fr; align-items: center; gap: 2.5rem; padding: 2.25rem; } }
.rm-sq__line { display: flex; gap: .875rem; align-items: center; }
.rm-sq__pct { flex: 0 0 auto; width: 5.5rem; height: 5.5rem; display: grid; place-items: center; border-radius: 999px; background: var(--rm-accent); color: var(--rm-accent-text);
  font-size: 1.625rem; font-weight: 900; }
.rm-sq__line p { margin: 0; font-size: 1.125rem; font-weight: 800; line-height: 1.7; color: var(--rm-title); }
.rm-sq__charity { display: flex; align-items: center; gap: .75rem; margin-top: .75rem; }
.rm-sq__charity img { width: 3rem; height: 3rem; border-radius: .75rem; object-fit: contain; background: var(--rm-bg); }
.rm-sq__charity span { font-weight: 700; }
.rm-sq__total { display: grid; gap: .5rem; padding: 1.25rem; border-radius: 1.25rem; background: var(--rm-bg); }
.rm-sq__total span { font-size: .875rem; font-weight: 700; }
.rm-sq__total b { display: flex; align-items: center; gap: .5rem; font-size: 2rem; font-weight: 900; color: var(--rm-title); }
.rm-sq__total b svg { width: 1.5rem; color: var(--rm-accent-ink); }
.rm-sq__track { height: .625rem; border-radius: 999px; background: color-mix(in srgb, var(--rm-text) 15%, transparent); overflow: hidden; }
.rm-sq__track i { display: block; height: 100%; border-radius: 999px; background: var(--rm-accent); }
.rm-sq__meta { display: flex; flex-wrap: wrap; justify-content: space-between; gap: .5rem; font-size: .8125rem; }
.rm-sq__meta a { color: var(--rm-title); font-weight: 700; }
`;
class _ extends q {
  constructor() {
    super(...arguments), this.styleId = "sadaqah";
  }
  styles() {
    return y + v;
  }
  render() {
    const a = this.cfg(), n = Math.max(0, Number(a.percent) || 0), c = o(a.line);
    if (!c && !n)
      return f() ? e : this.frame(r`<p class="rm-empty">${t({ ar: "اكتب نسبة الصدقة والجهة من إعدادات هذا القسم", en: "Write the share and the charity in this section's settings" })}</p>`);
    const s = Math.max(0, Number(a.total) || 0), i = Math.max(0, Number(a.goal) || 0), d = o(a.charity), m = String(a.charity_logo || ""), l = o(a.updated), p = u(a.receipts_url);
    return this.frame(r`<div class="rm-sq__card rm-pattern">
      <div>
        <div class="rm-sq__line">${n ? r`<span class="rm-sq__pct">${n}%</span>` : e}
          <p>${c || t({ ar: "من كل طلب صدقة", en: "of every order goes to charity" })}</p></div>
        ${d || m ? r`<div class="rm-sq__charity">${m ? r`<img src=${m} alt="" loading="lazy" />` : e}<span>${d}</span></div>` : e}
      </div>
      ${s ? r`<div class="rm-sq__total">
            <span>${t({ ar: "ما وصل للجهة حتى الآن", en: "Given so far" })}</span>
            <b>${b()}${g(h(s))}</b>
            ${i ? r`<div class="rm-sq__track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${Math.min(100, Math.round(s / i * 100))}>
                <i style=${`width:${Math.min(100, Math.round(s / i * 100))}%`}></i></div>
              <span>${t({ ar: "الهدف", en: "Goal" })} ${g(h(i))}</span>` : e}
            <div class="rm-sq__meta">${l ? r`<span>${t({ ar: "آخر تحديث:", en: "Updated:" })} ${l}</span>` : e}
              ${p ? r`<a href=${p} target="_blank" rel="noopener">${t({ ar: "عرض الإيصالات", en: "See the receipts" })}</a>` : e}</div>
          </div>` : e}
    </div>`, { extraClass: "rm-sq" });
  }
}
typeof _ < "u" && _.registerSallaComponent("salla-sadaqah");
export {
  _ as default
};
