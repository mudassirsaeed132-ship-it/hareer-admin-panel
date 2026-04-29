import AuthCard from "../components/AuthCard";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthCard className="max-w-[520px]">
      <ForgotPasswordForm />
    </AuthCard>
  );
}