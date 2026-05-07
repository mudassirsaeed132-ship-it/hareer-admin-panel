import VendorProfileHeader from "./VendorProfileHeader";
import VendorOwnerCard from "./VendorOwnerCard";

export default function VendorProfileShell({
  detail,
  onBack,
  onToggleStatus,
}) {
  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex h-10 items-center justify-center border border-[#EEE8E4] bg-white px-4 text-[14px] font-medium text-[#151210] transition hover:bg-[#F8F5F3]"
      >
        &lt;&lt; Back to Vendors
      </button>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-stretch">
        <VendorProfileHeader
          detail={detail}
          onToggleStatus={onToggleStatus}
        />

        <VendorOwnerCard owner={detail.owner} />
      </div>
    </div>
  );
}