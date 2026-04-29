export default function CategoryStatusBadge({ status }) {
  const isActive = status === "active";

  return (
    <span
      className={`inline-flex h-[36px] min-w-[96px] items-center justify-center px-3 text-[14px] font-medium leading-none ${
        isActive
          ? "bg-[#EDF8EF] text-[#22A447]"
          : "bg-[#FFF0F0] text-[#F04444]"
      }`}
    >
      {isActive ? "Active" : "Deactivated"}
    </span>
  );
}