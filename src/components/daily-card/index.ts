import { html, nothing } from "lit";
import { state } from "lit/decorators.js";
import { getCollectionItems, resolveText, t } from "../../utils/config";
import { isLandingPage } from "../../utils/landing";
import { crescent, inRamadan, patternCss, season, star } from "../../utils/season";
import { RmSection } from "../../utils/section";

type DayItem = { day: unknown; dua: unknown; gift: unknown; code: unknown };

const css = `
.rm-dc__card { position: relative; display: grid; gap: 1rem; max-width: 46rem; margin-inline: auto; padding: 2rem 1.5rem; border-radius: 1.75rem; background: var(--rm-card); text-align: center; }
.rm-dc__day { justify-self: center; display: inline-flex; align-items: center; gap: .5rem; padding: .375rem .875rem; border-radius: 999px; background: var(--rm-bg); font-weight: 800; color: var(--rm-title); }
.rm-dc__day svg { width: 1rem; color: var(--rm-accent-ink); }
.rm-dc .rm-dc__dua { margin: 0; font-size: 1.25rem; font-weight: 800; line-height: 2; color: var(--rm-title); }
.rm-dc .rm-dc__q { margin: .5rem 0 0; font-weight: 800; }
.rm-dc__answers { display: flex; justify-content: center; gap: .75rem; }
.rm-dc__answers button { min-height: 2.75rem; min-width: 7rem; padding: 0 1.25rem; border: 1.5px solid var(--rm-accent-ink); border-radius: 999px; background: var(--rm-bg);
  color: var(--rm-title); font: inherit; font-weight: 800; cursor: pointer; }
.rm-dc__answers button:first-child { background: var(--rm-accent); border-color: var(--rm-accent); color: var(--rm-accent-text); }
.rm-dc__gift { display: grid; gap: .5rem; padding: 1rem; border-radius: 1.25rem; background: var(--rm-bg); }
.rm-dc__gift b { font-size: 1.125rem; color: var(--rm-title); }
.rm-dc__gift code { justify-self: center; padding: .5rem .875rem; border: 1.5px dashed var(--rm-accent-ink); border-radius: .625rem; font: inherit; font-weight: 900; letter-spacing: .08em; color: var(--rm-title); }
.rm-dc__gift button { justify-self: center; min-height: 2.5rem; padding: 0 1rem; border: 0; border-radius: .625rem; background: var(--rm-accent); color: var(--rm-accent-text); font: inherit; font-weight: 800; cursor: pointer; }
.rm-dc__star { position: absolute; width: 1.25rem; color: var(--rm-accent); }
.rm-dc__star:nth-of-type(1) { top: 1.25rem; inset-inline-start: 1.5rem; }
.rm-dc__star:nth-of-type(2) { bottom: 1.5rem; inset-inline-end: 2rem; width: .875rem; }
`;

export default class DailyCard extends RmSection {
  protected readonly styleId = "daily-card";
  @state() private answered = "";
  @state() private copied = false;
  private onSeason = () => this.requestUpdate();

  protected styles() {
    return css + patternCss;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("rm:season", this.onSeason);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("rm:season", this.onSeason);
  }

  private key(day: number) {
    return `rm-dc-${day}`;
  }

  private answer(day: number, value: string) {
    this.answered = value;
    try {
      localStorage.setItem(this.key(day), value);
    } catch {
      // the answer lasts for this visit only
    }
  }

  render() {
    const cfg = this.cfg();
    const s = season();
    // Outside Ramadan shoppers don't see it; the editor shows the first day
    if (!inRamadan(s) && isLandingPage()) return nothing;
    const day = inRamadan(s) ? s.h.d : 1;
    const rows = getCollectionItems<DayItem>(cfg.days, "days").map((d) => ({ day: Number(d.day) || 0, dua: resolveText(d.dua), gift: resolveText(d.gift), code: String(d.code || "").trim() }));
    const row = rows.find((r) => r.day === day) || { day, dua: "", gift: "", code: "" };
    const dua = row.dua || resolveText(cfg.default_dua);
    const gift = row.gift || resolveText(cfg.default_gift);
    const code = row.code || String(cfg.default_code || "").trim();
    if (!dua && !gift) {
      if (isLandingPage()) return nothing;
      return this.frame(html`<p class="rm-empty">${t({ ar: "اكتب دعاء وهدية لكل يوم من إعدادات هذا القسم", en: "Write a prayer and a gift for each day in this section's settings" })}</p>`);
    }
    let saved = this.answered;
    if (!saved) {
      try {
        saved = localStorage.getItem(this.key(day)) || "";
      } catch {
        saved = "";
      }
    }
    const ready = cfg.codes_ready === true || !isLandingPage();
    return this.frame(html`<div class="rm-dc__card rm-pattern">
      ${star("rm-dc__star")}${star("rm-dc__star")}
      <span class="rm-dc__day">${crescent()} ${t({ ar: `اليوم ${day} من رمضان`, en: `Day ${day} of Ramadan` })}</span>
      ${dua ? html`<p class="rm-dc__dua">${dua}</p>` : nothing}
      ${gift
        ? saved
          ? html`<div class="rm-dc__gift" aria-live="polite">
              <span>${saved === "yes" ? t({ ar: "تقبّل الله صيامك 🤍", en: "May Allah accept your fast 🤍" }) : t({ ar: "أعانك الله، ورمضان كريم 🤍", en: "May Allah ease it for you 🤍" })}</span>
              <b>${gift}</b>
              ${code && ready
                ? html`<code>${code}</code><button type="button" @click=${async () => {
                    try { await navigator.clipboard.writeText(code); } catch { /* the code stays on screen */ }
                    this.copied = true;
                  }}>${this.copied ? t({ ar: "تم النسخ ✓", en: "Copied ✓" }) : t({ ar: "انسخ الكود", en: "Copy the code" })}</button>`
                : nothing}
            </div>`
          : html`<p class="rm-dc__q">${resolveText(cfg.question) || t({ ar: "صيامك اليوم؟", en: "How is your fast today?" })}</p>
            <div class="rm-dc__answers">
              <button type="button" @click=${() => this.answer(day, "yes")}>${resolveText(cfg.yes_text) || t({ ar: "الحمد لله، صايم", en: "Fasting, alhamdulillah" })}</button>
              <button type="button" @click=${() => this.answer(day, "no")}>${resolveText(cfg.no_text) || t({ ar: "معذور اليوم", en: "Excused today" })}</button>
            </div>`
        : nothing}
    </div>`, { extraClass: "rm-dc" });
  }
}
