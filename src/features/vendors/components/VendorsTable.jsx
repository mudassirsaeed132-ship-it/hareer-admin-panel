import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../shared/ui/Table";
import TableCellPill from "../../../shared/ui/TableCellPill";
import VendorStatusBadge from "./VendorStatusBadge";

export default function VendorsTable({
  rows = [],
  startIndex = 0,
  onToggleStatus,
}) {
  const navigate = useNavigate();

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
        width: "13%",
        headerClassName: "min-w-[130px] whitespace-nowrap",
        cellClassName: "min-w-[130px] whitespace-nowrap",
      },
      {
        key: "businessName",
        header: "Business Name",
        width: "17%",
        headerClassName: "min-w-[170px] whitespace-nowrap",
        cellClassName: "min-w-[170px]",
        cell: (row) => (
          <div className="flex min-w-max items-center gap-3">
            <div className="grid h-8 w-8 shrink-0 place-items-center border border-[#EAE5E1] bg-[#FAF8F7] text-[12px] font-semibold text-[#6F6965]">
              {row.businessLogoLabel}
            </div>
            <span className="whitespace-nowrap">{row.businessName}</span>
          </div>
        ),
      },
      {
        key: "category",
        header: "Category",
        width: "11%",
        headerClassName: "min-w-[120px] whitespace-nowrap",
        cellClassName: "min-w-[120px] whitespace-nowrap",
      },
      {
        key: "website",
        header: "Website",
        width: "13%",
        headerClassName: "min-w-[135px] whitespace-nowrap",
        cellClassName: "min-w-[135px] whitespace-nowrap",
      },
      {
        key: "location",
        header: "Location",
        width: "14%",
        headerClassName: "min-w-[150px] whitespace-nowrap",
        cellClassName: "min-w-[150px] whitespace-nowrap",
      },
      {
        key: "status",
        header: "Status",
        width: "10%",
        headerClassName: "min-w-[112px] whitespace-nowrap",
        cellClassName: "min-w-[112px]",
        align: "center",
        cell: (row) => <VendorStatusBadge status={row.status} size="sm" />,
      },
      {
        key: "action",
        header: "Action",
        width: "16%",
        headerClassName: "min-w-[218px] whitespace-nowrap",
        cellClassName: "min-w-[218px]",
        align: "center",
        cell: (row) => (
          <div className="flex min-w-max items-center justify-center gap-2 whitespace-nowrap">
            <TableCellPill
              as="button"
              type="button"
              size="lg"
              onClick={() => onToggleStatus(row)}
              className={
                row.status === "active"
                  ? "border border-[#FF4B55] bg-white text-[#FF1F2D] transition hover:bg-[#FFF5F5]"
                  : "bg-[#E4B2B2] text-[#151210] transition hover:opacity-90"
              }
            >
              {row.status === "active" ? "Deactivate" : "Activate"}
            </TableCellPill>

            <TableCellPill
              as="button"
              type="button"
              size="sm"
              onClick={() => navigate(`/vendors/${row.id}`)}
              className="border border-[#E7E1DE] bg-[#F8F5F3] text-[#151210] transition hover:bg-[#F2EEEB]"
            >
              View
            </TableCellPill>
          </div>
        ),
      },
    ],
    [navigate, onToggleStatus, startIndex]
  );

  return (
    <Table
      columns={columns}
      rows={rows}
      rowKey={(row) => row.id}
      minWidthClassName="min-w-[1210px]"
      tableClassName="table-fixed"
    />
  );
}