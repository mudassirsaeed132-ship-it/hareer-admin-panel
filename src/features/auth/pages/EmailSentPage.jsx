import AuthCard from "../components/AuthCard";
import EmailSentState from "../components/EmailSentState";

export default function EmailSentPage() {
  return (
    <AuthCard className="max-w-[540px]">
      <EmailSentState />
    </AuthCard>
  );
}