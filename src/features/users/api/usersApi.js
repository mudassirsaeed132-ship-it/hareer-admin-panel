import { API_ENDPOINTS } from "../../../services/api/endpoints";
import {
  createJsonBody,
  JSON_HEADERS,
  requestJson,
  requestOk,
} from "../../../services/api/client";

export async function getUsersList({ signal } = {}) {
  return requestJson(API_ENDPOINTS.users.list, {
    method: "GET",
    signal,
    fallbackMessage: "Failed to load users.",
  });
}

export async function createUser(payload) {
  return requestJson(API_ENDPOINTS.users.create, {
    method: "POST",
    headers: JSON_HEADERS,
    body: createJsonBody(payload),
    fallbackMessage: "Failed to create user.",
  });
}

export async function updateUser(userId, payload) {
  return requestJson(API_ENDPOINTS.users.update(userId), {
    method: "PUT",
    headers: JSON_HEADERS,
    body: createJsonBody(payload),
    fallbackMessage: "Failed to update user.",
  });
}

export async function removeUser(userId) {
  return requestOk(API_ENDPOINTS.users.remove(userId), {
    method: "DELETE",
    fallbackMessage: "Failed to delete user.",
  });
}

export async function updateUserStatus(userId, status) {
  return requestJson(API_ENDPOINTS.users.status(userId), {
    method: "PATCH",
    headers: JSON_HEADERS,
    body: createJsonBody({ status }),
    fallbackMessage: "Failed to update user status.",
  });
}
