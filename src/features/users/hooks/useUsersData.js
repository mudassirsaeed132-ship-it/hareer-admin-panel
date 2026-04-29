import { useCallback, useMemo, useState } from "react";
import {
  createUser,
  getUsersList,
  removeUser,
  updateUser,
  updateUserStatus,
} from "../api/usersApi";
import { QUERY_KEYS } from "../../../shared/constants/queryKeys";
import useAppQuery, { useQueryClient } from "../../../shared/hooks/useAppQuery";

export default function useUsersData() {
  const [submitting, setSubmitting] = useState(false);
  const client = useQueryClient();

  const queryFn = useCallback(({ signal } = {}) => getUsersList({ signal }), []);
  const query = useAppQuery(QUERY_KEYS.users.list(), queryFn);

  const users = useMemo(() => {
    return Array.isArray(query.data) ? query.data : [];
  }, [query.data]);

  const updateCache = useCallback(
    (updater) => {
      client.setQueryData(QUERY_KEYS.users.list(), (previous) => {
        const normalized = Array.isArray(previous) ? previous : [];
        return typeof updater === "function" ? updater(normalized) : updater;
      });
    },
    [client]
  );

  const createUserRecord = useCallback(async (payload) => {
    setSubmitting(true);
    try {
      const created = await createUser(payload);
      updateCache((previous) => [created, ...previous]);
      return created;
    } finally {
      setSubmitting(false);
    }
  }, [updateCache]);

  const updateUserRecord = useCallback(async (userId, payload) => {
    setSubmitting(true);
    try {
      const updated = await updateUser(userId, payload);
      updateCache((previous) =>
        previous.map((user) => (user.id === userId ? updated : user))
      );
      return updated;
    } finally {
      setSubmitting(false);
    }
  }, [updateCache]);

  const deleteUserRecord = useCallback(async (userId) => {
    setSubmitting(true);
    try {
      await removeUser(userId);
      updateCache((previous) => previous.filter((user) => user.id !== userId));
    } finally {
      setSubmitting(false);
    }
  }, [updateCache]);

  const toggleUserRecordStatus = useCallback(async (user) => {
    const nextStatus = user.status === "active" ? "deactivated" : "active";

    setSubmitting(true);
    try {
      const updated = await updateUserStatus(user.id, nextStatus);
      updateCache((previous) =>
        previous.map((item) => (item.id === user.id ? updated : item))
      );
      return updated;
    } finally {
      setSubmitting(false);
    }
  }, [updateCache]);

  return {
    users,
    loading: query.loading,
    submitting,
    error: query.error,
    refetch: query.refetch,
    createUserRecord,
    updateUserRecord,
    deleteUserRecord,
    toggleUserRecordStatus,
  };
}
