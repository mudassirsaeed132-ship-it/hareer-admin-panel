const DEFAULT_DELAY_MS = 120;

function createAbortError() {
  try {
    return new DOMException("Aborted", "AbortError");
  } catch {
    const error = new Error("Aborted");
    error.name = "AbortError";
    return error;
  }
}

export function delay(ms = DEFAULT_DELAY_MS, { signal } = {}) {
  if (signal?.aborted) {
    return Promise.reject(createAbortError());
  }

  return new Promise((resolve, reject) => {
    const timeoutId = globalThis.setTimeout(resolve, ms);

    if (!signal) {
      return;
    }

    const handleAbort = () => {
      globalThis.clearTimeout(timeoutId);
      signal.removeEventListener("abort", handleAbort);
      reject(createAbortError());
    };

    signal.addEventListener("abort", handleAbort, { once: true });
  });
}
