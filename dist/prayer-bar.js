import { nothing as _, html as m } from "lit";
import { state as g } from "lit/decorators.js";
import { l as u, r as v, t as a } from "./styles-Bs7TKm5O.js";
import { s as y, C as l, d as w, n as $, b as x, c as f, h as C, a as k } from "./prayer-5zE4Yu9W.js";
import { p as I, c as z, i as j, s as E } from "./season-DLTLY4O1.js";
import { R as S } from "./section-DUtzCvhS.js";
var L = Object.defineProperty, h = (p, e, s, i) => {
  for (var r = void 0, t = p.length - 1, n; t >= 0; t--)
    (n = p[t]) && (r = n(e, s, r) || r);
  return r && L(e, s, r), r;
};
const P = `
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
class c extends S {
  constructor() {
    super(...arguments), this.styleId = "prayer-bar", this.city = y(), this.now = Date.now(), this.onCity = (e) => this.city = Number(e.detail) || 0;
  }
  styles() {
    return P + I;
  }
  connectedCallback() {
    super.connectedCallback(), this.timer = window.setInterval(() => this.now = Date.now(), 1e3), window.addEventListener("rm:city", this.onCity);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this.timer), window.removeEventListener("rm:city", this.onCity);
  }
  render() {
    const e = this.cfg(), s = u() === "en", i = l[this.city] || l[0], r = w(this.now, i.lat, i.lng), t = $(this.now, i), n = v(e.after_iftar_text), d = `rm-pb-city-${this.styleId}`;
    return this.frame(m`<div class="rm-pb__bar rm-pattern">
        <div class="rm-pb__city">
          <label for=${d}>${a({ ar: "مدينتك", en: "Your city" })}</label>
          <select id=${d} @change=${(o) => x(Number(o.target.value))}>
            ${l.map((o, b) => m`<option value=${b} ?selected=${b === this.city}>${s ? o.name.en : o.name.ar}</option>`)}
          </select>
        </div>
        <div class="rm-pb__times">
          <div class=${`rm-pb__time${t.kind === "suhoor" ? " is-next" : ""}`}><span>${a({ ar: "الإمساك (الفجر)", en: "Suhoor ends (Fajr)" })}</span><b>${f(r.fajr)}</b></div>
          <div class=${`rm-pb__time${t.kind === "iftar" ? " is-next" : ""}`}><span>${a({ ar: "الإفطار (المغرب)", en: "Iftar (Maghrib)" })}</span><b>${f(r.maghrib)}</b></div>
        </div>
        ${e.show_countdown !== !1 ? m`<div class="rm-pb__count" aria-live="off">${z()}
              <span>${t.kind === "iftar" ? a({ ar: "باقي على الإفطار", en: "Until iftar" }) : a({ ar: "باقي على الإمساك", en: "Until suhoor ends" })}</span>
              <b>${C(t.at - this.now)}</b></div>` : _}
      </div>
      ${j(E(this.now)) && k(this.now, i) && n ? m`<p class="rm-pb__open">🌙 ${n}</p>` : _}
      <p class="rm-pb__note">${a({ ar: "المواعيد تقريبية بتقويم أم القرى، والمعتمد أذان مسجدك", en: "Approximate Umm al-Qura times; your mosque's adhan comes first" })}</p>`, { extraClass: "rm-pb" });
  }
}
h([
  g()
], c.prototype, "city");
h([
  g()
], c.prototype, "now");
typeof c < "u" && c.registerSallaComponent("salla-prayer-bar");
export {
  c as default
};
