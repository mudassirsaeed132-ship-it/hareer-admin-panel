import { useCallback } from "react";
import { getDashboardSummary } from "../api/dashboardApi";
import { createDashboardViewModel } from "../utils/dashboard.helpers";
import { QUERY_KEYS } from "../../../shared/constants/queryKeys";
import useAppQuery from "../../../shared/hooks/useAppQuery";

export default function useDashboardData() {
  const queryFn = useCallback(async ({ signal } = {}) => {
    const response = await getDashboardSummary({ signal });
    return createDashboardViewModel(response);
  }, []);

  const query = useAppQuery(QUERY_KEYS.dashboard.summary(), queryFn);

  return {
    data: query.data ?? null,
    loading: query.loading,
    error: query.error,
    refetch: query.refetch,
  };
}
