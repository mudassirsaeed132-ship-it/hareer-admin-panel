import { usersListMock } from "../../../mocks/data/users.mock";
import { delay } from "../../../mocks/utils/delay";
import { createMockCrudStore } from "../../../mocks/utils/mockCrud";

const store = createMockCrudStore(usersListMock, { idPrefix: "user-" });

function formatDate(date = new Date()) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export async function getUsersList({ signal } = {}) {
  await delay(120, { signal });
  return store.list();
}

export async function createUser(payload) {
  await delay(180);

  return store.create({
    fullName: payload?.fullName ?? "",
    email: payload?.email ?? "",
    status: payload?.status ?? "active",
    addedDate: formatDate(),
  });
}

export async function updateUser(userId, payload) {
  await delay(180);

  try {
    return store.update(userId, {
      fullName: payload?.fullName ?? "",
      email: payload?.email ?? "",
      status: payload?.status ?? "active",
    });
  } catch {
    throw new Error("User not found.");
  }
}

export async function removeUser(userId) {
  await delay(160);

  const removed = store.remove(userId);

  if (!removed) {
    throw new Error("User not found.");
  }

  return true;
}

export async function updateUserStatus(userId, status) {
  await delay(160);

  try {
    return store.update(userId, { status });
  } catch {
    throw new Error("User not found.");
  }
}
