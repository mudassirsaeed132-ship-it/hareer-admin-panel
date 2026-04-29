export const QUERY_KEYS = {
  dashboard: {
    summary: () => ["dashboard", "summary"],
  },

  orders: {
    list: () => ["orders", "list"],
    details: (orderId) => ["orders", "details", String(orderId || "")],
  },

  categories: {
    list: () => ["categories", "list"],
  },

  vendors: {
    overview: () => ["vendors", "overview"],
    detail: (vendorId) => ["vendors", "detail", String(vendorId || "")],
  },

  users: {
    list: () => ["users", "list"],
  },

  payments: {
    summary: () => ["payments", "summary"],
    list: ({ search = "", status = "all" } = {}) => [
      "payments",
      "list",
      String(search || ""),
      String(status || "all"),
    ],
    invoice: (paymentId) => ["payments", "invoice", String(paymentId || "")],
  },
};
