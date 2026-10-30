import { nothing as m, html as n } from "lit";
import { state as g } from "lit/decorators.js";
import { i as l, u as y, t as r, r as p, g as $ } from "./styles-Bs7TKm5O.js";
import { p as k, s as b, a as h, i as w, c as f } from "./season-DLTLY4O1.js";
import { C as x, s as C, a as S, n as T, h as v } from "./prayer-5zE4Yu9W.js";
import { R as I } from "./section-DUtzCvhS.js";
var P = Object.defineProperty, u = (c, e, t, o) => {
  for (var a = void 0, i = c.length - 1, d; i >= 0; i--)
    (d = c[i]) && (a = d(e, t, a) || a);
  return a && P(e, t, a), a;
};
const z = `
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
function M(c) {
  const e = Math.max(0, Math.floor(c / 1e3));
  return { d: Math.floor(e / 86400), h: Math.floor(e % 86400 / 3600), m: Math.floor(e % 3600 / 60), s: e % 60 };
}
class s extends I {
  constructor() {
    super(...arguments), this.styleId = "countdown-gift", this.now = Date.now(), this.copied = !1, this.closed_ = !1, this.open = !1, this.refresh = () => this.requestUpdate();
  }
  styles() {
    return z + k;
  }
  connectedCallback() {
    if (super.connectedCallback(), this.timer = window.setInterval(() => this.now = Date.now(), 1e3), window.addEventListener("rm:season", this.refresh), window.addEventListener("rm:city", this.refresh), this.mode() === "popup") {
      let e = !1;
      try {
        e = sessionStorage.getItem("rm-cg-seen") === "1";
      } catch {
      }
      (!e || !l()) && (this.popupTimer = window.setTimeout(() => this.showPopup(), l() ? 4e3 : 600));
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this.timer), window.clearTimeout(this.popupTimer), window.removeEventListener("rm:season", this.refresh), window.removeEventListener("rm:city", this.refresh);
  }
  mode() {
    const e = y(this.cfg().mode);
    return e === "floating" || e === "popup" ? e : "bar";
  }
  async showPopup() {
    var t;
    this.open = !0;
    try {
      sessionStorage.setItem("rm-cg-seen", "1");
    } catch {
    }
    await this.updateComplete;
    const e = this.querySelector(".rm-cg__dialog");
    e && !e.open && ((t = e.showModal) == null || t.call(e));
  }
  closePopup() {
    var e, t;
    (t = (e = this.querySelector(".rm-cg__dialog")) == null ? void 0 : e.close) == null || t.call(e), this.open = !1;
  }
  async copy(e) {
    try {
      await navigator.clipboard.writeText(e);
    } catch {
    }
    this.copied = !0, window.setTimeout(() => this.copied = !1, 2e3);
  }
  /** What the gift says now, its code, and when its countdown ends. */
  offer() {
    const e = this.cfg(), t = b(this.now);
    if (t.phase === "before") {
      const o = t.toRamadan ? h(this.now, t.toRamadan) : 0;
      return { text: p(e.before_text), code: String(e.before_code || "").trim(), until: o, label: r({ ar: "باقي على رمضان", en: "Until Ramadan" }) };
    }
    if (w(t)) {
      const a = $(e.days, "days").map((i) => ({ day: Number(i.day) || 0, text: p(i.text), code: String(i.code || "").trim() })).find((i) => i.day === t.h.d && i.text);
      return {
        text: (a == null ? void 0 : a.text) || p(e.ramadan_text),
        code: (a == null ? void 0 : a.code) || String(e.ramadan_code || "").trim(),
        until: h(this.now, 1),
        label: r({ ar: "عرض اليوم ينتهي بعد", en: "Today's offer ends in" })
      };
    }
    return t.phase === "eid" ? { text: p(e.eid_text), code: String(e.eid_code || "").trim(), until: h(this.now, 4 - t.h.d), label: r({ ar: "عرض العيد ينتهي بعد", en: "The Eid offer ends in" }) } : null;
  }
  renderBox() {
    const e = this.cfg(), t = this.offer();
    if (!t || !t.text) return null;
    const o = M(t.until - this.now), a = e.codes_ready === !0 || !l(), i = x[C()] || x[0], d = e.after_iftar_only === !0 && w(b(this.now)) && !S(this.now, i), _ = T(this.now, i);
    return n`<div class="rm-cg__box rm-pattern" role="group" aria-label=${r({ ar: "هدية رمضان", en: "Ramadan gift" })}>
      <div class="rm-cg__lead">${f()}<span>${t.text}</span></div>
      ${t.until > this.now ? n`<div><div class="rm-cg__clock" role="timer" aria-label=${t.label}>
            ${o.d ? n`<span class="rm-cg__unit"><b>${o.d}</b><span>${r({ ar: "يوم", en: "days" })}</span></span>` : m}
            <span class="rm-cg__unit"><b>${String(o.h).padStart(2, "0")}</b><span>${r({ ar: "ساعة", en: "hrs" })}</span></span>
            <span class="rm-cg__unit"><b>${String(o.m).padStart(2, "0")}</b><span>${r({ ar: "دقيقة", en: "min" })}</span></span>
            <span class="rm-cg__unit"><b>${String(o.s).padStart(2, "0")}</b><span>${r({ ar: "ثانية", en: "sec" })}</span></span>
          </div><div class="rm-cg__wait">${t.label}</div></div>` : m}
      ${t.code && a ? d ? n`<p class="rm-cg__wait">🌙 ${r({ ar: `الكود يظهر مع أذان المغرب في ${i.name.ar}، بعد ${v(_.at - this.now)}`, en: `The code appears at Maghrib in ${i.name.en}, in ${v(_.at - this.now)}` })}</p>` : n`<div class="rm-cg__code"><code>${t.code}</code>
              <button type="button" @click=${() => this.copy(t.code)}>${this.copied ? r({ ar: "تم النسخ ✓", en: "Copied ✓" }) : r({ ar: "انسخ", en: "Copy" })}</button></div>` : m}
    </div>`;
  }
  render() {
    const e = this.renderBox();
    if (!e)
      return l() ? m : this.frame(n`<p class="rm-empty">${r({ ar: "اكتب نص الهدية لكل مرحلة من إعدادات هذا القسم", en: "Write the gift text for each phase in this section's settings" })}</p>`);
    const t = this.mode();
    return t === "floating" ? n`${this.closed_ ? n`<button type="button" class="rm-cg__pill rm-block rm-auto" @click=${() => this.closed_ = !1}>${f()} ${r({ ar: "هديتك", en: "Your gift" })}</button>` : n`<div class="rm-cg__float rm-block rm-auto">${e}
            <button type="button" class="rm-cg__x" aria-label=${r({ ar: "إخفاء", en: "Hide" })} @click=${() => this.closed_ = !0}>×</button></div>`}` : t === "popup" ? n`${this.open ? n`<dialog class="rm-cg__dialog rm-block rm-auto" @close=${() => this.open = !1}
            @click=${(o) => {
      o.target === o.currentTarget && this.closePopup();
    }}>
            ${e}<button type="button" class="rm-cg__x" aria-label=${r({ ar: "إغلاق", en: "Close" })} @click=${() => this.closePopup()}>×</button></dialog>` : n`<button type="button" class="rm-cg__pill rm-block rm-auto" @click=${() => this.showPopup()}>${f()} ${r({ ar: "هدية لك", en: "A gift for you" })}</button>`}` : this.frame(e, { extraClass: "rm-cg" });
  }
}
u([
  g()
], s.prototype, "now");
u([
  g()
], s.prototype, "copied");
u([
  g()
], s.prototype, "closed_");
u([
  g()
], s.prototype, "open");
typeof s < "u" && s.registerSallaComponent("salla-countdown-gift");
export {
  s as default
};
