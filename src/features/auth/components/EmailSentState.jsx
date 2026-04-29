import AuthButton from "./AuthButton";
import AuthIllustration from "./AuthIllustration";
import { AUTH_COPY } from "../constants/auth.constants";
import { useAuthFlow } from "../hooks/useAuthFlow";

export default function EmailSentState() {
  const { goToResetPassword } = useAuthFlow();

  return (
    <div className="w-full text-center">
      <AuthIllustration />

      <h1 className="font-serif text-[30px] font-semibold leading-tight tracking-[-0.03em] text-[#1F1B1A] sm:text-[34px]">
        {AUTH_COPY.emailSent.title}
      </h1>

      <p className="mx-auto mt-3 max-w-[390px] text-[16px] leading-[1.5] text-[#6F6A67]">
        {AUTH_COPY.emailSent.description}
      </p>

      <AuthButton onClick={goToResetPassword} className="mt-8">
        {AUTH_COPY.emailSent.submit}
      </AuthButton>
    </div>
  );
}