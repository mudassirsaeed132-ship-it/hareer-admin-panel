import { useCallback, useMemo, useState } from "react";
import { fetchPayments, fetchPaymentsSummary } from "../api/paymentsApi";
import { QUERY_KEYS } from "../../../shared/constants/queryKeys";
import useAppQuery from "../../../shared/hooks/useAppQuery";

export default function usePaymentsData() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const summaryQueryFn = useCallback(
    ({ signal } = {}) => fetchPaymentsSummary({ signal }),
    []
  );

  const summaryQuery = useAppQuery(QUERY_KEYS.payments.summary(), summaryQueryFn);

  const listQueryFn = useCallback(
    ({ signal } = {}) =>
      fetchPayments(
        {
          search: searchQuery,
          status: statusFilter,
        },
        { signal }
      ),
    [searchQuery, statusFilter]
  );

  const listQuery = useAppQuery(
    QUERY_KEYS.payments.list({
      search: searchQuery,
      status: statusFilter,
    }),
    listQueryFn
  );

  const summary = useMemo(() => {
    return (
      summaryQuery.data ?? {
        totalRevenue: 0,
        pendingPayments: 0,
        currency: "LYD",
      }
    );
  }, [summaryQuery.data]);

  const rows = useMemo(() => {
    return Array.isArray(listQuery.data?.items) ? listQuery.data.items : [];
  }, [listQuery.data]);

  const loading = summaryQuery.loading || listQuery.loading;
  const error = summaryQuery.error || listQuery.error;

  return {
    summary,
    rows,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    loading,
    error,
  };
}
