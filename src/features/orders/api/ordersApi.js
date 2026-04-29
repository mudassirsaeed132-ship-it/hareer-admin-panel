import { API_ENDPOINTS } from "../../../services/api/endpoints";
import { requestJson } from "../../../services/api/client";

export async function getOrdersList({ signal } = {}) {
  return requestJson(API_ENDPOINTS.orders.list, {
    method: "GET",
    signal,
    fallbackMessage: "Failed to load orders.",
  });
}

export async function getOrderDetails(orderId, { signal } = {}) {
  return requestJson(API_ENDPOINTS.orders.details(orderId), {
    method: "GET",
    signal,
    fallbackMessage: "Failed to load order details.",
  });
}
