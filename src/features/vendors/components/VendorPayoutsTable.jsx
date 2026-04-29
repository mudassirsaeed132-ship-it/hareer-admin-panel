import { useMemo } from "react";
import Table from "../../../shared/ui/Table";
import { formatCurrency } from "../../../shared/lib/formatCurrency";
import VendorStatusBadge from "./VendorStatusBadge";

export default function VendorPayoutsTable({
  rows = [],
  onOpenCommission,
  onReleasePayment,
}) {
  const columns = useMemo(
    () => [
      {
        key: "serial",
        header: "Sr #",
        cell: (_row, index) => String(index + 1).padStart(2, "0"),
        headerClassName: "whitespace-nowrap",
        cellClassName: "whitespace-nowrap font-medium",
      },
      {
        key: "vendorName",
        header: "Vendor",
        headerClassName: "whitespace-nowrap",
        cellClassName: "whitespace-nowrap",
      },
      {
        key: "ownerName",
        header: "Owner Name",
        headerClassName: "whitespace-nowrap",
        cellClassName: "whitespace-nowrap",
      },
      {
        key: "month",
        header: "Month",
        headerClassName: "whitespace-nowrap",
        cellClassName: "whitespace-nowrap",
      },
      {
        key: "totalSales",
        header: "Total Sales",
        cell: (row) => formatCurrency(row.totalSales, row.currency),
        headerClassName: "whitespace-nowrap",
        cellClassName: "whitespace-nowrap",
      },
      {
        key: "status",
        header: "Status",
        headerClassName: "whitespace-nowrap text-center",
        align: "center",
        cell: (row) => <VendorStatusBadge status={row.status} />,
      },
      {
        key: "action",
        header: "Action",
        headerClassName: "whitespace-nowrap text-center",
        align: "center",
        cell: (row) => (
          <div className="flex items-center justify-center gap-2 whitespace-nowrap">
            <button
              type="button"
              onClick={() => onOpenCommission(row)}
              className="inline-flex min-w-[152px] items-center justify-center border border-[#E7E1DE] bg-[#F8F5F3] px-3 py-2 text-[14px] font-medium text-[#151210] transition hover:bg-[#F2EEEB]"
            >
              Commission Settings
            </button>

            {row.status === "paid" ? (
              <button
                type="button"
                className="inline-flex min-w-[126px] items-center justify-center border border-[#E7E1DE] bg-[#F8F5F3] px-3 py-2 text-[14px] font-medium text-[#151210] transition hover:bg-[#F2EEEB]"
              >
                Download Invoice
              </button>
            ) : row.status === "in-progress" ? null : (
              <button
                type="button"
                onClick={() => onReleasePayment(row)}
                className="inline-flex min-w-[126px] items-center justify-center bg-[#E4B2B2] px-3 py-2 text-[14px] font-medium text-[#151210] transition hover:opacity-90"
              >
                Release Payment
              </button>
            )}
          </div>
        ),
      },
    ],
    [onOpenCommission, onReleasePayment]
  );

  return (
    <Table
      columns={columns}
      rows={rows}
      rowKey={(row) => row.id}
      minWidthClassName="min-w-[1220px]"
      tableClassName="table-auto"
    />
  );
}