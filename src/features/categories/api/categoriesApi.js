import { API_ENDPOINTS } from "../../../services/api/endpoints";
import {
  createJsonBody,
  JSON_HEADERS,
  requestJson,
} from "../../../services/api/client";

export async function getCategories({ signal } = {}) {
  return requestJson(API_ENDPOINTS.categories.list, {
    method: "GET",
    signal,
    fallbackMessage: "Failed to load categories.",
  });
}

export async function createCategory(payload) {
  return requestJson(API_ENDPOINTS.categories.create, {
    method: "POST",
    headers: JSON_HEADERS,
    body: createJsonBody(payload),
    fallbackMessage: "Failed to create category.",
  });
}

export async function updateCategory(categoryId, payload) {
  return requestJson(API_ENDPOINTS.categories.update(categoryId), {
    method: "PUT",
    headers: JSON_HEADERS,
    body: createJsonBody(payload),
    fallbackMessage: "Failed to update category.",
  });
}

export async function updateCategoryStatus(categoryId, status) {
  return requestJson(API_ENDPOINTS.categories.status(categoryId), {
    method: "PATCH",
    headers: JSON_HEADERS,
    body: createJsonBody({ status }),
    fallbackMessage: "Failed to update category status.",
  });
}

export async function updateCategoryProductLimit(categoryId, productLimit) {
  return requestJson(API_ENDPOINTS.categories.productLimit(categoryId), {
    method: "PATCH",
    headers: JSON_HEADERS,
    body: createJsonBody({ productLimit }),
    fallbackMessage: "Failed to update product limit.",
  });
}
