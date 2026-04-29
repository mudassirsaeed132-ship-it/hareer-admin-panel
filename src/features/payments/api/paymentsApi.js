import { PAYMENTS_ROWS, PAYMENTS_SUMMARY } from "../../../mocks/data/payments.mock";
import { delay } from "../../../mocks/utils/delay";
import { deepClone } from "../../../mocks/utils/mockCrud";

let paymentsRowsDb = deepClone(PAYMENTS_ROWS);
let paymentsSummaryDb = deepClone(PAYMENTS_SUMMARY);

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

export async function fetchPaymentsSummary({ signal } = {}) {
  await delay(120, { signal });
  return deepClone(paymentsSummaryDb);
}

export async function fetchPayments(
  { search = "", status = "all" } = {},
  { signal } = {}
) {
  await delay(120, { signal });

  const items = filterPayments(paymentsRowsDb, search, status);

  return {
    items: deepClone(items),
    total: items.length,
  };
}

export async function fetchPaymentInvoice(paymentId, { signal } = {}) {
  await delay(120, { signal });

  return {
    id: paymentId,
    fileName: `invoice-${paymentId}.pdf`,
    downloadUrl: "#",
  };
}
