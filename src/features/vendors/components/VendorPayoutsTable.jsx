import { useMemo } from "react";
import Table from "../../../shared/ui/Table";
import TableCellPill from "../../../shared/ui/TableCellPill";
import { formatCurrency } from "../../../shared/lib/formatCurrency";
import VendorStatusBadge from "./VendorStatusBadge";

export default function VendorPayoutsTable({
  rows = [],
  startIndex = 0,
  onOpenCommission,
  onReleasePayment,
}) {
  const columns = useMemo(
    () => [
      {
        key: "serial",
        header: "Sr #",
        width: "6%",
        cell: (_row, index) => String(startIndex + index + 1).padStart(2, "0"),
        headerClassName: "min-w-[64px] whitespace-nowrap",
        cellClassName: "min-w-[64px] whitespace-nowrap font-semibold",
      },
      {
        key: "vendorName",
        header: "Vendor",
        width: "16%",
        headerClassName: "min-w-[155px] whitespace-nowrap",
        cellClassName: "min-w-[155px] whitespace-nowrap",
      },
      {
        key: "ownerName",
        header: "Owner Name",
        width: "14%",
        headerClassName: "min-w-[135px] whitespace-nowrap",
        cellClassName: "min-w-[135px] whitespace-nowrap",
      },
      {
        key: "month",
        header: "Month",
        width: "14%",
        headerClassName: "min-w-[135px] whitespace-nowrap",
        cellClassName: "min-w-[135px] whitespace-nowrap",
      },
      {
        key: "totalSales",
        header: "Total Sales",
        width: "12%",
        cell: (row) => formatCurrency(row.totalSales, row.currency),
        headerClassName: "min-w-[120px] whitespace-nowrap",
        cellClassName: "min-w-[120px] whitespace-nowrap",
      },
      {
        key: "status",
        header: "Status",
        width: "10%",
        headerClassName: "min-w-[124px] whitespace-nowrap",
        cellClassName: "min-w-[124px]",
        align: "center",
        cell: (row) => <VendorStatusBadge status={row.status} size="lg" />,
      },
      {
        key: "action",
        header: "Action",
        width: "28%",
        headerClassName: "min-w-[340px] whitespace-nowrap text-left",
        cellClassName: "min-w-[340px]",
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
                className="border border-[#E7E1DE] bg-[#F8F5F3] text-[#151210] transition hover:bg-[#F2EEEB]"
              >
                Download Invoice
              </TableCellPill>
            ) : row.status === "in-progress" ? null : (
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
    [onOpenCommission, onReleasePayment, startIndex]
  );

  return (
    <Table
      columns={columns}
      rows={rows}
      rowKey={(row) => row.id}
      minWidthClassName="min-w-[1260px]"
      tableClassName="table-fixed"
    />
  );
}