import { API_ENDPOINTS } from "../../../services/api/endpoints";
import { requestJson } from "../../../services/api/client";

export async function fetchPaymentsSummary({ signal } = {}) {
  return requestJson(API_ENDPOINTS.payments.summary, {
    method: "GET",
    signal,
    fallbackMessage: "Failed to load payments data.",
  });
}

export async function fetchPayments(
  { search = "", status = "all" } = {},
  { signal } = {}
) {
  const params = new URLSearchParams();

  if (search) {
    params.set("search", search);
  }

  if (status && status !== "all") {
    params.set("status", status);
  }

  const query = params.toString();
  const url = `${API_ENDPOINTS.payments.list}${query ? `?${query}` : ""}`;

  return requestJson(url, {
    method: "GET",
    signal,
    fallbackMessage: "Failed to load payments data.",
  });
}

export async function fetchPaymentInvoice(paymentId, { signal } = {}) {
  return requestJson(API_ENDPOINTS.payments.invoice(paymentId), {
    method: "GET",
    signal,
    fallbackMessage: "Failed to load payments invoice.",
  });
}
