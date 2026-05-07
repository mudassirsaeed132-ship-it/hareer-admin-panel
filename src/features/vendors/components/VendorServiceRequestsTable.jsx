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
        width: "7%",
        cell: (_row, index) => String(startIndex + index + 1).padStart(2, "0"),
        headerClassName: "min-w-[70px] whitespace-nowrap",
        cellClassName: "min-w-[70px] whitespace-nowrap font-semibold",
      },
      {
        key: "vendorName",
        header: "Vendor Name",
        width: "18%",
        headerClassName: "min-w-[170px] whitespace-nowrap",
        cellClassName: "min-w-[170px]",
        cell: (row) => (
          <div className="flex items-center gap-3">
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
        width: "16%",
        headerClassName: "min-w-[155px] whitespace-nowrap",
        cellClassName: "min-w-[155px] whitespace-nowrap",
      },
      {
        key: "duration",
        header: "Duration",
        width: "18%",
        headerClassName: "min-w-[175px] whitespace-nowrap",
        cellClassName: "min-w-[175px] whitespace-nowrap",
      },
      {
        key: "description",
        header: "Description",
        width: "16%",
        headerClassName: "min-w-[150px] whitespace-nowrap",
        cellClassName: "min-w-[150px] whitespace-nowrap",
      },
      {
        key: "status",
        header: "Status",
        width: "10%",
        headerClassName: "min-w-[118px] whitespace-nowrap",
        cellClassName: "min-w-[118px]",
        align: "center",
        cell: (row) => <ServiceRequestStatusBadge status={row.status} size="lg" />,
      },
      {
        key: "action",
        header: "Action",
        width: "18%",
        headerClassName: "min-w-[230px] whitespace-nowrap",
        cellClassName: "min-w-[230px]",
        align: "center",
        cell: (row) =>
          row.status === "accepted" ? (
            <div className="flex justify-center">
              <TableCellPill
                size="lg"
                className="bg-[#E7F5EC] text-[#2FB065]"
              >
                Assigned
              </TableCellPill>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 whitespace-nowrap">
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
      minWidthClassName="min-w-[1180px]"
      tableClassName="table-fixed"
    />
  );
}