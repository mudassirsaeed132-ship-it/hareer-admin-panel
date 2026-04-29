import OrderDetailSection from "./OrderDetailSection";

export default function OrderStoreCard({ detail }) {
  return (
    <OrderDetailSection title="Store Information">
      <div className="bg-[#FAF8F7] p-3.5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#EB2A2A] text-[17px] font-semibold text-white">
            {detail.store.avatarLabel}
          </div>

          <span className="text-[15px] font-semibold text-[#151210]">
            {detail.store.name}
          </span>
        </div>
      </div>
    </OrderDetailSection>
  );
}