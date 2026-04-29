import { getPaymentStatusMeta } from "../utils/orders.helpers";

export default function PaymentStatusBadge({ status }) {
  const meta = getPaymentStatusMeta(status);

  return (
    <span
      className={`inline-flex min-w-[74px] items-center justify-center whitespace-nowrap px-3 py-2 text-[14px] font-medium leading-none ${meta.className}`}
    >
      {meta.label}
    </span>
  );
}