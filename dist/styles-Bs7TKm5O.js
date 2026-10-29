function U(t) {
  return t ? t.component && typeof t.component == "object" ? t.component : t : {};
}
function v() {
  var t, r, e;
  return ((e = (r = (t = window.Salla) == null ? void 0 : t.lang) == null ? void 0 : r.getLocale) == null ? void 0 : e.call(r)) || document.documentElement.lang || "ar";
}
function G() {
  return (document.documentElement.dir || (v() === "ar" ? "rtl" : "ltr")) === "rtl";
}
function Q(t) {
  if (t == null || t === "") return "";
  if (typeof t == "string") return t;
  if (typeof t == "object") {
    const r = t, e = v() === "en" ? "en" : "ar";
    return r[e] || r[e === "en" ? "ar" : "en"] || "";
  }
  return String(t);
}
function X(t) {
  return v() === "ar" ? t.ar : t.en;
}
function V(t) {
  var r;
  return Array.isArray(t) ? ((r = t[0]) == null ? void 0 : r.value) ?? t[0] ?? "" : t && typeof t == "object" && "value" in t ? t.value : t ?? "";
}
function Z(t, r) {
  return Array.isArray(t) ? t.map((e) => {
    if (!e || typeof e != "object") return {};
    const o = {};
    for (const [n, c] of Object.entries(e))
      o[n.startsWith(`${r}.`) ? n.slice(r.length + 1) : n] = c;
    return o;
  }) : [];
}
function tt(t) {
  return String(t ?? "").trim().replace(/^#+/, "").trim();
}
function rt(t) {
  const r = String(t ?? "").trim();
  return r ? /^(https?:|mailto:|tel:)/i.test(r) ? r : /^[a-z][a-z0-9+.-]*:/i.test(r) ? "" : /^[\w-]+(\.[\w-]+)+/.test(r) ? `https://${r}` : "" : "";
}
function h() {
  return window.Salla;
}
function $() {
  var t, r;
  return ((r = (t = h()) == null ? void 0 : t.config) == null ? void 0 : r.get("theme.settings")) || {};
}
function E() {
  var t, r;
  return ((r = (t = h()) == null ? void 0 : t.config) == null ? void 0 : r.get("page.is_landing_page")) === !0;
}
function M() {
  var r;
  const t = $().page_for_product;
  return typeof t == "boolean" || t === void 0 || t === null ? t === !1 ? "promotion" : "product" : typeof t == "string" ? t === "promotion" ? "promotion" : "product" : Array.isArray(t) && ((r = t[0]) == null ? void 0 : r.value) === "promotion" ? "promotion" : "product";
}
function R() {
  var r, e;
  if (!E() || M() !== "product") return null;
  const t = (e = (r = $().product) == null ? void 0 : r.value) == null ? void 0 : e[0];
  return t ? String(t) : null;
}
function et() {
  const t = $();
  return { text: String(t.main_btn_text || ""), url: String(t.main_btn_url || "") };
}
const P = "1616473", _ = ["images", "rating", "sold_quantity", "options"];
async function k(t, r) {
  var e;
  try {
    const o = _.map((i) => `with[]=${i}`).join("&"), c = await (await fetch(`https://api.salla.dev/store/v1/products/${t}/details?${o}`, {
      headers: { "store-identifier": r, "accept-language": document.documentElement.lang === "en" ? "en" : "ar" }
    })).json();
    return (e = c == null ? void 0 : c.data) != null && e.id ? c.data : null;
  } catch {
    return null;
  }
}
async function nt(t) {
  var o, n, c, i;
  const r = h();
  if (!t) return null;
  await ((o = r == null ? void 0 : r.onReady) == null ? void 0 : o.call(r));
  const e = String(((n = r == null ? void 0 : r.config) == null ? void 0 : n.get("store.id")) || "");
  if (E()) {
    if (String(t) !== R()) return e ? k(t, e) : null;
    try {
      const l = await ((c = r == null ? void 0 : r.product) == null ? void 0 : c.api.getDetails(t, _));
      return (i = l == null ? void 0 : l.data) != null && i.id ? l.data : null;
    } catch {
      return null;
    }
  }
  return e && await k(t, e) || k(t, P);
}
function ot() {
  const t = document.querySelector(".s-block--fast-checkout"), r = t == null ? void 0 : t.getAttribute("data-layout");
  if (window.innerWidth < 1024 || r === "side-drawer" || !t) {
    window.dispatchEvent(new CustomEvent("open-checkout-drawer"));
    return;
  }
  t.scrollIntoView({ behavior: "smooth", block: "center" });
}
function L(t, r = 20) {
  if (t <= 1) return;
  const e = document.querySelector(
    ".s-block--fast-checkout salla-quantity-input, .s-block--fast-checkout-main salla-quantity-input"
  );
  if (e != null && e.setValue) {
    e.setValue(t);
    return;
  }
  r > 0 && window.setTimeout(() => L(t, r - 1), 100);
}
function ct(t) {
  const r = h();
  return r != null && r.money ? r.money(t) : String(t);
}
const N = ["bg", "card", "title", "text", "accent"], S = "#111111", a = "#ffffff", A = 4.5;
function p(t) {
  if (typeof t != "string") return null;
  const r = t.trim().replace(/^#/, "");
  if (!/^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(r)) return null;
  const e = r.length === 3 ? r.replace(/./g, (o) => o + o) : r;
  return [0, 2, 4].map((o) => parseInt(e.slice(o, o + 2), 16));
}
function j([t, r, e]) {
  return "#" + [t, r, e].map((o) => Math.round(o).toString(16).padStart(2, "0")).join("");
}
function y(t) {
  const r = p(t);
  return r ? j(r) : null;
}
function T(t) {
  const [r, e, o] = t.map((n) => {
    const c = n / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * e + 0.0722 * o;
}
function d(t, r) {
  const e = p(t), o = p(r);
  if (!e || !o) return 1;
  const [n, c] = [T(e), T(o)].sort((i, l) => l - i);
  return (n + 0.05) / (c + 0.05);
}
function f(t) {
  const r = d(S, t) >= d(a, t) ? S : a;
  return d(r, t) >= A ? r : "#000000";
}
function m(t, r, e) {
  const o = p(t), n = p(r);
  return j(o.map((c, i) => c + (n[i] - c) * e));
}
function s(t, r, e, o = A) {
  let n = t;
  for (let c = 0; c < 20 && r.some((i) => d(n, i) < o); c++)
    n = m(n, e, 0.05 * (c + 1));
  return r.every((c) => d(n, c) >= o) ? n : e;
}
const g = "#000000", B = (t) => t === "light" ? g : a;
function b(t, r) {
  return {
    ...t,
    accentText: f(t.accent),
    accentInk: s(t.accent, [t.bg, t.card], B(r))
  };
}
const u = {
  light: b({ bg: "#ffffff", card: "#f7f4f0", title: "#1a1714", text: "#4a4440", accent: "#8a5a2b" }, "light"),
  dark: b({ bg: "#141210", card: "#1f1b18", title: "#f5efe8", text: "#c9bfb4", accent: "#d9a46a" }, "dark")
};
function q(t) {
  const r = y(t);
  if (!r) return structuredClone(u);
  const e = m(r, a, 0.94), o = m(r, a, 0.88), n = m(r, "#000000", 0.88), c = m(r, "#000000", 0.8);
  return {
    light: b({
      bg: e,
      card: o,
      title: s(m(r, "#000000", 0.8), [e, o], "#000000"),
      text: s(m(r, "#000000", 0.65), [e, o], "#000000"),
      accent: r
    }, "light"),
    dark: b({
      bg: n,
      card: c,
      title: s(m(r, a, 0.92), [n, c], a),
      text: s(m(r, a, 0.75), [n, c], a),
      // An accent that disappears into the dark background is lifted until it stands out
      accent: s(r, [n], a, 3)
    }, "dark")
  };
}
const D = (t) => t === "accentText" ? "accent-text" : t === "accentInk" ? "accent-ink" : t;
function O(t, r) {
  const e = {};
  for (const o of ["l", "d"]) {
    const n = {};
    for (const i of N) {
      const l = y(t[`${o}_${i}`]);
      l && (n[i] = l);
    }
    const c = o === "l" ? "light" : "dark";
    if (n.bg) {
      const i = f(n.bg);
      n.card ?? (n.card = m(n.bg, i, 0.08)), n.title ?? (n.title = s(i, [n.bg, n.card], i === a ? a : g)), n.text ?? (n.text = s(i, [n.bg, n.card], i === a ? a : g));
    }
    if (n.accent) {
      n["accent-text"] = f(n.accent);
      const i = [n.bg || u[c].bg, n.card || u[c].card];
      n["accent-ink"] = s(n.accent, i, f(i[0]) === a ? a : g);
    }
    for (const [i, l] of Object.entries(n)) e[`${r}${o}-${i}`] = l;
  }
  return e;
}
function it(t) {
  const r = {};
  if (y(t.brand_color)) {
    const e = q(t.brand_color);
    for (const [o, n] of [["light", "l"], ["dark", "d"]])
      for (const [c, i] of Object.entries(e[o])) r[`--rm-${n}-${D(c)}`] = i;
  }
  return { ...r, ...O(t, "--rm-") };
}
function K(t) {
  const r = y(t);
  if (!r) return {};
  const e = {};
  let o = r;
  return d(r, u.dark.bg) < 3 && (o = s(r, [u.dark.bg], a, 3), e["--rm-d-accent"] = o, e["--rm-d-accent-text"] = f(o)), e["--rm-l-accent-ink"] = s(r, [u.light.bg, u.light.card], g), e["--rm-d-accent-ink"] = s(o, [u.dark.bg, u.dark.card], a), e;
}
function at(t) {
  return Object.entries(O(t, "--rm-s-")).map(([r, e]) => `${r}:${e}`).join(";");
}
function st(t) {
  const r = String(V(t.color_scheme) || "auto");
  return r === "dark" ? "rm-dark" : r === "light" ? "" : "rm-auto";
}
const z = "rm-mode";
let w = null;
function lt(t) {
  if (w) return w;
  try {
    const r = JSON.parse(localStorage.getItem(z) || "null");
    if (((r == null ? void 0 : r.mode) === "light" || (r == null ? void 0 : r.mode) === "dark") && r.base === t) return r.mode;
  } catch {
  }
  return null;
}
function mt(t, r, e) {
  var o;
  return r && e ? e : t === "system" ? (o = window.matchMedia) != null && o.call(window, "(prefers-color-scheme: dark)").matches ? "dark" : "light" : t === "dark" ? "dark" : "light";
}
function ut(t, r) {
  w = t;
  try {
    localStorage.setItem(z, JSON.stringify({ mode: t, base: r }));
  } catch {
  }
}
function dt(t) {
  var n;
  if (typeof IntersectionObserver > "u" || (n = window.matchMedia) != null && n.call(window, "(prefers-reduced-motion: reduce)").matches) return;
  t.classList.add("rm-reveal");
  const r = () => {
    t.classList.add("is-in"), e.disconnect(), window.clearTimeout(o);
  }, e = new IntersectionObserver(
    (c) => {
      c.some((i) => i.isIntersecting) && r();
    },
    { rootMargin: "0px 0px -10% 0px" }
  ), o = window.setTimeout(r, 2500);
  e.observe(t);
}
const W = `
.rm-reveal { transition: opacity .6s ease, transform .6s ease; }
.rm-reveal:not(.is-in) { opacity: 0; transform: translateY(16px); }
@media (prefers-reduced-motion: reduce) { .rm-reveal, .rm-reveal:not(.is-in) { opacity: 1; transform: none; transition: none; } }
`;
function F(t, r) {
  if (document.getElementById(t)) return;
  const e = document.createElement("style");
  e.id = t, e.textContent = r, document.head.appendChild(e);
}
const H = ["bg", "card", "title", "text", "accent", "accent-text", "accent-ink"], C = (t, r) => u[t][r === "accent-text" ? "accentText" : r === "accent-ink" ? "accentInk" : r], Y = {
  accent: "--color-primary",
  "accent-text": "--color-primary-reverse"
}, x = (t) => H.map((r) => {
  const e = t === "l" ? "light" : "dark", o = Y[r], n = o ? `var(${o}, ${C(e, r)})` : C(e, r);
  return `--rm-${r}: var(--rm-s-${t}-${r}, var(--rm-${t}-${r}, ${n}));`;
}).join(" "), J = `
.rm-host { display: block; width: 100%; min-width: 0; container-type: inline-size; }
[data-rm-section] { scroll-margin-top: var(--rm-hd-h, 0px); }
/* The last block keeps clear of the sticky buy bar while it shows */
.rm-ft { padding-bottom: calc(1.25rem + var(--rm-sb-h, 0px)) !important; }
.component-card:has(> .rm-host:not(:empty)) { min-height: 0; }
.rm-block { ${x("l")}
  display: block; width: 100%; box-sizing: border-box; font-family: var(--font-main, inherit);
  color: var(--rm-text); background: var(--rm-bg); }
.rm-block.rm-dark, html.rm-mode-dark .rm-block.rm-auto { ${x("d")} }
@media (prefers-color-scheme: dark) { html:not(.rm-mode-light) .rm-block.rm-auto { ${x("d")} } }
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
.rm-visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.rm-error { margin-top: .5rem; color: #b42318; font-size: .875rem; }
.rm-block.rm-dark .rm-error, html.rm-mode-dark .rm-auto .rm-error { color: #fda29b; }
@media (prefers-color-scheme: dark) { html:not(.rm-mode-light) .rm-auto .rm-error { color: #fda29b; } }
@media (prefers-reduced-motion: reduce) { .rm-btn, html.rm-mode-ready .rm-block { transition: none; } .rm-btn:hover { transform: none; } }
${W}
`;
let I = !1;
function ft() {
  if (F("rm-base", J), I) return;
  I = !0;
  const t = document.documentElement;
  if (t.style.getPropertyValue("--rm-d-accent")) return;
  const r = getComputedStyle(t).getPropertyValue("--color-primary").trim();
  for (const [e, o] of Object.entries(K(r))) t.style.setProperty(e, o);
}
export {
  M as A,
  F as a,
  U as b,
  at as c,
  h as d,
  ft as e,
  mt as f,
  Z as g,
  lt as h,
  E as i,
  ut as j,
  tt as k,
  v as l,
  nt as m,
  ct as n,
  G as o,
  it as p,
  R as q,
  Q as r,
  st as s,
  X as t,
  V as u,
  et as v,
  rt as w,
  dt as x,
  ot as y,
  L as z
};
