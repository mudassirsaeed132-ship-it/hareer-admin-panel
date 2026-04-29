import { Mail } from "lucide-react";

export default function AuthIllustration() {
  return (
    <div className="relative mx-auto mb-8 grid h-[128px] w-[128px] place-items-center text-[#E8B0B2]">
      <div className="absolute h-[86px] w-[86px] rounded-full border-2 border-[#E8B0B2]" />

      <Mail className="relative z-10 h-10 w-10 fill-[#E8B0B2] text-[#E8B0B2]" />

      <span className="absolute left-1 top-14 text-[30px] leading-none">✦</span>
      <span className="absolute right-2 top-16 text-[20px] leading-none">✦</span>
      <span className="absolute right-4 bottom-3 text-[18px] leading-none">✦</span>
      <span className="absolute left-8 bottom-0 text-[14px] leading-none">✦</span>
      <span className="absolute left-6 top-6 text-[14px] leading-none">✦</span>
      <span className="absolute right-8 top-3 text-[14px] leading-none">✦</span>
    </div>
  );
}