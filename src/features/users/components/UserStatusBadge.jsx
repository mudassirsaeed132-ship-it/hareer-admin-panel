import { getUserStatusMeta } from "../utils/users.helpers";

export default function UserStatusBadge({ status }) {
  const meta = getUserStatusMeta(status);

  return (
    <span
      className={`inline-flex min-w-[106px] items-center justify-center whitespace-nowrap px-3 py-2 text-[14px] font-medium leading-none ${meta.className}`}
    >
      {meta.label}
    </span>
  );
}