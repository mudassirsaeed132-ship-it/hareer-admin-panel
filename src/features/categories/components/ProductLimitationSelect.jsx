import { ChevronDown } from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductLimitationSelect({
  value,
  onChange,
  className = "",
}) {
  return (
    <div className={cn("relative w-[212px] max-w-full", className)}>
      <select
        value={value}
        onChange={onChange}
        className="h-[38px] w-full appearance-none border border-[#EEE8E4] bg-[#FCFAF8] px-3 pr-10 text-[15px] font-normal text-[#151210] outline-none"
      >
        <option value="no-limit">No Limit</option>
        <option value="up-to-50">Up to 50 products</option>
        <option value="up-to-100">Up to 100 products</option>
      </select>

      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#151210]"
        strokeWidth={1.8}
      />
    </div>
  );
}