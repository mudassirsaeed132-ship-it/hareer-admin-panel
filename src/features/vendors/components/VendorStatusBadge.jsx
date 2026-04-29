import { getStatusMeta } from "../utils/vendors.helpers";

export default function VendorStatusBadge({
  status,
  minWidthClassName = "min-w-[88px]",
}) {
  const meta = getStatusMeta(status);

  return (
    <span
      className={`inline-flex ${minWidthClassName} items-center justify-center whitespace-nowrap px-3 py-2 text-[14px] font-medium leading-none ${meta.className}`}
    >
      {meta.label}
    </span>
  );
}