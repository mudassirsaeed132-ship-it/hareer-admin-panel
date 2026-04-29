import { useMemo } from "react";
import Table from "../../../shared/ui/Table";
import VendorStatusBadge from "./VendorStatusBadge";

export default function VendorRequestsTable({
  rows = [],
  onAccept,
  onReject,
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
        cellClassName: "whitespace-nowrap",
      },
      {
        key: "businessName",
        header: "Business Name",
        headerClassName: "whitespace-nowrap",
        cell: (row) => (
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center bg-[#F4F1EE] text-[12px] font-semibold text-[#6F6965]">
              {row.businessLogoLabel}
            </div>
            <span className="whitespace-nowrap">{row.businessName}</span>
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
        key: "website",
        header: "Website",
        headerClassName: "whitespace-nowrap",
        cellClassName: "whitespace-nowrap",
      },
      {
        key: "location",
        header: "Location",
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
              onClick={() => onAccept(row)}
              className="inline-flex min-w-[76px] items-center justify-center bg-[#E4B2B2] px-3 py-2 text-[14px] font-medium text-[#151210] transition hover:opacity-90"
            >
              Accept
            </button>

            <button
              type="button"
              onClick={() => onReject(row)}
              className="inline-flex min-w-[74px] items-center justify-center border border-[#E7E1DE] bg-[#F8F5F3] px-3 py-2 text-[14px] font-medium text-[#151210] transition hover:bg-[#F2EEEB]"
            >
              Reject
            </button>
          </div>
        ),
      },
    ],
    [onAccept, onReject]
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