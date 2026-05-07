import { ChevronDown } from "lucide-react";
import { cn } from "../lib/cn";

export default function FilterSelect({
  label,
  icon: Icon,
  showChevron = true,
  className = "",
  onClick,
  disabled = false,
  options = [],
  value,
  onChange,
  name,
  ariaLabel,
  ariaHaspopup,
  ariaExpanded,
  ariaControls,
}) {
  const hasOptions = Array.isArray(options) && options.length > 0;

  if (hasOptions) {
    return (
      <div
        className={cn(
          "relative inline-flex h-[52px] w-full shrink-0 items-center gap-2 border border-[#E7E1DE] bg-white px-3 text-[16px] font-medium text-[#1F1B1A]",
          className
        )}
      >
        {Icon ? <Icon className="h-5 w-5 shrink-0" strokeWidth={1.8} /> : null}

        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          aria-label={ariaLabel}
          className="h-full min-w-0 w-full appearance-none border-none bg-transparent pr-8 text-[16px] font-medium text-[#1F1B1A] outline-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {showChevron ? (
          <ChevronDown
            className="pointer-events-none absolute right-3 h-5 w-5 shrink-0 text-[#1F1B1A]"
            strokeWidth={1.8}
          />
        ) : null}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-haspopup={ariaHaspopup}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      className={cn(
        "inline-flex h-[52px] w-full shrink-0 items-center gap-2 border border-[#E7E1DE] bg-white px-3 text-[16px] font-medium text-[#1F1B1A] transition-colors hover:bg-[#FCFAF9] disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
    >
      {Icon ? <Icon className="h-5 w-5 shrink-0" strokeWidth={1.8} /> : null}
      <span className="truncate">{label}</span>
      {showChevron ? (
        <ChevronDown className="ml-auto h-5 w-5 shrink-0" strokeWidth={1.8} />
      ) : null}
    </button>
  );
}
