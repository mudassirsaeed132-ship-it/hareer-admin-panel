import { Copyright } from "lucide-react";

export default function AuthFooter() {
  return (
    <footer className="grid w-full shrink-0 gap-4 px-6 pb-7 pt-4 text-[14px] text-[#6F6A67] sm:px-8 md:grid-cols-2 lg:px-10 xl:px-12">
      <div className="flex items-center justify-center gap-2 md:justify-start">
        <Copyright className="h-5 w-5" strokeWidth={1.8} />
        <span>Copyright 2025, All rights reserved</span>
      </div>

      <div className="flex items-center justify-center gap-6 md:justify-end">
        <a href="#" className="transition hover:text-[#E8B0B2]">
          Privacy Policy
        </a>
        <a href="#" className="transition hover:text-[#E8B0B2]">
          Terms & Conditions
        </a>
      </div>
    </footer>
  );
}