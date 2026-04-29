import { PAYMENT_SUMMARY_CARDS } from "../constants/payments.constants";
import { formatMoney } from "../utils/payments.helpers";

export default function PaymentSummaryCards({ summary }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
      {PAYMENT_SUMMARY_CARDS.map((card) => (
        <div
          key={card.key}
          className="border border-[#EEE8E4] bg-white px-4 py-5 sm:px-5 sm:py-6"
        >
          <div className="text-[22px] font-semibold leading-none text-[#151210] sm:text-[24px]">
            {formatMoney(summary[card.key], summary.currency)}
          </div>

          <p className="mt-4 text-[16px] leading-none text-[#7B7672]">
            {card.label}
          </p>
        </div>
      ))}
    </div>
  );
}