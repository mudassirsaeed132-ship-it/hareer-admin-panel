export const CATEGORIES_PAGE_TRANSITION = {
  duration: 0.22,
  ease: "easeOut",
};

export const CATEGORY_TYPE_FILTER_OPTIONS = [
  { value: "shopping", label: "Shopping" },
  { value: "fashion", label: "Fashion" },
  { value: "beauty", label: "Beauty" },
];

export const CATEGORY_PRODUCT_LIMIT_OPTIONS = [
  { value: "no-limit", label: "No Limit" },
  { value: "up-to-50", label: "Up to 50 products" },
  { value: "up-to-100", label: "Up to 100 products" },
];

export const CATEGORY_STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "deactivated", label: "Deactivated" },
];

export const DEFAULT_CATEGORY_FORM = {
  id: "",
  categoryName: "",
  subcategories: [],
  productLimit: "no-limit",
  status: "active",
  categoryType: "shopping",
};
