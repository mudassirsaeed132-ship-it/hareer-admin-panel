const STATUS_META = {
  pending: {
    label: "Pending",
    className: "bg-[#FDEAEA] text-[#F04444]",
  },
  paid: {
    label: "Paid",
    className: "bg-[#E7F5EC] text-[#2FB065]",
  },
};

export default function PaymentStatusBadge({ status }) {
  const normalizedStatus = String(status ?? "").trim().toLowerCase();
  const meta = STATUS_META[normalizedStatus] ?? {
    label: status || "Unknown",
    className: "bg-[#F3F0EE] text-[#6F6965]",
  };

  return (
    <span
      className={`inline-flex min-w-[74px] items-center justify-center whitespace-nowrap px-3 py-2 text-[14px] font-medium leading-none ${meta.className}`}
    >
      {meta.label}
    </span>
  );
}
