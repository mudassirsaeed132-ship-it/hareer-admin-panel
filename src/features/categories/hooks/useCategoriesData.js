import { useCallback, useMemo, useState } from "react";
import {
  createCategory,
  getCategories,
  updateCategory,
  updateCategoryProductLimit,
  updateCategoryStatus,
} from "../api/categoriesApi";
import { DEFAULT_CATEGORY_FORM } from "../constants/categories.constants";
import { getNextCategoryStatus } from "../utils/categories.helpers";
import { QUERY_KEYS } from "../../../shared/constants/queryKeys";
import useAppQuery, { useQueryClient } from "../../../shared/hooks/useAppQuery";

export default function useCategoriesData() {
  const [submitting, setSubmitting] = useState(false);

  const client = useQueryClient();

  const queryFn = useCallback(({ signal } = {}) => getCategories({ signal }), []);
  const query = useAppQuery(QUERY_KEYS.categories.list(), queryFn);

  const categories = useMemo(() => {
    return Array.isArray(query.data) ? query.data : [];
  }, [query.data]);

  const updateCache = useCallback(
    (updater) => {
      client.setQueryData(QUERY_KEYS.categories.list(), (previous) => {
        const normalized = Array.isArray(previous) ? previous : [];
        return typeof updater === "function" ? updater(normalized) : updater;
      });
    },
    [client]
  );

  const saveCategory = useCallback(async (payload) => {
    setSubmitting(true);

    try {
      if (payload.id) {
        const updated = await updateCategory(payload.id, payload);

        updateCache((previous) =>
          previous.map((item) => (item.id === updated.id ? updated : item))
        );

        return updated;
      }

      const created = await createCategory(payload);
      updateCache((previous) => [created, ...previous]);

      return created;
    } finally {
      setSubmitting(false);
    }
  }, [updateCache]);

  const toggleCategoryStatus = useCallback(async (categoryId) => {
    const current = categories.find((item) => item.id === categoryId);

    if (!current) return;

    const nextStatus = getNextCategoryStatus(current.status);

    setSubmitting(true);
    try {
      const updated = await updateCategoryStatus(categoryId, nextStatus);

      updateCache((previous) =>
        previous.map((item) => (item.id === categoryId ? updated : item))
      );
    } finally {
      setSubmitting(false);
    }
  }, [categories, updateCache]);

  const updateCategoryProductLimitForRow = useCallback(async (categoryId, productLimit) => {
    setSubmitting(true);
    try {
      const updated = await updateCategoryProductLimit(categoryId, productLimit);

      updateCache((previous) =>
        previous.map((item) => (item.id === categoryId ? updated : item))
      );
    } finally {
      setSubmitting(false);
    }
  }, [updateCache]);

  return {
    categories,
    loading: query.loading,
    error: query.error,
    submitting,
    saveCategory,
    toggleCategoryStatus,
    updateCategoryProductLimit: updateCategoryProductLimitForRow,
    defaultForm: DEFAULT_CATEGORY_FORM,
    refetch: query.refetch,
  };
}
