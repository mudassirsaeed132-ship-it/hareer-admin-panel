import { getOrderStatusMeta } from "../utils/orders.helpers";

export default function OrderStatusBadge({ status }) {
  const meta = getOrderStatusMeta(status);

  return (
    <span
      className={`inline-flex min-w-[92px] items-center justify-center whitespace-nowrap px-3 py-2 text-[14px] font-medium leading-none ${meta.className}`}
    >
      {meta.label}
    </span>
  );
}