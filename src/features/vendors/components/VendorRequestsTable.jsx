import { useMemo } from "react";
import Table from "../../../shared/ui/Table";
import TableCellPill from "../../../shared/ui/TableCellPill";
import VendorStatusBadge from "./VendorStatusBadge";

export default function VendorRequestsTable({
  rows = [],
  startIndex = 0,
  onAccept,
  onReject,
}) {
  const columns = useMemo(
    () => [
      {
        key: "serial",
        header: "Sr #",
        width: "7%",
        cell: (_row, index) => String(startIndex + index + 1).padStart(2, "0"),
        headerClassName: "min-w-[70px] whitespace-nowrap",
        cellClassName: "min-w-[70px] whitespace-nowrap font-semibold",
      },
      {
        key: "vendorName",
        header: "Vendor Name",
        width: "14%",
        headerClassName: "min-w-[135px] whitespace-nowrap",
        cellClassName: "min-w-[135px] whitespace-nowrap",
      },
      {
        key: "businessName",
        header: "Business Name",
        width: "18%",
        headerClassName: "min-w-[170px] whitespace-nowrap",
        cellClassName: "min-w-[170px]",
        cell: (row) => (
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 shrink-0 place-items-center bg-[#F4F1EE] text-[12px] font-semibold text-[#6F6965]">
              {row.businessLogoLabel}
            </div>
            <span className="whitespace-nowrap">{row.businessName}</span>
          </div>
        ),
      },
      {
        key: "category",
        header: "Category",
        width: "12%",
        headerClassName: "min-w-[120px] whitespace-nowrap",
        cellClassName: "min-w-[120px] whitespace-nowrap",
      },
      {
        key: "website",
        header: "Website",
        width: "14%",
        headerClassName: "min-w-[130px] whitespace-nowrap",
        cellClassName: "min-w-[130px] whitespace-nowrap",
      },
      {
        key: "location",
        header: "Location",
        width: "15%",
        headerClassName: "min-w-[145px] whitespace-nowrap",
        cellClassName: "min-w-[145px] whitespace-nowrap",
      },
      {
        key: "status",
        header: "Status",
        width: "10%",
        headerClassName: "min-w-[118px] whitespace-nowrap",
        cellClassName: "min-w-[118px]",
        align: "center",
        cell: (row) => <VendorStatusBadge status={row.status} size="lg" />,
      },
      {
        key: "action",
        header: "Action",
        width: "14%",
        headerClassName: "min-w-[180px] whitespace-nowrap",
        cellClassName: "min-w-[180px]",
        align: "center",
        cell: (row) => (
          <div className="flex items-center justify-center gap-2 whitespace-nowrap">
            <TableCellPill
              as="button"
              type="button"
              size="md"
              onClick={() => onAccept(row)}
              className="bg-[#E4B2B2] text-[#151210] transition hover:opacity-90"
            >
              Accept
            </TableCellPill>

            <TableCellPill
              as="button"
              type="button"
              size="md"
              onClick={() => onReject(row)}
              className="border border-[#E7E1DE] bg-[#F8F5F3] text-[#151210] transition hover:bg-[#F2EEEB]"
            >
              Reject
            </TableCellPill>
          </div>
        ),
      },
    ],
    [onAccept, onReject, startIndex]
  );

  return (
    <Table
      columns={columns}
      rows={rows}
      rowKey={(row) => row.id}
      minWidthClassName="min-w-[1120px]"
      tableClassName="table-fixed"
    />
  );
}