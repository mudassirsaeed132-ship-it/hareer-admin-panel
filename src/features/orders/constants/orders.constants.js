export const ORDERS_STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "accepted", label: "Accepted" },
  { value: "delivered", label: "Delivered" },
  { value: "on-the-way", label: "On the way" },
];

export const PAYMENT_STATUS_META = {
  pending: {
    label: "Pending",
    className: "bg-[#FDEAEA] text-[#F04444]",
  },
  paid: {
    label: "Paid",
    className: "bg-[#E7F5EC] text-[#2FB065]",
  },
};

export const ORDER_STATUS_META = {
  accepted: {
    label: "Accepted",
    className: "bg-[#E7F5EC] text-[#2FB065]",
  },
  delivered: {
    label: "Delivered",
    className: "bg-[#FAF1F1] text-[#E3B1B1]",
  },
  "on-the-way": {
    label: "On the way",
    className: "bg-[#EAF2FF] text-[#3E7BFA]",
  },
};

export const ORDERS_DRAWER_TRANSITION = {
  duration: 0.28,
  ease: [0.22, 1, 0.36, 1],
};

export const ORDERS_PAGE_ACTION_LABEL = "+ Add new user";