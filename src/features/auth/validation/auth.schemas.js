import { normalizeEmail } from "../utils/auth.helpers";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email) {
  return EMAIL_REGEX.test(normalizeEmail(email));
}

export function isValidPassword(password) {
  return typeof password === "string" && password.trim().length >= 6;
}

export function validateLogin(values) {
  const errors = {};

  if (!isValidEmail(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!isValidPassword(values.password)) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
}

export function validateForgotPassword(values) {
  const errors = {};

  if (!isValidEmail(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  return errors;
}

export function validateResetPassword(values) {
  const errors = {};

  if (!isValidPassword(values.password)) {
    errors.password = "Password must be at least 6 characters";
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}

export function hasNoErrors(errors = {}) {
  return Object.keys(errors).length === 0;
}