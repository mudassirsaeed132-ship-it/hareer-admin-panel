import { useMemo } from "react";
import Table from "../../../shared/ui/Table";
import TableCellPill from "../../../shared/ui/TableCellPill";
import { formatCurrency } from "../../../shared/lib/formatCurrency";
import VendorStatusBadge from "./VendorStatusBadge";

export default function VendorOrdersTable({ rows = [] }) {
  const columns = useMemo(
    () => [
      {
        key: "orderId",
        header: "Order ID",
        width: "9%",
        headerClassName: "min-w-[86px] whitespace-nowrap",
        cellClassName: "min-w-[86px] whitespace-nowrap font-semibold",
      },
      {
        key: "customerName",
        header: "Customer name",
        width: "13%",
        headerClassName: "min-w-[118px] whitespace-nowrap",
        cellClassName: "min-w-[118px] whitespace-nowrap",
      },
      {
        key: "customerAddress",
        header: "Customer Address",
        width: "14%",
        headerClassName: "min-w-[132px] whitespace-nowrap",
        cellClassName: "min-w-[132px] whitespace-nowrap",
      },
      {
        key: "storeName",
        header: "Store Name",
        width: "15%",
        headerClassName: "min-w-[145px] whitespace-nowrap",
        cellClassName: "min-w-[145px] whitespace-nowrap",
      },
      {
        key: "amount",
        header: "Amount",
        width: "8%",
        cell: (row) => formatCurrency(row.amount, row.currency),
        headerClassName: "min-w-[82px] whitespace-nowrap",
        cellClassName: "min-w-[82px] whitespace-nowrap",
      },
      {
        key: "type",
        header: "Type",
        width: "13%",
        headerClassName: "min-w-[132px] whitespace-nowrap",
        cellClassName: "min-w-[132px] whitespace-nowrap",
      },
      {
        key: "paymentStatus",
        header: "Payment Status",
        width: "10%",
        headerClassName: "min-w-[105px] whitespace-nowrap",
        cellClassName: "min-w-[105px]",
        align: "center",
        cell: (row) => <VendorStatusBadge status={row.paymentStatus} size="md" />,
      },
      {
        key: "orderStatus",
        header: "Order Status",
        width: "10%",
        headerClassName: "min-w-[105px] whitespace-nowrap",
        cellClassName: "min-w-[105px]",
        align: "center",
        cell: (row) => <VendorStatusBadge status={row.orderStatus} size="lg" />,
      },
      {
        key: "action",
        header: "Action",
        width: "8%",
        headerClassName: "min-w-[76px] whitespace-nowrap",
        cellClassName: "min-w-[76px]",
        align: "center",
        cell: () => (
          <TableCellPill
            as="button"
            type="button"
            size="md"
            className="border border-[#E7E1DE] bg-[#F8F5F3] text-[#151210] transition hover:bg-[#F2EEEB]"
          >
            View
          </TableCellPill>
        ),
      },
    ],
    []
  );

  return (
    <Table
      columns={columns}
      rows={rows}
      rowKey={(row) => row.id}
      minWidthClassName="min-w-[1060px]"
      tableClassName="table-fixed"
    />
  );
}