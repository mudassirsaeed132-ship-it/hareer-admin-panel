import { useMemo, useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import PageHeader from "../../../shared/layout/PageHeader";
import EmptyState from "../../../shared/ui/EmptyState";
import Skeleton from "../../../shared/ui/Skeleton";
import AddEditCategoryModal from "../components/AddEditCategoryModal";
import CategoriesTable from "../components/CategoriesTable";
import CategoriesToolbar from "../components/CategoriesToolbar";
import { CATEGORIES_PAGE_TRANSITION } from "../constants/categories.constants";
import useCategoriesData from "../hooks/useCategoriesData";
import { filterCategories, mapCategoryToForm } from "../utils/categories.helpers";

function CategoriesPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-9 w-[180px]" />
        <Skeleton className="h-5 w-[360px]" />
      </div>
      <Skeleton className="h-[460px] w-full" />
    </div>
  );
}

export default function CategoriesPage() {
  const {
    categories,
    loading,
    error,
    submitting,
    saveCategory,
    toggleCategoryStatus,
    updateCategoryProductLimit,
    defaultForm,
  } = useCategoriesData();

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("shopping");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const MotionDiv = m.div;
  const MotionSection = m.section;

  const filteredRows = useMemo(() => {
    return filterCategories(categories, searchQuery, typeFilter);
  }, [categories, searchQuery, typeFilter]);

  const openCreateModal = () => {
    setEditingCategory({
      ...defaultForm,
      categoryType: typeFilter || "shopping",
    });
    setModalOpen(true);
  };

  const openEditModal = (row) => {
    setEditingCategory(mapCategoryToForm(row));
    setModalOpen(true);
  };

  if (loading) {
    return <CategoriesPageSkeleton />;
  }

  if (error) {
    return <EmptyState title="Unable to load categories" description={error} />;
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="space-y-6">
        <MotionDiv
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={CATEGORIES_PAGE_TRANSITION}
        >
          <PageHeader
            title="Categories"
            description="Here you can add, edit or view the categories"
            action={
              <button
                type="button"
                onClick={openCreateModal}
                className="inline-flex h-[52px] items-center justify-center bg-[#E4B2B2] px-5 text-[16px] font-medium text-[#151210] transition hover:opacity-90"
              >
                + Add new category
              </button>
            }
          />
        </MotionDiv>

        <MotionSection
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...CATEGORIES_PAGE_TRANSITION, delay: 0.04 }}
          className="border border-[#EEE8E4] bg-white"
        >
          <div className="flex flex-col gap-4 border-b border-[#EEE8E4] px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-[18px] font-semibold leading-none text-[#151210]">
              Categories
            </h2>

            <CategoriesToolbar
              searchQuery={searchQuery}
              onSearchChange={(event) => setSearchQuery(event.target.value)}
              typeFilter={typeFilter}
              onTypeFilterChange={(event) => setTypeFilter(event.target.value)}
            />
          </div>

          <CategoriesTable
            rows={filteredRows}
            onEdit={openEditModal}
            onToggleStatus={toggleCategoryStatus}
            onProductLimitChange={updateCategoryProductLimit}
          />
        </MotionSection>

        <AddEditCategoryModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingCategory(null);
          }}
          initialValues={editingCategory}
          submitting={submitting}
          onSubmit={async (payload) => {
            await saveCategory(payload);
            setModalOpen(false);
            setEditingCategory(null);
          }}
        />
      </div>
    </LazyMotion>
  );
}
