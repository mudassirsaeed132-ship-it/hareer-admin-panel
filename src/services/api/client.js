const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

function withBase(pathOrUrl) {
  if (!pathOrUrl) return pathOrUrl;

  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  if (!API_BASE) {
    return pathOrUrl;
  }

  if (pathOrUrl.startsWith("/")) {
    return `${API_BASE}${pathOrUrl}`;
  }

  return `${API_BASE}/${pathOrUrl}`;
}

async function readJson(response) {
  const contentType = response.headers.get("content-type") || "";

  let text = "";

  try {
    text = await response.text();
  } catch {
    return { payload: null, contentType, text: "" };
  }

  if (!text) {
    return { payload: null, contentType, text: "" };
  }

  const looksLikeJson =
    contentType.includes("application/json") || /^[\s]*[[{]/.test(text);

  if (!looksLikeJson) {
    return { payload: null, contentType, text };
  }

  try {
    return { payload: JSON.parse(text), contentType, text };
  } catch {
    return { payload: null, contentType, text };
  }
}

function resolveErrorMessage(payload, fallbackMessage) {
  if (!payload) return fallbackMessage;
  if (typeof payload === "string") return payload;

  if (typeof payload.message === "string" && payload.message.trim()) {
    return payload.message.trim();
  }

  if (typeof payload.error === "string" && payload.error.trim()) {
    return payload.error.trim();
  }

  return fallbackMessage;
}

export async function requestJson(
  path,
  {
    method = "GET",
    headers = {},
    body,
    signal,
    fallbackMessage = "Request failed.",
  } = {}
) {
  const url = withBase(path);

  const response = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      ...headers,
    },
    body,
    signal,
  });

  const { payload, contentType, text } = await readJson(response);

  if (!response.ok) {
    const message = resolveErrorMessage(
      payload || (text ? text.trim() : null),
      fallbackMessage
    );

    throw new Error(`${message} (HTTP ${response.status})`);
  }

  if (payload === null && text) {
    const trimmed = text.trim();
    const preview = trimmed.length > 140 ? `${trimmed.slice(0, 140)}...` : trimmed;

    throw new Error(
      `Expected JSON from ${url} but received ${
        contentType || "unknown content-type"
      }: ${preview}`
    );
  }

  return payload;
}

export async function requestOk(
  path,
  { method = "POST", headers = {}, body, signal, fallbackMessage } = {}
) {
  const url = withBase(path);

  const response = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      ...headers,
    },
    body,
    signal,
  });

  if (!response.ok) {
    const { payload, text } = await readJson(response);
    throw new Error(
      `${resolveErrorMessage(
        payload || (text ? text.trim() : null),
        fallbackMessage || "Request failed."
      )} (HTTP ${response.status})`
    );
  }

  return true;
}

export function createJsonBody(payload) {
  return JSON.stringify(payload ?? {});
}

export const JSON_HEADERS = {
  "Content-Type": "application/json",
};
