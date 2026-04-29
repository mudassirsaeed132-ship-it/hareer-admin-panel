import { cn } from "../lib/cn";

export default function StatCard({
  icon: Icon,
  value,
  label,
  className = "",
}) {
  return (
    <div
      className={cn(
        "border border-[#E9E3DF] bg-white px-5 py-5 sm:px-6 sm:py-6 xl:px-6 xl:py-6",
        className
      )}
    >
      {Icon ? <Icon className="h-7 w-7 text-[#7E7975]" strokeWidth={1.8} /> : null}

      <div className="mt-8 text-[24px] font-semibold leading-none text-[#151210] xl:text-[28px]">
        {value}
      </div>

      <div className="mt-4 text-[16px] text-[#7D7773] xl:text-[17px]">
        {label}
      </div>
    </div>
  );
}