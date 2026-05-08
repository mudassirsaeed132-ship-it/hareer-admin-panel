import { useMemo } from "react";
import Table from "../../../shared/ui/Table";
import TableCellPill from "../../../shared/ui/TableCellPill";
import ServiceRequestStatusBadge from "./ServiceRequestStatusBadge";

export default function VendorServiceRequestsTable({
  rows = [],
  startIndex = 0,
  onReject,
  onAssign,
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
        header: "Vendor Name",
        width: "16%",
        headerClassName: "min-w-[170px] whitespace-nowrap",
        cellClassName: "min-w-[170px]",
        cell: (row) => (
          <div className="flex min-w-max items-center gap-3">
            <div className="grid h-8 w-8 shrink-0 place-items-center bg-[#F4F1EE] text-[12px] font-semibold text-[#6F6965]">
              {row.businessLogoLabel}
            </div>
            <span className="whitespace-nowrap">{row.vendorName}</span>
          </div>
        ),
      },
      {
        key: "category",
        header: "Category",
        width: "15%",
        headerClassName: "min-w-[160px] whitespace-nowrap",
        cellClassName: "min-w-[160px] whitespace-nowrap",
      },
      {
        key: "duration",
        header: "Duration",
        width: "18%",
        headerClassName: "min-w-[180px] whitespace-nowrap",
        cellClassName: "min-w-[180px] whitespace-nowrap",
      },
      {
        key: "description",
        header: "Description",
        width: "16%",
        headerClassName: "min-w-[160px] whitespace-nowrap",
        cellClassName: "min-w-[160px] whitespace-nowrap",
      },
      {
        key: "status",
        header: "Status",
        width: "10%",
        headerClassName: "min-w-[124px] whitespace-nowrap",
        cellClassName: "min-w-[124px]",
        align: "center",
        cell: (row) => (
          <ServiceRequestStatusBadge status={row.status} size="lg" />
        ),
      },
      {
        key: "action",
        header: "Action",
        width: "19%",
        headerClassName: "min-w-[270px] whitespace-nowrap",
        cellClassName: "min-w-[270px]",
        align: "center",
        cell: (row) =>
          row.status === "accepted" ? (
            <div className="flex min-w-max justify-center whitespace-nowrap">
              <TableCellPill
                size="lg"
                className="bg-[#E7F5EC] text-[#2FB065]"
              >
                Assigned
              </TableCellPill>
            </div>
          ) : (
            <div className="flex min-w-max items-center justify-center gap-2 whitespace-nowrap">
              <TableCellPill
                as="button"
                type="button"
                size="md"
                onClick={() => onReject(row)}
                className="border border-[#F04444] bg-white text-[#F04444] transition hover:bg-[#FFF5F5]"
              >
                Reject
              </TableCellPill>

              <TableCellPill
                as="button"
                type="button"
                size="xl"
                onClick={() => onAssign(row)}
                className="bg-[#E4B2B2] text-[#151210] transition hover:opacity-90"
              >
                Accept & Assign
              </TableCellPill>
            </div>
          ),
      },
    ],
    [onAssign, onReject, startIndex]
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