import { html, nothing } from "lit";
import { state } from "lit/decorators.js";
import { getLocale, resolveText, t } from "../../utils/config";
import { afterIftar, CITIES, clock, dayTimes, hms, nextEvent, saveCity, savedCity } from "../../utils/prayer";
import { crescent, inRamadan, patternCss, season } from "../../utils/season";
import { RmSection } from "../../utils/section";

const css = `
.rm-pb__bar { display: grid; gap: 1rem; align-items: center; padding: 1.25rem 1.5rem; border-radius: 1.5rem; background: var(--rm-card); }
@container (min-width: 820px) { .rm-pb__bar { grid-template-columns: auto 1fr auto; gap: 2rem; } }
.rm-pb__city { display: grid; gap: .375rem; }
.rm-pb__city label { font-size: .8125rem; font-weight: 800; color: var(--rm-title); }
.rm-pb__city select { min-height: 2.75rem; min-width: 11rem; padding: 0 .75rem; border: 1px solid color-mix(in srgb, var(--rm-text) 25%, transparent); border-radius: .75rem;
  background: var(--rm-bg); color: var(--rm-title); font: inherit; font-weight: 700; }
.rm-pb__times { display: grid; grid-template-columns: 1fr 1fr; gap: .75rem; }
.rm-pb__time { display: grid; gap: .125rem; padding: .75rem 1rem; border-radius: 1rem; background: var(--rm-bg); }
.rm-pb__time.is-next { background: var(--rm-accent); }
.rm-pb__time.is-next span, .rm-pb__time.is-next b { color: var(--rm-accent-text); }
.rm-pb__time span { font-size: .8125rem; font-weight: 700; }
.rm-pb__time b { font-size: 1.5rem; font-weight: 900; color: var(--rm-title); font-variant-numeric: tabular-nums; }
.rm-pb__count { display: grid; justify-items: center; gap: .125rem; text-align: center; }
.rm-pb__count svg { width: 1.75rem; color: var(--rm-accent-ink); }
.rm-pb__count b { font-size: 2rem; font-weight: 900; color: var(--rm-title); font-variant-numeric: tabular-nums; line-height: 1.1; }
.rm-pb__count span { font-size: .875rem; font-weight: 700; }
.rm-pb .rm-pb__note { margin: .75rem 0 0; text-align: center; font-size: .8125rem; }
.rm-pb .rm-pb__open { margin: .75rem 0 0; text-align: center; font-weight: 800; color: var(--rm-accent-ink); }
`;

export default class PrayerBar extends RmSection {
  protected readonly styleId = "prayer-bar";
  @state() private city = savedCity();
  @state() private now = Date.now();
  private timer?: number;
  private onCity = (e: Event) => (this.city = Number((e as CustomEvent).detail) || 0);

  protected styles() {
    return css + patternCss;
  }

  connectedCallback() {
    super.connectedCallback();
    this.timer = window.setInterval(() => (this.now = Date.now()), 1000);
    window.addEventListener("rm:city", this.onCity);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
    window.removeEventListener("rm:city", this.onCity);
  }

  render() {
    const cfg = this.cfg();
    const en = getLocale() === "en";
    const city = CITIES[this.city] || CITIES[0];
    const times = dayTimes(this.now, city.lat, city.lng);
    const next = nextEvent(this.now, city);
    const open = resolveText(cfg.after_iftar_text);
    const id = `rm-pb-city-${this.styleId}`;
    return this.frame(html`<div class="rm-pb__bar rm-pattern">
        <div class="rm-pb__city">
          <label for=${id}>${t({ ar: "مدينتك", en: "Your city" })}</label>
          <select id=${id} @change=${(e: Event) => saveCity(Number((e.target as HTMLSelectElement).value))}>
            ${CITIES.map((c, i) => html`<option value=${i} ?selected=${i === this.city}>${en ? c.name.en : c.name.ar}</option>`)}
          </select>
        </div>
        <div class="rm-pb__times">
          <div class=${`rm-pb__time${next.kind === "suhoor" ? " is-next" : ""}`}><span>${t({ ar: "الإمساك (الفجر)", en: "Suhoor ends (Fajr)" })}</span><b>${clock(times.fajr)}</b></div>
          <div class=${`rm-pb__time${next.kind === "iftar" ? " is-next" : ""}`}><span>${t({ ar: "الإفطار (المغرب)", en: "Iftar (Maghrib)" })}</span><b>${clock(times.maghrib)}</b></div>
        </div>
        ${cfg.show_countdown !== false
          ? html`<div class="rm-pb__count" aria-live="off">${crescent()}
              <span>${next.kind === "iftar" ? t({ ar: "باقي على الإفطار", en: "Until iftar" }) : t({ ar: "باقي على الإمساك", en: "Until suhoor ends" })}</span>
              <b>${hms(next.at - this.now)}</b></div>`
          : nothing}
      </div>
      ${inRamadan(season(this.now)) && afterIftar(this.now, city) && open ? html`<p class="rm-pb__open">🌙 ${open}</p>` : nothing}
      <p class="rm-pb__note">${t({ ar: "المواعيد تقريبية بتقويم أم القرى، والمعتمد أذان مسجدك", en: "Approximate Umm al-Qura times; your mosque's adhan comes first" })}</p>`, { extraClass: "rm-pb" });
  }
}
