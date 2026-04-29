import {
  CATEGORY_PRODUCT_LIMIT_OPTIONS,
  CATEGORY_STATUS_OPTIONS,
  DEFAULT_CATEGORY_FORM,
} from "../constants/categories.constants";

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

export function getProductLimitLabel(value) {
  return (
    CATEGORY_PRODUCT_LIMIT_OPTIONS.find((item) => item.value === value)?.label ||
    "No Limit"
  );
}

export function getCategoryStatusLabel(value) {
  return (
    CATEGORY_STATUS_OPTIONS.find((item) => item.value === value)?.label || "Active"
  );
}

export function getNextCategoryStatus(status) {
  return status === "active" ? "deactivated" : "active";
}

export function filterCategories(rows = [], searchQuery = "", typeFilter = "") {
  const query = normalize(searchQuery);

  return rows.filter((row) => {
    const matchesType = !typeFilter || row.categoryType === typeFilter;

    if (!query) {
      return matchesType;
    }

    const content = [
      row.categoryName,
      row.categoryType,
      row.status,
      getProductLimitLabel(row.productLimit),
      ...row.subcategories,
    ]
      .join(" ")
      .toLowerCase();

    return matchesType && content.includes(query);
  });
}

export function mapCategoryToForm(row) {
  if (!row) {
    return DEFAULT_CATEGORY_FORM;
  }

  return {
    id: row.id,
    categoryName: row.categoryName,
    subcategories: [...row.subcategories],
    productLimit: row.productLimit,
    status: row.status,
    categoryType: row.categoryType,
  };
}