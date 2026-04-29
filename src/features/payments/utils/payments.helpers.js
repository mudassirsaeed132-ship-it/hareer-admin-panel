export function formatMoney(value, currency = "LYD") {
  const amount = Number(value || 0).toLocaleString("en-US");
  return `${amount} ${currency}`;
}

export function getPaymentStatusLabel(status) {
  if (status === "paid") return "Paid";
  if (status === "pending") return "Pending";
  return "Paid";
}

export function filterPayments(rows = [], searchQuery = "", statusFilter = "all") {
  const query = String(searchQuery || "").trim().toLowerCase();

  return rows.filter((row) => {
    const matchesStatus =
      statusFilter === "all" ? true : row.status === statusFilter;

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
    ]
      .join(" ")
      .toLowerCase();

    return matchesStatus && haystack.includes(query);
  });
}