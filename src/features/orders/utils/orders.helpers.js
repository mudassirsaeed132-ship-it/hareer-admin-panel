import { ORDER_STATUS_META, PAYMENT_STATUS_META } from "../constants/orders.constants";

function normalizeText(value) {
  return String(value ?? "").trim().toLowerCase();
}

export function getPaymentStatusMeta(status) {
  return PAYMENT_STATUS_META[status] ?? {
    label: status,
    className: "bg-[#F3F0EE] text-[#6F6965]",
  };
}

export function getOrderStatusMeta(status) {
  return ORDER_STATUS_META[status] ?? {
    label: status,
    className: "bg-[#F3F0EE] text-[#6F6965]",
  };
}

export function filterOrders(orders, filters) {
  const search = normalizeText(filters?.query);
  const status = normalizeText(filters?.status);

  return orders.filter((order) => {
    const matchesStatus =
      !status || status === "all" ? true : normalizeText(order.orderStatus) === status;

    if (!matchesStatus) {
      return false;
    }

    if (!search) {
      return true;
    }

    const haystack = [
      order.orderId,
      order.customerName,
      order.customerAddress,
      order.storeName,
      order.type,
    ]
      .map(normalizeText)
      .join(" ");

    return haystack.includes(search);
  });
}