import { useMemo } from "react";
import Table from "../../../shared/ui/Table";
import ServiceRequestStatusBadge from "./ServiceRequestStatusBadge";

export default function VendorServiceRequestsTable({
  rows = [],
  onReject,
  onAssign,
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
        header: "Vendor Name",
        headerClassName: "whitespace-nowrap",
        cell: (row) => (
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center bg-[#F4F1EE] text-[12px] font-semibold text-[#6F6965]">
              {row.businessLogoLabel}
            </div>
            <span className="whitespace-nowrap">{row.vendorName}</span>
          </div>
        ),
      },
      {
        key: "category",
        header: "Category",
        headerClassName: "whitespace-nowrap",
        cellClassName: "whitespace-nowrap",
      },
      {
        key: "duration",
        header: "Duration",
        headerClassName: "whitespace-nowrap",
        cellClassName: "whitespace-nowrap",
      },
      {
        key: "description",
        header: "Description",
        headerClassName: "whitespace-nowrap",
        cellClassName: "whitespace-nowrap",
      },
      {
        key: "status",
        header: "Status",
        headerClassName: "whitespace-nowrap text-center",
        align: "center",
        cell: (row) => <ServiceRequestStatusBadge status={row.status} />,
      },
      {
        key: "action",
        header: "Action",
        headerClassName: "whitespace-nowrap text-center",
        align: "center",
        cell: (row) =>
          row.status === "accepted" ? (
            <div className="flex justify-center">
              <span className="inline-flex min-w-[110px] items-center justify-center whitespace-nowrap bg-[#E7F5EC] px-3 py-2 text-[14px] font-medium text-[#2FB065]">
                Assigned
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 whitespace-nowrap">
              <button
                type="button"
                onClick={() => onReject(row)}
                className="inline-flex min-w-[82px] items-center justify-center border border-[#F04444] bg-white px-3 py-2 text-[14px] font-medium text-[#F04444] transition hover:bg-[#FFF5F5]"
              >
                Reject
              </button>

              <button
                type="button"
                onClick={() => onAssign(row)}
                className="inline-flex min-w-[124px] items-center justify-center bg-[#E4B2B2] px-3 py-2 text-[14px] font-medium text-[#151210] transition hover:opacity-90"
              >
                Accept & Assign
              </button>
            </div>
          ),
      },
    ],
    [onAssign, onReject]
  );

  return (
    <Table
      columns={columns}
      rows={rows}
      rowKey={(row) => row.id}
      minWidthClassName="min-w-[1180px]"
      tableClassName="table-auto"
    />
  );
}