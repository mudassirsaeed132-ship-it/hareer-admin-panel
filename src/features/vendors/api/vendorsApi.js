import { API_ENDPOINTS } from "../../../services/api/endpoints";
import {
  createJsonBody,
  JSON_HEADERS,
  requestJson,
} from "../../../services/api/client";

export async function getVendorsOverview({ signal } = {}) {
  return requestJson(API_ENDPOINTS.vendors.overview, {
    method: "GET",
    signal,
    fallbackMessage: "Failed to load vendors.",
  });
}

export async function getVendorDetail(vendorId, { signal } = {}) {
  return requestJson(API_ENDPOINTS.vendors.detail(vendorId), {
    method: "GET",
    signal,
    fallbackMessage: "Failed to load vendor detail.",
  });
}

export async function updateVendorStatus(vendorId, status) {
  return requestJson(API_ENDPOINTS.vendors.status(vendorId), {
    method: "PATCH",
    headers: JSON_HEADERS,
    body: createJsonBody({ status }),
    fallbackMessage: "Failed to update vendor status.",
  });
}

export async function reviewVendorRequest(requestId, decision) {
  return requestJson(API_ENDPOINTS.vendors.requestDecision(requestId), {
    method: "POST",
    headers: JSON_HEADERS,
    body: createJsonBody({ decision }),
    fallbackMessage: "Failed to process vendor request.",
  });
}

export async function assignVendorServiceRequest(requestId, payload) {
  return requestJson(API_ENDPOINTS.vendors.serviceRequestAssign(requestId), {
    method: "POST",
    headers: JSON_HEADERS,
    body: createJsonBody(payload),
    fallbackMessage: "Failed to assign service request.",
  });
}

export async function rejectVendorServiceRequest(requestId) {
  return requestJson(API_ENDPOINTS.vendors.serviceRequestReject(requestId), {
    method: "POST",
    fallbackMessage: "Failed to reject service request.",
  });
}

export async function saveVendorCommissionSettings(payoutId, payload) {
  return requestJson(API_ENDPOINTS.vendors.payoutCommission(payoutId), {
    method: "POST",
    headers: JSON_HEADERS,
    body: createJsonBody(payload),
    fallbackMessage: "Failed to save commission settings.",
  });
}

export async function releaseVendorPayout(payoutId) {
  return requestJson(API_ENDPOINTS.vendors.payoutRelease(payoutId), {
    method: "POST",
    fallbackMessage: "Failed to release payout.",
  });
}
