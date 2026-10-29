import { describe, expect, it } from "vitest";
import { daysToEid, daysToRamadan, hijri, hijriLabel, phaseOf, ramadanDay } from "../src/utils/hijri";
import { afterIftar, CITIES, clock, dayTimes, hms, nextEvent } from "../src/utils/prayer";

const at = (iso: string) => new Date(iso).getTime();
const riyadh = CITIES[0];

describe("hijri", () => {
  it("reads the Umm al-Qura date in Saudi time", () => {
    expect(hijri(at("2027-02-08T09:00:00Z"))).toEqual({ d: 1, m: 9, y: 1448 });
    expect(hijri(at("2027-03-09T09:00:00Z"))).toEqual({ d: 1, m: 10, y: 1448 });
    // A shift for a different moon sighting
    expect(hijri(at("2027-02-08T09:00:00Z"), -1).m).toBe(8);
  });
  it("names the season", () => {
    expect(phaseOf({ d: 20, m: 8, y: 1448 })).toBe("before");
    expect(phaseOf({ d: 14, m: 9, y: 1448 })).toBe("ramadan");
    expect(phaseOf({ d: 21, m: 9, y: 1448 })).toBe("last-ten");
    expect(phaseOf({ d: 2, m: 10, y: 1448 })).toBe("eid");
    expect(phaseOf({ d: 9, m: 10, y: 1448 })).toBe("after");
  });
  it("counts the days to Ramadan and Eid", () => {
    expect(daysToRamadan(at("2027-02-01T09:00:00Z"))).toBe(7);
    expect(daysToEid(at("2027-03-01T09:00:00Z"))).toBe(8);
  });
  it("labels the date and the Ramadan day", () => {
    expect(hijriLabel({ d: 14, m: 9, y: 1448 })).toBe("14 رمضان 1448 هـ");
    expect(hijriLabel({ d: 14, m: 9, y: 1448 }, "en")).toBe("14 Ramadan 1448 AH");
    expect(ramadanDay({ d: 14, m: 9, y: 1448 })).toBe(14);
    expect(ramadanDay({ d: 14, m: 8, y: 1448 })).toBe(0);
  });
});

describe("prayer times", () => {
  it("puts Fajr and Maghrib where the Umm al-Qura calendar has them, within a few minutes", () => {
    // Riyadh, 1 Ramadan 1448 (8 Feb 2027): Fajr about 05:12, Maghrib about 17:50
    const t = dayTimes(at("2027-02-08T09:00:00Z"), riyadh.lat, riyadh.lng);
    expect(t.fajr).toBeGreaterThan(5 * 60 + 2);
    expect(t.fajr).toBeLessThan(5 * 60 + 22);
    expect(t.maghrib).toBeGreaterThan(17 * 60 + 40);
    expect(t.maghrib).toBeLessThan(18 * 60);
    // Jeddah breaks its fast later than Riyadh
    const jeddah = dayTimes(at("2027-02-08T09:00:00Z"), CITIES[1].lat, CITIES[1].lng);
    expect(jeddah.maghrib - t.maghrib).toBeGreaterThan(20);
  });
  it("finds the next iftar or suhoor", () => {
    const noon = at("2027-02-08T09:00:00Z"); // 12:00 in Riyadh
    expect(nextEvent(noon, riyadh).kind).toBe("iftar");
    expect(afterIftar(noon, riyadh)).toBe(false);
    const night = at("2027-02-08T18:00:00Z"); // 21:00
    expect(nextEvent(night, riyadh).kind).toBe("suhoor");
    expect(afterIftar(night, riyadh)).toBe(true);
    expect(nextEvent(night, riyadh).at).toBeGreaterThan(night);
  });
  it("formats times", () => {
    expect(clock(5 * 60 + 7)).toBe("05:07");
    expect(hms(3725000)).toBe("1:02:05");
    expect(hms(86400000 * 10 + 3725000)).toBe("10 يوم 1:02:05");
  });
});
