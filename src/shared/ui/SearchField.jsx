import { Search } from "lucide-react";
import { cn } from "../lib/cn";

export default function SearchField({
  className = "",
  placeholder = "Search here...",
  value,
  onChange,
}) {
  return (
    <div
      className={cn(
        "inline-flex h-[52px] w-full min-w-0 items-center gap-3 border border-[#E7E1DE] bg-white px-4",
        className
      )}
    >
      <Search className="h-5 w-5 shrink-0 text-[#6F6A67]" strokeWidth={1.8} />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="min-w-0 flex-1 border-none bg-transparent text-[16px] text-[#1F1B1A] outline-none placeholder:text-[#8B8682]"
      />
    </div>
  );
}