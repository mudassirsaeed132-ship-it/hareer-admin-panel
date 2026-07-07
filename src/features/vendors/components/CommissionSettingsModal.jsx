import { useEffect, useMemo, useState } from "react";
import Modal from "@/shared/ui/Modal";
import { formatCurrency } from "@/shared/lib/formatCurrency";

function FieldCard({ label, children }) {
  return (
    <div className="bg-[#FAF8F7] p-4">
      <label className="block text-[13px] leading-none text-[#7E7671]">
        {label}
      </label>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function clampRate(value) {
  const rate = Number(value);
  if (!Number.isFinite(rate)) return 0;
  return Math.min(100, Math.max(0, rate));
}

export default function CommissionSettingsModal({
  open,
  onClose,
  payout,
  onSubmit,
  submitting = false,
}) {
  const [commissionRate, setCommissionRate] = useState("10");

  useEffect(() => {
    if (!open || !payout) return;
    setCommissionRate(String(payout.commissionRate ?? 10));
  }, [open, payout]);

  const totals = useMemo(() => {
    const salesAmount = Number(payout?.totalSales ?? 0);
    const currency = payout?.currency ?? "LYD";
    const rate = clampRate(commissionRate);
    const commissionAmount = Math.round((salesAmount * rate) / 100);

    return {
      salesAmount,
      commissionAmount,
      netPayout: salesAmount - commissionAmount,
      currency,
    };
  }, [commissionRate, payout]);

  const rateIsValid =
    commissionRate !== "" &&
    Number.isFinite(Number(commissionRate)) &&
    Number(commissionRate) >= 0 &&
    Number(commissionRate) <= 100;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!rateIsValid) return;

    await onSubmit?.({ commissionRate: clampRate(commissionRate) });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Commission Settings"
      subtitle={
        payout?.vendorName
          ? `Set the commission rate for ${payout.vendorName}. It applies to all of this vendor's unpaid payouts.`
          : "Set the vendor's commission rate. It applies to all of their unpaid payouts."
      }
      maxWidthClassName="max-w-[476px]"
      panelClassName="bg-white"
      bodyClassName="bg-white"
      titleClassName="font-serif text-[24px] leading-none text-[#151210]"
      subtitleClassName="text-[15px] leading-[1.55] text-[#7B7672]"
      showCloseButton={false}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <FieldCard label="Total Sales Amount">
          <div className="text-[16px] font-medium text-[#151210]">
            {formatCurrency(totals.salesAmount, totals.currency)}
          </div>
        </FieldCard>

        <FieldCard label="Commission Rate (%)">
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={commissionRate}
            onChange={(event) => setCommissionRate(event.target.value)}
            className="w-full border-none bg-transparent p-0 text-[16px] text-[#151210] outline-none"
          />
        </FieldCard>

        {!rateIsValid ? (
          <p className="text-[13px] leading-none text-[#F04444]">
            Enter a commission rate between 0 and 100.
          </p>
        ) : null}

        <div className="border-t border-[#E7E1DE] pt-4">
          <div className="flex items-center justify-between gap-4 py-1 text-[16px] text-[#6F6965]">
            <span>Sales Amount</span>
            <span className="font-medium text-[#151210]">
              {formatCurrency(totals.salesAmount, totals.currency)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 py-1 text-[16px] text-[#6F6965]">
            <span>Commission ({clampRate(commissionRate)}%)</span>
            <span className="font-medium text-[#151210]">
              − {formatCurrency(totals.commissionAmount, totals.currency)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 bg-[#FAF3F3] px-4 py-3">
          <span className="text-[15px] font-medium text-[#151210]">
            Net Payout to Vendor
          </span>
          <span className="text-[18px] font-semibold text-[#151210]">
            {formatCurrency(totals.netPayout, totals.currency)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setCommissionRate(String(payout?.commissionRate ?? 10))}
            className="inline-flex h-[50px] items-center justify-center border border-[#E7E1DE] bg-white px-4 text-[16px] font-medium text-[#151210]"
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={submitting || !rateIsValid}
            className="inline-flex h-[50px] items-center justify-center bg-[#E4B2B2] px-4 text-[16px] font-medium text-[#151210] transition hover:opacity-90 disabled:opacity-70"
          >
            {submitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
