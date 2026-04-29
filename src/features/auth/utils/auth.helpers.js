export function normalizeEmail(value = "") {
  return value.trim().toLowerCase();
}

export function getAuthErrorMessage(error) {
  if (!error) return "Something went wrong. Please try again.";
  if (typeof error === "string") return error;
  return error.message || "Something went wrong. Please try again.";
}

export function createAuthToken() {
  return `mock-admin-token-${Date.now()}`;
}

export function getRedirectPath(location) {
  return location?.state?.from?.pathname || "/";
}