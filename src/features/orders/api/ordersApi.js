import { orderDetailsByIdMock, ordersListMock } from "../../../mocks/data/orders.mock";
import { delay } from "../../../mocks/utils/delay";
import { deepClone } from "../../../mocks/utils/mockCrud";

let ordersDb = deepClone(ordersListMock);
let orderDetailsDb = deepClone(orderDetailsByIdMock);

export async function getOrdersList({ signal } = {}) {
  await delay(120, { signal });
  return deepClone(ordersDb);
}

export async function getOrderDetails(orderId, { signal } = {}) {
  await delay(120, { signal });

  const detail = orderDetailsDb[String(orderId || "")] ?? null;

  if (!detail) {
    throw new Error("Order detail not found.");
  }

  return deepClone(detail);
}
