export default function VendorProfileHeader({
  detail,
  onBack,
  onToggleStatus,
}) {
  const isActive = detail.status === "active";

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex h-[40px] items-center justify-center border border-[#EEE8E4] bg-white px-4 text-[15px] font-medium text-[#151210] transition hover:bg-[#F8F5F3]"
      >
        &lt;&lt; Back to Vendors
      </button>

      <div className="border border-[#EEE8E4] bg-white px-4 py-4 sm:px-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="grid h-[88px] w-[88px] place-items-center bg-[#EB2A2A] font-serif text-[44px] leading-none text-white">
              {detail.badgeLabel}
            </div>

            <div className="min-w-0">
              <h2 className="font-serif text-[20px] leading-none text-[#151210] sm:text-[22px]">
                {detail.businessName}
              </h2>

              <p className="mt-4 max-w-[560px] text-[16px] leading-[1.45] text-[#7B7672]">
                {detail.description}
              </p>

              <p className="mt-3 text-[15px] text-[#7B7672]">
                Member since {detail.memberSince}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleStatus}
            className="inline-flex h-[44px] items-center justify-center whitespace-nowrap border border-[#F04444] bg-white px-4 text-[16px] font-medium text-[#F04444] transition hover:bg-[#FFF5F5]"
          >
            {isActive ? "Deactivate" : "Activate"}
          </button>
        </div>
      </div>
    </div>
  );
}