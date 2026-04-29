import { useCallback, useMemo, useState } from "react";
import {
  assignVendorServiceRequest,
  getVendorDetail,
  rejectVendorServiceRequest,
  updateVendorStatus,
} from "../api/vendorsApi";
import { QUERY_KEYS } from "../../../shared/constants/queryKeys";
import useAppQuery, { useQueryClient } from "../../../shared/hooks/useAppQuery";

export default function useVendorDetailsData(vendorId) {
  const [submitting, setSubmitting] = useState(false);
  const client = useQueryClient();

  const queryFn = useCallback(
    ({ signal } = {}) => getVendorDetail(vendorId, { signal }),
    [vendorId]
  );
  const query = useAppQuery(QUERY_KEYS.vendors.detail(vendorId), queryFn, {
    enabled: Boolean(vendorId),
  });

  const detail = useMemo(() => {
    return query.data && typeof query.data === "object" ? query.data : null;
  }, [query.data]);

  const updateDetailCache = useCallback(
    (updater) => {
      client.setQueryData(QUERY_KEYS.vendors.detail(vendorId), (previous) => {
        const normalized =
          previous && typeof previous === "object" ? previous : null;

        return typeof updater === "function" ? updater(normalized) : updater;
      });
    },
    [client, vendorId]
  );

  const updateOverviewCache = useCallback(
    (updater) => {
      client.setQueryData(QUERY_KEYS.vendors.overview(), (previous) => {
        const base = previous && typeof previous === "object" ? previous : {};
        const normalized = {
          vendors: Array.isArray(base.vendors) ? base.vendors : [],
          vendorRequests: Array.isArray(base.vendorRequests)
            ? base.vendorRequests
            : [],
          serviceRequests: Array.isArray(base.serviceRequests)
            ? base.serviceRequests
            : [],
          payouts: Array.isArray(base.payouts) ? base.payouts : [],
        };

        return typeof updater === "function" ? updater(normalized) : updater;
      });
    },
    [client]
  );

  const toggleVendorStatusForDetail = useCallback(async () => {
    if (!detail) return;

    const nextStatus = detail.status === "active" ? "deactivated" : "active";

    setSubmitting(true);
    try {
      await updateVendorStatus(detail.id, nextStatus);

      updateDetailCache((previous) =>
        previous
          ? {
              ...previous,
              status: nextStatus,
            }
          : previous
      );

      updateOverviewCache((previous) => ({
        ...previous,
        vendors: previous.vendors.map((item) =>
          item.id === detail.id ? { ...item, status: nextStatus } : item
        ),
      }));
    } finally {
      setSubmitting(false);
    }
  }, [detail, updateDetailCache, updateOverviewCache]);

  const assignServiceRequest = useCallback(async (requestId, payload) => {
    setSubmitting(true);
    try {
      const updated = await assignVendorServiceRequest(requestId, payload);

      updateDetailCache((previous) =>
        previous
          ? {
              ...previous,
              serviceRequests: previous.serviceRequests.map((item) =>
                item.id === requestId ? updated : item
              ),
            }
          : previous
      );

      return updated;
    } finally {
      setSubmitting(false);
    }
  }, [updateDetailCache]);

  const rejectServiceRequest = useCallback(async (requestId) => {
    setSubmitting(true);
    try {
      await rejectVendorServiceRequest(requestId);

      updateDetailCache((previous) =>
        previous
          ? {
              ...previous,
              serviceRequests: previous.serviceRequests.filter(
                (item) => item.id !== requestId
              ),
            }
          : previous
      );
    } finally {
      setSubmitting(false);
    }
  }, [updateDetailCache]);

  return {
    detail,
    loading: query.loading,
    submitting,
    error: query.error,
    refetch: query.refetch,
    toggleVendorStatusForDetail,
    assignServiceRequest,
    rejectServiceRequest,
  };
}
