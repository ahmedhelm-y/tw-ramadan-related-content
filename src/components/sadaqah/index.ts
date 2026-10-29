import { html, nothing } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { resolveText, t, webUrl } from "../../utils/config";
import { isLandingPage, money } from "../../utils/landing";
import { crescent, patternCss } from "../../utils/season";
import { RmSection } from "../../utils/section";

const css = `
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

export default class Sadaqah extends RmSection {
  protected readonly styleId = "sadaqah";

  protected styles() {
    return css + patternCss;
  }

  render() {
    const cfg = this.cfg();
    const percent = Math.max(0, Number(cfg.percent) || 0);
    const line = resolveText(cfg.line);
    if (!line && !percent) {
      if (isLandingPage()) return nothing;
      return this.frame(html`<p class="rm-empty">${t({ ar: "اكتب نسبة الصدقة والجهة من إعدادات هذا القسم", en: "Write the share and the charity in this section's settings" })}</p>`);
    }
    // Every number here is the merchant's own: the page never counts or estimates donations
    const total = Math.max(0, Number(cfg.total) || 0);
    const goal = Math.max(0, Number(cfg.goal) || 0);
    const charity = resolveText(cfg.charity);
    const logo = String(cfg.charity_logo || "");
    const updated = resolveText(cfg.updated);
    const receipts = webUrl(cfg.receipts_url);
    return this.frame(html`<div class="rm-sq__card rm-pattern">
      <div>
        <div class="rm-sq__line">${percent ? html`<span class="rm-sq__pct">${percent}%</span>` : nothing}
          <p>${line || t({ ar: `من كل طلب صدقة`, en: `of every order goes to charity` })}</p></div>
        ${charity || logo ? html`<div class="rm-sq__charity">${logo ? html`<img src=${logo} alt="" loading="lazy" />` : nothing}<span>${charity}</span></div>` : nothing}
      </div>
      ${total
        ? html`<div class="rm-sq__total">
            <span>${t({ ar: "ما وصل للجهة حتى الآن", en: "Given so far" })}</span>
            <b>${crescent()}${unsafeHTML(money(total))}</b>
            ${goal ? html`<div class="rm-sq__track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${Math.min(100, Math.round((total / goal) * 100))}>
                <i style=${`width:${Math.min(100, Math.round((total / goal) * 100))}%`}></i></div>
              <span>${t({ ar: "الهدف", en: "Goal" })} ${unsafeHTML(money(goal))}</span>` : nothing}
            <div class="rm-sq__meta">${updated ? html`<span>${t({ ar: "آخر تحديث:", en: "Updated:" })} ${updated}</span>` : nothing}
              ${receipts ? html`<a href=${receipts} target="_blank" rel="noopener">${t({ ar: "عرض الإيصالات", en: "See the receipts" })}</a>` : nothing}</div>
          </div>`
        : nothing}
    </div>`, { extraClass: "rm-sq" });
  }
}
