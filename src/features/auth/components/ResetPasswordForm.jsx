import { useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import AuthBackButton from "./AuthBackButton";
import AuthButton from "./AuthButton";
import AuthTextField from "./AuthTextField";
import { resetPasswordRequest } from "../api/authApi";
import { AUTH_COPY } from "../constants/auth.constants";
import { hasNoErrors, validateResetPassword } from "../validation/auth.schemas";
import { useAuthFlow } from "../hooks/useAuthFlow";

export default function ResetPasswordForm() {
  const { goToLogin } = useAuthFlow();

  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationErrors = useMemo(() => validateResetPassword(values), [values]);
  const canSubmit = hasNoErrors(validationErrors);

  const updateField = (field) => (event) => {
    setValues((current) => ({
      ...current,
      [field]: event.target.value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: "",
    }));
  };

  const togglePassword = (field) => {
    setShowPassword((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateResetPassword(values);
    setErrors(nextErrors);

    if (!hasNoErrors(nextErrors)) return;

    setIsSubmitting(true);

    try {
      await resetPasswordRequest(values);
      goToLogin();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <AuthBackButton onClick={goToLogin} />

      <div className="mb-8 mt-12 text-left">
        <h1 className="font-serif text-[30px] font-semibold leading-tight tracking-[-0.03em] text-[#1F1B1A] sm:text-[34px]">
          {AUTH_COPY.resetPassword.title}
        </h1>
        <p className="mt-3 max-w-[390px] text-[16px] leading-[1.45] text-[#6F6A67]">
          {AUTH_COPY.resetPassword.description}
        </p>
      </div>

      <div className="space-y-3">
        <AuthTextField
          label="Create new password"
          value={values.password}
          onChange={updateField("password")}
          type={showPassword.password ? "text" : "password"}
          autoComplete="new-password"
          error={errors.password}
          trailing={
            <button
              type="button"
              onClick={() => togglePassword("password")}
              className="grid h-8 w-8 place-items-center"
              aria-label="Toggle password"
            >
              {showPassword.password ? (
                <EyeOff className="h-5 w-5" strokeWidth={1.8} />
              ) : (
                <Eye className="h-5 w-5" strokeWidth={1.8} />
              )}
            </button>
          }
        />

        <AuthTextField
          label="Confirm new password"
          value={values.confirmPassword}
          onChange={updateField("confirmPassword")}
          type={showPassword.confirmPassword ? "text" : "password"}
          autoComplete="new-password"
          error={errors.confirmPassword}
          trailing={
            <button
              type="button"
              onClick={() => togglePassword("confirmPassword")}
              className="grid h-8 w-8 place-items-center"
              aria-label="Toggle confirm password"
            >
              {showPassword.confirmPassword ? (
                <EyeOff className="h-5 w-5" strokeWidth={1.8} />
              ) : (
                <Eye className="h-5 w-5" strokeWidth={1.8} />
              )}
            </button>
          }
        />
      </div>

      <AuthButton
        type="submit"
        disabled={!canSubmit}
        isLoading={isSubmitting}
        className="mt-8"
      >
        {AUTH_COPY.resetPassword.submit}
      </AuthButton>
    </form>
  );
}