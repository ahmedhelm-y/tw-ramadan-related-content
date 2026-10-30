import { html as s, nothing as l } from "lit";
import { state as v } from "lit/decorators.js";
import { g as y, r as d, t as m } from "./styles-Bs7TKm5O.js";
import { R as w } from "./section-DUtzCvhS.js";
const _ = 0.2;
function $(n) {
  const r = n.map(Number).filter((t) => Number.isInteger(t) && t >= 1 && t <= 5), e = [5, 4, 3, 2, 1].map((t) => r.filter((i) => i === t).length);
  return { average: r.length ? Math.round(r.reduce((t, i) => t + i, 0) / r.length * 10) / 10 : 0, count: r.length, dist: e };
}
function k(n) {
  if (!Number.isFinite(n) || n < 0) return "0:00";
  const r = Math.floor(n);
  return `${Math.floor(r / 60)}:${String(r % 60).padStart(2, "0")}`;
}
function x(n, r) {
  let e = 2166136261;
  for (let t = 0; t < n.length; t++) e = Math.imul(e ^ n.charCodeAt(t), 16777619);
  const a = [];
  for (let t = 0; t < r; t++) {
    e = Math.imul(e ^ e >>> 15, 2246822507) ^ Math.imul(e ^ e >>> 13, 3266489909);
    const i = (e >>> 0) % 1e3 / 1e3, c = 0.55 + 0.45 * Math.sin(t / r * Math.PI);
    a.push(Math.round((_ + (1 - _) * i * c) * 100) / 100);
  }
  return a;
}
function M(n, r) {
  const e = Math.max(1, Math.floor(n.length / r)), a = [];
  for (let i = 0; i < r; i++) {
    let c = 0;
    for (let o = i * e; o < Math.min((i + 1) * e, n.length); o++) c = Math.max(c, Math.abs(n[o]));
    a.push(c);
  }
  const t = Math.max(...a);
  return t ? a.map((i) => Math.max(_, Math.round(i / t * 100) / 100)) : a.map(() => _);
}
function S(n) {
  return [...new Set(String(n ?? "").split(/[,،\n]/).map((r) => r.trim()).filter(Boolean))].slice(0, 4);
}
let u = null;
class q {
  constructor(r) {
    this.audio = r, this.state = { playing: !1, time: 0, duration: 0, rate: 1, error: !1 }, this.listeners = [];
    const e = () => this.set({ playing: !r.paused, time: r.currentTime || 0, duration: Number.isFinite(r.duration) ? r.duration : 0 });
    this.events = [
      ["play", e],
      ["pause", e],
      ["timeupdate", e],
      ["loadedmetadata", e],
      ["ended", () => this.set({ playing: !1, time: 0 })],
      ["error", () => this.set({ playing: !1, error: !0 })]
    ];
    for (const [a, t] of this.events) r.addEventListener(a, t);
  }
  onState(r) {
    this.listeners.push(r);
  }
  set(r) {
    this.state = { ...this.state, ...r }, this.listeners.forEach((e) => e(this.state));
  }
  async play() {
    u && u !== this && u.pause(), u = this;
    try {
      await this.audio.play(), this.set({ playing: !0, error: !1 });
    } catch {
      this.set({ playing: !1, error: !0 });
    }
  }
  pause() {
    this.audio.pause(), this.set({ playing: !1 }), u === this && (u = null);
  }
  toggle() {
    return this.state.playing ? this.pause() : this.play();
  }
  seek(r) {
    const e = Number.isFinite(this.audio.duration) ? this.audio.duration : 0;
    e && (this.audio.currentTime = Math.min(Math.max(r, 0), 1) * e, this.set({ time: this.audio.currentTime }));
  }
  setRate(r) {
    this.audio.playbackRate = r, this.set({ rate: r });
  }
  destroy() {
    u === this && this.pause();
    for (const [r, e] of this.events) this.audio.removeEventListener(r, e);
    this.listeners = [];
  }
}
async function C(n, r) {
  var e;
  try {
    const a = window.AudioContext || window.webkitAudioContext;
    if (!a) throw new Error("no audio context");
    const t = await fetch(n, { mode: "cors" });
    if (!t.ok) throw new Error(String(t.status));
    const i = await t.arrayBuffer(), c = new a();
    try {
      const o = await c.decodeAudioData(i);
      return M(o.getChannelData(0), r);
    } finally {
      (e = c.close) == null || e.call(c);
    }
  } catch {
    return x(n, r);
  }
}
var z = Object.defineProperty, g = (n, r, e, a) => {
  for (var t = void 0, i = n.length - 1, c; i >= 0; i--)
    (c = n[i]) && (t = c(r, e, t) || t);
  return t && z(r, e, t), t;
};
const f = 40;
let A = 0;
const b = [1, 1.5, 2], P = `
.rm-rv__summary { display: grid; gap: 1.25rem; margin-bottom: 2rem; padding: 1.5rem; border-radius: 1.5rem; background: var(--rm-card); }
@container (min-width: 768px) { .rm-rv__summary { grid-template-columns: auto 1fr; gap: 2.5rem; align-items: center; } }
.rm-rv__score { display: flex; flex-direction: column; align-items: center; gap: .25rem; }
.rm-rv__avg { font-size: 3rem; font-weight: 800; line-height: 1; color: var(--rm-title); }
.rm-rv__count { font-size: .875rem; color: var(--rm-text); }
.rm-rv__dist { display: grid; gap: .375rem; min-width: 12rem; }
.rm-rv__distrow { display: grid; grid-template-columns: 1.25rem 1fr 2rem; align-items: center; gap: .5rem; font-size: .8125rem; color: var(--rm-text); }
.rm-rv__distbar { height: .375rem; border-radius: 999px; background: color-mix(in srgb, var(--rm-text) 15%, transparent); overflow: hidden; }
.rm-rv__distbar span { display: block; height: 100%; border-radius: inherit; background: var(--rm-accent); }
.rm-rv__said { margin: 0 0 .875rem; line-height: 1.8; color: var(--rm-title); }
.rm-rv__qs { display: flex; flex-wrap: wrap; gap: .5rem; }
.rm-rv__q { min-height: 2.5rem; padding: .375rem 1rem; border: 1px solid color-mix(in srgb, var(--rm-text) 25%, transparent); border-radius: 999px; background: var(--rm-bg);
  color: var(--rm-title); font: inherit; font-size: .875rem; font-weight: 600; cursor: pointer; }
.rm-rv__q[aria-expanded="true"] { border-color: var(--rm-accent-ink); background: var(--rm-accent); color: var(--rm-accent-text); }
.rm-rv__answer { margin: .875rem 0 0; padding: .875rem 1rem; border-radius: .875rem; background: var(--rm-bg); line-height: 1.8; color: var(--rm-title); }
  background: color-mix(in srgb, var(--rm-text) 15%, transparent); }
  transform: translate(50%, -50%); }
[dir="ltr"] .rm-rv__filters { display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: 1.25rem; }
.rm-rv__filter { min-height: 2.75rem; padding: 0 1rem; border: 1.5px solid color-mix(in srgb, var(--rm-text) 25%, transparent); border-radius: 999px;
  background: var(--rm-bg); color: var(--rm-title); font: inherit; font-weight: 700; font-size: .875rem; cursor: pointer; }
.rm-rv__filter[aria-pressed="true"] { border-color: var(--rm-accent-ink); background: var(--rm-accent); color: var(--rm-accent-text); }
.rm-rv__filter:focus-visible { outline: 2px solid var(--rm-accent-ink); outline-offset: 2px; }
.rm-rv__body { display: flex; flex-wrap: wrap; gap: .375rem .5rem; }
.rm-rv__chip { padding: .125rem .625rem; border-radius: 999px; background: var(--rm-bg); font-size: .8125rem; color: var(--rm-text); }
.rm-rv__chip b { color: var(--rm-title); }
.rm-rv__none { padding: 1.5rem; text-align: center; }
.rm-rv__grid { display: grid; gap: 1rem; align-items: start; }
@container (min-width: 640px) { .rm-rv__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@container (min-width: 1000px) { .rm-rv__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
.rm-rv__card { display: flex; flex-direction: column; gap: .875rem; padding: 1.125rem; border-radius: 1.25rem; background: var(--rm-card); }
.rm-rv__head { display: flex; align-items: center; gap: .75rem; }
.rm-rv__avatar { width: 2.75rem; height: 2.75rem; flex: 0 0 auto; display: grid; place-items: center; border-radius: 999px; overflow: hidden; background: var(--rm-accent);
  color: var(--rm-accent-text); font-weight: 800; }
.rm-rv__avatar img { width: 100%; height: 100%; object-fit: cover; }
.rm-rv__who { display: flex; flex-direction: column; min-width: 0; flex: 1 1 auto; }
.rm-rv__name { font-weight: 800; color: var(--rm-title); }
.rm-rv__meta { font-size: .8125rem; color: var(--rm-text); }
.rm-rv__verified { color: var(--rm-accent-ink); font-weight: 700; }
.rm-rv__stars { color: #f5a524; letter-spacing: .05em; white-space: nowrap; }
.rm-rv__stars .off { color: color-mix(in srgb, var(--rm-text) 30%, transparent); }
.rm-rv__place { align-self: flex-start; padding: .25rem .75rem; border-radius: 999px; background: var(--rm-bg); font-size: .8125rem; font-weight: 700; color: var(--rm-title); }
.rm-rv__voice { display: flex; align-items: center; gap: .625rem; padding: .5rem .625rem; border-radius: 999px; background: var(--rm-bg); }
.rm-rv__play { width: 2.75rem; height: 2.75rem; flex: 0 0 auto; display: grid; place-items: center; border: 0; border-radius: 999px; background: var(--rm-accent);
  color: var(--rm-accent-text); cursor: pointer; }
.rm-rv__play svg { width: 1.125rem; height: 1.125rem; }
.rm-rv__wave { display: flex; align-items: center; gap: 2px; height: 2rem; flex: 1 1 auto; min-width: 0; padding: 0; border: 0; background: none; cursor: pointer; direction: ltr; }
.rm-rv__wave span { flex: 1 1 0; min-width: 2px; border-radius: 2px; background: color-mix(in srgb, var(--rm-text) 35%, transparent); }
.rm-rv__wave span.is-done { background: var(--rm-accent); }
.rm-rv__time { font-size: .75rem; font-variant-numeric: tabular-nums; color: var(--rm-text); min-width: 2.25rem; text-align: center; }
.rm-rv__rate { min-width: 2.75rem; height: 2rem; padding: 0 .375rem; border: 1px solid color-mix(in srgb, var(--rm-text) 25%, transparent); border-radius: 999px;
  background: none; color: var(--rm-title); font: inherit; font-size: .75rem; font-weight: 800; cursor: pointer; }
.rm-rv__voice-error { font-size: .8125rem; color: #d92d20; }
.rm-rv__text { margin: 0; line-height: 1.8; color: var(--rm-title); white-space: pre-line; }
.rm-rv__text.is-clamped { display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; }
.rm-rv__more { align-self: flex-start; padding: 0; border: 0; background: none; color: var(--rm-accent-ink); font: inherit; font-size: .875rem; font-weight: 700; cursor: pointer; }
.rm-rv__photos { display: flex; gap: .5rem; }
.rm-rv__photos button { width: 4.5rem; height: 4.5rem; padding: 0; border: 0; border-radius: .75rem; overflow: hidden; cursor: zoom-in; }
.rm-rv__photos img { width: 100%; height: 100%; object-fit: cover; }
.rm-rv :is(button, a):focus-visible { outline: 2px solid var(--rm-accent-ink); outline-offset: 2px; }
.rm-rv__dialog { max-width: min(92vw, 56rem); max-height: 90vh; padding: 0; border: 0; border-radius: 1rem; background: transparent; }
.rm-rv__dialog::backdrop { background: rgb(0 0 0 / 80%); }
.rm-rv__dialog img { display: block; max-width: 100%; max-height: 90vh; border-radius: 1rem; }
.rm-rv__close { position: absolute; top: .5rem; inset-inline-end: .5rem; width: 2.75rem; height: 2.75rem; border: 0; border-radius: 999px; background: rgb(0 0 0 / 55%); color: #fff; font-size: 1.5rem; cursor: pointer; }
`, R = s`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z" /></svg>`, E = s`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>`;
function B(n) {
  return n.trim().split(/\s+/).slice(0, 2).map((r) => r[0]).join("").toUpperCase() || "؟";
}
function I(n) {
  const r = String(n || "").trim();
  return /^(https?:)?\/\//i.test(r) || r.startsWith("/") ? r : "";
}
class p extends w {
  constructor() {
    super(...arguments), this.styleId = "reviews", this.players = {}, this.peaks = {}, this.expanded = /* @__PURE__ */ new Set(), this.question = -1, this.photo = "", this.tried = /* @__PURE__ */ new Set(), this.topic = "", this.voice = /* @__PURE__ */ new Map(), this.answerId = `rm-rv-answer-${++A}`;
  }
  styles() {
    return P;
  }
  disconnectedCallback() {
    var r;
    super.disconnectedCallback(), this.voice.forEach((e) => e.destroy()), this.voice.clear(), (r = this.observer) == null || r.disconnect(), this.observer = void 0, this.querySelectorAll("[data-watched]").forEach((e) => delete e.dataset.watched);
  }
  connectedCallback() {
    super.connectedCallback(), this.requestUpdate();
  }
  reviews() {
    return y(this.cfg().items, "items").map((r) => ({
      name: d(r.name),
      city: d(r.city),
      place: d(r.place),
      rate: Math.min(Math.max(Math.round(Number(r.rate) || 0), 0), 5),
      text: d(r.text),
      audio: I(r.audio_url),
      images: [r.image_1, r.image_2, r.image_3].map((e) => String(e || "")).filter(Boolean),
      avatar: String(r.avatar || ""),
      verified: r.verified !== !1,
      bought: d(r.bought),
      topics: S(d(r.topics))
    })).filter((r) => r.text || r.audio || r.images.length);
  }
  updated() {
    this.querySelectorAll("audio[data-i]").forEach((r) => {
      const e = Number(r.dataset.i);
      if (this.voice.has(e)) return;
      const a = new q(r);
      a.onState((t) => this.players = { ...this.players, [e]: t }), this.voice.set(e, a);
    }), !this.observer && typeof IntersectionObserver < "u" && (this.observer = new IntersectionObserver((r) => {
      for (const e of r) {
        if (!e.isIntersecting) continue;
        const a = e.target;
        this.observer.unobserve(a);
        const t = Number(a.dataset.i);
        C(a.dataset.src || "", f).then((i) => this.peaks = { ...this.peaks, [t]: i });
      }
    }, { rootMargin: "200px" })), this.querySelectorAll(".rm-rv__voice[data-src]:not([data-watched])").forEach((r) => {
      r.dataset.watched = "1", this.observer ? this.observer.observe(r) : this.peaks = { ...this.peaks, [Number(r.dataset.i)]: x(r.dataset.src || "", f) };
    });
  }
  seek(r, e) {
    var t;
    if (r.detail === 0) return;
    const a = r.currentTarget.getBoundingClientRect();
    (t = this.voice.get(e)) == null || t.seek((r.clientX - a.left) / a.width);
  }
  seekKey(r, e) {
    var i;
    const a = r.key === "ArrowRight" ? 0.1 : r.key === "ArrowLeft" ? -0.1 : 0;
    if (!a) return;
    r.preventDefault();
    const t = this.players[e];
    t != null && t.duration && ((i = this.voice.get(e)) == null || i.seek(t.time / t.duration + a));
  }
  play(r) {
    var e;
    this.tried = new Set(this.tried).add(r), (e = this.voice.get(r)) == null || e.toggle();
  }
  renderVoice(r, e) {
    const a = this.players[e] || { playing: !1, time: 0, duration: 0, rate: 1, error: !1 }, t = this.peaks[e] || x(r.audio, f), i = a.duration ? a.time / a.duration : 0, c = b[(b.indexOf(a.rate) + 1) % b.length];
    return s`<div class="rm-rv__voice" data-i=${e} data-src=${r.audio}>
        <audio data-i=${e} src=${r.audio} preload="metadata"></audio>
        <button type="button" class="rm-rv__play" aria-label=${a.playing ? m({ ar: "إيقاف", en: "Pause" }) : m({ ar: `تشغيل رأي ${r.name}`, en: `Play ${r.name}'s review` })}
          @click=${() => this.play(e)}>${a.playing ? E : R}</button>
        <button type="button" class="rm-rv__wave" aria-label=${m({ ar: "انتقل في التسجيل بالأسهم", en: "Seek in the recording with the arrow keys" })}
          @click=${(o) => this.seek(o, e)} @keydown=${(o) => this.seekKey(o, e)}>
          ${t.map((o, h) => s`<span class=${h / t.length < i ? "is-done" : ""} style=${`height:${Math.round(o * 100)}%`}></span>`)}
        </button>
        <span class="rm-rv__time">${k(a.playing || a.time ? a.time : a.duration)}</span>
        <button type="button" class="rm-rv__rate" aria-label=${m({ ar: "سرعة التشغيل", en: "Playback speed" })} @click=${() => {
      var o;
      return (o = this.voice.get(e)) == null ? void 0 : o.setRate(c);
    }}>${a.rate}x</button>
      </div>
      ${a.error && this.tried.has(e) ? s`<span class="rm-rv__voice-error" role="alert">${m({ ar: "تعذّر تشغيل التسجيل", en: "The recording could not be played" })}</span>` : l}`;
  }
  renderCard(r, e) {
    const a = r.text.length > 220, t = this.expanded.has(e);
    return s`<li class="rm-rv__card">
      <div class="rm-rv__head">
        <span class="rm-rv__avatar" aria-hidden="true">${r.avatar ? s`<img src=${r.avatar} alt="" loading="lazy" />` : B(r.name)}</span>
        <span class="rm-rv__who">
          <span class="rm-rv__name">${r.name}</span>
          <span class="rm-rv__meta">${r.city}${r.city && r.verified ? " · " : ""}${r.verified ? s`<span class="rm-rv__verified">${m({ ar: "عميل مؤكد", en: "Verified buyer" })}</span>` : l}</span>
        </span>
        ${r.rate ? s`<span class="rm-rv__stars" role="img" aria-label=${`${r.rate}/5`}>${[1, 2, 3, 4, 5].map((i) => s`<span class=${i <= r.rate ? "" : "off"}>★</span>`)}</span>` : l}
      </div>
      ${r.place ? s`<span class="rm-rv__place">${r.place}</span>` : l}
      ${r.bought || r.topics.length ? s`<div class="rm-rv__body">
            ${r.bought ? s`<span class="rm-rv__chip">${m({ ar: "اشترى", en: "Bought" })} <b>${r.bought}</b></span>` : l}
            ${r.topics.map((i) => s`<span class="rm-rv__chip">${i}</span>`)}
          </div>` : l}
      ${r.audio ? this.renderVoice(r, e) : l}
      ${r.text ? s`<p class=${`rm-rv__text${a && !t ? " is-clamped" : ""}`}>${r.text}</p>` : l}
      ${a ? s`<button type="button" class="rm-rv__more" aria-expanded=${t ? "true" : "false"} @click=${() => {
      const i = new Set(this.expanded);
      t ? i.delete(e) : i.add(e), this.expanded = i;
    }}>${t ? m({ ar: "عرض أقل", en: "Show less" }) : m({ ar: "اقرأ المزيد", en: "Read more" })}</button>` : l}
      ${r.images.length ? s`<div class="rm-rv__photos">${r.images.map((i) => s`<button type="button" aria-label=${m({ ar: "تكبير الصورة", en: "Enlarge photo" })}
            @click=${() => this.openPhoto(i)}><img src=${i} alt="" loading="lazy" /></button>`)}</div>` : l}
    </li>`;
  }
  async openPhoto(r) {
    var e, a;
    this.photo = r, await this.updateComplete, (a = (e = this.querySelector(".rm-rv__dialog")) == null ? void 0 : e.showModal) == null || a.call(e);
  }
  closePhoto() {
    var r, e;
    (e = (r = this.querySelector(".rm-rv__dialog")) == null ? void 0 : r.close) == null || e.call(r), this.photo = "";
  }
  renderSummary(r) {
    const e = this.cfg();
    if (e.show_summary === !1) return l;
    const a = $(r.map((o) => o.rate).filter(Boolean)), t = d(e.summary_text), i = y(e.questions, "questions").map((o) => ({ q: d(o.q), a: d(o.a) })).filter((o) => o.q && o.a);
    if (!a.count && !t && !i.length) return l;
    const c = Math.max(1, ...a.dist);
    return s`<div class="rm-rv__summary">
      ${a.count ? s`<div class="rm-rv__score">
            <span class="rm-rv__avg">${a.average.toFixed(1)}</span>
            <span class="rm-rv__stars" role="img" aria-label=${`${a.average}/5`}>${[1, 2, 3, 4, 5].map((o) => s`<span class=${o <= Math.round(a.average) ? "" : "off"}>★</span>`)}</span>
            <span class="rm-rv__count">${m({ ar: `${a.count} تقييم`, en: `${a.count} reviews` })}</span>
            <div class="rm-rv__dist">${a.dist.map((o, h) => s`<div class="rm-rv__distrow"><span>${5 - h}</span>
              <span class="rm-rv__distbar"><span style=${`width:${o / c * 100}%`}></span></span><span>${o}</span></div>`)}</div>
          </div>` : l}
      <div>
        ${t ? s`<p class="rm-rv__said">${t}</p>` : l}
        ${i.length ? s`<div class="rm-rv__qs">${i.map((o, h) => s`<button type="button" class="rm-rv__q" aria-expanded=${this.question === h ? "true" : "false"}
              aria-controls=${this.answerId} @click=${() => this.question = this.question === h ? -1 : h}>${o.q}</button>`)}</div>
            ${this.question >= 0 && i[this.question] ? s`<p class="rm-rv__answer" id=${this.answerId} aria-live="polite">${i[this.question].a}</p>` : l}` : l}
      </div>
    </div>`;
  }
  renderFilters(r) {
    const e = /* @__PURE__ */ new Map();
    for (const t of r) for (const i of t.topics) e.set(i, (e.get(i) || 0) + 1);
    if (e.size < 2) return l;
    const a = [...e.entries()].sort((t, i) => i[1] - t[1]).slice(0, 6);
    return s`<div class="rm-rv__filters" role="group" aria-label=${m({ ar: "التقييمات حسب الموضوع", en: "Reviews by topic" })}>
      <button type="button" class="rm-rv__filter" aria-pressed=${this.topic === "" ? "true" : "false"} @click=${() => this.topic = ""}>${m({ ar: "الكل", en: "All" })}</button>
      ${a.map(([t, i]) => s`<button type="button" class="rm-rv__filter" aria-pressed=${this.topic === t ? "true" : "false"} @click=${() => this.topic = t}>${t} (${i})</button>`)}
    </div>`;
  }
  render() {
    const r = this.reviews(), e = this.renderSummary(r);
    if (!r.length && e === l) return l;
    const a = r.map((t, i) => [t, i]).filter(([t]) => !this.topic || t.topics.includes(this.topic));
    return this.frame(s`${e}
      ${r.length ? this.renderFilters(r) : l}
      ${r.length ? a.length ? s`<ul class="rm-rv__grid">${a.map(([t, i]) => this.renderCard(t, i))}</ul>` : s`<p class="rm-rv__none">${m({ ar: "لا توجد تقييمات عن هذا الموضوع بعد", en: "No reviews on this topic yet" })}</p>` : l}
      ${this.photo ? s`<dialog class="rm-rv__dialog" @close=${() => this.photo = ""} @click=${(t) => {
      t.target === t.currentTarget && this.closePhoto();
    }}>
            <img src=${this.photo} alt="" /><button type="button" class="rm-rv__close" aria-label=${m({ ar: "إغلاق", en: "Close" })} @click=${() => this.closePhoto()}>×</button>
          </dialog>` : l}`, { extraClass: "rm-rv" });
  }
}
g([
  v()
], p.prototype, "players");
g([
  v()
], p.prototype, "peaks");
g([
  v()
], p.prototype, "expanded");
g([
  v()
], p.prototype, "question");
g([
  v()
], p.prototype, "photo");
g([
  v()
], p.prototype, "tried");
g([
  v()
], p.prototype, "topic");
typeof p < "u" && p.registerSallaComponent("salla-reviews");
export {
  p as default
};
