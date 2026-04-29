export default function VendorOwnerCard({ owner }) {
  return (
    <div className="border border-[#EEE8E4] bg-white px-4 py-4 sm:px-5">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-[#E7EEF7] text-[14px] font-semibold text-[#151210]">
          {owner.avatarLabel}
        </div>

        <div className="min-w-0">
          <div className="truncate text-[16px] font-semibold text-[#151210]">
            {owner.name}
          </div>
          <div className="mt-1 text-[15px] text-[#7B7672]">{owner.role}</div>
        </div>
      </div>

      <button
        type="button"
        className="mt-5 inline-flex h-[44px] w-full items-center justify-center whitespace-nowrap border border-[#E4B2B2] bg-white px-4 text-[16px] font-medium text-[#E4B2B2] transition hover:bg-[#FFF7F7]"
      >
        Contact Vendor
      </button>
    </div>
  );
}