import { useCallback, useContext, useEffect, useSyncExternalStore } from "react";
import { QueryClientContext } from "../../app/providers/QueryClientContext";

export function useQueryClient() {
  const client = useContext(QueryClientContext);

  if (!client) {
    throw new Error("QueryClient not found. Wrap your app with <QueryProvider />.");
  }

  return client;
}

export default function useAppQuery(
  queryKey,
  queryFn,
  { enabled = true, staleTime, retry } = {}
) {
  const client = useQueryClient();
  const keyHash = client.hashQueryKey(queryKey);

  const subscribe = useCallback(
    (onStoreChange) => client.subscribe(keyHash, onStoreChange),
    [client, keyHash]
  );

  const getSnapshot = useCallback(() => client.getQueryState(keyHash), [client, keyHash]);

  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const resolvedStaleTime = staleTime ?? client.defaultOptions.staleTime;
  const resolvedRetry = retry ?? client.defaultOptions.retry;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    client.fetchQuery(keyHash, queryFn, {
      staleTime: resolvedStaleTime,
      retry: resolvedRetry,
    }).catch(() => {
      // Errors are stored in the query state.
    });
  }, [client, enabled, keyHash, queryFn, resolvedRetry, resolvedStaleTime]);

  const refetch = useCallback(() => {
    if (!enabled) {
      return Promise.resolve(state.data);
    }

    return client.fetchQuery(keyHash, queryFn, {
      staleTime: resolvedStaleTime,
      retry: resolvedRetry,
      force: true,
    });
  }, [client, enabled, keyHash, queryFn, resolvedRetry, resolvedStaleTime, state.data]);

  const hasData = state.data !== undefined;

  return {
    data: state.data,
    loading: enabled ? state.status === "loading" : false,
    fetching: enabled ? Boolean(state.fetching) : false,
    error: hasData ? "" : state.error?.message || "",
    refetch,
  };
}
