import { http, HttpResponse } from "msw";
import { API_ENDPOINTS } from "../../services/api/endpoints";
import { categoriesMock } from "../data/categories.mock";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const withBase = (path) => `${API_BASE}${path}`;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

let categoriesDb = clone(categoriesMock);

export const categoriesHandlers = [
  http.get(withBase(API_ENDPOINTS.categories.list), async () => {
    return HttpResponse.json(clone(categoriesDb));
  }),

  http.post(withBase(API_ENDPOINTS.categories.create), async ({ request }) => {
    const payload = await request.json();

    const newCategory = {
      id: `category-${Date.now()}`,
      categoryName: payload.categoryName,
      subcategories: payload.subcategories ?? [],
      productLimit: payload.productLimit ?? "no-limit",
      status: payload.status ?? "active",
      categoryType: payload.categoryType ?? "shopping",
    };

    categoriesDb = [newCategory, ...categoriesDb];

    return HttpResponse.json(clone(newCategory), { status: 201 });
  }),

  http.put(withBase("/api/categories/:categoryId"), async ({ params, request }) => {
    const payload = await request.json();

    const index = categoriesDb.findIndex((item) => item.id === params.categoryId);

    if (index < 0) {
      return HttpResponse.json({ message: "Category not found." }, { status: 404 });
    }

    categoriesDb[index] = {
      ...categoriesDb[index],
      categoryName: payload.categoryName ?? categoriesDb[index].categoryName,
      subcategories: payload.subcategories ?? categoriesDb[index].subcategories,
      productLimit: payload.productLimit ?? categoriesDb[index].productLimit,
      status: payload.status ?? categoriesDb[index].status,
      categoryType: payload.categoryType ?? categoriesDb[index].categoryType,
    };

    return HttpResponse.json(clone(categoriesDb[index]));
  }),

  http.patch(withBase("/api/categories/:categoryId/status"), async ({ params, request }) => {
    const payload = await request.json();

    const index = categoriesDb.findIndex((item) => item.id === params.categoryId);

    if (index < 0) {
      return HttpResponse.json({ message: "Category not found." }, { status: 404 });
    }

    categoriesDb[index] = {
      ...categoriesDb[index],
      status: payload.status ?? categoriesDb[index].status,
    };

    return HttpResponse.json(clone(categoriesDb[index]));
  }),

  http.patch(withBase("/api/categories/:categoryId/product-limit"), async ({ params, request }) => {
    const payload = await request.json();

    const index = categoriesDb.findIndex((item) => item.id === params.categoryId);

    if (index < 0) {
      return HttpResponse.json({ message: "Category not found." }, { status: 404 });
    }

    categoriesDb[index] = {
      ...categoriesDb[index],
      productLimit: payload.productLimit ?? categoriesDb[index].productLimit,
    };

    return HttpResponse.json(clone(categoriesDb[index]));
  }),
];

export default categoriesHandlers;
