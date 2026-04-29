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

export default function CommissionSettingsModal({
  open,
  onClose,
  payout,
  onSubmit,
  submitting = false,
}) {
  const [commissionRate, setCommissionRate] = useState("10");
  const [additionalCostPercent, setAdditionalCostPercent] = useState("5");

  useEffect(() => {
    if (!open || !payout) return;

    setCommissionRate(String(payout.commissionRate ?? 10));
    setAdditionalCostPercent(String(payout.additionalCostPercent ?? 5));
  }, [open, payout]);

  const totals = useMemo(() => {
    const salesAmount = Number(payout?.totalSales ?? 0);
    const currency = payout?.currency ?? "LYD";
    const commissionAmount = Math.round(
      (salesAmount * Number(commissionRate || 0)) / 100
    );
    const additionalCostAmount = Math.round(
      (salesAmount * Number(additionalCostPercent || 0)) / 100
    );

    return {
      salesAmount,
      commissionAmount,
      additionalCostAmount,
      currency,
    };
  }, [additionalCostPercent, commissionRate, payout]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSubmit?.({
      commissionRate: Number(commissionRate),
      additionalCostPercent: Number(additionalCostPercent),
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Commission Settings"
      subtitle="Manually calculate vendor payouts and your commission based on agreed terms."
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
            value={commissionRate}
            onChange={(event) => setCommissionRate(event.target.value)}
            className="w-full border-none bg-transparent p-0 text-[16px] text-[#151210] outline-none"
          />
        </FieldCard>

        <FieldCard label="Additional Costs (Optional)">
          <input
            type="number"
            value={additionalCostPercent}
            onChange={(event) => setAdditionalCostPercent(event.target.value)}
            className="w-full border-none bg-transparent p-0 text-[16px] text-[#151210] outline-none"
          />
        </FieldCard>

        <div className="border-t border-[#E7E1DE] pt-4">
          <div className="flex items-center justify-between gap-4 py-1 text-[16px] text-[#6F6965]">
            <span>Sales Amount</span>
            <span className="font-medium text-[#151210]">
              {formatCurrency(totals.salesAmount, totals.currency)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 py-1 text-[16px] text-[#6F6965]">
            <span>Commission Rate</span>
            <span className="font-medium text-[#151210]">
              {formatCurrency(totals.commissionAmount, totals.currency)} ({commissionRate}%)
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 py-1 text-[16px] text-[#6F6965]">
            <span>Additional Cost</span>
            <span className="font-medium text-[#151210]">
              {formatCurrency(totals.additionalCostAmount, totals.currency)} ({additionalCostPercent}%)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              setCommissionRate(String(payout?.commissionRate ?? 10));
              setAdditionalCostPercent(String(payout?.additionalCostPercent ?? 5));
            }}
            className="inline-flex h-[50px] items-center justify-center border border-[#E7E1DE] bg-white px-4 text-[16px] font-medium text-[#151210]"
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-[50px] items-center justify-center bg-[#E4B2B2] px-4 text-[16px] font-medium text-[#151210] transition hover:opacity-90 disabled:opacity-70"
          >
            {submitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
