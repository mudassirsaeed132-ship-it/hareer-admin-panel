/**
 * Presentational primitives shared by the commission calculator and the
 * vendor commission-settings modal so both stay visually identical.
 *
 * - `CommissionField`  — labelled input card (label on top, control below).
 * - `CommissionSummaryRow` — a muted "label ....... value" breakdown line.
 * - `CommissionResultRow`  — an emphasised, tinted total row.
 */

export const commissionInputClassName =
  "w-full border-none bg-transparent p-0 text-[16px] text-[#151210] outline-none";

export function CommissionField({ label, hint, children, className = "" }) {
  return (
    <label className={["block bg-[#FAF8F7] p-4", className].join(" ")}>
      <span className="flex items-baseline justify-between gap-2 text-[13px] leading-none text-[#7E7671]">
        <span>{label}</span>
        {hint ? <span className="text-[12px] text-[#A49C97]">{hint}</span> : null}
      </span>
      <div className="mt-3">{children}</div>
    </label>
  );
}

export function CommissionSummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1 text-[16px] text-[#6F6965]">
      <span>{label}</span>
      <span className="font-medium text-[#151210]">{value}</span>
    </div>
  );
}

export function CommissionResultRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 bg-[#FAF3F3] px-4 py-3">
      <span className="text-[15px] font-medium text-[#151210]">{label}</span>
      <span className="text-[18px] font-semibold text-[#151210]">{value}</span>
    </div>
  );
}
