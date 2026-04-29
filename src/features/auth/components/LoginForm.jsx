import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, AlertCircle } from "lucide-react";

import AuthButton from "./AuthButton";
import AuthTextField from "./AuthTextField";
import { AUTH_COPY, AUTH_ROUTES } from "../constants/auth.constants";
import { getAuthErrorMessage } from "../utils/auth.helpers";
import { hasNoErrors, isValidEmail, validateLogin } from "../validation/auth.schemas";
import { useAuthFlow } from "../hooks/useAuthFlow";

export default function LoginForm() {
  const {
    login,
    isLoading,
    error,
    clearAuthError,
    redirectAfterLogin,
  } = useAuthFlow();

  const [values, setValues] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const validationErrors = useMemo(() => validateLogin(values), [values]);
  const canSubmit = hasNoErrors(validationErrors);

  const updateField = (field) => (event) => {
    clearAuthError();

    const nextValue =
      event.target.type === "checkbox" ? event.target.checked : event.target.value;

    setValues((current) => ({
      ...current,
      [field]: nextValue,
    }));

    setFieldErrors((current) => ({
      ...current,
      [field]: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateLogin(values);
    setFieldErrors(errors);

    if (!hasNoErrors(errors)) return;

    try {
      await login({
        email: values.email,
        password: values.password,
        remember: values.remember,
      });

      redirectAfterLogin();
    } catch {
      setFieldErrors((current) => ({
        ...current,
        password: "Invalid Password",
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-[30px] font-semibold leading-tight tracking-[-0.03em] text-[#1F1B1A] sm:text-[34px]">
          {AUTH_COPY.login.title}
        </h1>
        <p className="mt-2 text-[16px] leading-[1.4] text-[#6F6A67]">
          {AUTH_COPY.login.description}
        </p>
      </div>

      <div className="space-y-3">
        <AuthTextField
          label="Email address"
          value={values.email}
          onChange={updateField("email")}
          autoComplete="email"
          autoFocus
          isValid={isValidEmail(values.email)}
          error={fieldErrors.email}
          trailing={
            !values.email ? <Mail className="h-5 w-5" strokeWidth={1.8} /> : null
          }
        />

        <AuthTextField
          label="Password"
          value={values.password}
          onChange={updateField("password")}
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          error={fieldErrors.password}
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="grid h-8 w-8 place-items-center"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" strokeWidth={1.8} />
              ) : (
                <Eye className="h-5 w-5" strokeWidth={1.8} />
              )}
            </button>
          }
        />
      </div>

      <div className="mt-2 flex min-h-[30px] items-center justify-between gap-3">
        <div className="min-w-0">
          {error && (
            <p className="flex items-center gap-1 text-[14px] font-medium text-[#F04438]">
              <AlertCircle className="h-4 w-4" />
              {getAuthErrorMessage(error)}
            </p>
          )}
        </div>

        <Link
          to={AUTH_ROUTES.forgotPassword}
          className="shrink-0 text-[15px] font-medium text-[#E8B0B2] transition hover:text-[#DFA1A3]"
        >
          Forgot Password?
        </Link>
      </div>

      <label className="mt-8 flex w-fit cursor-pointer items-center gap-3 text-[16px] font-medium text-[#1F1B1A]">
        <input
          type="checkbox"
          checked={values.remember}
          onChange={updateField("remember")}
          className="peer sr-only"
        />
        <span className="grid h-7 w-7 place-items-center border border-[#E7E1DE] bg-[#F8F8F8] text-white peer-checked:border-[#E8B0B2] peer-checked:bg-[#E8B0B2]">
          {values.remember ? "✓" : ""}
        </span>
        Remember me
      </label>

      <AuthButton
        type="submit"
        disabled={!canSubmit}
        isLoading={isLoading}
        className="mt-6"
      >
        {AUTH_COPY.login.submit}
      </AuthButton>
    </form>
  );
}