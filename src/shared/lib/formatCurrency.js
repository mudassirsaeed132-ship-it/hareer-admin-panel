import { formatNumber } from "./formatNumber";

export function formatCurrency(value, currency = "LYD") {
  return `${formatNumber(value)} ${currency}`;
}