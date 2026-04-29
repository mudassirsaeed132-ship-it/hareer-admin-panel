import { useCallback, useMemo, useState } from "react";
import {
  assignVendorServiceRequest,
  getVendorsOverview,
  rejectVendorServiceRequest,
  releaseVendorPayout,
  reviewVendorRequest,
  saveVendorCommissionSettings,
  updateVendorStatus,
} from "../api/vendorsApi";
import { QUERY_KEYS } from "../../../shared/constants/queryKeys";
import useAppQuery, { useQueryClient } from "../../../shared/hooks/useAppQuery";

const EMPTY_OVERVIEW = Object.freeze({
  vendors: [],
  vendorRequests: [],
  serviceRequests: [],
  payouts: [],
});

function normalizeOverview(value) {
  if (!value || typeof value !== "object") {
    return EMPTY_OVERVIEW;
  }

  return {
    vendors: Array.isArray(value.vendors) ? value.vendors : [],
    vendorRequests: Array.isArray(value.vendorRequests) ? value.vendorRequests : [],
    serviceRequests: Array.isArray(value.serviceRequests) ? value.serviceRequests : [],
    payouts: Array.isArray(value.payouts) ? value.payouts : [],
  };
}

export default function useVendorsData() {
  const [submitting, setSubmitting] = useState(false);
  const client = useQueryClient();

  const queryFn = useCallback(
    ({ signal } = {}) => getVendorsOverview({ signal }),
    []
  );
  const query = useAppQuery(QUERY_KEYS.vendors.overview(), queryFn);

  const overview = useMemo(() => normalizeOverview(query.data), [query.data]);

  const updateCache = useCallback(
    (updater) => {
      client.setQueryData(QUERY_KEYS.vendors.overview(), (previous) => {
        const normalized = normalizeOverview(previous);
        return typeof updater === "function" ? updater(normalized) : updater;
      });
    },
    [client]
  );

  const toggleVendorRowStatus = useCallback(async (vendor) => {
    const nextStatus = vendor.status === "active" ? "deactivated" : "active";

    setSubmitting(true);
    try {
      const updated = await updateVendorStatus(vendor.id, nextStatus);

      updateCache((previous) => ({
        ...previous,
        vendors: previous.vendors.map((item) =>
          item.id === vendor.id ? updated : item
        ),
      }));

      client.setQueryData(
        QUERY_KEYS.vendors.detail(vendor.id),
        (currentDetail) =>
          currentDetail && typeof currentDetail === "object"
            ? { ...currentDetail, status: updated.status }
            : currentDetail
      );
    } finally {
      setSubmitting(false);
    }
  }, [client, updateCache]);

  const handleVendorRequestDecision = useCallback(async (request, decision) => {
    setSubmitting(true);
    try {
      const response = await reviewVendorRequest(request.id, decision);

      updateCache((previous) => ({
        ...previous,
        vendorRequests: previous.vendorRequests.filter(
          (item) => item.id !== request.id
        ),
        vendors:
          response.vendor && decision === "accept"
            ? [response.vendor, ...previous.vendors]
            : previous.vendors,
      }));
    } finally {
      setSubmitting(false);
    }
  }, [updateCache]);

  const handleAssignServiceRequest = useCallback(async (requestId, payload) => {
    setSubmitting(true);
    try {
      const updated = await assignVendorServiceRequest(requestId, payload);

      updateCache((previous) => ({
        ...previous,
        serviceRequests: previous.serviceRequests.map((item) =>
          item.id === requestId ? updated : item
        ),
      }));

      return updated;
    } finally {
      setSubmitting(false);
    }
  }, [updateCache]);

  const handleRejectServiceRequest = useCallback(async (requestId) => {
    setSubmitting(true);
    try {
      await rejectVendorServiceRequest(requestId);

      updateCache((previous) => ({
        ...previous,
        serviceRequests: previous.serviceRequests.filter(
          (item) => item.id !== requestId
        ),
      }));
    } finally {
      setSubmitting(false);
    }
  }, [updateCache]);

  const handleSaveCommissionSettings = useCallback(async (payoutId, payload) => {
    setSubmitting(true);
    try {
      const updated = await saveVendorCommissionSettings(payoutId, payload);

      updateCache((previous) => ({
        ...previous,
        payouts: previous.payouts.map((item) =>
          item.id === payoutId ? updated : item
        ),
      }));

      return updated;
    } finally {
      setSubmitting(false);
    }
  }, [updateCache]);

  const handleReleasePayout = useCallback(async (payoutId) => {
    setSubmitting(true);
    try {
      const updated = await releaseVendorPayout(payoutId);

      updateCache((previous) => ({
        ...previous,
        payouts: previous.payouts.map((item) => (item.id === payoutId ? updated : item)),
      }));
    } finally {
      setSubmitting(false);
    }
  }, [updateCache]);

  return {
    overview,
    loading: query.loading,
    submitting,
    error: query.error,
    refetch: query.refetch,
    toggleVendorRowStatus,
    handleVendorRequestDecision,
    handleAssignServiceRequest,
    handleRejectServiceRequest,
    handleSaveCommissionSettings,
    handleReleasePayout,
  };
}
