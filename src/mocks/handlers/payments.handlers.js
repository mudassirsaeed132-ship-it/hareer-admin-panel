import { http, HttpResponse } from "msw";
import {
  PAYMENTS_ROWS,
  PAYMENTS_SUMMARY,
} from "../data/payments.mock";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const withBase = (path) => `${API_BASE}${path}`;

function filterPayments(rows, search = "", status = "all") {
  const query = String(search || "").trim().toLowerCase();

  return rows.filter((row) => {
    const matchesStatus = status === "all" ? true : row.status === status;

    if (!query) {
      return matchesStatus;
    }

    const haystack = [
      row.invoiceId,
      row.customerName,
      row.type,
      row.status,
      row.amount,
      row.currency,
      row.serial,
    ]
      .join(" ")
      .toLowerCase();

    return matchesStatus && haystack.includes(query);
  });
}

const paymentsHandlers = [
  http.get(withBase("/api/payments/summary"), () => {
    return HttpResponse.json(PAYMENTS_SUMMARY);
  }),

  http.get(withBase("/api/payments"), ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search") || "";
    const status = url.searchParams.get("status") || "all";

    const items = filterPayments(PAYMENTS_ROWS, search, status);

    return HttpResponse.json({
      items,
      total: items.length,
    });
  }),

  http.get(withBase("/api/payments/:paymentId/invoice"), ({ params }) => {
    return HttpResponse.json({
      id: params.paymentId,
      fileName: `invoice-${params.paymentId}.pdf`,
      downloadUrl: "#",
    });
  }),
];

export default paymentsHandlers;
export { paymentsHandlers };