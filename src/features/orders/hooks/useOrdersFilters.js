import { useMemo, useState } from "react";
import { filterOrders } from "../utils/orders.helpers";

export default function useOrdersFilters(orders = []) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const filteredOrders = useMemo(() => {
    return filterOrders(orders, { query, status });
  }, [orders, query, status]);

  return {
    query,
    setQuery,
    status,
    setStatus,
    filteredOrders,
  };
}