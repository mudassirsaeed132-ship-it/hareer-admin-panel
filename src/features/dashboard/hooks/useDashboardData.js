import { useCallback } from "react";
import { getDashboardSummary } from "../api/dashboardApi";
import { createDashboardViewModel } from "../utils/dashboard.helpers";
import { QUERY_KEYS } from "../../../shared/constants/queryKeys";
import useAppQuery from "../../../shared/hooks/useAppQuery";

export default function useDashboardData(dateRange = {}) {
  const startDate = dateRange?.startDate ?? "";
  const endDate = dateRange?.endDate ?? "";

  const queryFn = useCallback(async ({ signal } = {}) => {
    const response = await getDashboardSummary({
      signal,
      dateRange: { startDate, endDate },
    });

    return createDashboardViewModel(response);
  }, [endDate, startDate]);

  const query = useAppQuery(
    QUERY_KEYS.dashboard.summary({ startDate, endDate }),
    queryFn
  );

  return {
    data: query.data ?? null,
    loading: query.loading || (!query.data && !query.error),
    error: query.error,
    refetch: query.refetch,
  };
}
