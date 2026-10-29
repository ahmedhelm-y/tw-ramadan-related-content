// Fajr (end of suhoor) and Maghrib (iftar) for Saudi cities, worked out in the browser from the sun's position
// with the Umm al-Qura angle for Fajr (18.5°). No outside service; the times can differ from the mosque by a
// minute or two, so the page says "about".

export type City = { name: { ar: string; en: string }; lat: number; lng: number };

export const CITIES: City[] = [
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
  { name: { ar: "عرعر", en: "Arar" }, lat: 30.9753, lng: 41.0381 },
];

const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;
const fix = (a: number, b: number) => ((a % b) + b) % b;

/** Fajr and Maghrib, in minutes after Saudi midnight, for the Saudi calendar day that holds `at`. */
export function dayTimes(at: number, lat: number, lng: number, tz = 3): { fajr: number; maghrib: number } {
  // Noon of that local day, as days since J2000
  const localDay = Math.floor((at + tz * 3600000) / 86400000);
  const d = localDay - 10957 - tz / 24;
  const g = rad(fix(357.529 + 0.98560028 * d, 360));
  const q = fix(280.459 + 0.98564736 * d, 360);
  const L = rad(fix(q + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g), 360));
  const e = rad(23.439 - 0.00000036 * d);
  const ra = fix(deg(Math.atan2(Math.cos(e) * Math.sin(L), Math.cos(L))) / 15, 24);
  const decl = Math.asin(Math.sin(e) * Math.sin(L));
  // Equation of time in hours, between -12 and 12
  const eqt = fix(q / 15 - ra + 12, 24) - 12;
  const noon = 12 + tz - lng / 15 - eqt;
  const span = (angle: number) =>
    deg(Math.acos((-Math.sin(rad(angle)) - Math.sin(decl) * Math.sin(rad(lat))) / (Math.cos(decl) * Math.cos(rad(lat))))) / 15;
  const hours = (h: number) => Math.round(fix(h, 24) * 60);
  return { fajr: hours(noon - span(18.5)), maghrib: hours(noon + span(0.833)) };
}

/** "05:07" from minutes after midnight. */
export function clock(minutes: number): string {
  const m = Math.round(minutes);
  return `${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

export type Next = { kind: "iftar" | "suhoor"; at: number };

/** The next iftar (Maghrib) or end of suhoor (Fajr) after `now`, as a moment in time. */
export function nextEvent(now: number, city: City, tz = 3): Next {
  const midnight = Math.floor((now + tz * 3600000) / 86400000) * 86400000 - tz * 3600000;
  const today = dayTimes(now, city.lat, city.lng, tz);
  const fajr = midnight + today.fajr * 60000;
  const maghrib = midnight + today.maghrib * 60000;
  if (now < fajr) return { kind: "suhoor", at: fajr };
  if (now < maghrib) return { kind: "iftar", at: maghrib };
  const tomorrow = dayTimes(now + 86400000, city.lat, city.lng, tz);
  return { kind: "suhoor", at: midnight + 86400000 + tomorrow.fajr * 60000 };
}

/** True between Maghrib and the next Fajr: the after-iftar window. */
export function afterIftar(now: number, city: City, tz = 3): boolean {
  return nextEvent(now, city, tz).kind === "suhoor";
}

/** "1:23:05" for a countdown; past a day it reads "10 يوم 3:20:05". */
export function hms(ms: number, dayWord = "يوم"): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(s / 86400);
  const rest = s % 86400;
  const clock = `${Math.floor(rest / 3600)}:${String(Math.floor((rest % 3600) / 60)).padStart(2, "0")}:${String(rest % 60).padStart(2, "0")}`;
  return days ? `${days} ${dayWord} ${clock}` : clock;
}

const KEY = "rm-city";

/** The shopper's city, remembered on this device; Riyadh until they choose. */
export function savedCity(cities: City[] = CITIES): number {
  try {
    const i = Number(localStorage.getItem(KEY));
    return Number.isInteger(i) && i >= 0 && i < cities.length ? i : 0;
  } catch {
    return 0;
  }
}

export function saveCity(index: number): void {
  try {
    localStorage.setItem(KEY, String(index));
  } catch {
    // private mode: the choice lasts for this visit only
  }
  window.dispatchEvent(new CustomEvent("rm:city", { detail: index }));
}
