import {
  createVendorDetailFromRequest,
  vendorDetailsByIdMock,
  vendorsOverviewMock,
} from "../../../mocks/data/vendors.mock";
import { delay } from "../../../mocks/utils/delay";
import { deepClone } from "../../../mocks/utils/mockCrud";

let overviewDb = deepClone(vendorsOverviewMock);
let detailDb = deepClone(vendorDetailsByIdMock);

function updateDetailVendorStatus(vendorId, status) {
  if (detailDb[vendorId]) {
    detailDb[vendorId].status = status;
  }
}

function updateDetailServiceRequest(requestId, updater) {
  Object.keys(detailDb).forEach((vendorId) => {
    const requests = Array.isArray(detailDb[vendorId]?.serviceRequests)
      ? detailDb[vendorId].serviceRequests
      : [];

    const index = requests.findIndex((request) => request.id === requestId);

    if (index >= 0) {
      requests[index] = updater(requests[index]);
    }
  });
}

const DEFAULT_COMMISSION_RATE = 10;

function clampRate(value) {
  const rate = Number(value);
  if (!Number.isFinite(rate)) return 0;
  return Math.min(100, Math.max(0, rate));
}

// Sale-based commission: rate is a % of the vendor's gross sales for the period.
// Additional cost is a second agreed % deduction; net payout = sales − commission − additional cost.
// deliveryFees ([{ fee, radius }]) are captured per vendor but not (yet) deducted from the payout.
function computePayoutCommission(
  totalSales,
  { commissionRate, additionalCostPercent, deliveryFees } = {}
) {
  const sales = Number(totalSales) || 0;
  const rate = clampRate(commissionRate);
  const additionalRate = clampRate(additionalCostPercent);
  const commissionAmount = Math.round((sales * rate) / 100);
  const additionalCostAmount = Math.round((sales * additionalRate) / 100);

  return {
    commissionRate: rate,
    commissionAmount,
    additionalCostPercent: additionalRate,
    additionalCostAmount,
    deliveryFees: Array.isArray(deliveryFees) ? deliveryFees : [],
    netPayout: sales - commissionAmount - additionalCostAmount,
  };
}

export async function getVendorsOverview({ signal } = {}) {
  await delay(120, { signal });
  return deepClone(overviewDb);
}

export async function getVendorDetail(vendorId, { signal } = {}) {
  await delay(120, { signal });

  const detail = detailDb[String(vendorId || "")];

  if (!detail) {
    throw new Error("Vendor detail not found.");
  }

  return deepClone(detail);
}

export async function updateVendorStatus(vendorId, status) {
  await delay(160);

  const index = overviewDb.vendors.findIndex((vendor) => vendor.id === vendorId);

  if (index < 0) {
    throw new Error("Vendor not found.");
  }

  overviewDb.vendors[index].status = status;
  updateDetailVendorStatus(vendorId, status);

  return deepClone(overviewDb.vendors[index]);
}

export async function reviewVendorRequest(requestId, decision) {
  await delay(180);

  const requestIndex = overviewDb.vendorRequests.findIndex(
    (item) => item.id === requestId
  );

  if (requestIndex < 0) {
    throw new Error("Vendor request not found.");
  }

  const selectedRequest = overviewDb.vendorRequests[requestIndex];
  overviewDb.vendorRequests.splice(requestIndex, 1);

  let createdVendor = null;

  if (decision === "accept") {
    createdVendor = {
      id: selectedRequest.id.replace("vendor-request", "vendor"),
      vendorName: selectedRequest.vendorName,
      businessName: selectedRequest.businessName,
      businessLogoLabel: selectedRequest.businessLogoLabel,
      category: selectedRequest.category,
      website: selectedRequest.website,
      location: selectedRequest.location,
      status: "active",
      commissionRate: DEFAULT_COMMISSION_RATE,
    };

    overviewDb.vendors.unshift(createdVendor);
    detailDb[createdVendor.id] = createVendorDetailFromRequest(selectedRequest);
  }

  return {
    success: true,
    decision,
    vendor: createdVendor,
    requestId,
  };
}

export async function assignVendorServiceRequest(requestId, payload) {
  await delay(180);

  const index = overviewDb.serviceRequests.findIndex(
    (item) => item.id === requestId
  );

  if (index < 0) {
    throw new Error("Service request not found.");
  }

  const updated = {
    ...overviewDb.serviceRequests[index],
    status: "accepted",
    assignedAgent: payload?.deliveryAgent || "Auto Select",
    serviceFee: Number(payload?.serviceFee),
    paymentTerms: payload?.paymentTerms,
    notes: payload?.notes,
  };

  overviewDb.serviceRequests[index] = updated;

  updateDetailServiceRequest(requestId, (requestItem) => ({
    ...requestItem,
    status: "accepted",
    assignedAgent: payload?.deliveryAgent || "Auto Select",
    serviceFee: Number(payload?.serviceFee),
    paymentTerms: payload?.paymentTerms,
    notes: payload?.notes,
  }));

  return deepClone(updated);
}

export async function rejectVendorServiceRequest(requestId) {
  await delay(160);

  overviewDb.serviceRequests = overviewDb.serviceRequests.filter(
    (item) => item.id !== requestId
  );

  Object.keys(detailDb).forEach((vendorId) => {
    detailDb[vendorId].serviceRequests = detailDb[vendorId].serviceRequests.filter(
      (item) => item.id !== requestId
    );
  });

  return { success: true, requestId };
}

// Commission is per-vendor: saving a rate stores it on the vendor and re-applies it
// to every not-yet-paid payout for that vendor (paid payouts are already settled).
export async function saveVendorCommissionSettings(payoutId, payload) {
  await delay(180);

  const payout = overviewDb.payouts.find((item) => item.id === payoutId);

  if (!payout) {
    throw new Error("Payout not found.");
  }

  const { vendorId } = payout;
  const commissionRate = clampRate(payload?.commissionRate);
  const additionalCostPercent = clampRate(payload?.additionalCostPercent);
  const deliveryFees = Array.isArray(payload?.deliveryFees) ? payload.deliveryFees : [];
  const settings = { commissionRate, additionalCostPercent, deliveryFees };

  // A manually edited sales amount only overrides the payout being edited;
  // the rate/additional-cost settings still apply to all of the vendor's payouts.
  const hasSalesOverride =
    payload?.totalSales !== undefined &&
    payload?.totalSales !== null &&
    payload?.totalSales !== "";
  const overriddenSales = hasSalesOverride
    ? Math.max(0, Number(payload.totalSales) || 0)
    : null;

  const vendorIndex = overviewDb.vendors.findIndex((item) => item.id === vendorId);
  if (vendorIndex >= 0) {
    overviewDb.vendors[vendorIndex] = {
      ...overviewDb.vendors[vendorIndex],
      commissionRate,
      additionalCostPercent,
      deliveryFees,
    };
  }

  if (detailDb[vendorId]) {
    detailDb[vendorId].commissionRate = commissionRate;
    detailDb[vendorId].additionalCostPercent = additionalCostPercent;
    detailDb[vendorId].deliveryFees = deliveryFees;
  }

  overviewDb.payouts = overviewDb.payouts.map((item) => {
    if (item.vendorId !== vendorId || item.status === "paid") {
      return item;
    }

    const sales =
      item.id === payoutId && overriddenSales !== null
        ? overriddenSales
        : item.totalSales;

    return { ...item, totalSales: sales, ...computePayoutCommission(sales, settings) };
  });

  return {
    vendorId,
    commissionRate,
    additionalCostPercent,
    deliveryFees,
    payouts: deepClone(overviewDb.payouts),
  };
}

export async function releaseVendorPayout(payoutId) {
  await delay(160);

  const index = overviewDb.payouts.findIndex((item) => item.id === payoutId);

  if (index < 0) {
    throw new Error("Payout not found.");
  }

  const current = overviewDb.payouts[index].status;
  const nextStatus =
    current === "pending"
      ? "in-progress"
      : current === "in-progress"
      ? "paid"
      : "paid";

  overviewDb.payouts[index] = {
    ...overviewDb.payouts[index],
    status: nextStatus,
  };

  return deepClone(overviewDb.payouts[index]);
}
