import OrderStatusBadge from "./OrderStatusBadge";
import OrderDetailSection from "./OrderDetailSection";

function DetailRow({ label, value, rightContent }) {
  return (
    <div className="grid grid-cols-[92px_minmax(0,1fr)] items-start gap-3 border-t border-[#EEE8E4] py-3 first:border-t-0 first:pt-0 last:pb-0">
      <span className="text-[15px] text-[#6F6965]">{label}</span>

      <div className="flex items-center justify-between gap-3">
        <span className="text-right text-[15px] font-medium text-[#151210]">
          {value}
        </span>
        {rightContent}
      </div>
    </div>
  );
}

export default function OrderCustomerCard({ detail }) {
  const customer = detail.customer;

  return (
    <OrderDetailSection title="Customer Information">
      <div className="bg-[#FAF8F7] p-3.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-[#E7EEF7] text-[13px] font-semibold text-[#151210]">
              {customer.avatarLabel}
            </div>

            <span className="truncate text-[15px] font-semibold text-[#151210]">
              {customer.name}
            </span>
          </div>

          <span className="whitespace-nowrap text-[13px] text-[#6F6965]">
            Order ID {detail.orderId}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <DetailRow
          label="Date"
          value={`${customer.dateLabel} | ${customer.timeLabel}`}
        />
        <DetailRow label="Location" value={customer.location} />
        <DetailRow
          label="Status"
          value=""
          rightContent={<OrderStatusBadge status={customer.status} />}
        />
      </div>
    </OrderDetailSection>
  );
}