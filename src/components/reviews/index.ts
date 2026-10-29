import { html, nothing } from "lit";
import { state } from "lit/decorators.js";
import { loadPeaks, type PlayerState, VoicePlayer } from "../../utils/audio";
import { getCollectionItems, resolveText, t } from "../../utils/config";
import { formatTime, ratingSummary, seededBars, topicsOf } from "../../utils/reviews";
import { RmSection } from "../../utils/section";

type Item = { name: unknown; city: unknown; place: unknown; rate: unknown; text: unknown; audio_url: unknown; image_1: unknown; image_2: unknown;
  image_3: unknown; avatar: unknown; verified: unknown; bought: unknown; topics: unknown };
type Question = { q: unknown; a: unknown };
type Review = { name: string; city: string; place: string; rate: number; text: string; audio: string; images: string[]; avatar: string; verified: boolean;
  bought: string; topics: string[] };

const BARS = 40;
let instances = 0;
const RATES = [1, 1.5, 2];
const css = `
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
`;

const PLAY = html`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z" /></svg>`;
const PAUSE = html`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>`;

function initials(name: string): string {
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "؟";
}

function safeUrl(value: unknown): string {
  const url = String(value || "").trim();
  return /^(https?:)?\/\//i.test(url) || url.startsWith("/") ? url : "";
}

export default class Reviews extends RmSection {
  protected readonly styleId = "reviews";
  @state() private players: Record<number, PlayerState> = {};
  @state() private peaks: Record<number, number[]> = {};
  @state() private expanded = new Set<number>();
  @state() private question = -1;
  @state() private photo = "";
  @state() private tried = new Set<number>();
  @state() private topic = "";
  private voice = new Map<number, VoicePlayer>();
  private answerId = `rm-rv-answer-${++instances}`;
  private observer?: IntersectionObserver;

  protected styles() {
    return css;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.voice.forEach((p) => p.destroy());
    this.voice.clear();
    this.observer?.disconnect();
    this.observer = undefined;
    // Moved in the editor: everything attaches again on the next connect
    this.querySelectorAll<HTMLElement>("[data-watched]").forEach((el) => delete el.dataset.watched);
  }

  connectedCallback() {
    super.connectedCallback();
    this.requestUpdate();
  }

  private reviews(): Review[] {
    return getCollectionItems<Item>(this.cfg().items, "items")
      .map((item) => ({
        name: resolveText(item.name),
        city: resolveText(item.city),
        place: resolveText(item.place),
        rate: Math.min(Math.max(Math.round(Number(item.rate) || 0), 0), 5),
        text: resolveText(item.text),
        audio: safeUrl(item.audio_url),
        images: [item.image_1, item.image_2, item.image_3].map((i) => String(i || "")).filter(Boolean),
        avatar: String(item.avatar || ""),
        verified: item.verified !== false,
        bought: resolveText(item.bought),
        topics: topicsOf(resolveText(item.topics)),
      }))
      // A review needs something to say: words, a voice note or photos
      .filter((r) => r.text || r.audio || r.images.length);
  }

  protected updated() {
    // Players attach to their audio elements once, and waveforms load when a card comes into view
    this.querySelectorAll<HTMLAudioElement>("audio[data-i]").forEach((audio) => {
      const i = Number(audio.dataset.i);
      if (this.voice.has(i)) return;
      const player = new VoicePlayer(audio);
      player.onState((s) => (this.players = { ...this.players, [i]: s }));
      this.voice.set(i, player);
    });
    if (!this.observer && typeof IntersectionObserver !== "undefined") {
      this.observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          this.observer!.unobserve(el);
          const i = Number(el.dataset.i);
          loadPeaks(el.dataset.src || "", BARS).then((bars) => (this.peaks = { ...this.peaks, [i]: bars }));
        }
      }, { rootMargin: "200px" });
    }
    this.querySelectorAll<HTMLElement>(".rm-rv__voice[data-src]:not([data-watched])").forEach((el) => {
      el.dataset.watched = "1";
      if (this.observer) this.observer.observe(el);
      else this.peaks = { ...this.peaks, [Number(el.dataset.i)]: seededBars(el.dataset.src || "", BARS) };
    });
  }

  private seek(e: MouseEvent, i: number) {
    // Enter or Space on the wave reports no pointer position; the arrow keys handle the keyboard
    if (e.detail === 0) return;
    const box = (e.currentTarget as HTMLElement).getBoundingClientRect();
    this.voice.get(i)?.seek((e.clientX - box.left) / box.width);
  }

  private seekKey(e: KeyboardEvent, i: number) {
    const step = e.key === "ArrowRight" ? 0.1 : e.key === "ArrowLeft" ? -0.1 : 0;
    if (!step) return;
    e.preventDefault();
    const s = this.players[i];
    if (s?.duration) this.voice.get(i)?.seek(s.time / s.duration + step);
  }

  private play(i: number) {
    this.tried = new Set(this.tried).add(i);
    this.voice.get(i)?.toggle();
  }

  private renderVoice(r: Review, i: number) {
    const s = this.players[i] || { playing: false, time: 0, duration: 0, rate: 1, error: false };
    const bars = this.peaks[i] || seededBars(r.audio, BARS);
    const done = s.duration ? s.time / s.duration : 0;
    const nextRate = RATES[(RATES.indexOf(s.rate) + 1) % RATES.length];
    return html`<div class="rm-rv__voice" data-i=${i} data-src=${r.audio}>
        <audio data-i=${i} src=${r.audio} preload="metadata"></audio>
        <button type="button" class="rm-rv__play" aria-label=${s.playing ? t({ ar: "إيقاف", en: "Pause" }) : t({ ar: `تشغيل رأي ${r.name}`, en: `Play ${r.name}'s review` })}
          @click=${() => this.play(i)}>${s.playing ? PAUSE : PLAY}</button>
        <button type="button" class="rm-rv__wave" aria-label=${t({ ar: "انتقل في التسجيل بالأسهم", en: "Seek in the recording with the arrow keys" })}
          @click=${(e: MouseEvent) => this.seek(e, i)} @keydown=${(e: KeyboardEvent) => this.seekKey(e, i)}>
          ${bars.map((b, k) => html`<span class=${k / bars.length < done ? "is-done" : ""} style=${`height:${Math.round(b * 100)}%`}></span>`)}
        </button>
        <span class="rm-rv__time">${formatTime(s.playing || s.time ? s.time : s.duration)}</span>
        <button type="button" class="rm-rv__rate" aria-label=${t({ ar: "سرعة التشغيل", en: "Playback speed" })} @click=${() => this.voice.get(i)?.setRate(nextRate)}>${s.rate}x</button>
      </div>
      ${s.error && this.tried.has(i) ? html`<span class="rm-rv__voice-error" role="alert">${t({ ar: "تعذّر تشغيل التسجيل", en: "The recording could not be played" })}</span>` : nothing}`;
  }

  private renderCard(r: Review, i: number) {
    const long = r.text.length > 220;
    const open = this.expanded.has(i);
    return html`<li class="rm-rv__card">
      <div class="rm-rv__head">
        <span class="rm-rv__avatar" aria-hidden="true">${r.avatar ? html`<img src=${r.avatar} alt="" loading="lazy" />` : initials(r.name)}</span>
        <span class="rm-rv__who">
          <span class="rm-rv__name">${r.name}</span>
          <span class="rm-rv__meta">${r.city}${r.city && r.verified ? " · " : ""}${r.verified ? html`<span class="rm-rv__verified">${t({ ar: "عميل مؤكد", en: "Verified buyer" })}</span>` : nothing}</span>
        </span>
        ${r.rate ? html`<span class="rm-rv__stars" role="img" aria-label=${`${r.rate}/5`}>${[1, 2, 3, 4, 5].map((n) => html`<span class=${n <= r.rate ? "" : "off"}>★</span>`)}</span>` : nothing}
      </div>
      ${r.place ? html`<span class="rm-rv__place">${r.place}</span>` : nothing}
      ${r.bought || r.topics.length
        ? html`<div class="rm-rv__body">
            ${r.bought ? html`<span class="rm-rv__chip">${t({ ar: "اشترى", en: "Bought" })} <b>${r.bought}</b></span>` : nothing}
            ${r.topics.map((x) => html`<span class="rm-rv__chip">${x}</span>`)}
          </div>`
        : nothing}
      ${r.audio ? this.renderVoice(r, i) : nothing}
      ${r.text ? html`<p class=${`rm-rv__text${long && !open ? " is-clamped" : ""}`}>${r.text}</p>` : nothing}
      ${long ? html`<button type="button" class="rm-rv__more" aria-expanded=${open ? "true" : "false"} @click=${() => {
          const next = new Set(this.expanded);
          open ? next.delete(i) : next.add(i);
          this.expanded = next;
        }}>${open ? t({ ar: "عرض أقل", en: "Show less" }) : t({ ar: "اقرأ المزيد", en: "Read more" })}</button>` : nothing}
      ${r.images.length
        ? html`<div class="rm-rv__photos">${r.images.map((src) => html`<button type="button" aria-label=${t({ ar: "تكبير الصورة", en: "Enlarge photo" })}
            @click=${() => this.openPhoto(src)}><img src=${src} alt="" loading="lazy" /></button>`)}</div>`
        : nothing}
    </li>`;
  }

  private async openPhoto(src: string) {
    this.photo = src;
    await this.updateComplete;
    this.querySelector<HTMLDialogElement>(".rm-rv__dialog")?.showModal?.();
  }

  private closePhoto() {
    this.querySelector<HTMLDialogElement>(".rm-rv__dialog")?.close?.();
    this.photo = "";
  }

  private renderSummary(reviews: Review[]) {
    const cfg = this.cfg();
    if (cfg.show_summary === false) return nothing;
    const sum = ratingSummary(reviews.map((r) => r.rate).filter(Boolean));
    const said = resolveText(cfg.summary_text);
    const questions = getCollectionItems<Question>(cfg.questions, "questions")
      .map((q) => ({ q: resolveText(q.q), a: resolveText(q.a) }))
      .filter((q) => q.q && q.a);
    if (!sum.count && !said && !questions.length) return nothing;
    const max = Math.max(1, ...sum.dist);
    return html`<div class="rm-rv__summary">
      ${sum.count
        ? html`<div class="rm-rv__score">
            <span class="rm-rv__avg">${sum.average.toFixed(1)}</span>
            <span class="rm-rv__stars" role="img" aria-label=${`${sum.average}/5`}>${[1, 2, 3, 4, 5].map((n) => html`<span class=${n <= Math.round(sum.average) ? "" : "off"}>★</span>`)}</span>
            <span class="rm-rv__count">${t({ ar: `${sum.count} تقييم`, en: `${sum.count} reviews` })}</span>
            <div class="rm-rv__dist">${sum.dist.map((n, k) => html`<div class="rm-rv__distrow"><span>${5 - k}</span>
              <span class="rm-rv__distbar"><span style=${`width:${(n / max) * 100}%`}></span></span><span>${n}</span></div>`)}</div>
          </div>`
        : nothing}
      <div>
        ${said ? html`<p class="rm-rv__said">${said}</p>` : nothing}
        ${questions.length
          ? html`<div class="rm-rv__qs">${questions.map((q, k) => html`<button type="button" class="rm-rv__q" aria-expanded=${this.question === k ? "true" : "false"}
              aria-controls=${this.answerId} @click=${() => (this.question = this.question === k ? -1 : k)}>${q.q}</button>`)}</div>
            ${this.question >= 0 && questions[this.question]
              ? html`<p class="rm-rv__answer" id=${this.answerId} aria-live="polite">${questions[this.question].a}</p>`
              : nothing}`
          : nothing}
      </div>
    </div>`;
  }

  private renderFilters(reviews: Review[]) {
    const counts = new Map<string, number>();
    for (const r of reviews) for (const x of r.topics) counts.set(x, (counts.get(x) || 0) + 1);
    // Filtering helps only when the reviews talk about more than one thing
    if (counts.size < 2) return nothing;
    const topics = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
    return html`<div class="rm-rv__filters" role="group" aria-label=${t({ ar: "التقييمات حسب الموضوع", en: "Reviews by topic" })}>
      <button type="button" class="rm-rv__filter" aria-pressed=${this.topic === "" ? "true" : "false"} @click=${() => (this.topic = "")}>${t({ ar: "الكل", en: "All" })}</button>
      ${topics.map(([x, n]) => html`<button type="button" class="rm-rv__filter" aria-pressed=${this.topic === x ? "true" : "false"} @click=${() => (this.topic = x)}>${x} (${n})</button>`)}
    </div>`;
  }

  render() {
    const reviews = this.reviews();
    const summary = this.renderSummary(reviews);
    if (!reviews.length && summary === nothing) return nothing;
    // Indexes stay those of the full list, so each voice player keeps its card
    const shown = reviews.map((r, i) => [r, i] as const).filter(([r]) => !this.topic || r.topics.includes(this.topic));
    return this.frame(html`${summary}
      ${reviews.length ? this.renderFilters(reviews) : nothing}
      ${reviews.length
        ? shown.length
          ? html`<ul class="rm-rv__grid">${shown.map(([r, i]) => this.renderCard(r, i))}</ul>`
          : html`<p class="rm-rv__none">${t({ ar: "لا توجد تقييمات عن هذا الموضوع بعد", en: "No reviews on this topic yet" })}</p>`
        : nothing}
      ${this.photo
        ? html`<dialog class="rm-rv__dialog" @close=${() => (this.photo = "")} @click=${(e: Event) => { if (e.target === e.currentTarget) this.closePhoto(); }}>
            <img src=${this.photo} alt="" /><button type="button" class="rm-rv__close" aria-label=${t({ ar: "إغلاق", en: "Close" })} @click=${() => this.closePhoto()}>×</button>
          </dialog>`
        : nothing}`, { extraClass: "rm-rv" });
  }
}
