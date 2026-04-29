import { useMemo } from "react";
import Table from "../../../shared/ui/Table";
import PaymentStatusBadge from "./PaymentStatusBadge";
import OrderStatusBadge from "./OrderStatusBadge";
import { formatCurrency } from "../../../shared/lib/formatCurrency";

export default function OrdersTable({ rows = [], onView }) {
  const columns = useMemo(
    () => [
      {
        key: "orderId",
        header: "Order ID",
        width: "10%",
        cell: (row) => <span className="font-medium">{row.orderId}</span>,
        headerClassName: "min-w-[100px] whitespace-nowrap",
        cellClassName: "min-w-[100px] whitespace-nowrap font-medium",
      },
      {
        key: "customerName",
        header: "Customer name",
        width: "14%",
        headerClassName: "min-w-[150px] whitespace-nowrap",
        cellClassName: "min-w-[150px] whitespace-nowrap",
      },
      {
        key: "customerAddress",
        header: "Customer Address",
        width: "15%",
        headerClassName: "min-w-[170px] whitespace-nowrap",
        cell: (row) => <span className="whitespace-nowrap">{row.customerAddress}</span>,
        cellClassName: "min-w-[170px] whitespace-nowrap",
      },
      {
        key: "storeName",
        header: "Store Name",
        width: "17%",
        headerClassName: "min-w-[190px] whitespace-nowrap",
        cell: (row) => <span className="whitespace-nowrap">{row.storeName}</span>,
        cellClassName: "min-w-[190px] whitespace-nowrap",
      },
      {
        key: "amount",
        header: "Amount",
        width: "10%",
        cell: (row) => formatCurrency(row.amount, row.currency),
        headerClassName: "min-w-[110px] whitespace-nowrap",
        cellClassName: "min-w-[110px] whitespace-nowrap",
      },
      {
        key: "type",
        header: "Type",
        width: "15%",
        headerClassName: "min-w-[170px] whitespace-nowrap",
        cellClassName: "min-w-[170px] whitespace-nowrap",
      },
      {
        key: "paymentStatus",
        header: "Payment Status",
        width: "11%",
        cell: (row) => <PaymentStatusBadge status={row.paymentStatus} />,
        headerClassName: "min-w-[145px] whitespace-nowrap",
        cellClassName: "min-w-[145px]",
        align: "center",
      },
      {
        key: "orderStatus",
        header: "Order Status",
        width: "11%",
        cell: (row) => <OrderStatusBadge status={row.orderStatus} />,
        headerClassName: "min-w-[145px] whitespace-nowrap",
        cellClassName: "min-w-[145px]",
        align: "center",
      },
      {
        key: "action",
        header: "Action",
        width: "8%",
        headerClassName: "min-w-[96px] whitespace-nowrap",
        cellClassName: "min-w-[96px]",
        align: "center",
        cell: (row) => (
          <button
            type="button"
            onClick={() => onView(row.id)}
            className="inline-flex min-w-[74px] items-center justify-center whitespace-nowrap border border-[#E7E1DE] bg-[#F8F5F3] px-3 py-2 text-[14px] font-medium text-[#151210] transition hover:bg-[#F2EEEB]"
          >
            View
          </button>
        ),
      },
    ],
    [onView]
  );

  return (
    <Table
      columns={columns}
      rows={rows}
      rowKey={(row) => row.id}
      minWidthClassName="min-w-[1360px]"
      tableClassName="table-auto"
    />
  );
}