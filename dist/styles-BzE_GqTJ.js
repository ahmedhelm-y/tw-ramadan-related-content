function bt(t) {
  return t ? t.component && typeof t.component == "object" ? t.component : t : {};
}
function O() {
  var t, e, n;
  return ((n = (e = (t = window.Salla) == null ? void 0 : t.lang) == null ? void 0 : e.getLocale) == null ? void 0 : n.call(e)) || document.documentElement.lang || "ar";
}
function yt() {
  return (document.documentElement.dir || (O() === "ar" ? "rtl" : "ltr")) === "rtl";
}
function kt(t) {
  if (t == null || t === "") return "";
  if (typeof t == "string") return t;
  if (typeof t == "object") {
    const e = t, n = O() === "en" ? "en" : "ar";
    return e[n] || e[n === "en" ? "ar" : "en"] || "";
  }
  return String(t);
}
function R(t) {
  return O() === "ar" ? t.ar : t.en;
}
function Y(t) {
  var e;
  return Array.isArray(t) ? ((e = t[0]) == null ? void 0 : e.value) ?? t[0] ?? "" : t && typeof t == "object" && "value" in t ? t.value : t ?? "";
}
function wt(t, e) {
  return Array.isArray(t) ? t.map((n) => {
    if (!n || typeof n != "object") return {};
    const r = {};
    for (const [o, i] of Object.entries(n))
      r[o.startsWith(`${e}.`) ? o.slice(e.length + 1) : o] = i;
    return r;
  }) : [];
}
function xt(t) {
  return String(t ?? "").trim().replace(/^#+/, "").trim();
}
function vt(t) {
  const e = String(t ?? "").trim();
  return e ? /^(https?:|mailto:|tel:)/i.test(e) ? e : /^[a-z][a-z0-9+.-]*:/i.test(e) ? "" : /^[\w-]+(\.[\w-]+)+/.test(e) ? `https://${e}` : "" : "";
}
function f() {
  return window.Salla;
}
function L() {
  var t, e;
  return ((e = (t = f()) == null ? void 0 : t.config) == null ? void 0 : e.get("theme.settings")) || {};
}
function E() {
  var t, e;
  return ((e = (t = f()) == null ? void 0 : t.config) == null ? void 0 : e.get("page.is_landing_page")) === !0;
}
function B() {
  var e;
  const t = L().page_for_product;
  return typeof t == "boolean" || t === void 0 || t === null ? t === !1 ? "promotion" : "product" : typeof t == "string" ? t === "promotion" ? "promotion" : "product" : Array.isArray(t) && ((e = t[0]) == null ? void 0 : e.value) === "promotion" ? "promotion" : "product";
}
function I() {
  var e, n;
  if (!E() || B() !== "product") return null;
  const t = (n = (e = L().product) == null ? void 0 : e.value) == null ? void 0 : n[0];
  return t ? String(t) : null;
}
function U() {
  const t = L();
  return { text: String(t.main_btn_text || ""), url: String(t.main_btn_url || "") };
}
const Q = "1616473", W = ["images", "rating", "sold_quantity", "options"];
async function C(t, e) {
  var n;
  try {
    const r = W.map((c) => `with[]=${c}`).join("&"), i = await (await fetch(`https://api.salla.dev/store/v1/products/${t}/details?${r}`, {
      headers: { "store-identifier": e, "accept-language": document.documentElement.lang === "en" ? "en" : "ar" }
    })).json();
    return (n = i == null ? void 0 : i.data) != null && n.id ? i.data : null;
  } catch {
    return null;
  }
}
async function $t(t) {
  var r, o, i, c;
  const e = f();
  if (!t) return null;
  await ((r = e == null ? void 0 : e.onReady) == null ? void 0 : r.call(e));
  const n = String(((o = e == null ? void 0 : e.config) == null ? void 0 : o.get("store.id")) || "");
  if (E()) {
    if (String(t) !== I()) return n ? C(t, n) : null;
    try {
      const a = await ((i = e == null ? void 0 : e.product) == null ? void 0 : i.api.getDetails(t, W));
      return (c = a == null ? void 0 : a.data) != null && c.id ? a.data : null;
    } catch {
      return null;
    }
  }
  return n && await C(t, n) || C(t, Q);
}
function X() {
  const t = document.querySelector(".s-block--fast-checkout"), e = t == null ? void 0 : t.getAttribute("data-layout");
  if (window.innerWidth < 1024 || e === "side-drawer" || !t) {
    window.dispatchEvent(new CustomEvent("open-checkout-drawer"));
    return;
  }
  t.scrollIntoView({ behavior: "smooth", block: "center" });
}
function D(t, e = 20) {
  if (t <= 1) return;
  const n = document.querySelector(
    ".s-block--fast-checkout salla-quantity-input, .s-block--fast-checkout-main salla-quantity-input"
  );
  if (n != null && n.setValue) {
    n.setValue(t);
    return;
  }
  e > 0 && window.setTimeout(() => D(t, e - 1), 100);
}
function Tt(t) {
  const e = f();
  return e != null && e.money ? e.money(t) : String(t);
}
const K = { go: (t) => window.location.assign(t) }, G = (t) => !!t && Object.keys(t).length > 0;
function J(t = {}) {
  var e;
  return E() ? (e = t.items) != null && e.length ? "cart" : B() === "product" ? I() ? G(t.options) ? "cart" : "fast-checkout" : "none" : U().url || t.fallbackUrl ? "link" : "none" : "fast-checkout";
}
const Z = 15e3;
let p = null;
window.addEventListener("pageshow", () => {
  p = null;
});
function Et(t = {}) {
  if (p) return p;
  const e = tt(ct(t)).then((n) => ((n.kind !== "cart" || t.stay) && p === e && (p = null), n));
  return p = e, e;
}
function tt(t) {
  return new Promise((e) => {
    const n = window.setTimeout(() => e({ kind: "error", message: w(null) }), Z);
    t.then(e, (r) => e({ kind: "error", message: w(r) })).finally(() => window.clearTimeout(n));
  });
}
function P(t) {
  var e, n, r;
  return ((n = (e = t == null ? void 0 : t.data) == null ? void 0 : e.cart) == null ? void 0 : n.items) || ((r = t == null ? void 0 : t.data) == null ? void 0 : r.items) || [];
}
async function et(t, e, n) {
  var o, i;
  const r = new Map(e.map((c) => [String(c.id), Number(c.quantity) || 0]));
  for (const c of n) {
    const a = r.get(String(c.id)) || 0;
    if (!((Number(c.quantity) || 0) <= a))
      try {
        a ? await ((o = t.updateItem) == null ? void 0 : o.call(t, { id: c.id, quantity: a })) : await ((i = t.deleteItem) == null ? void 0 : i.call(t, c.id));
      } catch {
      }
  }
}
function nt(t, e, n) {
  var o, i, c;
  const r = f();
  try {
    const a = t.product;
    (c = r == null ? void 0 : r.analytics) == null || c.track("Buy Now", {
      source: "ramadaniyat",
      action: e,
      product_id: a != null && a.id ? String(a.id) : I(),
      items: ((o = t.items) == null ? void 0 : o.length) || 1,
      quantity: n,
      price: a != null && a.id ? Number(a.sale_price || a.price || 0) * n : null,
      currency: (a == null ? void 0 : a.currency) || ((i = r == null ? void 0 : r.config) == null ? void 0 : i.get("user.currency_code")) || null
    });
  } catch {
  }
}
function w(t) {
  var e, n, r;
  return ((r = (n = (e = t == null ? void 0 : t.response) == null ? void 0 : e.data) == null ? void 0 : n.error) == null ? void 0 : r.message) || (t == null ? void 0 : t.message) || R({ ar: "تعذر إكمال الطلب، حاول مرة أخرى", en: "We couldn't complete the order, please try again" });
}
function rt() {
  var n, r, o;
  const t = f();
  try {
    const i = (r = (n = t == null ? void 0 : t.url) == null ? void 0 : n.get) == null ? void 0 : r.call(n, "cart");
    if (i) return String(i);
  } catch {
  }
  return `${String(((o = t == null ? void 0 : t.config) == null ? void 0 : o.get("store.url")) || location.origin).replace(/\/+$/, "")}/cart`;
}
const ot = { ms: 6e3 };
async function it() {
  var h, g, S, u, k;
  const t = f(), e = (h = t == null ? void 0 : t.cart) == null ? void 0 : h.api, n = () => (K.go(rt()), !0);
  if (!(e != null && e.submit)) return n();
  let r = !1;
  const o = () => r = !!document.querySelector("salla-login-modal"), i = () => r = !0, c = location.href, a = () => location.href !== c;
  try {
    (S = (g = t == null ? void 0 : t.event) == null ? void 0 : g.on) == null || S.call(g, "login::open", o);
  } catch {
  }
  window.addEventListener("pagehide", i, { once: !0 }), window.addEventListener("beforeunload", i, { once: !0 });
  const y = new Promise((j) => window.setTimeout(() => j("wait"), ot.ms));
  try {
    const j = Promise.resolve(e.submit()).then(() => "ok");
    return await Promise.race([j, y]), r || await y, !r && !a() ? n() : !0;
  } catch {
    return r ? !0 : n();
  } finally {
    try {
      (k = (u = t == null ? void 0 : t.event) == null ? void 0 : u.off) == null || k.call(u, "login::open", o);
    } catch {
    }
  }
}
async function ct(t) {
  var r, o, i, c;
  const e = J(t), n = Math.max(1, Number(t.quantity) || 1);
  if (e !== "none" && nt(t, e, n), e === "fast-checkout")
    return E() && (X(), D(n)), { kind: e };
  if (e === "cart") {
    const a = (o = (r = f()) == null ? void 0 : r.cart) == null ? void 0 : o.api, y = (i = t.items) != null && i.length ? t.items : [{ id: String(I()), quantity: n, options: t.options }];
    if (y.some((u) => u.max && u.quantity > u.max))
      return { kind: "error", message: R({ ar: "الكمية أكبر من المتاح", en: "The quantity is more than what is available" }) };
    if (!a) return { kind: "error", message: w(null) };
    let h = [];
    try {
      h = P(await ((c = a.details) == null ? void 0 : c.call(a)));
    } catch {
    }
    let g = h;
    try {
      for (const u of y) {
        const k = P(await a.addItem({ id: u.id, quantity: u.quantity, options: u.options, ...u.notes ? { notes: u.notes } : {} }));
        k.length && (g = k);
      }
    } catch (u) {
      return await et(a, h, g), { kind: "error", message: w(u) };
    }
    return window.dispatchEvent(new Event("rm:cart")), t.stay ? { kind: e } : await it() ? { kind: e } : { kind: "error", message: w(null) };
  }
  return e === "link" ? (K.go(U().url || t.fallbackUrl || ""), { kind: e }) : { kind: "none" };
}
const at = ["bg", "card", "title", "text", "accent"], z = "#111111", s = "#ffffff", q = 4.5;
function $(t) {
  if (typeof t != "string") return null;
  const e = t.trim().replace(/^#/, "");
  if (!/^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(e)) return null;
  const n = e.length === 3 ? e.replace(/./g, (r) => r + r) : e;
  return [0, 2, 4].map((r) => parseInt(n.slice(r, r + 2), 16));
}
function F([t, e, n]) {
  return "#" + [t, e, n].map((r) => Math.round(r).toString(16).padStart(2, "0")).join("");
}
function _(t) {
  const e = $(t);
  return e ? F(e) : null;
}
function M(t) {
  const [e, n, r] = t.map((o) => {
    const i = o / 255;
    return i <= 0.03928 ? i / 12.92 : ((i + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * e + 0.7152 * n + 0.0722 * r;
}
function b(t, e) {
  const n = $(t), r = $(e);
  if (!n || !r) return 1;
  const [o, i] = [M(n), M(r)].sort((c, a) => a - c);
  return (o + 0.05) / (i + 0.05);
}
function x(t) {
  const e = b(z, t) >= b(s, t) ? z : s;
  return b(e, t) >= q ? e : "#000000";
}
function m(t, e, n) {
  const r = $(t), o = $(e);
  return F(r.map((i, c) => i + (o[c] - i) * n));
}
function l(t, e, n, r = q) {
  let o = t;
  for (let i = 0; i < 20 && e.some((c) => b(o, c) < r); i++)
    o = m(o, n, 0.05 * (i + 1));
  return e.every((i) => b(o, i) >= r) ? o : n;
}
const v = "#000000", st = (t) => t === "light" ? v : s;
function T(t, e) {
  return {
    ...t,
    accentText: x(t.accent),
    accentInk: l(t.accent, [t.bg, t.card], st(e))
  };
}
const d = {
  light: T({ bg: "#ffffff", card: "#f7f4f0", title: "#1a1714", text: "#4a4440", accent: "#8a5a2b" }, "light"),
  dark: T({ bg: "#141210", card: "#1f1b18", title: "#f5efe8", text: "#c9bfb4", accent: "#d9a46a" }, "dark")
};
function ut(t) {
  const e = _(t);
  if (!e) return structuredClone(d);
  const n = m(e, s, 0.94), r = m(e, s, 0.88), o = m(e, "#000000", 0.88), i = m(e, "#000000", 0.8);
  return {
    light: T({
      bg: n,
      card: r,
      title: l(m(e, "#000000", 0.8), [n, r], "#000000"),
      text: l(m(e, "#000000", 0.65), [n, r], "#000000"),
      accent: e
    }, "light"),
    dark: T({
      bg: o,
      card: i,
      title: l(m(e, s, 0.92), [o, i], s),
      text: l(m(e, s, 0.75), [o, i], s),
      // An accent that disappears into the dark background is lifted until it stands out
      accent: l(e, [o], s, 3)
    }, "dark")
  };
}
const lt = (t) => t === "accentText" ? "accent-text" : t === "accentInk" ? "accent-ink" : t;
function H(t, e) {
  const n = {};
  for (const r of ["l", "d"]) {
    const o = {};
    for (const c of at) {
      const a = _(t[`${r}_${c}`]);
      a && (o[c] = a);
    }
    const i = r === "l" ? "light" : "dark";
    if (o.bg) {
      const c = x(o.bg);
      o.card ?? (o.card = m(o.bg, c, 0.08)), o.title ?? (o.title = l(c, [o.bg, o.card], c === s ? s : v)), o.text ?? (o.text = l(c, [o.bg, o.card], c === s ? s : v));
    }
    if (o.accent) {
      o["accent-text"] = x(o.accent);
      const c = [o.bg || d[i].bg, o.card || d[i].card];
      o["accent-ink"] = l(o.accent, c, x(c[0]) === s ? s : v);
    }
    for (const [c, a] of Object.entries(o)) n[`${e}${r}-${c}`] = a;
  }
  return n;
}
function It(t) {
  const e = {};
  if (_(t.brand_color)) {
    const n = ut(t.brand_color);
    for (const [r, o] of [["light", "l"], ["dark", "d"]])
      for (const [i, c] of Object.entries(n[r])) e[`--rm-${o}-${lt(i)}`] = c;
  }
  return { ...e, ...H(t, "--rm-") };
}
function mt(t) {
  const e = _(t);
  if (!e) return {};
  const n = {};
  let r = e;
  return b(e, d.dark.bg) < 3 && (r = l(e, [d.dark.bg], s, 3), n["--rm-d-accent"] = r, n["--rm-d-accent-text"] = x(r)), n["--rm-l-accent-ink"] = l(e, [d.light.bg, d.light.card], v), n["--rm-d-accent-ink"] = l(r, [d.dark.bg, d.dark.card], s), n;
}
function _t(t) {
  return Object.entries(H(t, "--rm-s-")).map(([e, n]) => `${e}:${n}`).join(";");
}
function St(t) {
  const e = String(Y(t.color_scheme) || "auto");
  return e === "dark" ? "rm-dark" : e === "light" ? "" : "rm-auto";
}
function jt(t, e, n) {
  var r;
  return t === "system" ? (r = window.matchMedia) != null && r.call(window, "(prefers-color-scheme: dark)").matches ? "dark" : "light" : t === "dark" ? "dark" : "light";
}
function Ct(t) {
  var o;
  if (typeof IntersectionObserver > "u" || (o = window.matchMedia) != null && o.call(window, "(prefers-reduced-motion: reduce)").matches) return;
  t.classList.add("rm-reveal");
  const e = () => {
    t.classList.add("is-in"), n.disconnect(), window.clearTimeout(r);
  }, n = new IntersectionObserver(
    (i) => {
      i.some((c) => c.isIntersecting) && e();
    },
    { rootMargin: "0px 0px -10% 0px" }
  ), r = window.setTimeout(e, 2500);
  n.observe(t);
}
const dt = `
.rm-reveal { transition: opacity .6s ease, transform .6s ease; }
.rm-reveal:not(.is-in) { opacity: 0; transform: translateY(16px); }
@media (prefers-reduced-motion: reduce) { .rm-reveal, .rm-reveal:not(.is-in) { opacity: 1; transform: none; transition: none; } }
`;
function ft(t, e) {
  if (document.getElementById(t)) return;
  const n = document.createElement("style");
  n.id = t, n.textContent = e, document.head.appendChild(n);
}
const gt = ["bg", "card", "title", "text", "accent", "accent-text", "accent-ink"], V = (t, e) => d[t][e === "accent-text" ? "accentText" : e === "accent-ink" ? "accentInk" : e], ht = {
  accent: "--color-primary",
  "accent-text": "--color-primary-reverse"
}, A = (t) => gt.map((e) => {
  const n = t === "l" ? "light" : "dark", r = ht[e], o = r ? `var(${r}, ${V(n, e)})` : V(n, e);
  return `--rm-${e}: var(--rm-s-${t}-${e}, var(--rm-${t}-${e}, ${o}));`;
}).join(" "), pt = `
.rm-host { display: block; width: 100%; min-width: 0; container-type: inline-size; }
[data-rm-section] { scroll-margin-top: var(--rm-hd-h, 0px); }
/* The page's end keeps clear of the sticky buy bar while it shows */
.rm-host:has(> .rm-sb:not(.rm-sb--inline)) { height: var(--rm-sb-h, 0px); }
.component-card:has(> .rm-host:not(:empty)) { min-height: 0; }
.rm-block { ${A("l")}
  display: block; width: 100%; box-sizing: border-box; font-family: var(--font-main, inherit);
  color: var(--rm-text); background: var(--rm-bg); }
.rm-block.rm-dark, html.rm-mode-dark .rm-block.rm-auto { ${A("d")} }
@media (prefers-color-scheme: dark) { html:not(.rm-mode-light) .rm-block.rm-auto { ${A("d")} } }
html.rm-mode-ready .rm-block { transition: background-color .3s ease, color .3s ease; }
.rm-block *, .rm-block *::before, .rm-block *::after { box-sizing: border-box; }
.rm-block img, .rm-block video { display: block; max-width: 100%; }
.rm-block h2, .rm-block h3, .rm-block p, .rm-block ul { margin: 0; padding: 0; }
.rm-block ul { list-style: none; }
.rm-container { width: 100%; max-width: 1200px; margin-inline: auto; padding-inline: 1rem; }
.rm-section { padding-block: 2.5rem; }
@container (min-width: 768px) { .rm-section { padding-block: 4rem; } }
.rm-title { text-align: center; margin-bottom: 1.75rem; }
.rm-title h2 { font-size: 1.75rem; line-height: 1.3; font-weight: 700; color: var(--rm-title); }
.rm-title p { margin-top: .5rem; font-size: 1rem; line-height: 1.7; color: var(--rm-text); }
@container (min-width: 768px) { .rm-title h2 { font-size: 2.25rem; } }
.rm-btn { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; min-height: 2.75rem;
  padding: .75rem 1.75rem; border: 1px solid transparent; border-radius: var(--rm-radius, .625rem);
  background: var(--rm-accent); color: var(--rm-accent-text); font: inherit; font-weight: 700; font-size: 1rem;
  line-height: 1.2; text-decoration: none; cursor: pointer; transition: transform .2s ease, opacity .2s ease; }
.rm-btn:hover { transform: translateY(-1px); opacity: .92; }
.rm-btn:focus-visible { outline: 2px solid var(--rm-accent-ink); outline-offset: 3px; }
.rm-btn[disabled], .rm-btn[aria-busy="true"] { opacity: .6; cursor: progress; transform: none; }
.rm-empty { padding: 2rem; border: 1px dashed color-mix(in srgb, var(--rm-text) 35%, transparent); border-radius: 1rem; text-align: center; }
.rm-cta { display: flex; justify-content: center; margin-top: 2rem; }
.rm-cta .rm-btn { min-width: min(100%, 16rem); }
.rm-visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.rm-error { margin-top: .5rem; color: #b42318; font-size: .875rem; }
.rm-block.rm-dark .rm-error, html.rm-mode-dark .rm-auto .rm-error { color: #fda29b; }
@media (prefers-color-scheme: dark) { html:not(.rm-mode-light) .rm-auto .rm-error { color: #fda29b; } }
@media (prefers-reduced-motion: reduce) { .rm-btn, html.rm-mode-ready .rm-block { transition: none; } .rm-btn:hover { transform: none; } }
${dt}
`;
let N = !1;
function At() {
  if (ft("rm-base", pt), N) return;
  N = !0;
  const t = document.documentElement;
  if (t.style.getPropertyValue("--rm-d-accent")) return;
  const e = getComputedStyle(t).getPropertyValue("--color-primary").trim();
  for (const [n, r] of Object.entries(mt(e))) t.style.setProperty(n, r);
}
export {
  O as a,
  f as b,
  At as c,
  ft as d,
  w as e,
  $t as f,
  wt as g,
  yt as h,
  E as i,
  it as j,
  J as k,
  jt as l,
  Tt as m,
  xt as n,
  I as o,
  It as p,
  Et as q,
  kt as r,
  bt as s,
  R as t,
  Y as u,
  U as v,
  vt as w,
  St as x,
  _t as y,
  Ct as z
};
