import { USER_STATUS_META } from "../constants/users.constants";

export function getUserStatusMeta(status) {
  return USER_STATUS_META[status] ?? {
    label: status,
    className: "bg-[#F3F0EE] text-[#6F6965]",
  };
}

export function filterUsers(users, query) {
  const search = String(query ?? "").trim().toLowerCase();

  if (!search) {
    return users;
  }

  return users.filter((user) => {
    const haystack = [user.fullName, user.email, user.addedDate, user.status]
      .join(" ")
      .toLowerCase();

    return haystack.includes(search);
  });
}

export function validateUserForm(values) {
  const errors = {};

  if (!String(values.fullName ?? "").trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!String(values.email ?? "").trim()) {
    errors.email = "Email address is required.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      errors.email = "Enter a valid email address.";
    }
  }

  if (!String(values.status ?? "").trim()) {
    errors.status = "Status is required.";
  }

  return errors;
}