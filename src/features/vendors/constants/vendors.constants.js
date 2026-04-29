export const VENDORS_SECTION_TRANSITION = {
  duration: 0.28,
  ease: [0.22, 1, 0.36, 1],
};

export const VENDOR_STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "deactivated", label: "Deactivated" },
];

export const ORDER_STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "accepted", label: "Accepted" },
  { value: "on-the-way", label: "On the way" },
  { value: "delivered", label: "Delivered" },
];

export const PAYOUT_STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "in-progress", label: "In Progress" },
  { value: "paid", label: "Paid" },
];

export const PAYOUT_MONTH_FILTER_OPTIONS = [
  { value: "all", label: "All Months" },
  { value: "January 2026", label: "January 2026" },
  { value: "February 2026", label: "February 2026" },
];

export const PAYMENT_TERMS_OPTIONS = [
  { value: "Paid by Vendor", label: "Paid by Vendor" },
  { value: "Paid by Platform", label: "Paid by Platform" },
];

export const STATUS_META = {
  active: {
    label: "Active",
    className: "bg-[#E7F5EC] text-[#2FB065]",
  },
  deactivated: {
    label: "Deactivated",
    className: "bg-[#FDEAEA] text-[#F04444]",
  },
  pending: {
    label: "Pending",
    className: "bg-[#FDEAEA] text-[#F04444]",
  },
  paid: {
    label: "Paid",
    className: "bg-[#E7F5EC] text-[#2FB065]",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-[#FFF3F0] text-[#E3B1B1]",
  },
  accepted: {
    label: "Accepted",
    className: "bg-[#E7F5EC] text-[#2FB065]",
  },
  "on-the-way": {
    label: "On the way",
    className: "bg-[#EAF2FF] text-[#3E7BFA]",
  },
  delivered: {
    label: "Delivered",
    className: "bg-[#FAF1F1] text-[#E3B1B1]",
  },
};