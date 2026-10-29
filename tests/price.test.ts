import { describe, expect, it } from "vitest";
import { discountPercent, tierProgress } from "../src/utils/price";

describe("price helpers", () => {
  it("measures tier progress", () => {
    const tiers = [{ amount: 500, reward: "15%" }, { amount: 300, reward: "10%" }, { amount: 800, reward: "هدية" }];
    expect(tierProgress(350, tiers)).toEqual({ reached: 1, next: tiers[0], left: 150, percent: 44 });
    expect(tierProgress(900, tiers).next).toBeNull();
  });
  it("computes an honest discount", () => {
    expect(discountPercent({ price: 70, regular_price: 100 })).toBe(30);
    expect(discountPercent({ price: 100, regular_price: 100 })).toBe(0);
    expect(discountPercent({ price: 100 })).toBe(0);
  });
});
