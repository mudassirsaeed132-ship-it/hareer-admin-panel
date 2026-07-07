import { useEffect, useMemo, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import Modal from "@/shared/ui/Modal";
import { formatCurrency } from "@/shared/lib/formatCurrency";
import { clampRate, isValidPercent } from "@/shared/lib/commission";
import {
  CommissionField,
  CommissionSummaryRow,
  commissionInputClassName,
} from "@/shared/ui/CommissionFields";

const RADIUS_OPTIONS = [
  { value: "1", label: "1km" },
  { value: "3", label: "3km" },
  { value: "5", label: "5km" },
  { value: "10", label: "10km" },
  { value: "15", label: "15km" },
  { value: "20", label: "20km" },
];

function makeDeliveryRow() {
  return { fee: "5", radius: "5" };
}

function normalizeDeliveryFees(payout) {
  if (Array.isArray(payout?.deliveryFees) && payout.deliveryFees.length) {
    return payout.deliveryFees.map((row) => ({
      fee: String(row.fee ?? ""),
      radius: String(row.radius ?? "5"),
    }));
  }
  return [makeDeliveryRow()];
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
  const [deliveryFees, setDeliveryFees] = useState([makeDeliveryRow()]);

  useEffect(() => {
    if (!open || !payout) return;
    setCommissionRate(String(payout.commissionRate ?? 10));
    setAdditionalCostPercent(String(payout.additionalCostPercent ?? 5));
    setDeliveryFees(normalizeDeliveryFees(payout));
  }, [open, payout]);

  const totals = useMemo(() => {
    const salesAmount = Number(payout?.totalSales ?? 0);
    const currency = payout?.currency ?? "LYD";
    const commissionAmount = Math.round((salesAmount * clampRate(commissionRate)) / 100);
    const additionalCostAmount = Math.round(
      (salesAmount * clampRate(additionalCostPercent)) / 100
    );

    return { salesAmount, currency, commissionAmount, additionalCostAmount };
  }, [commissionRate, additionalCostPercent, payout]);

  const updateDeliveryRow = (index, key, value) => {
    setDeliveryFees((rows) =>
      rows.map((row, i) => (i === index ? { ...row, [key]: value } : row))
    );
  };

  const addDeliveryRow = () => {
    setDeliveryFees((rows) => [...rows, makeDeliveryRow()]);
  };

  const removeDeliveryRow = (index) => {
    setDeliveryFees((rows) =>
      rows.length > 1 ? rows.filter((_, i) => i !== index) : rows
    );
  };

  const canSubmit =
    isValidPercent(commissionRate) &&
    isValidPercent(additionalCostPercent, { allowEmpty: true }) &&
    !submitting;

  const handleReset = () => {
    setCommissionRate(String(payout?.commissionRate ?? 10));
    setAdditionalCostPercent(String(payout?.additionalCostPercent ?? 5));
    setDeliveryFees(normalizeDeliveryFees(payout));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    await onSubmit?.({
      commissionRate: clampRate(commissionRate),
      additionalCostPercent: clampRate(additionalCostPercent),
      deliveryFees: deliveryFees.map((row) => ({
        fee: clampRate(row.fee),
        radius: Number(row.radius) || 0,
      })),
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
        <CommissionField label="Total Sales Amount">
          <div className="text-[16px] font-medium text-[#151210]">
            {formatCurrency(totals.salesAmount, totals.currency)}
          </div>
        </CommissionField>

        <CommissionField label="Commission Rate (%)">
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={commissionRate}
            onChange={(event) => setCommissionRate(event.target.value)}
            className={commissionInputClassName}
          />
        </CommissionField>

        <CommissionField label="Additional Costs (Optional)">
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={additionalCostPercent}
            onChange={(event) => setAdditionalCostPercent(event.target.value)}
            className={commissionInputClassName}
          />
        </CommissionField>

        <div>
          <h3 className="text-[18px] font-semibold leading-none text-[#151210]">
            Delivery Fees
          </h3>

          <div className="mt-3 space-y-2">
            {deliveryFees.map((row, index) => (
              <div key={index} className="relative">
                <div className="grid grid-cols-2 gap-2">
                  <CommissionField label="Delivery Fees">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={row.fee}
                      onChange={(event) =>
                        updateDeliveryRow(index, "fee", event.target.value)
                      }
                      className={commissionInputClassName}
                    />
                  </CommissionField>

                  <CommissionField label="Radius">
                    <div className="relative">
                      <select
                        value={row.radius}
                        onChange={(event) =>
                          updateDeliveryRow(index, "radius", event.target.value)
                        }
                        className={`${commissionInputClassName} appearance-none pr-6`}
                      >
                        {RADIUS_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#7E7671]"
                      />
                    </div>
                  </CommissionField>
                </div>

                {deliveryFees.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => removeDeliveryRow(index)}
                    aria-label="Remove delivery fee"
                    className="absolute -right-1 -top-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#E7E1DE] bg-white text-[#7E7671] transition hover:bg-[#FAF7F5]"
                  >
                    <X size={12} />
                  </button>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={addDeliveryRow}
              className="text-[14px] font-medium text-[#E4B2B2] transition hover:opacity-80"
            >
              + Add more
            </button>
          </div>
        </div>

        <div className="border-t border-[#E7E1DE] pt-4">
          <CommissionSummaryRow
            label="Sales Amount"
            value={formatCurrency(totals.salesAmount, totals.currency)}
          />
          <CommissionSummaryRow
            label="Commission Rate"
            value={`${formatCurrency(totals.commissionAmount, totals.currency)} (${clampRate(commissionRate)}%)`}
          />
          <CommissionSummaryRow
            label="Additional Cost"
            value={`${formatCurrency(totals.additionalCostAmount, totals.currency)} (${clampRate(additionalCostPercent)}%)`}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex h-[50px] items-center justify-center border border-[#E7E1DE] bg-white px-4 text-[16px] font-medium text-[#151210]"
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex h-[50px] items-center justify-center bg-[#E4B2B2] px-4 text-[16px] font-medium text-[#151210] transition hover:opacity-90 disabled:opacity-70"
          >
            {submitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
