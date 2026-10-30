import { render as X, nothing as p, html as l } from "lit";
import { state as L } from "lit/decorators.js";
import { unsafeHTML as $ } from "lit/directives/unsafe-html.js";
import { e as z, c as G, a as H } from "./buy-D_gsWjfq.js";
import { i as T, d as S, m as B, t as u, e as Z, a as J, o as Q, n as w, l as D } from "./styles-Bs7TKm5O.js";
import { R as V } from "./section-DUtzCvhS.js";
function ee(e) {
  var t;
  let r = 0;
  for (const i of ((t = e.product) == null ? void 0 : t.options) || []) {
    const n = e.options[String(i.id)], a = (i.details || []).find((s) => Number(s.id) === Number(n));
    r += Number(a == null ? void 0 : a.additional_price) || 0;
  }
  return r;
}
function re(e) {
  return !((e == null ? void 0 : e.status) === "out" || (e == null ? void 0 : e.is_available) === !1 || (e == null ? void 0 : e.is_out_of_stock) === !0);
}
const te = "٠١٢٣٤٥٦٧٨٩";
function ne(e) {
  return String(e ?? "").replace(/[٠-٩]/g, (r) => String(te.indexOf(r))).replace(/\s+/g, "").toLowerCase();
}
const ie = /اسود|أسود|ابيض|أبيض|بيج|بني|رمادي|كحلي|ازرق|أزرق|اخضر|أخضر|زيتي|عنابي|نبيتي|احمر|أحمر|وردي|زهري|فوشي|موف|بنفسجي|ليلكي|ذهبي|فضي|نود|كريمي|black|white|beige|brown|grey|gray|navy|blue|green|olive|maroon|burgundy|red|pink|fuchsia|purple|lilac|gold|silver|nude|cream/i, ae = /^(\d{2}\s*-\s*)?(xxs|xs|s|m|l|xl|xxl|xxxl|\dxl)(\s*-\s*\d{2})?$|free\s*size|فري\s*سايز|مقاس\s*واحد/i;
function se(e) {
  const r = ((e == null ? void 0 : e.details) || []).map((n) => ne(n == null ? void 0 : n.name));
  if (!r.length) return null;
  const t = (n) => r.filter(n).length / r.length;
  if ((e == null ? void 0 : e.type) === "color" || t((n) => ie.test(n)) >= 0.5) return "color";
  if (t((n) => ae.test(n)) >= 0.5) return "size";
  const i = r.map((n) => /^\d{2}(\.\d)?(in|inch|انش|إنش|بوصة|")?$/.test(n) ? parseFloat(n) : NaN);
  return i.every((n) => n >= 48 && n <= 66) ? "length" : i.every((n) => n >= 30 && n <= 47) ? "size" : null;
}
function Ae(e, r) {
  const t = Number(e == null ? void 0 : e.quantity);
  return e != null && e.can_show_remained_quantity && !(e != null && e.is_hidden_quantity) && Number.isFinite(t) && t >= 0 ? t : null;
}
function Le(e, r) {
  return e !== null && e > 0 && e <= Math.max(1, r) ? e : null;
}
const oe = {
  size: { ar: "المقاس", en: "Size" },
  length: { ar: "الطول", en: "Length" },
  color: { ar: "اللون", en: "Color" }
};
function Y(e, r) {
  const t = se(e);
  return t ? oe[t][r === "en" ? "en" : "ar"] : String((e == null ? void 0 : e.name) || "");
}
const c = { lines: [], count: 0, total: 0, justAdded: "", demo: !1 }, x = /* @__PURE__ */ new Map();
let ce = 0;
function E() {
  return c;
}
function N() {
  window.dispatchEvent(new CustomEvent("rm:cart-state", { detail: c })), window.dispatchEvent(new Event("rm:cart"));
}
function j() {
  c.count = c.lines.reduce((e, r) => e + r.quantity, 0);
}
function de(e, r = {}, t = "ar") {
  return ((e == null ? void 0 : e.options) || []).map((i) => {
    const n = (i.details || []).find((a) => Number(a.id) === Number(r[String(i.id)]));
    return n ? `${Y(i, t)}: ${n.name}` : "";
  }).filter(Boolean).join(" · ");
}
function M(e) {
  var a;
  const r = ((a = e == null ? void 0 : e.data) == null ? void 0 : a.cart) || (e == null ? void 0 : e.data);
  if (!r || typeof r != "object") return null;
  const t = Array.isArray(r.items) ? r.items : null, i = r.sub_total ?? r.total, n = Number(typeof i == "object" ? i == null ? void 0 : i.amount : i);
  return !t && !Number.isFinite(n) ? null : { items: t, total: Number.isFinite(n) ? n : null };
}
function le(e, r, t) {
  const i = [...e], n = [];
  for (const a of r) {
    const s = String(a.product_id);
    let m = i.findIndex((_) => _.itemId === a.id);
    m < 0 && (m = i.findIndex((_) => _.itemId === null && _.productId === s));
    const o = m >= 0 ? i.splice(m, 1)[0] : null, f = Math.max(1, Number(a.quantity) || 1), d = Number(a.total) > 0 ? Math.round(Number(a.total) / f * 100) / 100 : Number(a.price ?? a.product_price ?? (o == null ? void 0 : o.unit) ?? 0), g = t.get(s);
    n.push({
      key: (o == null ? void 0 : o.key) || `c${a.id}`,
      itemId: a.id,
      productId: s,
      name: (o == null ? void 0 : o.name) || (g == null ? void 0 : g.name) || "",
      image: (o == null ? void 0 : o.image) || (g == null ? void 0 : g.image) || "",
      detail: (o == null ? void 0 : o.detail) || (g == null ? void 0 : g.detail) || "",
      unit: d,
      quantity: f
    });
  }
  return n;
}
async function me() {
  const e = [...new Set(c.lines.filter((r) => !r.name).map((r) => r.productId))];
  e.length && (await Promise.all(
    e.map(async (r) => {
      var i, n, a;
      const t = await B(r);
      t && x.set(r, { name: String(t.name || ""), image: String(((n = (i = t.images) == null ? void 0 : i[0]) == null ? void 0 : n.url) || ((a = t.image) == null ? void 0 : a.url) || "") });
    })
  ), c.lines = c.lines.map((r) => {
    var t, i;
    return r.name ? r : { ...r, name: ((t = x.get(r.productId)) == null ? void 0 : t.name) || u({ ar: "منتج", en: "Product" }), image: ((i = x.get(r.productId)) == null ? void 0 : i.image) || "" };
  }), N());
}
const ue = (e) => Math.round(e * 100) / 100, P = () => ue(c.lines.reduce((e, r) => e + r.unit * r.quantity, 0));
function A(e) {
  const r = M(e);
  return r != null && r.items && (c.lines = le(c.lines, r.items, x)), j(), c.total = (r == null ? void 0 : r.total) ?? P(), N(), me(), !!(r != null && r.items);
}
async function fe() {
  var r, t, i, n;
  if (!T()) {
    c.demo = !0;
    return;
  }
  const e = S();
  try {
    if (await ((r = e == null ? void 0 : e.onReady) == null ? void 0 : r.call(e)), typeof ((i = (t = e == null ? void 0 : e.cart) == null ? void 0 : t.api) == null ? void 0 : i.details) != "function") return;
    const a = await e.cart.api.details();
    (n = M(a)) != null && n.items && A(a);
  } catch {
  }
}
const ge = 15e3;
function pe(e, r) {
  const t = e.map(({ product: i, options: n = {}, quantity: a = 1 }) => {
    var f, d, g;
    const s = String(i.id), m = { name: String(i.name || ""), image: String(((d = (f = i.images) == null ? void 0 : f[0]) == null ? void 0 : d.url) || ((g = i.image) == null ? void 0 : g.url) || ""), detail: de(i, n, r) };
    x.set(s, m);
    const o = (Number(i.sale_price || i.price) || 0) + ee({ product: i, options: n });
    return { key: `p${++ce}`, itemId: null, productId: s, ...m, unit: o, quantity: Math.max(1, a) };
  });
  return c.justAdded = t.map((i) => i.name).filter(Boolean).join("، "), t;
}
function _e(e) {
  c.demo = !0, c.lines = [...c.lines, ...e], j(), c.total = P(), N();
}
async function he(e, r = {}, t = 1, i = "ar") {
  var m, o;
  const n = pe([{ product: e, options: r, quantity: t }], i);
  if (!T()) return _e(n);
  const a = (o = (m = S()) == null ? void 0 : m.cart) == null ? void 0 : o.api;
  if (!(a != null && a.addItem)) throw new Error(z(null));
  c.lines = [...c.lines, ...n];
  let s;
  try {
    s = await Promise.race([
      a.addItem({ id: e.id, quantity: t, options: Object.keys(r).length ? r : void 0 }),
      new Promise((f, d) => window.setTimeout(() => d(new Error(z(null))), ge))
    ]);
  } catch (f) {
    throw c.lines = c.lines.filter((d) => !n.includes(d)), c.justAdded = "", new Error(z(f));
  }
  A(s) || await F();
}
async function F() {
  var e, r;
  try {
    const t = (r = (e = S()) == null ? void 0 : e.cart) == null ? void 0 : r.api;
    if (typeof (t == null ? void 0 : t.details) == "function" && A(await t.details())) return;
  } catch {
  }
  j(), N();
}
function K(e) {
  return c.demo || e.itemId !== null;
}
async function be(e) {
  var a, s, m;
  const r = c.lines.find((o) => o.key === e);
  if (!r || !K(r)) return;
  const t = () => {
    c.lines = c.lines.filter((o) => o.key !== e), j();
  };
  if (c.demo) {
    t(), c.total = P(), N();
    return;
  }
  const i = (s = (a = S()) == null ? void 0 : a.cart) == null ? void 0 : s.api;
  if (!(i != null && i.deleteItem)) throw new Error(z(null));
  const n = await i.deleteItem(r.itemId);
  if ((m = M(n)) != null && m.items) return void A(n);
  t(), await F();
}
function ye(e, r) {
  const t = r.filter((s) => s.amount > 0 && s.reward).sort((s, m) => s.amount - m.amount), i = t.filter((s) => e >= s.amount).length, n = t[i] || null, a = t.length ? t[t.length - 1].amount : 0;
  return {
    reached: i,
    next: n,
    left: n ? Math.max(0, Math.round((n.amount - e) * 100) / 100) : 0,
    percent: a ? Math.min(100, Math.round(e / a * 100)) : 0
  };
}
function ve(e) {
  const r = Number(e == null ? void 0 : e.regular_price) || 0, t = Number((e == null ? void 0 : e.sale_price) || (e == null ? void 0 : e.price)) || 0;
  return r > t && t > 0 ? Math.round((r - t) / r * 100) : 0;
}
const $e = `
.rm-cd { position: fixed; inset: 0; z-index: 60; pointer-events: none; background: transparent; }
.rm-cd__fab { position: fixed; inset-inline-start: max(1rem, env(safe-area-inset-left, 0px)); bottom: calc(1rem + var(--rm-sb-h, 0px) + env(safe-area-inset-bottom, 0px));
  display: inline-flex; align-items: center; gap: .5rem; min-height: 3.25rem; padding: 0 1.125rem; border: 0; border-radius: 999px; pointer-events: auto;
  background: var(--rm-title); color: var(--rm-bg); font: inherit; font-weight: 800; box-shadow: 0 12px 30px -10px rgb(0 0 0 / 45%); cursor: pointer; }
.rm-cd__fab b { min-width: 1.5rem; height: 1.5rem; display: grid; place-items: center; padding: 0 .375rem; border-radius: 999px; background: var(--rm-accent); color: var(--rm-accent-text); font-size: .8125rem; }
.rm-cd__fab:focus-visible { outline: 3px solid var(--rm-accent-ink); outline-offset: 3px; }
.rm-cd__shade { position: fixed; inset: 0; background: rgb(0 0 0 / 45%); opacity: 0; transition: opacity .25s ease; }
.rm-cd.is-open .rm-cd__shade { opacity: 1; pointer-events: auto; }
.rm-cd__panel { position: fixed; top: 0; bottom: 0; inset-inline-end: 0; width: min(26rem, 100vw); display: flex; flex-direction: column; background: var(--rm-bg); color: var(--rm-text);
  box-shadow: 0 0 40px rgb(0 0 0 / 25%); transform: translateX(105%); transition: transform .3s ease, visibility .3s; pointer-events: auto; visibility: hidden; outline: none; }
.rm-cd.is-rtl .rm-cd__panel { transform: translateX(-105%); }
.rm-cd.is-open .rm-cd__panel, .rm-cd.is-rtl.is-open .rm-cd__panel { transform: none; visibility: visible; transition: transform .3s ease, visibility 0s; }
.rm-cd__head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 1.125rem; border-bottom: 1px solid color-mix(in srgb, var(--rm-text) 12%, transparent); }
.rm-cd__head h2 { margin: 0; font-size: 1.125rem; font-weight: 900; color: var(--rm-title); }
.rm-cd__x { width: 2.75rem; height: 2.75rem; border: 0; border-radius: 999px; background: var(--rm-card); color: var(--rm-title); font-size: 1.5rem; cursor: pointer; }
.rm-cd .rm-cd__added { margin: .75rem 1.125rem 0; padding: .625rem .875rem; border-radius: .75rem; background: color-mix(in srgb, #12b76a 14%, var(--rm-bg)); color: #067647; font-weight: 700; font-size: .875rem; }
html.rm-mode-dark .rm-cd__added { color: #6ce9a6; }
.rm-cd .rm-cd__list { flex: 1 1 auto; overflow-y: auto; display: grid; align-content: start; gap: .75rem; margin: 0; padding: 1rem 1.125rem; list-style: none; }
.rm-cd__line { display: grid; grid-template-columns: 4rem minmax(0, 1fr) auto; gap: .75rem; align-items: center; }
.rm-cd__line img, .rm-cd__ph { width: 4rem; height: 4rem; border-radius: .75rem; object-fit: cover; background: var(--rm-card); }
.rm-cd__name { display: block; font-weight: 700; color: var(--rm-title); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.rm-cd__meta { display: block; font-size: .8125rem; }
.rm-cd__del { width: 2.75rem; height: 2.75rem; border: 0; border-radius: .625rem; background: none; color: var(--rm-text); cursor: pointer; font-size: 1.125rem; }
.rm-cd__del:hover { background: var(--rm-card); color: #d92d20; }
.rm-cd .rm-cd__empty { padding: 2rem 1rem; text-align: center; }
.rm-cd__foot { display: grid; gap: .75rem; padding: 1rem 1.125rem calc(1rem + env(safe-area-inset-bottom, 0px)); border-top: 1px solid color-mix(in srgb, var(--rm-text) 12%, transparent); }
.rm-cd__tier { display: grid; gap: .375rem; font-size: .875rem; font-weight: 700; color: var(--rm-title); }
.rm-cd__track { height: .5rem; border-radius: 999px; background: color-mix(in srgb, var(--rm-text) 15%, transparent); overflow: hidden; }
.rm-cd__track span { display: block; height: 100%; background: var(--rm-accent); }
.rm-cd__total { display: flex; justify-content: space-between; font-size: 1.125rem; font-weight: 900; color: var(--rm-title); }
.rm-cd .rm-cd__note { margin: 0; font-size: .8125rem; text-align: center; }
.rm-cd__ghost { background: transparent; color: var(--rm-title); border-color: color-mix(in srgb, var(--rm-text) 30%, transparent); }
@media (prefers-reduced-motion: reduce) { .rm-cd__panel, .rm-cd__shade { transition: none; } }
`;
let h = null, k = !1, I = !1, v = "", y = null;
function O() {
  return window.__rmTiers || [];
}
function C() {
  var e;
  k = !1, E().justAdded = "", b(), (e = y == null ? void 0 : y.focus) == null || e.call(y);
}
function U() {
  var e;
  W(), y = document.activeElement, k = !0, b(), (e = h == null ? void 0 : h.querySelector(".rm-cd__panel")) == null || e.focus({ preventScroll: !0 });
}
async function we() {
  if (I || E().demo) return;
  I = !0, v = "", b();
  const e = await G();
  I = !1, e || (v = u({ ar: "تعذر فتح صفحة الدفع، حاول مرة أخرى", en: "Could not open checkout, please try again" })), b();
}
async function xe(e) {
  v = "";
  try {
    await be(e);
  } catch {
    v = u({ ar: "تعذر حذف المنتج، حاول مرة أخرى", en: "Could not remove the item, please try again" }), b();
  }
}
function b() {
  if (!h) return;
  const e = E(), r = O().length ? ye(e.total, O()) : null;
  X(l`
    <div class="rm-cd__shade" @click=${C}></div>
    ${e.count && !k ? l`<button type="button" class="rm-cd__fab" aria-label=${u({ ar: `السلة، ${e.count} قطع`, en: `Cart, ${e.count} items` })} @click=${U}>
          🛍️ ${u({ ar: "سلتك", en: "Your cart" })} <b>${e.count}</b></button>` : p}
    <aside class="rm-cd__panel" role="dialog" aria-modal="false" aria-label=${u({ ar: "سلتك", en: "Your cart" })} tabindex="-1">
      <div class="rm-cd__head"><h2>${u({ ar: "سلتك", en: "Your cart" })} (${e.count})</h2>
        <button type="button" class="rm-cd__x" aria-label=${u({ ar: "إغلاق", en: "Close" })} @click=${C}>×</button></div>
      ${e.justAdded ? l`<p class="rm-cd__added" role="status">✓ ${u({ ar: `أُضيف للسلة: ${e.justAdded}`, en: `Added: ${e.justAdded}` })}</p>` : p}
      ${e.lines.length ? l`<ul class="rm-cd__list">${e.lines.map((t) => l`<li class="rm-cd__line">
            ${t.image ? l`<img src=${t.image} alt="" loading="lazy" />` : l`<span class="rm-cd__ph"></span>`}
            <span><span class="rm-cd__name">${t.name}</span>${t.detail ? l`<span class="rm-cd__meta">${t.detail}</span>` : p}
              <span class="rm-cd__meta">${t.quantity} × ${$(w(t.unit))}</span></span>
            ${K(t) ? l`<button type="button" class="rm-cd__del" aria-label=${u({ ar: `احذف ${t.name}`, en: `Remove ${t.name}` })} @click=${() => xe(t.key)}>🗑</button>` : l`<span></span>`}
          </li>`)}</ul>` : l`<p class="rm-cd__empty">${u({ ar: "سلتك فاضية، اختر من المنتجات", en: "Your cart is empty, pick a product" })}</p>`}
      <div class="rm-cd__foot">
        ${r && e.lines.length ? l`<div class="rm-cd__tier">${r.next ? l`<span>${u({ ar: "باقي", en: "Only" })} ${$(w(r.left))} ${u({ ar: `وتحصل على ${r.next.reward}`, en: `more for ${r.next.reward}` })}</span>` : l`<span>${u({ ar: "وصلت لأعلى مستوى 🎉", en: "You reached the top tier" })}</span>`}
              <div class="rm-cd__track"><span style=${`width:${r.percent}%`}></span></div></div>` : p}
        <div class="rm-cd__total"><span>${u({ ar: "الإجمالي", en: "Total" })}</span><span>${$(w(e.total))}</span></div>
        <button type="button" class="rm-btn" aria-busy=${I ? "true" : "false"} ?disabled=${!e.lines.length || e.demo} @click=${we}>${u({ ar: "إتمام الطلب", en: "Complete the order" })}</button>
        ${e.demo ? l`<p class="rm-cd__note">${u({ ar: "دي معاينة: الدفع بيشتغل في صفحة الهبوط في متجرك", en: "Preview only: checkout works on your store's landing page" })}</p>` : p}
        <button type="button" class="rm-btn rm-cd__ghost" @click=${C}>${u({ ar: "كمّل التسوّق", en: "Keep shopping" })}</button>
        ${v ? l`<p class="rm-error" role="alert">${v}</p>` : p}
      </div>
    </aside>`, h), h.classList.toggle("is-open", k);
}
function W() {
  h || (Z(), J("rm-cart-drawer", $e), h = document.createElement("div"), h.className = `rm-cd rm-block rm-auto${Q() ? " is-rtl" : ""}`, document.body.appendChild(h), window.addEventListener("rm:cart-state", () => b()), document.addEventListener("keydown", (e) => {
    k && e.key === "Escape" && C();
  }), b(), fe());
}
var ke = Object.defineProperty, q = (e, r, t, i) => {
  for (var n = void 0, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (n = s(r, t, n) || n);
  return n && ke(r, t, n), n;
};
function Ee(e, r = 24) {
  const t = Array.isArray(e) ? e : typeof e == "string" ? e.split(",") : e ? [e] : [];
  return [...new Set(t.map((i) => String((i && typeof i == "object" ? i.value ?? i.id : i) ?? "").trim()).filter(Boolean))].slice(0, r);
}
async function Me(e) {
  return (await Promise.all(e.map((r) => B(r)))).filter((r) => r && re(r));
}
const Pe = `
.rm-card { display: flex; flex-direction: column; min-width: 0; border-radius: 1.25rem; background: var(--rm-card); overflow: hidden; }
.rm-card__img { position: relative; aspect-ratio: 1 / 1; background: var(--rm-bg); }
.rm-card__img img { width: 100%; height: 100%; object-fit: cover; }
.rm-card__off { position: absolute; top: .625rem; inset-inline-start: .625rem; padding: .25rem .625rem; border-radius: .5rem; background: #d92d20; color: #fff;
  font-size: .8125rem; font-weight: 800; }
.rm-card__tag { position: absolute; bottom: .625rem; inset-inline-start: .625rem; padding: .125rem .625rem; border-radius: 999px; background: var(--rm-title);
  color: var(--rm-bg); font-size: .75rem; font-weight: 700; }
.rm-card__body { display: flex; flex-direction: column; gap: .5rem; padding: .875rem; flex: 1 1 auto; }
.rm-card__name { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-weight: 700; font-size: .9375rem; line-height: 1.5; color: var(--rm-title); }
.rm-card__price { display: flex; flex-wrap: wrap; gap: .5rem; align-items: baseline; font-weight: 900; font-size: 1.125rem; color: #d92d20; }
.rm-block.rm-dark .rm-card__price, html.rm-mode-dark .rm-auto .rm-card__price { color: #ff8a80; }
.rm-card__price s { font-weight: 500; font-size: .8125rem; color: var(--rm-text); opacity: .75; }
.rm-card__body select { width: 100%; min-height: 2.75rem; padding: 0 .625rem; border: 1px solid color-mix(in srgb, var(--rm-text) 25%, transparent); border-radius: .625rem;
  background: var(--rm-bg); color: var(--rm-title); font: inherit; font-size: .875rem; }
.rm-card__body select[aria-invalid="true"] { border-color: #d92d20; }
.rm-card__ask { align-self: center; padding: .25rem; color: var(--rm-title); font-size: .875rem; font-weight: 700; text-decoration: underline; text-underline-offset: .25rem; }
.rm-card__body .rm-btn { margin-top: auto; padding-inline: .75rem; font-size: .9375rem; }
`;
class R extends V {
  constructor() {
    super(...arguments), this.picks = {}, this.invalid = {}, this.pressing = "";
  }
  connectedCallback() {
    super.connectedCallback(), W();
  }
  pick(r, t, i) {
    const n = { ...this.picks[r] || {} };
    i ? n[String(t)] = Number(i) : delete n[String(t)], this.picks = { ...this.picks, [r]: n }, this.invalid[r] && (this.invalid = { ...this.invalid, [r]: this.invalid[r].filter((a) => a !== t) });
  }
  /**
   * Adds the card's product to the cart and opens the side cart. Options the section already chose (a warmth
   * level, a bed size) come in preset; the shopper's own picks win. Extras are simple products added after it.
   */
  async buyCard(r, t = {}) {
    var m, o, f;
    const i = String(r.id), n = { ...t.options || {}, ...this.picks[i] || {} }, a = [{ product: r, chosen: n }, ...(t.extras || []).map((d) => ({ product: d, chosen: this.picks[String(d.id)] || {} }))], s = {};
    for (const d of a) {
      const g = (d.product.options || []).filter((_) => (_ == null ? void 0 : _.required) && (_.details || []).length && !d.chosen[String(_.id)]).map((_) => Number(_.id));
      g.length && (s[String(d.product.id)] = g);
    }
    if (Object.keys(s).length) {
      this.invalid = { ...this.invalid, ...s }, await this.updateComplete, (m = this.querySelector('select[aria-invalid="true"]')) == null || m.focus();
      return;
    }
    if (!this.pressing) {
      this.pressing = i, this.error = "";
      try {
        for (const d of a) await he(d.product, d.chosen, 1, D());
        U();
      } catch (d) {
        this.error = (d == null ? void 0 : d.message) || "", (f = (o = S()) == null ? void 0 : o.error) == null || f.call(o, this.error);
      } finally {
        this.pressing = "";
      }
    }
  }
  /** The required option pickers of a product, each tied to its card for focus on a missed choice. */
  renderPickers(r, t = {}) {
    const i = String(r.id), n = this.invalid[i] || [];
    return (r.options || []).filter((s) => (s == null ? void 0 : s.required) && (s.details || []).length && !(String(s.id) in t)).map((s) => {
      const m = `rm-${this.styleId}-${i}-${s.id}`, o = Y(s, D());
      return l`<label class="rm-visually-hidden" for=${m}>${o}</label>
        <select id=${m} aria-invalid=${n.includes(Number(s.id)) ? "true" : "false"} @change=${(f) => this.pick(i, s.id, f.target.value)}>
          <option value="">${u({ ar: `اختر ${o}`, en: `Choose ${o}` })}</option>
          ${s.details.map((f) => l`<option value=${f.id} ?disabled=${f.is_out}>${f.name}</option>`)}
        </select>`;
    });
  }
  renderBuy(r, t, i = {}) {
    const n = String(r.id);
    return H({ items: [{ id: n, quantity: 1 }] }) !== "none" ? l`<button type="button" class="rm-btn" aria-busy=${this.pressing === n ? "true" : "false"} @click=${() => this.buyCard(r, i)}>${t || this.buyLabel()}</button>` : p;
  }
  /** "Ask for it as a gift": WhatsApp opens with the product and this page, ready to send to family. */
  askLink(r) {
    const t = u({ ar: `ودّي بهذي هدية رمضان 🌙
${r.name}
${location.href.split("#")[0]}`, en: `I'd love this as a Ramadan gift 🌙
${r.name}
${location.href.split("#")[0]}` });
    return l`<a class="rm-card__ask" href=${`https://wa.me/?text=${encodeURIComponent(t)}`} target="_blank" rel="noopener">🎁 ${u({ ar: "اطلبها هدية", en: "Ask for it as a gift" })}</a>`;
  }
  renderCard(r, t = {}) {
    var o, f, d, g;
    const i = String(r.id), n = Number(r.sale_price || r.price) || 0, a = Number(r.regular_price) || 0, s = ve(r), m = ((f = (o = r.images) == null ? void 0 : o[0]) == null ? void 0 : f.url) || ((d = r.image) == null ? void 0 : d.url);
    return l`<li class="rm-card" data-card=${i}>
      <div class="rm-card__img">
        ${m ? l`<img src=${m} alt=${((g = r.image) == null ? void 0 : g.alt) || ""} loading="lazy" />` : p}
        ${s ? l`<span class="rm-card__off">${u({ ar: `خصم ${s}%`, en: `${s}% off` })}</span>` : p}
        ${t.tag ? l`<span class="rm-card__tag">${t.tag}</span>` : p}
      </div>
      <div class="rm-card__body">
        <span class="rm-card__name">${r.name}</span>
        <span class="rm-card__price">${$(w(n))}${a > n ? l`<s>${$(w(a))}</s>` : p}</span>
        ${t.extra ?? p}
        ${this.renderPickers(r)}
        ${this.renderBuy(r, t.buyText)}
        ${t.ask ? this.askLink(r) : p}
      </div>
    </li>`;
  }
}
q([
  L()
], R.prototype, "picks");
q([
  L()
], R.prototype, "invalid");
q([
  L()
], R.prototype, "pressing");
export {
  R as D,
  Le as a,
  Pe as c,
  ve as d,
  W as e,
  Me as l,
  Ee as p,
  Ae as r
};
