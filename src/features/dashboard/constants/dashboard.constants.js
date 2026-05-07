import { ReceiptText, Shapes, Store } from "lucide-react";

export const DASHBOARD_METRIC_ICON_MAP = {
  orders: ReceiptText,
  vendors: Store,
  categories: Shapes,
};

export const DASHBOARD_PERIOD_OPTIONS = [
  { label: "This Week", value: "this-week" },
];

export const DEFAULT_DASHBOARD_DATE_RANGE = {
  startDate: "2025-07-23",
  endDate: "2025-07-30",
};

export const DASHBOARD_STAGGER_TRANSITION = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1],
};

export const DASHBOARD_SECTION_TRANSITION = {
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1],
};
