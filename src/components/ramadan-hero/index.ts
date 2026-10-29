import { html, nothing } from "lit";
import { state } from "lit/decorators.js";
import { anchorId, getLocale, resolveText, t, unwrapValue } from "../../utils/config";
import { hijriLabel, ramadanDay, type Phase } from "../../utils/hijri";
import { crescent, lantern, publishSeason, season, star } from "../../utils/season";
import { RmSection } from "../../utils/section";

const css = `
.rm-hero { position: relative; overflow: hidden; }
.rm-hero__wrap { position: relative; display: grid; gap: 2rem; align-items: center; padding-block: 3rem 3.5rem; }
@container (min-width: 900px) { .rm-hero__wrap { grid-template-columns: 1.1fr 1fr; gap: 3rem; padding-block: 4.5rem 5rem; } }
.rm-hero__text { position: relative; z-index: 1; display: grid; gap: 1rem; justify-items: start; }
.rm-hero__pill { display: inline-flex; flex-wrap: wrap; align-items: center; gap: .5rem; padding: .375rem .875rem; border-radius: 999px;
  background: color-mix(in srgb, var(--rm-accent) 16%, var(--rm-bg)); color: var(--rm-title); font-size: .875rem; font-weight: 700; }
.rm-hero__pill svg { width: 1rem; height: 1rem; color: var(--rm-accent-ink); }
.rm-hero__pill b { color: var(--rm-accent-ink); }
.rm-hero__title { margin: 0; font-size: clamp(2.25rem, 7cqi, 4rem); line-height: 1.15; font-weight: 900; color: var(--rm-title); }
.rm-hero__sub { margin: 0; max-width: 34rem; font-size: 1.0625rem; line-height: 1.9; }
.rm-hero__count { display: flex; align-items: baseline; gap: .5rem; color: var(--rm-title); }
.rm-hero__count b { font-size: 3rem; font-weight: 900; line-height: 1; color: var(--rm-accent-ink); }
.rm-hero__count span { font-weight: 800; }
.rm-hero__arches { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; align-items: end; min-height: 18rem; }
.rm-hero__arch { position: relative; overflow: hidden; border-radius: 999px 999px 1.5rem 1.5rem; background: var(--rm-card); aspect-ratio: 3 / 4.4; }
.rm-hero__arch:nth-child(2) { transform: translateY(-2.5rem); }
.rm-hero__arch img { width: 100%; height: 100%; object-fit: cover; }
.rm-hero__arch--empty { display: grid; place-items: center; color: var(--rm-accent-ink); }
.rm-hero__arch--empty svg { width: 40%; }
.rm-hero__moon { position: absolute; top: -1.5rem; inset-inline-end: 8%; width: 4.5rem; color: var(--rm-accent); transform: rotate(-20deg); }
.rm-hero__star { position: absolute; top: 12%; inset-inline-start: 2%; width: 1.25rem; color: var(--rm-accent); }
.rm-hero__lanterns { position: absolute; top: 0; inset-inline: 0; display: flex; justify-content: space-between; padding-inline: 4%; pointer-events: none; color: var(--rm-accent); }
.rm-hero__lanterns svg { width: 2.25rem; transform-origin: top center; animation: rm-swing 4s ease-in-out infinite; }
.rm-hero__lanterns svg:nth-child(2n) { animation-delay: -2s; width: 1.75rem; }
@keyframes rm-swing { 0%, 100% { transform: rotate(3deg); } 50% { transform: rotate(-3deg); } }
@media (prefers-reduced-motion: reduce) { .rm-hero__lanterns svg { animation: none; } }
@container (max-width: 520px) { .rm-hero__lanterns svg:nth-child(n + 4) { display: none; } }
`;

type Texts = { badge: string; title: string; subtitle: string };

export default class RamadanHero extends RmSection {
  protected readonly styleId = "ramadan-hero";
  @state() private now = Date.now();
  private timer?: number;

  protected styles() {
    return css;
  }

  connectedCallback() {
    super.connectedCallback();
    this.timer = window.setInterval(() => (this.now = Date.now()), 60000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
  }

  willUpdate() {
    const cfg = this.cfg();
    // The other sections follow the hero's moon-sighting shift and preview phase
    publishSeason({ shift: Math.max(-2, Math.min(2, Number(cfg.day_shift) || 0)), preview: (unwrapValue(cfg.preview_phase) || "") as Phase | "" });
  }

  private texts(phase: Phase): Texts {
    const cfg = this.cfg();
    const key = phase === "last-ten" ? "last" : phase;
    const own = { badge: resolveText(cfg[`${key}_badge`]), title: resolveText(cfg[`${key}_title`]), subtitle: resolveText(cfg[`${key}_subtitle`]) };
    // A phase the merchant left empty uses the Ramadan texts
    return own.title ? own : { badge: resolveText(cfg.ramadan_badge), title: resolveText(cfg.ramadan_title), subtitle: resolveText(cfg.ramadan_subtitle) };
  }

  private go(e: Event) {
    const id = anchorId(this.cfg().button_target);
    const target = id && document.querySelector(`[data-rm-section="${id}"]`);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  render() {
    const cfg = this.cfg();
    const s = season(this.now);
    const text = this.texts(s.phase);
    const locale = getLocale();
    const images = [String(cfg.image_1 || ""), String(cfg.image_2 || "")];
    const day = ramadanDay(s.h);
    const button = resolveText(cfg.button_text);
    return this.frame(html`
      ${cfg.show_lanterns !== false
        ? html`<div class="rm-hero__lanterns" aria-hidden="true">${[46, 80, 30, 64, 40].map((len) => lantern("", len))}</div>`
        : nothing}
      <div class="rm-hero__wrap">
        <div class="rm-hero__text">
          <span class="rm-hero__pill">${crescent()} ${hijriLabel(s.h, locale)}
            ${day ? html`· <b>${t({ ar: `اليوم ${day} من رمضان`, en: `Day ${day} of Ramadan` })}</b>` : nothing}
            ${s.phase === "last-ten" ? html`· <b>${t({ ar: "العشر الأواخر", en: "The last ten nights" })}</b>` : nothing}</span>
          ${text.badge ? html`<span class="rm-hero__pill">${text.badge}</span>` : nothing}
          ${text.title ? html`<h1 class="rm-hero__title">${text.title}</h1>` : nothing}
          ${text.subtitle ? html`<p class="rm-hero__sub">${text.subtitle}</p>` : nothing}
          ${s.phase === "before" && s.toRamadan
            ? html`<div class="rm-hero__count"><b>${s.toRamadan}</b><span>${t({ ar: s.toRamadan === 1 ? "يوم على رمضان" : "يوم على رمضان", en: "days to Ramadan" })}</span></div>`
            : (s.phase === "ramadan" || s.phase === "last-ten") && s.toEid
              ? html`<div class="rm-hero__count"><b>${s.toEid}</b><span>${t({ ar: "يوم على العيد", en: "days to Eid" })}</span></div>`
              : nothing}
          ${button ? html`<a class="rm-btn" href=${`#${anchorId(cfg.button_target)}`} @click=${(e: Event) => this.go(e)}>${button}</a>` : nothing}
        </div>
        <div class="rm-hero__arches">
          ${crescent("rm-hero__moon")}
          ${star("rm-hero__star")}
          ${images.map((src) => (src
            ? html`<div class="rm-hero__arch"><img src=${src} alt="" fetchpriority="high" /></div>`
            : html`<div class="rm-hero__arch rm-hero__arch--empty">${crescent()}</div>`))}
        </div>
      </div>`, { hero: true, title: false, extraClass: "rm-hero" });
  }
}
