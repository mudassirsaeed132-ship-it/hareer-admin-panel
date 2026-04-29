import AuthCard from "../components/AuthCard";
import ResetPasswordForm from "../components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthCard className="max-w-[540px]">
      <ResetPasswordForm />
    </AuthCard>
  );
}