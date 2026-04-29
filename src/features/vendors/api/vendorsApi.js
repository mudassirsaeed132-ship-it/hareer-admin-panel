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

export async function saveVendorCommissionSettings(payoutId, payload) {
  await delay(180);

  const index = overviewDb.payouts.findIndex((item) => item.id === payoutId);

  if (index < 0) {
    throw new Error("Payout not found.");
  }

  const totalSales = Number(overviewDb.payouts[index].totalSales);
  const commissionRate = Number(payload?.commissionRate);
  const additionalCostPercent = Number(payload?.additionalCostPercent);
  const commissionAmount = Math.round((totalSales * commissionRate) / 100);
  const additionalCostAmount = Math.round((totalSales * additionalCostPercent) / 100);

  overviewDb.payouts[index] = {
    ...overviewDb.payouts[index],
    commissionRate,
    additionalCostPercent,
    commissionAmount,
    additionalCostAmount,
  };

  return deepClone(overviewDb.payouts[index]);
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
