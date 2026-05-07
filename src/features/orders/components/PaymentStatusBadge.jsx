import TableCellPill from "../../../shared/ui/TableCellPill";
import { getPaymentStatusMeta } from "../utils/orders.helpers";

export default function PaymentStatusBadge({ status }) {
  const meta = getPaymentStatusMeta(status);

  return (
    <TableCellPill className={meta.className}>
      {meta.label}
    </TableCellPill>
  );
}