import { API_ENDPOINTS } from "../../../services/api/endpoints";
import { requestJson } from "../../../services/api/client";

export async function getDashboardSummary({ signal } = {}) {
  return requestJson(API_ENDPOINTS.dashboard.summary, {
    method: "GET",
    signal,
    fallbackMessage: "Failed to load dashboard data.",
  });
}
