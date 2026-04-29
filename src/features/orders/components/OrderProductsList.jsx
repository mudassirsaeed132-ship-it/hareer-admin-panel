import { formatCurrency } from "../../../shared/lib/formatCurrency";
import OrderDetailSection from "./OrderDetailSection";

function ProductThumbnail({ label }) {
  return (
    <div className="grid h-[68px] w-[68px] place-items-center bg-[#F1ECE8] text-[16px] font-semibold text-[#6F6965]">
      {label}
    </div>
  );
}

export default function OrderProductsList({ items = [] }) {
  return (
    <OrderDetailSection title="Order Details">
      <div>
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`flex items-start gap-3 py-3 ${
              index !== 0 ? "border-t border-[#EEE8E4]" : ""
            }`}
          >
            <ProductThumbnail label={item.thumbnailLabel} />

            <div className="min-w-0 flex-1">
              <h4 className="text-[15px] font-semibold text-[#151210]">
                {item.productName}
              </h4>

              <p className="mt-2 text-[13px] text-[#7C7671]">
                Quantity: <span className="text-[#151210]">{item.quantity}</span>
                <span className="px-2 text-[#B8B0AA]">|</span>
                Color: <span className="text-[#151210]">{item.color}</span>
              </p>

              <p className="mt-2 text-[14px] font-medium text-[#151210]">
                {formatCurrency(item.amount, item.currency)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </OrderDetailSection>
  );
}