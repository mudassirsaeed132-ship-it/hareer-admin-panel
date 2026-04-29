export function formatNumber(value, options = {}) {
  const number = Number(value ?? 0);

  if (Number.isNaN(number)) {
    return "0";
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
    ...options,
  }).format(number);
}