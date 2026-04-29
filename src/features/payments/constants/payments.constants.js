export const PAYMENTS_PAGE_TRANSITION = {
  duration: 0.22,
  ease: "easeOut",
};

export const PAYMENT_STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
];

export const PAYMENT_SUMMARY_CARDS = [
  {
    key: "totalRevenue",
    label: "Total Revenue",
  },
  {
    key: "pendingPayments",
    label: "Pending Payments",
  },
];