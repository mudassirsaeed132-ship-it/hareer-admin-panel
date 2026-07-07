import { useMemo, useState } from "react";

import Modal from "../../../shared/ui/Modal";
import { formatCurrency } from "../../../shared/lib/formatCurrency";
import { clampRate } from "../../../shared/lib/commission";
import {
  CommissionField,
  CommissionResultRow,
  CommissionSummaryRow,
  commissionInputClassName,
} from "../../../shared/ui/CommissionFields";

const DEFAULTS = { sales: "", rate: "10", bank: "2" };
const CURRENCY = "LYD";

export default function CommissionCalculatorButton() {
  const [open, setOpen] = useState(false);
  const [sales, setSales] = useState(DEFAULTS.sales);
  const [rate, setRate] = useState(DEFAULTS.rate);
  const [bankRate, setBankRate] = useState(DEFAULTS.bank);

  const breakdown = useMemo(() => {
    const salesAmount = Math.max(0, Number(sales) || 0);
    const commissionRate = clampRate(rate);
    const bankCommissionRate = clampRate(bankRate);

    // Platform commission: admin's share of the vendor's gross sales.
    const commissionAmount = Math.round((salesAmount * commissionRate) / 100);
    // Vendor gets sales minus the platform commission (bank fee does NOT touch this).
    const netPayout = salesAmount - commissionAmount;
    // Bank/gateway fee on the collected payment — borne by the admin.
    const bankCommissionAmount = Math.round((salesAmount * bankCommissionRate) / 100);
    // What the admin actually keeps after the bank fee.
    const adminNetEarning = commissionAmount - bankCommissionAmount;

    return {
      salesAmount,
      commissionRate,
      bankCommissionRate,
      commissionAmount,
      netPayout,
      bankCommissionAmount,
      adminNetEarning,
    };
  }, [sales, rate, bankRate]);

  const money = (value) => formatCurrency(value, CURRENCY);

  const handleReset = () => {
    setSales(DEFAULTS.sales);
    setRate(DEFAULTS.rate);
    setBankRate(DEFAULTS.bank);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open commission calculator"
        className="fixed bottom-6 right-6 z-40 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E4B2B2] focus-visible:ring-offset-2 sm:bottom-8 sm:right-8"
      >
        <img
          src="/calculator%20icon.svg"
          alt=""
          width="64"
          height="64"
          className="h-16 w-16"
        />
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Commission Calculator"
        subtitle="Estimate the vendor payout and your net earning from sales, commission, and bank fees."
        maxWidthClassName="max-w-[476px]"
        panelClassName="bg-white"
        bodyClassName="bg-white"
        titleClassName="font-serif text-[24px] leading-none text-[#151210]"
        subtitleClassName="text-[15px] leading-[1.55] text-[#7B7672]"
        showCloseButton={false}
      >
        <div className="space-y-3">
          <CommissionField label="Total Sales (LYD)">
            <input
              type="number"
              min="0"
              inputMode="decimal"
              value={sales}
              onChange={(event) => setSales(event.target.value)}
              placeholder="0"
              className={commissionInputClassName}
            />
          </CommissionField>

          <CommissionField label="Commission Rate (%)">
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={rate}
              onChange={(event) => setRate(event.target.value)}
              className={commissionInputClassName}
            />
          </CommissionField>

          <CommissionField label="Bank Commission (%)" hint="charged to admin">
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={bankRate}
              onChange={(event) => setBankRate(event.target.value)}
              className={commissionInputClassName}
            />
          </CommissionField>

          <div className="space-y-3 border-t border-[#E7E1DE] pt-4">
            <div>
              <CommissionSummaryRow
                label="Sales Amount"
                value={money(breakdown.salesAmount)}
              />
              <CommissionSummaryRow
                label={`Platform Commission (${breakdown.commissionRate}%)`}
                value={money(breakdown.commissionAmount)}
              />
            </div>

            <CommissionResultRow
              label="Net Payout to Vendor"
              value={money(breakdown.netPayout)}
            />

            <div className="border-t border-[#E7E1DE] pt-3">
              <CommissionSummaryRow
                label="Platform Commission"
                value={money(breakdown.commissionAmount)}
              />
              <CommissionSummaryRow
                label={`Bank Commission (${breakdown.bankCommissionRate}%)`}
                value={`− ${money(breakdown.bankCommissionAmount)}`}
              />
            </div>

            <CommissionResultRow
              label="Admin Net Earning"
              value={money(breakdown.adminNetEarning)}
            />
          </div>

          <p className="text-[13px] leading-[1.5] text-[#7E7671]">
            The bank commission is paid by the admin and does not reduce the
            vendor's payout.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex h-[50px] items-center justify-center border border-[#E7E1DE] bg-white px-4 text-[16px] font-medium text-[#151210] transition hover:bg-[#FAF7F5]"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-[50px] items-center justify-center bg-[#E4B2B2] px-4 text-[16px] font-medium text-[#151210] transition hover:opacity-90"
            >
              Done
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
