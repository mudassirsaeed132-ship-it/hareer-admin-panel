import { ChevronLeft } from "lucide-react";

export default function AuthBackButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="grid h-[54px] w-[54px] place-items-center bg-[#F8F8F8] text-[#1F1B1A] transition hover:bg-[#FBF1F1]"
      aria-label="Go back"
    >
      <ChevronLeft className="h-5 w-5" strokeWidth={2.4} />
    </button>
  );
}