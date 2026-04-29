import { useMemo } from "react";
import Table from "../../../shared/ui/Table";
import { formatCurrency } from "../../../shared/lib/formatCurrency";
import VendorStatusBadge from "./VendorStatusBadge";

export default function VendorOrdersTable({ rows = [] }) {
  const columns = useMemo(
    () => [
      {
        key: "orderId",
        header: "Order ID",
        headerClassName: "whitespace-nowrap",
        cellClassName: "whitespace-nowrap font-medium",
      },
      {
        key: "customerName",
        header: "Customer name",
        headerClassName: "whitespace-nowrap",
        cellClassName: "whitespace-nowrap",
      },
      {
        key: "customerAddress",
        header: "Customer Address",
        headerClassName: "whitespace-nowrap",
        cellClassName: "whitespace-nowrap",
      },
      {
        key: "storeName",
        header: "Store Name",
        headerClassName: "whitespace-nowrap",
        cellClassName: "whitespace-nowrap",
      },
      {
        key: "amount",
        header: "Amount",
        cell: (row) => formatCurrency(row.amount, row.currency),
        headerClassName: "whitespace-nowrap",
        cellClassName: "whitespace-nowrap",
      },
      {
        key: "type",
        header: "Type",
        headerClassName: "whitespace-nowrap",
        cellClassName: "whitespace-nowrap",
      },
      {
        key: "paymentStatus",
        header: "Payment Status",
        headerClassName: "whitespace-nowrap text-center",
        align: "center",
        cell: (row) => <VendorStatusBadge status={row.paymentStatus} />,
      },
      {
        key: "orderStatus",
        header: "Order Status",
        headerClassName: "whitespace-nowrap text-center",
        align: "center",
        cell: (row) => (
          <VendorStatusBadge status={row.orderStatus} minWidthClassName="min-w-[96px]" />
        ),
      },
      {
        key: "action",
        header: "Action",
        headerClassName: "whitespace-nowrap text-center",
        align: "center",
        cell: () => (
          <button
            type="button"
            className="inline-flex min-w-[74px] items-center justify-center border border-[#E7E1DE] bg-[#F8F5F3] px-3 py-2 text-[14px] font-medium text-[#151210]"
          >
            View
          </button>
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
      minWidthClassName="min-w-[1120px]"
      tableClassName="table-auto"
    />
  );
}