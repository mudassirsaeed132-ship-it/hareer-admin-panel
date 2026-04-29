import { useMemo, useState } from "react";
import { filterUsers } from "../utils/users.helpers";

export default function useUsersFilters(users = []) {
  const [query, setQuery] = useState("");

  const filteredUsers = useMemo(() => {
    return filterUsers(users, query);
  }, [users, query]);

  return {
    query,
    setQuery,
    filteredUsers,
  };
}