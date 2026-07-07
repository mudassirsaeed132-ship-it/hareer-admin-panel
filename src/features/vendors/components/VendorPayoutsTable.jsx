import { useMemo } from "react";
import Table from "../../../shared/ui/Table";
import TableCellPill from "../../../shared/ui/TableCellPill";
import { formatCurrency } from "../../../shared/lib/formatCurrency";
import VendorStatusBadge from "./VendorStatusBadge";

function getNetPayout(row) {
  if (typeof row.netPayout === "number") return row.netPayout;
  return Number(row.totalSales ?? 0) - Number(row.commissionAmount ?? 0);
}

export default function VendorPayoutsTable({
  rows = [],
  startIndex = 0,
  onOpenCommission,
  onReleasePayment,
  onDownloadInvoice,
}) {
  const columns = useMemo(
    () => [
      {
        key: "serial",
        header: "Sr #",
        width: "5%",
        cell: (_row, index) => String(startIndex + index + 1).padStart(2, "0"),
        headerClassName: "min-w-[56px] whitespace-nowrap",
        cellClassName: "min-w-[56px] whitespace-nowrap font-semibold",
      },
      {
        key: "vendorName",
        header: "Vendor",
        width: "13%",
        headerClassName: "min-w-[150px] whitespace-nowrap",
        cellClassName: "min-w-[150px] whitespace-nowrap",
      },
      {
        key: "ownerName",
        header: "Owner Name",
        width: "11%",
        headerClassName: "min-w-[130px] whitespace-nowrap",
        cellClassName: "min-w-[130px] whitespace-nowrap",
      },
      {
        key: "month",
        header: "Month",
        width: "11%",
        headerClassName: "min-w-[130px] whitespace-nowrap",
        cellClassName: "min-w-[130px] whitespace-nowrap",
      },
      {
        key: "totalSales",
        header: "Total Sales",
        width: "11%",
        cell: (row) => formatCurrency(row.totalSales, row.currency),
        headerClassName: "min-w-[120px] whitespace-nowrap",
        cellClassName: "min-w-[120px] whitespace-nowrap",
      },
      {
        key: "commission",
        header: "Commission",
        width: "12%",
        headerClassName: "min-w-[130px] whitespace-nowrap",
        cellClassName: "min-w-[130px] whitespace-nowrap",
        cell: (row) => (
          <div className="leading-tight">
            <div className="font-medium text-[#151210]">
              {formatCurrency(row.commissionAmount ?? 0, row.currency)}
            </div>
            <div className="text-[12px] text-[#7E7671]">
              {row.commissionRate ?? 0}%
            </div>
          </div>
        ),
      },
      {
        key: "netPayout",
        header: "Net Payout",
        width: "11%",
        headerClassName: "min-w-[120px] whitespace-nowrap",
        cellClassName: "min-w-[120px] whitespace-nowrap font-semibold text-[#151210]",
        cell: (row) => formatCurrency(getNetPayout(row), row.currency),
      },
      {
        key: "status",
        header: "Status",
        width: "8%",
        headerClassName: "min-w-[118px] whitespace-nowrap",
        cellClassName: "min-w-[118px]",
        align: "center",
        cell: (row) => <VendorStatusBadge status={row.status} size="lg" />,
      },
      {
        key: "action",
        header: "Action",
        width: "18%",
        headerClassName: "min-w-[320px] whitespace-nowrap text-left",
        cellClassName: "min-w-[320px]",
        align: "left",
        cell: (row) => (
          <div className="flex min-w-max items-center justify-start gap-2 whitespace-nowrap">
            <TableCellPill
              as="button"
              type="button"
              size="2xl"
              onClick={() => onOpenCommission(row)}
              className="border border-[#E7E1DE] bg-[#F8F5F3] text-[#151210] transition hover:bg-[#F2EEEB]"
            >
              Commission Settings
            </TableCellPill>

            {row.status === "paid" ? (
              <TableCellPill
                as="button"
                type="button"
                size="xl"
                onClick={() => onDownloadInvoice?.(row)}
                className="border border-[#E7E1DE] bg-[#F8F5F3] text-[#151210] transition hover:bg-[#F2EEEB]"
              >
                Download Invoice
              </TableCellPill>
            ) : row.status === "in-progress" ? (
              <TableCellPill
                as="button"
                type="button"
                size="xl"
                onClick={() => onReleasePayment(row)}
                className="bg-[#E4B2B2] text-[#151210] transition hover:opacity-90"
              >
                Mark as Paid
              </TableCellPill>
            ) : (
              <TableCellPill
                as="button"
                type="button"
                size="xl"
                onClick={() => onReleasePayment(row)}
                className="bg-[#E4B2B2] text-[#151210] transition hover:opacity-90"
              >
                Release Payment
              </TableCellPill>
            )}
          </div>
        ),
      },
    ],
    [onOpenCommission, onReleasePayment, onDownloadInvoice, startIndex]
  );

  return (
    <Table
      columns={columns}
      rows={rows}
      rowKey={(row) => row.id}
      minWidthClassName="min-w-[1560px]"
      tableClassName="table-fixed"
    />
  );
}
