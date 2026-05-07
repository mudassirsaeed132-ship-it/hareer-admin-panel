import TableCellPill from "../../../shared/ui/TableCellPill";
import { getStatusMeta } from "../utils/vendors.helpers";

export default function VendorStatusBadge({
  status,
  size = "lg",
}) {
  const meta = getStatusMeta(status);

  return (
    <TableCellPill size={size} className={meta.className}>
      {meta.label}
    </TableCellPill>
  );
}