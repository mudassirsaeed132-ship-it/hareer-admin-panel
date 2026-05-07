import TableCellPill from "../../../shared/ui/TableCellPill";

export default function CategoryStatusBadge({ status }) {
  const isActive = status === "active";

  return (
    <TableCellPill
      size="lg"
      className={
        isActive
          ? "bg-[#EDF8EF] text-[#22A447]"
          : "bg-[#FFF0F0] text-[#F04444]"
      }
    >
      {isActive ? "Active" : "Deactivated"}
    </TableCellPill>
  );
}