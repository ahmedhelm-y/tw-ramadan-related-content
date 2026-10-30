import { nothing as l, html as c } from "lit";
import { state as b } from "lit/decorators.js";
import { i as h, g as $, r as s, t } from "./styles-Bs7TKm5O.js";
import { p as k, s as x, i as _, b as y, c as C } from "./season-DLTLY4O1.js";
import { R as S } from "./section-DUtzCvhS.js";
var j = Object.defineProperty, v = (f, r, e, a) => {
  for (var n = void 0, i = f.length - 1, o; i >= 0; i--)
    (o = f[i]) && (n = o(r, e, n) || n);
  return n && j(r, e, n), n;
};
const q = `
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
class p extends S {
  constructor() {
    super(...arguments), this.styleId = "daily-card", this.answered = "", this.copied = !1, this.onSeason = () => this.requestUpdate();
  }
  styles() {
    return q + k;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("rm:season", this.onSeason);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("rm:season", this.onSeason);
  }
  key(r) {
    return `rm-dc-${r}`;
  }
  answer(r, e) {
    this.answered = e;
    try {
      localStorage.setItem(this.key(r), e);
    } catch {
    }
  }
  render() {
    const r = this.cfg(), e = x();
    if (!_(e) && h()) return l;
    const a = _(e) ? e.h.d : 1, i = $(r.days, "days").map((d) => ({ day: Number(d.day) || 0, dua: s(d.dua), gift: s(d.gift), code: String(d.code || "").trim() })).find((d) => d.day === a) || { dua: "", gift: "", code: "" }, o = i.dua || s(r.default_dua), u = i.gift || s(r.default_gift), g = i.code || String(r.default_code || "").trim();
    if (!o && !u)
      return h() ? l : this.frame(c`<p class="rm-empty">${t({ ar: "اكتب دعاء وهدية لكل يوم من إعدادات هذا القسم", en: "Write a prayer and a gift for each day in this section's settings" })}</p>`);
    let m = this.answered;
    if (!m)
      try {
        m = localStorage.getItem(this.key(a)) || "";
      } catch {
        m = "";
      }
    const w = r.codes_ready === !0 || !h();
    return this.frame(c`<div class="rm-dc__card rm-pattern">
      ${y("rm-dc__star")}${y("rm-dc__star")}
      <span class="rm-dc__day">${C()} ${t({ ar: `اليوم ${a} من رمضان`, en: `Day ${a} of Ramadan` })}</span>
      ${o ? c`<p class="rm-dc__dua">${o}</p>` : l}
      ${u ? m ? c`<div class="rm-dc__gift" aria-live="polite">
              <span>${m === "yes" ? t({ ar: "تقبّل الله صيامك 🤍", en: "May Allah accept your fast 🤍" }) : t({ ar: "أعانك الله، ورمضان كريم 🤍", en: "May Allah ease it for you 🤍" })}</span>
              <b>${u}</b>
              ${g && w ? c`<code>${g}</code><button type="button" @click=${async () => {
      try {
        await navigator.clipboard.writeText(g);
      } catch {
      }
      this.copied = !0;
    }}>${this.copied ? t({ ar: "تم النسخ ✓", en: "Copied ✓" }) : t({ ar: "انسخ الكود", en: "Copy the code" })}</button>` : l}
            </div>` : c`<p class="rm-dc__q">${s(r.question) || t({ ar: "صيامك اليوم؟", en: "How is your fast today?" })}</p>
            <div class="rm-dc__answers">
              <button type="button" @click=${() => this.answer(a, "yes")}>${s(r.yes_text) || t({ ar: "الحمد لله، صايم", en: "Fasting, alhamdulillah" })}</button>
              <button type="button" @click=${() => this.answer(a, "no")}>${s(r.no_text) || t({ ar: "معذور اليوم", en: "Excused today" })}</button>
            </div>` : l}
    </div>`, { extraClass: "rm-dc" });
  }
}
v([
  b()
], p.prototype, "answered");
v([
  b()
], p.prototype, "copied");
typeof p < "u" && p.registerSallaComponent("salla-daily-card");
export {
  p as default
};
