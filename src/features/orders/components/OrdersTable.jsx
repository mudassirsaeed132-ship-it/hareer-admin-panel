import { useMemo } from "react";
import Table from "../../../shared/ui/Table";
import TableCellPill from "../../../shared/ui/TableCellPill";
import PaymentStatusBadge from "./PaymentStatusBadge";
import OrderStatusBadge from "./OrderStatusBadge";
import { formatCurrency } from "../../../shared/lib/formatCurrency";

function MobileOrderCard({ row, onView }) {
  return (
    <article className="border border-[#E7E1DE] bg-white">
      <div className="flex items-start justify-between gap-3 border-b border-[#E7E1DE] px-3 py-3">
        <div>
          <p className="text-[12px] font-medium text-[#7E7671]">Order ID</p>
          <p className="mt-1 text-[14px] font-semibold text-[#151210]">
            {row.orderId}
          </p>
        </div>

        <TableCellPill
          as="button"
          type="button"
          onClick={() => onView(row.id)}
          className="border border-[#E7E1DE] bg-[#F8F5F3] text-[#151210] transition hover:bg-[#F2EEEB]"
        >
          View
        </TableCellPill>
      </div>

      <div className="grid grid-cols-1 divide-y divide-[#E7E1DE] text-[13px] sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <div className="space-y-3 px-3 py-3">
          <InfoRow label="Customer name" value={row.customerName} />
          <InfoRow label="Customer Address" value={row.customerAddress} />
          <InfoRow label="Store Name" value={row.storeName} />
          <InfoRow
            label="Amount"
            value={formatCurrency(row.amount, row.currency)}
          />
        </div>

        <div className="space-y-3 px-3 py-3">
          <InfoRow label="Type" value={row.type} />

          <div className="flex items-center justify-between gap-3">
            <span className="text-[#7E7671]">Payment Status</span>
            <PaymentStatusBadge status={row.paymentStatus} />
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-[#7E7671]">Order Status</span>
            <OrderStatusBadge status={row.orderStatus} />
          </div>
        </div>
      </div>
    </article>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-[#7E7671]">{label}</span>
      <span className="max-w-[58%] text-right font-medium text-[#151210]">
        {value ?? "—"}
      </span>
    </div>
  );
}

export default function OrdersTable({ rows = [], onView }) {
  const columns = useMemo(
    () => [
      {
        key: "orderId",
        header: "Order ID",
        width: "9%",
        cell: (row) => <span className="font-semibold">{row.orderId}</span>,
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
        cell: (row) => (
          <span className="whitespace-nowrap">{row.customerAddress}</span>
        ),
        cellClassName: "min-w-[132px] whitespace-nowrap",
      },
      {
        key: "storeName",
        header: "Store Name",
        width: "15%",
        headerClassName: "min-w-[145px] whitespace-nowrap",
        cell: (row) => (
          <span className="whitespace-nowrap">{row.storeName}</span>
        ),
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
        cell: (row) => <PaymentStatusBadge status={row.paymentStatus} />,
        headerClassName: "min-w-[105px] whitespace-nowrap",
        cellClassName: "min-w-[105px]",
        align: "center",
      },
      {
        key: "orderStatus",
        header: "Order Status",
        width: "10%",
        cell: (row) => <OrderStatusBadge status={row.orderStatus} />,
        headerClassName: "min-w-[105px] whitespace-nowrap",
        cellClassName: "min-w-[105px]",
        align: "center",
      },
      {
        key: "action",
        header: "Action",
        width: "8%",
        headerClassName: "min-w-[76px] whitespace-nowrap",
        cellClassName: "min-w-[76px]",
        align: "center",
        cell: (row) => (
          <TableCellPill
            as="button"
            type="button"
            onClick={() => onView(row.id)}
            className="border border-[#E7E1DE] bg-[#F8F5F3] text-[#151210] transition hover:bg-[#F2EEEB]"
          >
            View
          </TableCellPill>
        ),
      },
    ],
    [onView]
  );

  if (!rows.length) {
    return (
      <div className="border-t border-[#E7E1DE] px-4 py-10 text-center text-[14px] text-[#7E7671]">
        No orders available.
      </div>
    );
  }

  return (
    <>
      <div className="hidden max-w-full md:block">
        <Table
          columns={columns}
          rows={rows}
          rowKey={(row) => row.id}
          minWidthClassName="min-w-[960px]"
          tableClassName="table-fixed"
        />
      </div>

      <div className="grid gap-3 border-t border-[#E7E1DE] p-3 md:hidden">
        {rows.map((row) => (
          <MobileOrderCard key={row.id} row={row} onView={onView} />
        ))}
      </div>
    </>
  );
}