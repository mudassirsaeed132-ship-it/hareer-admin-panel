import { cn } from "../lib/cn";

export default function ChartTooltip({ className = "", children }) {
  return (
    <div
      className={cn(
        "rounded-md border border-[#E8E1DE] bg-white p-3 shadow-[0_10px_28px_rgba(26,18,16,0.08)] xl:p-4",
        className
      )}
    >
      {children}
    </div>
  );
}