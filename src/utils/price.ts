// Spend tiers (the gift bar and the side cart) and honest discount percentages.

export type Tier = { amount: number; reward: string };

/** Which tiers the cart reached, the next one, and how much is left to reach it. */
export function tierProgress(total: number, tiers: Tier[]): { reached: number; next: Tier | null; left: number; percent: number } {
  const sorted = tiers.filter((t) => t.amount > 0 && t.reward).sort((a, b) => a.amount - b.amount);
  const reached = sorted.filter((t) => total >= t.amount).length;
  const next = sorted[reached] || null;
  const top = sorted.length ? sorted[sorted.length - 1].amount : 0;
  return {
    reached,
    next,
    left: next ? Math.max(0, Math.round((next.amount - total) * 100) / 100) : 0,
    percent: top ? Math.min(100, Math.round((total / top) * 100)) : 0,
  };
}

/** Percent off between the regular and the sale price, or 0 when there is no real discount. */
export function discountPercent(product: any): number {
  const regular = Number(product?.regular_price) || 0;
  const price = Number(product?.sale_price || product?.price) || 0;
  if (!(regular > price && price > 0)) return 0;
  return Math.round(((regular - price) / regular) * 100);
}

const DAY = 86400000;

/** Start of the store-local day holding t, as epoch ms. */
