import { useState } from "react";
import Modal from "../../../shared/ui/Modal";
import { formatCurrency } from "../../../shared/lib/formatCurrency";

function clampRate(value) {
  const rate = Number(value);
  if (!Number.isFinite(rate)) return 0;
  return Math.min(100, Math.max(0, rate));
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1 text-[16px] text-[#6F6965]">
      <span>{label}</span>
      <span className="font-medium text-[#151210]">{value}</span>
    </div>
  );
}

function ResultRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 bg-[#FAF3F3] px-4 py-3">
      <span className="text-[15px] font-medium text-[#151210]">{label}</span>
      <span className="text-[18px] font-semibold text-[#151210]">{value}</span>
    </div>
  );
}

function CalcField({ label, ...inputProps }) {
  return (
    <label className="block bg-[#FAF8F7] p-4">
      <span className="block text-[13px] leading-none text-[#7E7671]">{label}</span>
      <input
        {...inputProps}
        className="mt-3 w-full border-none bg-transparent p-0 text-[16px] text-[#151210] outline-none"
      />
    </label>
  );
}

export default function CommissionCalculatorButton() {
  const [open, setOpen] = useState(false);
  const [sales, setSales] = useState("");
  const [rate, setRate] = useState("10");
  const [bankRate, setBankRate] = useState("2");

  const salesAmount = Number(sales) || 0;
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
        size="xl"
        panelClassName="bg-white"
        bodyClassName="bg-white"
        titleClassName="font-serif text-[24px] leading-none text-[#151210]"
        subtitleClassName="text-[15px] leading-[1.55] text-[#7B7672]"
      >
        <div>
          <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {/* Inputs */}
            <div className="space-y-3">
              <CalcField
                label="Total Sales (LYD)"
                type="number"
                min="0"
                inputMode="decimal"
                value={sales}
                onChange={(event) => setSales(event.target.value)}
                placeholder="0"
              />

              <CalcField
                label="Commission Rate (%)"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={rate}
                onChange={(event) => setRate(event.target.value)}
              />

              <CalcField
                label="Bank Commission (%) — charged to admin"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={bankRate}
                onChange={(event) => setBankRate(event.target.value)}
              />
            </div>

            {/* Breakdown + results */}
            <div className="flex flex-col justify-center gap-3">
              <div>
                <SummaryRow
                  label="Sales Amount"
                  value={formatCurrency(salesAmount, "LYD")}
                />
                <SummaryRow
                  label={`Platform Commission (${commissionRate}%)`}
                  value={formatCurrency(commissionAmount, "LYD")}
                />
              </div>

              <ResultRow
                label="Net Payout to Vendor"
                value={formatCurrency(netPayout, "LYD")}
              />

              <div className="border-t border-[#E7E1DE] pt-3">
                <SummaryRow
                  label="Platform Commission"
                  value={formatCurrency(commissionAmount, "LYD")}
                />
                <SummaryRow
                  label={`Bank Commission (${bankCommissionRate}%)`}
                  value={`− ${formatCurrency(bankCommissionAmount, "LYD")}`}
                />
              </div>

              <ResultRow
                label="Admin Net Earning"
                value={formatCurrency(adminNetEarning, "LYD")}
              />
            </div>
          </div>

          <p className="mt-4 text-[13px] leading-[1.5] text-[#7E7671]">
            The bank commission is paid by the admin and does not reduce the vendor's payout.
          </p>
        </div>
      </Modal>
    </>
  );
}
