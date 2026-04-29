import { http, HttpResponse } from "msw";
import { API_ENDPOINTS } from "../../services/api/endpoints";
import { dashboardSummaryMock } from "../data/dashboard.mock";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const withBase = (path) => `${API_BASE}${path}`;

export const dashboardHandlers = [
  http.get(withBase(API_ENDPOINTS.dashboard.summary), async () => {
    return HttpResponse.json(dashboardSummaryMock);
  }),
];

export default dashboardHandlers;
