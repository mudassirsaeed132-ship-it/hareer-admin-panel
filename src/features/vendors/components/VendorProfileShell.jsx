import VendorProfileHeader from "./VendorProfileHeader";
import VendorOwnerCard from "./VendorOwnerCard";

export default function VendorProfileShell({
  detail,
  onBack,
  onToggleStatus,
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
      <VendorProfileHeader
        detail={detail}
        onBack={onBack}
        onToggleStatus={onToggleStatus}
      />
      <VendorOwnerCard owner={detail.owner} />
    </div>
  );
}