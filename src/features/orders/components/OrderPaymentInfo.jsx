import { formatCurrency } from "../../../shared/lib/formatCurrency";
import OrderDetailSection from "./OrderDetailSection";

function PaymentRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <span className="text-[15px] text-[#6F6965]">{label}</span>
      <span className="text-[15px] font-medium text-[#151210]">{value}</span>
    </div>
  );
}

export default function OrderPaymentInfo({ payment }) {
  return (
    <OrderDetailSection title="Payment Information">
      <div>
        <PaymentRow
          label="Total Amount"
          value={formatCurrency(payment.totalAmount, payment.currency)}
        />
        <PaymentRow label="Type" value={payment.type} />
        <PaymentRow
          label="Discount (- 5%)"
          value={formatCurrency(payment.discount, payment.currency)}
        />
        <PaymentRow
          label="Delivery Fees"
          value={formatCurrency(payment.deliveryFees, payment.currency)}
        />
      </div>
    </OrderDetailSection>
  );
}