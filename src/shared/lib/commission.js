/**
 * Shared numeric helpers for commission / payout calculations.
 * Percent values are always constrained to the inclusive 0–100 range.
 */

export function clampRate(value) {
  const rate = Number(value);
  if (!Number.isFinite(rate)) return 0;
  return Math.min(100, Math.max(0, rate));
}

export function isValidPercent(value, { allowEmpty = false } = {}) {
  if (value === "") return allowEmpty;
  const num = Number(value);
  return Number.isFinite(num) && num >= 0 && num <= 100;
}
