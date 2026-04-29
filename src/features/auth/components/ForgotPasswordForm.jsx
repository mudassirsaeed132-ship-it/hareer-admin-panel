import { useMemo, useState } from "react";
import { Mail } from "lucide-react";

import AuthBackButton from "./AuthBackButton";
import AuthButton from "./AuthButton";
import AuthTextField from "./AuthTextField";
import { forgotPasswordRequest } from "../api/authApi";
import { AUTH_COPY } from "../constants/auth.constants";
import {
  hasNoErrors,
  isValidEmail,
  validateForgotPassword,
} from "../validation/auth.schemas";
import { useAuthFlow } from "../hooks/useAuthFlow";

export default function ForgotPasswordForm() {
  const { goToEmailSent, goToLogin } = useAuthFlow();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationErrors = useMemo(
    () => validateForgotPassword({ email }),
    [email]
  );

  const canSubmit = hasNoErrors(validationErrors);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateForgotPassword({ email });
    setErrors(nextErrors);

    if (!hasNoErrors(nextErrors)) return;

    setIsSubmitting(true);

    try {
      await forgotPasswordRequest({ email });
      goToEmailSent(email);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <AuthBackButton onClick={goToLogin} />

      <div className="mb-10 mt-12 text-center">
        <h1 className="font-serif text-[30px] font-semibold leading-tight tracking-[-0.03em] text-[#1F1B1A] sm:text-[34px]">
          {AUTH_COPY.forgotPassword.title}
        </h1>
        <p className="mx-auto mt-3 max-w-[360px] text-[16px] leading-[1.45] text-[#6F6A67]">
          {AUTH_COPY.forgotPassword.description}
        </p>
      </div>

      <AuthTextField
        label="Email address"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          setErrors({});
        }}
        autoComplete="email"
        isValid={isValidEmail(email)}
        error={errors.email}
        trailing={!email ? <Mail className="h-5 w-5" strokeWidth={1.8} /> : null}
      />

      <AuthButton
        type="submit"
        disabled={!canSubmit}
        isLoading={isSubmitting}
        className="mt-8"
      >
        {AUTH_COPY.forgotPassword.submit}
      </AuthButton>
    </form>
  );
}