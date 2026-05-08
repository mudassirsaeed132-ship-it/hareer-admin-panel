import ellipseAvatar from "../../../shared/assets/icons/Ellipse.svg";

export default function VendorOwnerCard({ owner, onContact }) {
  return (
    <div className="flex min-h-[128px] flex-col justify-center border border-[#EEE8E4] bg-white px-4 py-4 sm:px-5">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
          <img
            src={owner?.avatarUrl || ellipseAvatar}
            alt={owner?.name || "Vendor owner"}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0">
          <div className="truncate text-[16px] font-semibold text-[#151210]">
            {owner?.name || "Vendor Owner"}
          </div>

          <div className="mt-1 text-[15px] text-[#7B7672]">
            {owner?.role || "Store owner"}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onContact}
        className="mt-5 inline-flex h-[44px] w-full items-center justify-center whitespace-nowrap border border-[#E4B2B2] bg-white px-4 text-[15px] font-medium text-[#E4B2B2] transition hover:bg-[#FFF7F7] focus:outline-none focus:ring-2 focus:ring-[#E4B2B2]/60 sm:text-[16px]"
      >
        Contact Vendor
      </button>
    </div>
  );
}