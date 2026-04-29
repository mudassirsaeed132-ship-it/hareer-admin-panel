import { STATUS_META } from "../constants/vendors.constants";

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

export function getStatusMeta(status) {
  return STATUS_META[status] ?? {
    label: status,
    className: "bg-[#F3F0EE] text-[#6F6965]",
  };
}

export function filterVendors(vendors, query, status) {
  const search = normalize(query);
  const normalizedStatus = normalize(status);

  return vendors.filter((vendor) => {
    const matchesStatus =
      normalizedStatus === "all" || !normalizedStatus
        ? true
        : normalize(vendor.status) === normalizedStatus;

    if (!matchesStatus) return false;

    if (!search) return true;

    const haystack = [
      vendor.vendorName,
      vendor.businessName,
      vendor.category,
      vendor.website,
      vendor.location,
    ]
      .map(normalize)
      .join(" ");

    return haystack.includes(search);
  });
}

export function filterVendorRequests(items, query) {
  const search = normalize(query);

  if (!search) return items;

  return items.filter((item) => {
    const haystack = [
      item.vendorName,
      item.businessName,
      item.category,
      item.website,
      item.location,
    ]
      .map(normalize)
      .join(" ");

    return haystack.includes(search);
  });
}

export function filterServiceRequests(items, query) {
  const search = normalize(query);

  if (!search) return items;

  return items.filter((item) => {
    const haystack = [
      item.vendorName,
      item.category,
      item.duration,
      item.description,
    ]
      .map(normalize)
      .join(" ");

    return haystack.includes(search);
  });
}

export function filterPayouts(items, query, status, month) {
  const search = normalize(query);
  const normalizedStatus = normalize(status);
  const normalizedMonth = normalize(month);

  return items.filter((item) => {
    const matchesStatus =
      normalizedStatus === "all" || !normalizedStatus
        ? true
        : normalize(item.status) === normalizedStatus;

    const matchesMonth =
      normalizedMonth === "all" || !normalizedMonth
        ? true
        : normalize(item.month) === normalizedMonth;

    if (!matchesStatus || !matchesMonth) return false;

    if (!search) return true;

    const haystack = [item.vendorName, item.ownerName, item.month]
      .map(normalize)
      .join(" ");

    return haystack.includes(search);
  });
}

export function filterVendorOrders(items, query, status) {
  const search = normalize(query);
  const normalizedStatus = normalize(status);

  return items.filter((item) => {
    const matchesStatus =
      normalizedStatus === "all" || !normalizedStatus
        ? true
        : normalize(item.orderStatus) === normalizedStatus;

    if (!matchesStatus) return false;

    if (!search) return true;

    const haystack = [
      item.orderId,
      item.customerName,
      item.customerAddress,
      item.storeName,
      item.type,
    ]
      .map(normalize)
      .join(" ");

    return haystack.includes(search);
  });
}

export function filterVendorProducts(items, query) {
  const search = normalize(query);

  if (!search) return items;

  return items.filter((item) => {
    const haystack = [item.productName, item.category, item.sku]
      .map(normalize)
      .join(" ");

    return haystack.includes(search);
  });
}