export default function VendorProfileHeader({
  detail,
  onToggleStatus,
}) {
  const isActive = detail.status === "active";

  return (
    <div className="flex min-h-[128px] items-center border border-[#EEE8E4] bg-white px-4 py-4 sm:px-5">
      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div className="grid h-[88px] w-[88px] shrink-0 place-items-center bg-[#EB2A2A] font-serif text-[44px] leading-none text-white">
            {detail.badgeLabel}
          </div>

          <div className="min-w-0 pt-1">
            <h2 className="font-serif text-[20px] leading-none text-[#151210] sm:text-[22px]">
              {detail.businessName}
            </h2>

            <p className="mt-4 max-w-[560px] text-[15px] leading-[1.45] text-[#7B7672] sm:text-[16px]">
              {detail.description}
            </p>

            <p className="mt-3 text-[14px] text-[#7B7672] sm:text-[15px]">
              Member since {detail.memberSince}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleStatus}
          className="inline-flex h-10 w-full items-center justify-center whitespace-nowrap border border-[#F04444] bg-white px-4 text-[14px] font-medium text-[#F04444] transition hover:bg-[#FFF5F5] focus:outline-none focus:ring-2 focus:ring-[#F04444]/30 sm:w-auto sm:min-w-[112px]"
        >
          {isActive ? "Deactivate" : "Activate"}
        </button>
      </div>
    </div>
  );
}