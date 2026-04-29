export function createDashboardViewModel(payload = {}) {
  return {
    greetingName: payload.greetingName ?? "Kevin",
    dateRangeLabel: payload.dateRangeLabel ?? "",
    metrics: Array.isArray(payload.metrics) ? payload.metrics : [],
    ordersOverview: {
      axisLabels: Array.isArray(payload.ordersOverview?.axisLabels)
        ? payload.ordersOverview.axisLabels
        : ["5K", "1K", "500", "100", "0"],
      defaultPeriod:
        payload.ordersOverview?.defaultPeriod ??
        payload.ordersOverview?.periods?.[0]?.value ??
        "this-week",
      periods: Array.isArray(payload.ordersOverview?.periods)
        ? payload.ordersOverview.periods
        : [],
    },
    paymentsOverview: {
      defaultPeriod:
        payload.paymentsOverview?.defaultPeriod ??
        payload.paymentsOverview?.periods?.[0]?.value ??
        "this-week",
      periods: Array.isArray(payload.paymentsOverview?.periods)
        ? payload.paymentsOverview.periods
        : [],
    },
    topSellingStores: Array.isArray(payload.topSellingStores)
      ? payload.topSellingStores
      : [],
  };
}