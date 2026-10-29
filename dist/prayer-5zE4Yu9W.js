const $ = [
  { name: { ar: "الرياض", en: "Riyadh" }, lat: 24.7136, lng: 46.6753 },
  { name: { ar: "جدة", en: "Jeddah" }, lat: 21.4858, lng: 39.1925 },
  { name: { ar: "مكة المكرمة", en: "Makkah" }, lat: 21.3891, lng: 39.8579 },
  { name: { ar: "المدينة المنورة", en: "Madinah" }, lat: 24.5247, lng: 39.5692 },
  { name: { ar: "الدمام", en: "Dammam" }, lat: 26.4207, lng: 50.0888 },
  { name: { ar: "الخبر", en: "Khobar" }, lat: 26.2172, lng: 50.1971 },
  { name: { ar: "الأحساء", en: "Al-Ahsa" }, lat: 25.3833, lng: 49.5833 },
  { name: { ar: "الطائف", en: "Taif" }, lat: 21.2703, lng: 40.4158 },
  { name: { ar: "بريدة", en: "Buraidah" }, lat: 26.326, lng: 43.975 },
  { name: { ar: "حائل", en: "Hail" }, lat: 27.5114, lng: 41.7208 },
  { name: { ar: "تبوك", en: "Tabuk" }, lat: 28.3835, lng: 36.5662 },
  { name: { ar: "أبها", en: "Abha" }, lat: 18.2164, lng: 42.5053 },
  { name: { ar: "خميس مشيط", en: "Khamis Mushait" }, lat: 18.3, lng: 42.7333 },
  { name: { ar: "جازان", en: "Jazan" }, lat: 16.8892, lng: 42.5511 },
  { name: { ar: "نجران", en: "Najran" }, lat: 17.5656, lng: 44.2289 },
  { name: { ar: "الباحة", en: "Al-Baha" }, lat: 20.0129, lng: 41.4677 },
  { name: { ar: "ينبع", en: "Yanbu" }, lat: 24.0895, lng: 38.0618 },
  { name: { ar: "سكاكا", en: "Sakaka" }, lat: 29.9697, lng: 40.2064 },
  { name: { ar: "عرعر", en: "Arar" }, lat: 30.9753, lng: 41.0381 }
], s = (a) => a * Math.PI / 180, S = (a) => a * 180 / Math.PI, l = (a, n) => (a % n + n) % n;
function k(a, n, t, r = 3) {
  const e = Math.floor((a + r * 36e5) / 864e5) - 10957 - r / 24, c = s(l(357.529 + 0.98560028 * e, 360)), h = l(280.459 + 0.98564736 * e, 360), i = s(l(h + 1.915 * Math.sin(c) + 0.02 * Math.sin(2 * c), 360)), g = s(23.439 - 36e-8 * e), b = l(S(Math.atan2(Math.cos(g) * Math.sin(i), Math.cos(i))) / 15, 24), M = Math.asin(Math.sin(g) * Math.sin(i)), I = l(h / 15 - b + 12, 24) - 12, u = 12 + r - t / 15 - I, d = (m) => S(Math.acos((-Math.sin(s(m)) - Math.sin(M) * Math.sin(s(n))) / (Math.cos(M) * Math.cos(s(n))))) / 15, f = (m) => Math.round(l(m, 24) * 60);
  return { fajr: f(u - d(18.5)), maghrib: f(u + d(0.833)) };
}
function j(a) {
  const n = Math.round(a);
  return `${String(Math.floor(n / 60) % 24).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;
}
function p(a, n, t = 3) {
  const r = Math.floor((a + t * 36e5) / 864e5) * 864e5 - t * 36e5, o = k(a, n.lat, n.lng, t), e = r + o.fajr * 6e4, c = r + o.maghrib * 6e4;
  if (a < e) return { kind: "suhoor", at: e };
  if (a < c) return { kind: "iftar", at: c };
  const h = k(a + 864e5, n.lat, n.lng, t);
  return { kind: "suhoor", at: r + 864e5 + h.fajr * 6e4 };
}
function v(a, n, t = 3) {
  return p(a, n, t).kind === "suhoor";
}
function A(a, n = "يوم") {
  const t = Math.max(0, Math.floor(a / 1e3)), r = Math.floor(t / 86400), o = t % 86400, e = `${Math.floor(o / 3600)}:${String(Math.floor(o % 3600 / 60)).padStart(2, "0")}:${String(o % 60).padStart(2, "0")}`;
  return r ? `${r} ${n} ${e}` : e;
}
const y = "rm-city";
function C(a = $) {
  try {
    const n = Number(localStorage.getItem(y));
    return Number.isInteger(n) && n >= 0 && n < a.length ? n : 0;
  } catch {
    return 0;
  }
}
function E(a) {
  try {
    localStorage.setItem(y, String(a));
  } catch {
  }
  window.dispatchEvent(new CustomEvent("rm:city", { detail: a }));
}
export {
  $ as C,
  v as a,
  E as b,
  j as c,
  k as d,
  A as h,
  p as n,
  C as s
};
