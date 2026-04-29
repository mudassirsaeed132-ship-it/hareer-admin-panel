import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../shared/ui/Table";
import VendorStatusBadge from "./VendorStatusBadge";

export default function VendorsTable({
  rows = [],
  onToggleStatus,
}) {
  const navigate = useNavigate();

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
              onClick={() => onToggleStatus(row)}
              className="inline-flex min-w-[98px] items-center justify-center border border-[#F04444] bg-white px-3 py-2 text-[14px] font-medium text-[#F04444] transition hover:bg-[#FFF5F5]"
            >
              {row.status === "active" ? "Deactivate" : "Activate"}
            </button>

            <button
              type="button"
              onClick={() => navigate(`/vendors/${row.id}`)}
              className="inline-flex min-w-[74px] items-center justify-center border border-[#E7E1DE] bg-[#F8F5F3] px-3 py-2 text-[14px] font-medium text-[#151210] transition hover:bg-[#F2EEEB]"
            >
              View
            </button>
          </div>
        ),
      },
    ],
    [navigate, onToggleStatus]
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