import { useMemo } from "react";
import Table from "../../../shared/ui/Table";
import UserStatusBadge from "./UserStatusBadge";

export default function UsersTable({
  rows = [],
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  const columns = useMemo(
    () => [
      {
        key: "serial",
        header: "Sr #",
        width: "8%",
        cell: (_row, index) => (
          <span className="font-medium">
            {String(index + 1).padStart(2, "0")}
          </span>
        ),
        headerClassName: "min-w-[80px] whitespace-nowrap",
        cellClassName: "min-w-[80px] whitespace-nowrap",
      },
      {
        key: "fullName",
        header: "Full Name",
        width: "21%",
        headerClassName: "min-w-[180px] whitespace-nowrap",
        cellClassName: "min-w-[180px] whitespace-nowrap",
      },
      {
        key: "email",
        header: "Email address",
        width: "23%",
        headerClassName: "min-w-[200px] whitespace-nowrap",
        cellClassName: "min-w-[200px] whitespace-nowrap",
      },
      {
        key: "addedDate",
        header: "Added Date",
        width: "17%",
        headerClassName: "min-w-[150px] whitespace-nowrap",
        cellClassName: "min-w-[150px] whitespace-nowrap",
      },
      {
        key: "status",
        header: "Status",
        width: "14%",
        cell: (row) => <UserStatusBadge status={row.status} />,
        headerClassName: "min-w-[130px] whitespace-nowrap",
        cellClassName: "min-w-[130px]",
      },
      {
        key: "action",
        header: "Action",
        width: "17%",
        headerClassName: "min-w-[190px] whitespace-nowrap",
        cellClassName: "min-w-[190px]",
        cell: (row) => {
          if (row.status === "deactivated") {
            return (
              <button
                type="button"
                onClick={() => onToggleStatus(row)}
                className="inline-flex min-w-[100px] items-center justify-center whitespace-nowrap bg-[#E4B2B2] px-4 py-2 text-[14px] font-medium text-[#151210] transition hover:opacity-90"
              >
                Activate
              </button>
            );
          }

          return (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onEdit(row)}
                className="inline-flex min-w-[74px] items-center justify-center whitespace-nowrap border border-[#E7E1DE] bg-[#F8F5F3] px-3 py-2 text-[14px] font-medium text-[#151210] transition hover:bg-[#F2EEEB]"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => onDelete(row)}
                className="inline-flex min-w-[78px] items-center justify-center whitespace-nowrap border border-[#F04444] bg-white px-3 py-2 text-[14px] font-medium text-[#F04444] transition hover:bg-[#FFF5F5]"
              >
                Delete
              </button>
            </div>
          );
        },
      },
    ],
    [onDelete, onEdit, onToggleStatus]
  );

  return (
    <Table
      columns={columns}
      rows={rows}
      rowKey={(row) => row.id}
      minWidthClassName="min-w-[1040px] lg:min-w-full"
      tableClassName="lg:table-fixed"
    />
  );
}