import { http, HttpResponse } from "msw";
import { API_ENDPOINTS } from "../../services/api/endpoints";
import {
  createVendorDetailFromRequest,
  vendorDetailsByIdMock,
  vendorsOverviewMock,
} from "../data/vendors.mock";

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const withBase = (path) => `${API_BASE}${path}`;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

let overviewDb = clone(vendorsOverviewMock);
let detailDb = clone(vendorDetailsByIdMock);

function updateDetailVendorStatus(vendorId, status) {
  if (detailDb[vendorId]) {
    detailDb[vendorId].status = status;
  }
}

function updateDetailServiceRequest(requestId, updater) {
  Object.keys(detailDb).forEach((vendorId) => {
    const index = detailDb[vendorId].serviceRequests.findIndex(
      (request) => request.id === requestId
    );

    if (index >= 0) {
      detailDb[vendorId].serviceRequests[index] = updater(
        detailDb[vendorId].serviceRequests[index]
      );
    }
  });
}

export const vendorsHandlers = [
  http.get(withBase(API_ENDPOINTS.vendors.overview), async () => {
    return HttpResponse.json(clone(overviewDb));
  }),

  http.get(withBase("/api/vendors/:vendorId"), async ({ params }) => {
    const detail = detailDb[params.vendorId];

    if (!detail) {
      return HttpResponse.json(
        { message: "Vendor detail not found." },
        { status: 404 }
      );
    }

    return HttpResponse.json(clone(detail));
  }),

  http.patch(withBase("/api/vendors/:vendorId/status"), async ({ params, request }) => {
    const payload = await request.json();

    const index = overviewDb.vendors.findIndex(
      (vendor) => vendor.id === params.vendorId
    );

    if (index < 0) {
      return HttpResponse.json({ message: "Vendor not found." }, { status: 404 });
    }

    overviewDb.vendors[index].status = payload.status;
    updateDetailVendorStatus(params.vendorId, payload.status);

    return HttpResponse.json(clone(overviewDb.vendors[index]));
  }),

  http.post(withBase("/api/vendors/requests/:requestId/decision"), async ({ params, request }) => {
    const payload = await request.json();

    const requestIndex = overviewDb.vendorRequests.findIndex(
      (item) => item.id === params.requestId
    );

    if (requestIndex < 0) {
      return HttpResponse.json(
        { message: "Vendor request not found." },
        { status: 404 }
      );
    }

    const selectedRequest = overviewDb.vendorRequests[requestIndex];
    overviewDb.vendorRequests.splice(requestIndex, 1);

    let createdVendor = null;

    if (payload.decision === "accept") {
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

    return HttpResponse.json({
      success: true,
      decision: payload.decision,
      vendor: createdVendor,
      requestId: params.requestId,
    });
  }),

  http.post(withBase("/api/vendors/service-requests/:requestId/assign"), async ({ params, request }) => {
    const payload = await request.json();

    const index = overviewDb.serviceRequests.findIndex(
      (item) => item.id === params.requestId
    );

    if (index < 0) {
      return HttpResponse.json(
        { message: "Service request not found." },
        { status: 404 }
      );
    }

    overviewDb.serviceRequests[index] = {
      ...overviewDb.serviceRequests[index],
      status: "accepted",
      assignedAgent: payload.deliveryAgent || "Auto Select",
      serviceFee: Number(payload.serviceFee),
      paymentTerms: payload.paymentTerms,
      notes: payload.notes,
    };

    updateDetailServiceRequest(params.requestId, (requestItem) => ({
      ...requestItem,
      status: "accepted",
      assignedAgent: payload.deliveryAgent || "Auto Select",
      serviceFee: Number(payload.serviceFee),
      paymentTerms: payload.paymentTerms,
      notes: payload.notes,
    }));

    return HttpResponse.json(clone(overviewDb.serviceRequests[index]));
  }),

  http.post(withBase("/api/vendors/service-requests/:requestId/reject"), async ({ params }) => {
    overviewDb.serviceRequests = overviewDb.serviceRequests.filter(
      (item) => item.id !== params.requestId
    );

    Object.keys(detailDb).forEach((vendorId) => {
      detailDb[vendorId].serviceRequests = detailDb[vendorId].serviceRequests.filter(
        (item) => item.id !== params.requestId
      );
    });

    return HttpResponse.json({ success: true, requestId: params.requestId });
  }),

  http.post(withBase("/api/vendors/payouts/:payoutId/commission"), async ({ params, request }) => {
    const payload = await request.json();

    const index = overviewDb.payouts.findIndex((item) => item.id === params.payoutId);

    if (index < 0) {
      return HttpResponse.json({ message: "Payout not found." }, { status: 404 });
    }

    const totalSales = Number(overviewDb.payouts[index].totalSales);
    const commissionRate = Number(payload.commissionRate);
    const additionalCostPercent = Number(payload.additionalCostPercent);
    const commissionAmount = Math.round((totalSales * commissionRate) / 100);
    const additionalCostAmount = Math.round(
      (totalSales * additionalCostPercent) / 100
    );

    overviewDb.payouts[index] = {
      ...overviewDb.payouts[index],
      commissionRate,
      additionalCostPercent,
      commissionAmount,
      additionalCostAmount,
    };

    return HttpResponse.json(clone(overviewDb.payouts[index]));
  }),

  http.post(withBase("/api/vendors/payouts/:payoutId/release"), async ({ params }) => {
    const index = overviewDb.payouts.findIndex((item) => item.id === params.payoutId);

    if (index < 0) {
      return HttpResponse.json({ message: "Payout not found." }, { status: 404 });
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

    return HttpResponse.json(clone(overviewDb.payouts[index]));
  }),
];

export default vendorsHandlers;
