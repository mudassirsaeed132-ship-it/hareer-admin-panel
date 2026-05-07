const MONTH_DAY_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
});

const MONTH_DAY_YEAR_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

function parseDateValue(value) {
  if (!value) return null;

  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDashboardDateRange({ startDate, endDate } = {}) {
  const start = parseDateValue(startDate);
  const end = parseDateValue(endDate);

  if (!start || !end) {
    return "";
  }

  if (start.getFullYear() === end.getFullYear()) {
    return `${MONTH_DAY_FORMATTER.format(start)} - ${MONTH_DAY_YEAR_FORMATTER.format(end)}`;
  }

  return `${MONTH_DAY_YEAR_FORMATTER.format(start)} - ${MONTH_DAY_YEAR_FORMATTER.format(end)}`;
}

export function createDashboardViewModel(payload = {}) {
  return {
    greetingName: payload.greetingName ?? "Kevin",
    dateRangeLabel: payload.dateRangeLabel ?? "",
    dateRange: {
      startDate: payload.dateRange?.startDate ?? "",
      endDate: payload.dateRange?.endDate ?? "",
    },
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
