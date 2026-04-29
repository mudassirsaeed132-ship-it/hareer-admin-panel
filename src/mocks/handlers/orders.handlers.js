import { http, HttpResponse } from "msw";
import { API_ENDPOINTS } from "../../services/api/endpoints";
import { orderDetailsByIdMock, ordersListMock } from "../data/orders.mock";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const withBase = (path) => `${API_BASE}${path}`;

export const ordersHandlers = [
  http.get(withBase(API_ENDPOINTS.orders.list), async () => {
    return HttpResponse.json(ordersListMock);
  }),

  http.get(withBase("/api/orders/:orderId"), async ({ params }) => {
    const detail = orderDetailsByIdMock[params.orderId];

    if (!detail) {
      return HttpResponse.json(
        { message: "Order detail not found." },
        { status: 404 }
      );
    }

    return HttpResponse.json(detail);
  }),
];

export default ordersHandlers;
