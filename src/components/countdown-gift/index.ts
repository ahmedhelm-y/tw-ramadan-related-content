import { html, nothing } from "lit";
import { state } from "lit/decorators.js";
import { getCollectionItems, resolveText, t, unwrapValue } from "../../utils/config";
import { saudiMidnight } from "../../utils/hijri";
import { isLandingPage } from "../../utils/landing";
import { afterIftar, CITIES, hms, nextEvent, savedCity } from "../../utils/prayer";
import { crescent, inRamadan, patternCss, season } from "../../utils/season";
import { RmSection } from "../../utils/section";

const css = `
.rm-cg__box { display: grid; gap: 1rem; align-items: center; padding: 1.25rem 1.5rem; border-radius: 1.5rem; background: var(--rm-title); color: var(--rm-bg); }
@container (min-width: 820px) { .rm-cg__box { grid-template-columns: 1fr auto auto; gap: 1.5rem; } }
.rm-cg__lead { display: flex; align-items: center; gap: .75rem; font-size: 1.125rem; font-weight: 800; line-height: 1.6; }
.rm-cg__lead svg { width: 2rem; flex: 0 0 auto; color: var(--rm-accent); }
.rm-cg__clock { display: flex; gap: .375rem; direction: ltr; justify-content: center; }
.rm-cg__unit { display: grid; justify-items: center; min-width: 3.25rem; padding: .375rem .5rem; border-radius: .75rem; background: color-mix(in srgb, var(--rm-bg) 14%, transparent); }
.rm-cg__unit b { font-size: 1.5rem; font-weight: 900; font-variant-numeric: tabular-nums; color: var(--rm-accent); }
.rm-cg__unit span { font-size: .6875rem; opacity: .85; }
.rm-cg__code { display: flex; align-items: center; gap: .5rem; justify-content: center; }
.rm-cg__code code { padding: .5rem .875rem; border: 1.5px dashed var(--rm-accent); border-radius: .625rem; font: inherit; font-weight: 900; letter-spacing: .08em; }
.rm-cg__code button, .rm-cg__copy { min-height: 2.75rem; padding: 0 1rem; border: 0; border-radius: .625rem; background: var(--rm-accent); color: var(--rm-accent-text); font: inherit; font-weight: 800; cursor: pointer; }
.rm-cg__wait { font-size: .875rem; font-weight: 700; text-align: center; }
.rm-cg__float { background: transparent; position: fixed; z-index: 55; inset-inline-start: 1rem; bottom: calc(5rem + var(--rm-sb-h, 0px)); max-width: min(22rem, calc(100vw - 2rem)); }
.rm-cg__float .rm-cg__box { grid-template-columns: 1fr; padding: 1rem; box-shadow: 0 18px 40px -16px rgb(0 0 0 / 55%); }
.rm-cg__float .rm-cg__lead { font-size: .9375rem; }
.rm-cg__x { position: absolute; top: -.75rem; inset-inline-end: -.5rem; width: 2.25rem; height: 2.25rem; border: 0; border-radius: 999px; background: var(--rm-bg);
  color: var(--rm-title); font-size: 1.25rem; cursor: pointer; box-shadow: 0 4px 12px rgb(0 0 0 / 25%); }
.rm-cg__pill { width: auto; position: fixed; z-index: 55; inset-inline-start: 1rem; bottom: calc(5rem + var(--rm-sb-h, 0px)); display: inline-flex; align-items: center; gap: .5rem;
  min-height: 3rem; padding: 0 1rem; border: 0; border-radius: 999px; background: var(--rm-title); color: var(--rm-bg); font: inherit; font-weight: 800; cursor: pointer;
  box-shadow: 0 12px 30px -10px rgb(0 0 0 / 45%); }
.rm-cg__pill svg { width: 1.25rem; color: var(--rm-accent); }
.rm-cg__dialog { width: min(26rem, calc(100vw - 2rem)); padding: 0; border: 0; border-radius: 1.5rem; background: transparent; overflow: visible; }
.rm-cg__dialog::backdrop { background: rgb(0 0 0 / 55%); }
.rm-cg__dialog .rm-cg__box { grid-template-columns: 1fr; text-align: center; padding: 2rem 1.5rem 1.5rem; }
.rm-cg__dialog .rm-cg__lead { flex-direction: column; }
.rm-cg__dialog .rm-cg__lead svg { width: 3rem; }
`;

type DayItem = { day: unknown; text: unknown; code: unknown };

function units(ms: number): { d: number; h: number; m: number; s: number } {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

export default class CountdownGift extends RmSection {
  protected readonly styleId = "countdown-gift";
  @state() private now = Date.now();
  @state() private copied = false;
  @state() private closed_ = false;
  @state() private open = false;
  private timer?: number;
  private popupTimer?: number;

  protected styles() {
    return css + patternCss;
  }

  connectedCallback() {
    super.connectedCallback();
    this.timer = window.setInterval(() => (this.now = Date.now()), 1000);
    window.addEventListener("rm:season", this.refresh);
    window.addEventListener("rm:city", this.refresh);
    if (this.mode() === "popup") {
      let seen = false;
      try {
        seen = sessionStorage.getItem("rm-cg-seen") === "1";
      } catch {
        // storage off: show it once on this page view
      }
      // On a real page the gift opens once per visit; in the editor it opens so the merchant can see it
      if (!seen || !isLandingPage()) this.popupTimer = window.setTimeout(() => this.showPopup(), isLandingPage() ? 4000 : 600);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
    window.clearTimeout(this.popupTimer);
    window.removeEventListener("rm:season", this.refresh);
    window.removeEventListener("rm:city", this.refresh);
  }

  private refresh = () => this.requestUpdate();

  private mode(): "bar" | "floating" | "popup" {
    const m = unwrapValue(this.cfg().mode);
    return m === "floating" || m === "popup" ? m : "bar";
  }

  private async showPopup() {
    this.open = true;
    try {
      sessionStorage.setItem("rm-cg-seen", "1");
    } catch {
      // ignore
    }
    await this.updateComplete;
    const dialog = this.querySelector<HTMLDialogElement>(".rm-cg__dialog");
    if (dialog && !dialog.open) dialog.showModal?.();
  }

  private closePopup() {
    this.querySelector<HTMLDialogElement>(".rm-cg__dialog")?.close?.();
    this.open = false;
  }

  private async copy(code: string) {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // the code stays on screen to copy by hand
    }
    this.copied = true;
    window.setTimeout(() => (this.copied = false), 2000);
  }

  /** What the gift says now, its code, and when its countdown ends. */
  private offer(): { text: string; code: string; until: number; label: string } | null {
    const cfg = this.cfg();
    const s = season(this.now);
    if (s.phase === "before") {
      const until = s.toRamadan ? saudiMidnight(this.now, s.toRamadan) : 0;
      return { text: resolveText(cfg.before_text), code: String(cfg.before_code || "").trim(), until, label: t({ ar: "باقي على رمضان", en: "Until Ramadan" }) };
    }
    if (inRamadan(s)) {
      const days = getCollectionItems<DayItem>(cfg.days, "days").map((d) => ({ day: Number(d.day) || 0, text: resolveText(d.text), code: String(d.code || "").trim() }));
      const today = days.find((d) => d.day === s.h.d && d.text);
      return {
        text: today?.text || resolveText(cfg.ramadan_text),
        code: today?.code || String(cfg.ramadan_code || "").trim(),
        until: saudiMidnight(this.now, 1),
        label: t({ ar: "عرض اليوم ينتهي بعد", en: "Today's offer ends in" }),
      };
    }
    if (s.phase === "eid") {
      return { text: resolveText(cfg.eid_text), code: String(cfg.eid_code || "").trim(), until: saudiMidnight(this.now, 4 - s.h.d), label: t({ ar: "عرض العيد ينتهي بعد", en: "The Eid offer ends in" }) };
    }
    return null;
  }

  private renderBox() {
    const cfg = this.cfg();
    const o = this.offer();
    if (!o || !o.text) return null;
    const left = units(o.until - this.now);
    const ready = cfg.codes_ready === true || !isLandingPage();
    const city = CITIES[savedCity()] || CITIES[0];
    const gated = cfg.after_iftar_only === true && inRamadan(season(this.now)) && !afterIftar(this.now, city);
    const next = nextEvent(this.now, city);
    return html`<div class="rm-cg__box rm-pattern" role="group" aria-label=${t({ ar: "هدية رمضان", en: "Ramadan gift" })}>
      <div class="rm-cg__lead">${crescent()}<span>${o.text}</span></div>
      ${o.until > this.now
        ? html`<div><div class="rm-cg__clock" role="timer" aria-label=${o.label}>
            ${left.d ? html`<span class="rm-cg__unit"><b>${left.d}</b><span>${t({ ar: "يوم", en: "days" })}</span></span>` : nothing}
            <span class="rm-cg__unit"><b>${String(left.h).padStart(2, "0")}</b><span>${t({ ar: "ساعة", en: "hrs" })}</span></span>
            <span class="rm-cg__unit"><b>${String(left.m).padStart(2, "0")}</b><span>${t({ ar: "دقيقة", en: "min" })}</span></span>
            <span class="rm-cg__unit"><b>${String(left.s).padStart(2, "0")}</b><span>${t({ ar: "ثانية", en: "sec" })}</span></span>
          </div><div class="rm-cg__wait">${o.label}</div></div>`
        : nothing}
      ${o.code && ready
        ? gated
          ? html`<p class="rm-cg__wait">🌙 ${t({ ar: `الكود يظهر مع أذان المغرب في ${city.name.ar}، بعد ${hms(next.at - this.now)}`, en: `The code appears at Maghrib in ${city.name.en}, in ${hms(next.at - this.now)}` })}</p>`
          : html`<div class="rm-cg__code"><code>${o.code}</code>
              <button type="button" @click=${() => this.copy(o.code)}>${this.copied ? t({ ar: "تم النسخ ✓", en: "Copied ✓" }) : t({ ar: "انسخ", en: "Copy" })}</button></div>`
        : nothing}
    </div>`;
  }

  render() {
    const box = this.renderBox();
    if (!box) {
      if (isLandingPage()) return nothing;
      return this.frame(html`<p class="rm-empty">${t({ ar: "اكتب نص الهدية لكل مرحلة من إعدادات هذا القسم", en: "Write the gift text for each phase in this section's settings" })}</p>`);
    }
    const mode = this.mode();
    if (mode === "floating") {
      return html`${this.closed_
        ? html`<button type="button" class="rm-cg__pill rm-block rm-auto" @click=${() => (this.closed_ = false)}>${crescent()} ${t({ ar: "هديتك", en: "Your gift" })}</button>`
        : html`<div class="rm-cg__float rm-block rm-auto">${box}
            <button type="button" class="rm-cg__x" aria-label=${t({ ar: "إخفاء", en: "Hide" })} @click=${() => (this.closed_ = true)}>×</button></div>`}`;
    }
    if (mode === "popup") {
      return html`${this.open
        ? html`<dialog class="rm-cg__dialog rm-block rm-auto" @close=${() => (this.open = false)}
            @click=${(e: Event) => { if (e.target === e.currentTarget) this.closePopup(); }}>
            ${box}<button type="button" class="rm-cg__x" aria-label=${t({ ar: "إغلاق", en: "Close" })} @click=${() => this.closePopup()}>×</button></dialog>`
        : html`<button type="button" class="rm-cg__pill rm-block rm-auto" @click=${() => this.showPopup()}>${crescent()} ${t({ ar: "هدية لك", en: "A gift for you" })}</button>`}`;
    }
    return this.frame(box, { extraClass: "rm-cg" });
  }
}
