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
function computePayoutCommission(totalSales, rate) {
  const sales = Number(totalSales) || 0;
  const commissionRate = clampRate(rate);
  const commissionAmount = Math.round((sales * commissionRate) / 100);

  return {
    commissionRate,
    commissionAmount,
    netPayout: sales - commissionAmount,
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

  const vendorIndex = overviewDb.vendors.findIndex((item) => item.id === vendorId);
  if (vendorIndex >= 0) {
    overviewDb.vendors[vendorIndex] = {
      ...overviewDb.vendors[vendorIndex],
      commissionRate,
    };
  }

  if (detailDb[vendorId]) {
    detailDb[vendorId].commissionRate = commissionRate;
  }

  overviewDb.payouts = overviewDb.payouts.map((item) => {
    if (item.vendorId !== vendorId || item.status === "paid") {
      return item;
    }

    return { ...item, ...computePayoutCommission(item.totalSales, commissionRate) };
  });

  return {
    vendorId,
    commissionRate,
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
