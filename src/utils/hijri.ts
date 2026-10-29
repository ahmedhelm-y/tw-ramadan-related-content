// The Umm al-Qura date of a moment, read from the browser's own Islamic calendar in Saudi time, and the
// Ramadan season it falls in. The merchant can shift by a day when the moon sighting differs.

export type Hijri = { d: number; m: number; y: number };
export type Phase = "before" | "ramadan" | "last-ten" | "eid" | "after";

const DAY = 86400000;
let numeric: Intl.DateTimeFormat | null = null;

function formatter(): Intl.DateTimeFormat {
  numeric ||= new Intl.DateTimeFormat("en-u-ca-islamic-umalqura-nu-latn", { day: "numeric", month: "numeric", year: "numeric", timeZone: "Asia/Riyadh" });
  return numeric;
}

/** The Hijri day, month and year of a moment; `shift` moves it by whole days. */
export function hijri(at: number, shift = 0): Hijri {
  const parts = formatter().formatToParts(new Date(at + shift * DAY));
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value.replace(/\D/g, "")) || 0;
  return { d: get("day"), m: get("month"), y: get("year") };
}

/** Before Ramadan (from the new year to Sha'ban), Ramadan, its last ten nights, the three Eid days, or after. */
export function phaseOf(h: Hijri): Phase {
  if (h.m === 9) return h.d >= 21 ? "last-ten" : "ramadan";
  if (h.m === 10 && h.d <= 3) return "eid";
  if (h.m < 9) return "before";
  return "after";
}

/** Whole days from today until the first day matching the test, or null within a year. */
function daysUntil(at: number, shift: number, test: (h: Hijri) => boolean): number | null {
  for (let i = 0; i <= 400; i++) if (test(hijri(at + i * DAY, shift))) return i;
  return null;
}

export const daysToRamadan = (at: number, shift = 0) => daysUntil(at, shift, (h) => h.m === 9 && h.d === 1);
export const daysToEid = (at: number, shift = 0) => daysUntil(at, shift, (h) => h.m === 10 && h.d === 1);

/** Midnight in Saudi time at the start of the day `days` from now. */
export function saudiMidnight(at: number, days = 0): number {
  const local = at + 3 * 3600000;
  return Math.floor(local / DAY) * DAY - 3 * 3600000 + days * DAY;
}

const MONTHS_AR = ["محرم", "صفر", "ربيع الأول", "ربيع الآخر", "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"];
const MONTHS_EN = ["Muharram", "Safar", "Rabi I", "Rabi II", "Jumada I", "Jumada II", "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhu al-Qadah", "Dhu al-Hijjah"];

/** "14 رمضان 1448" or "14 Ramadan 1448". */
export function hijriLabel(h: Hijri, locale = "ar"): string {
  const month = (locale === "en" ? MONTHS_EN : MONTHS_AR)[h.m - 1] || "";
  return `${h.d} ${month} ${h.y}${locale === "en" ? " AH" : " هـ"}`;
}

/** The Ramadan day number on that date, or 0 outside Ramadan. */
export function ramadanDay(h: Hijri): number {
  return h.m === 9 ? h.d : 0;
}
