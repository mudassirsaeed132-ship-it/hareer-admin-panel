import TableCellPill from "../../../shared/ui/TableCellPill";
import { getOrderStatusMeta } from "../utils/orders.helpers";

export default function OrderStatusBadge({ status }) {
  const meta = getOrderStatusMeta(status);

  return (
    <TableCellPill className={meta.className}>
      {meta.label}
    </TableCellPill>
  );
}