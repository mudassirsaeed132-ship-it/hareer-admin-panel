import { DEMO_USER } from "../constants/auth.constants";
import { createAuthToken, normalizeEmail } from "../utils/auth.helpers";

const AUTH_DELAY = 450;

function wait(ms = AUTH_DELAY) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function loginRequest({ email, password }) {
  await wait();

  const cleanEmail = normalizeEmail(email);

  if (!cleanEmail || !password) {
    throw new Error("Invalid email or password");
  }

  return {
    user: {
      ...DEMO_USER,
      email: cleanEmail,
    },
    token: createAuthToken(),
  };
}

export async function forgotPasswordRequest({ email }) {
  await wait();

  if (!normalizeEmail(email)) {
    throw new Error("Email address is required");
  }

  return {
    ok: true,
    email: normalizeEmail(email),
  };
}

export async function resetPasswordRequest({ password, confirmPassword }) {
  await wait();

  if (!password || password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  return {
    ok: true,
  };
}

export async function logoutRequest() {
  await wait(150);
  return {
    ok: true,
  };
}