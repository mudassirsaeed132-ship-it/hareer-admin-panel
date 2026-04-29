import { dashboardSummaryMock } from "../../../mocks/data/dashboard.mock";
import { delay } from "../../../mocks/utils/delay";
import { deepClone } from "../../../mocks/utils/mockCrud";

let dashboardDb = deepClone(dashboardSummaryMock);

export async function getDashboardSummary({ signal } = {}) {
  await delay(120, { signal });
  return deepClone(dashboardDb);
}
