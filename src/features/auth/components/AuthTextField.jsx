import { Check } from "lucide-react";

export default function AuthTextField({
  label,
  value,
  onChange,
  type = "text",
  error,
  isValid = false,
  trailing,
  autoComplete,
  autoFocus = false,
}) {
  const hasValue = value?.length > 0;

  return (
    <div className="space-y-2">
      <div
        className={[
          "relative flex min-h-[54px] items-center bg-[#F8F8F8] px-4 transition",
          error ? "border border-[#F04438] bg-[#FFF1F1]" : "border border-transparent",
        ].join(" ")}
      >
        <div className="min-w-0 flex-1">
          {hasValue && (
            <label className="block text-[12px] leading-none text-[#6F6A67]">
              {label}
            </label>
          )}

          <input
            value={value}
            onChange={onChange}
            type={type}
            placeholder={hasValue ? "" : label}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            className="mt-1 w-full min-w-0 bg-transparent text-[16px] font-medium text-[#1F1B1A] outline-none placeholder:text-[#1F1B1A]"
          />
        </div>

        <div className="ml-3 flex shrink-0 items-center text-[#1F1B1A]">
          {trailing ||
            (isValid ? (
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#E8B0B2] text-white">
                <Check className="h-4 w-4" strokeWidth={2.4} />
              </span>
            ) : null)}
        </div>
      </div>

      {error && (
        <p className="text-[14px] font-medium text-[#F04438]">{error}</p>
      )}
    </div>
  );
}