import { dashboardSummaryMock } from "../../../mocks/data/dashboard.mock";
import { delay } from "../../../mocks/utils/delay";
import { deepClone } from "../../../mocks/utils/mockCrud";
import { formatDashboardDateRange } from "../utils/dashboard.helpers";

let dashboardDb = deepClone(dashboardSummaryMock);

export async function getDashboardSummary({ signal, dateRange } = {}) {
  await delay(120, { signal });

  const summary = deepClone(dashboardDb);
  const startDate = dateRange?.startDate ?? "";
  const endDate = dateRange?.endDate ?? "";

  if (startDate && endDate) {
    summary.dateRange = { startDate, endDate };
    summary.dateRangeLabel =
      formatDashboardDateRange({ startDate, endDate }) || summary.dateRangeLabel;
  }

  return summary;
}
