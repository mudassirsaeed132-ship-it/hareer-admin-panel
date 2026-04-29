import { useCallback, useMemo, useState } from "react";
import { getOrderDetails, getOrdersList } from "../api/ordersApi";
import { QUERY_KEYS } from "../../../shared/constants/queryKeys";
import useAppQuery, { useQueryClient } from "../../../shared/hooks/useAppQuery";

export default function useOrdersData() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState("");

  const client = useQueryClient();

  const ordersQueryFn = useCallback(
    ({ signal } = {}) => getOrdersList({ signal }),
    []
  );

  const ordersQuery = useAppQuery(QUERY_KEYS.orders.list(), ordersQueryFn);

  const orders = useMemo(() => {
    return Array.isArray(ordersQuery.data) ? ordersQuery.data : [];
  }, [ordersQuery.data]);

  const selectedOrder = useMemo(() => {
    return orders.find((order) => order.id === selectedOrderId) ?? null;
  }, [orders, selectedOrderId]);

  const detailQueryFn = useCallback(
    ({ signal } = {}) => getOrderDetails(selectedOrderId, { signal }),
    [selectedOrderId]
  );

  const detailQuery = useAppQuery(
    QUERY_KEYS.orders.details(selectedOrderId),
    detailQueryFn,
    { enabled: Boolean(selectedOrderId) }
  );

  const openOrderDetails = useCallback(
    async (orderId) => {
      if (!orderId) return;

      client
        .fetchQuery(
          client.hashQueryKey(QUERY_KEYS.orders.details(orderId)),
          ({ signal } = {}) => getOrderDetails(orderId, { signal }),
          { force: false }
        )
        .catch(() => {
          // Error is stored in query state and will be shown in the drawer.
        });

      setSelectedOrderId(orderId);
      setIsDrawerOpen(true);
    },
    [client]
  );

  const closeOrderDetails = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  const confirmSelectedOrder = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return {
    orders,
    loading: ordersQuery.loading,
    error: ordersQuery.error,
    refetch: ordersQuery.refetch,
    isDrawerOpen,
    selectedOrder,
    selectedOrderDetail: detailQuery.data ?? null,
    detailLoading: detailQuery.loading,
    detailError: detailQuery.error,
    openOrderDetails,
    closeOrderDetails,
    confirmSelectedOrder,
  };
}
