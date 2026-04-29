import { categoriesMock } from "../../../mocks/data/categories.mock";
import { delay } from "../../../mocks/utils/delay";
import { createMockCrudStore } from "../../../mocks/utils/mockCrud";

const store = createMockCrudStore(categoriesMock, { idPrefix: "category-" });

export async function getCategories({ signal } = {}) {
  await delay(120, { signal });
  return store.list();
}

export async function createCategory(payload) {
  await delay(180);

  return store.create({
    categoryName: payload?.categoryName ?? "",
    subcategories: payload?.subcategories ?? [],
    productLimit: payload?.productLimit ?? "no-limit",
    status: payload?.status ?? "active",
    categoryType: payload?.categoryType ?? "shopping",
  });
}

export async function updateCategory(categoryId, payload) {
  await delay(180);

  try {
    return store.update(categoryId, {
      categoryName: payload?.categoryName,
      subcategories: payload?.subcategories,
      productLimit: payload?.productLimit,
      status: payload?.status,
      categoryType: payload?.categoryType,
    });
  } catch {
    throw new Error("Category not found.");
  }
}

export async function updateCategoryStatus(categoryId, status) {
  await delay(160);

  try {
    return store.update(categoryId, { status });
  } catch {
    throw new Error("Category not found.");
  }
}

export async function updateCategoryProductLimit(categoryId, productLimit) {
  await delay(160);

  try {
    return store.update(categoryId, { productLimit });
  } catch {
    throw new Error("Category not found.");
  }
}
