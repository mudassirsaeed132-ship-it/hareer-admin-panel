import { useState } from "react";
import { QueryClientContext } from "./QueryClientContext";

const DEFAULT_QUERY_OPTIONS = {
  retry: 1,
  refetchOnWindowFocus: false,
  staleTime: 30_000,
};

const EMPTY_QUERY_STATE = Object.freeze({
  data: undefined,
  error: null,
  status: "idle",
  updatedAt: 0,
  fetching: false,
  promise: null,
});

function hashQueryKey(queryKey) {
  return JSON.stringify(queryKey ?? []);
}

function createQueryClient(defaultOptions = DEFAULT_QUERY_OPTIONS) {
  const cache = new Map();
  const listeners = new Map();

  function getQueryState(keyHash) {
    return cache.get(keyHash) || EMPTY_QUERY_STATE;
  }

  function notify(keyHash) {
    const keyListeners = listeners.get(keyHash);
    if (!keyListeners) return;
    keyListeners.forEach((listener) => listener());
  }

  function setQueryState(keyHash, nextState) {
    const previous = cache.get(keyHash);

    if (previous === nextState) {
      return;
    }

    cache.set(keyHash, nextState);
    notify(keyHash);
  }

  function subscribe(keyHash, callback) {
    let keyListeners = listeners.get(keyHash);

    if (!keyListeners) {
      keyListeners = new Set();
      listeners.set(keyHash, keyListeners);
    }

    keyListeners.add(callback);

    return () => {
      keyListeners.delete(callback);

      if (keyListeners.size === 0) {
        listeners.delete(keyHash);
      }
    };
  }

  function isStale(state, staleTime) {
    if (!state.updatedAt) return true;
    return Date.now() - state.updatedAt > staleTime;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function fetchQuery(
    keyHash,
    queryFn,
    { staleTime = defaultOptions.staleTime, retry = defaultOptions.retry, force = false } = {}
  ) {
    const current = getQueryState(keyHash);

    if (!force && current.status === "success" && !isStale(current, staleTime)) {
      return current.data;
    }

    if (current.promise) {
      return current.promise;
    }

    const controller = new AbortController();

    const promise = (async () => {
      let lastError = null;

      try {
        for (let attempt = 0; attempt <= retry; attempt += 1) {
          try {
            const data = await queryFn({ signal: controller.signal });

            setQueryState(keyHash, {
              data,
              error: null,
              status: "success",
              updatedAt: Date.now(),
              fetching: false,
              promise: null,
              controller: null,
            });

            return data;
          } catch (error) {
            if (controller.signal.aborted || error?.name === "AbortError") {
              throw error;
            }

            lastError = error;

            if (attempt < retry) {
              await sleep(220);
            }
          }
        }

        setQueryState(keyHash, {
          ...getQueryState(keyHash),
          status: current.data === undefined ? "error" : current.status,
          error: lastError,
          fetching: false,
          promise: null,
          controller: null,
        });

        throw lastError;
      } catch (error) {
        if (controller.signal.aborted || error?.name === "AbortError") {
          setQueryState(keyHash, {
            ...getQueryState(keyHash),
            status: current.data === undefined ? "idle" : current.status,
            fetching: false,
            promise: null,
            controller: null,
            error: null,
          });
        }

        throw error;
      }
    })();

    setQueryState(keyHash, {
      ...current,
      fetching: true,
      status: current.data === undefined ? "loading" : current.status,
      error: null,
      promise,
      controller,
    });

    return promise;
  }

  function abortQuery(keyHash) {
    const current = getQueryState(keyHash);

    if (current.controller && !current.controller.signal.aborted) {
      current.controller.abort();
    }

    if (current.promise || current.fetching) {
      setQueryState(keyHash, {
        ...current,
        fetching: false,
        promise: null,
        controller: null,
      });
    }
  }

  function setQueryData(queryKey, updater) {
    const keyHash = hashQueryKey(queryKey);
    const current = getQueryState(keyHash);
    const nextData = typeof updater === "function" ? updater(current.data) : updater;

    setQueryState(keyHash, {
      data: nextData,
      error: null,
      status: "success",
      updatedAt: Date.now(),
      fetching: false,
      promise: null,
      controller: null,
    });
  }

  function invalidateQuery(queryKey) {
    const keyHash = hashQueryKey(queryKey);
    const current = getQueryState(keyHash);

    if (current === EMPTY_QUERY_STATE) return;

    setQueryState(keyHash, {
      ...current,
      updatedAt: 0,
    });
  }

  return {
    defaultOptions,
    hashQueryKey,
    getQueryState,
    setQueryData,
    invalidateQuery,
    fetchQuery,
    abortQuery,
    subscribe,
  };
}

export default function QueryProvider({ children }) {
  const [client] = useState(() => createQueryClient(DEFAULT_QUERY_OPTIONS));

  return (
    <QueryClientContext.Provider value={client}>{children}</QueryClientContext.Provider>
  );
}
