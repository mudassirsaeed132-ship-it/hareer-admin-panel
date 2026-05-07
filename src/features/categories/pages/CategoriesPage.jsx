import { useEffect, useMemo, useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import PageHeader from "../../../shared/layout/PageHeader";
import EmptyState from "../../../shared/ui/EmptyState";
import Skeleton from "../../../shared/ui/Skeleton";
import TablePagination from "../../../shared/ui/TablePagination";
import AddEditCategoryModal from "../components/AddEditCategoryModal";
import CategoriesTable from "../components/CategoriesTable";
import CategoriesToolbar from "../components/CategoriesToolbar";
import { CATEGORIES_PAGE_TRANSITION } from "../constants/categories.constants";
import useCategoriesData from "../hooks/useCategoriesData";
import { filterCategories, mapCategoryToForm } from "../utils/categories.helpers";

const CATEGORIES_PAGE_SIZE = 10;

function CategoriesPageSkeleton() {
  return (
    <div className="space-y-5 xl:space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-9 w-[180px]" />
        <Skeleton className="h-5 w-[360px] max-w-full" />
      </div>

      <div className="border border-[#E7E1DE] bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Skeleton className="h-7 w-[140px]" />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Skeleton className="h-11 w-full sm:w-[280px]" />
            <Skeleton className="h-11 w-full sm:w-[160px]" />
          </div>
        </div>

        <Skeleton className="mt-4 h-[420px] w-full" />
      </div>
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
  const [currentPage, setCurrentPage] = useState(1);

  const MotionDiv = m.div;
  const MotionSection = m.section;

  const filteredRows = useMemo(() => {
    return filterCategories(categories, searchQuery, typeFilter);
  }, [categories, searchQuery, typeFilter]);

  const totalCategories = filteredRows.length;
  const totalPages = Math.max(
    1,
    Math.ceil(totalCategories / CATEGORIES_PAGE_SIZE)
  );

  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * CATEGORIES_PAGE_SIZE;
    const endIndex = startIndex + CATEGORIES_PAGE_SIZE;

    return filteredRows.slice(startIndex, endIndex);
  }, [filteredRows, currentPage]);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, typeFilter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  if (loading) {
    return <CategoriesPageSkeleton />;
  }

  if (error) {
    return <EmptyState title="Unable to load categories" description={error} />;
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full max-w-full space-y-5 overflow-hidden xl:space-y-6">
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
                className="inline-flex h-11 w-full items-center justify-center bg-[#E4B2B2] px-4 text-[14px] font-medium text-[#151210] transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#E4B2B2]/60 focus:ring-offset-2 sm:h-[46px] sm:w-auto sm:px-5 sm:text-[15px] lg:h-[52px] lg:text-[16px]"
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
          className="max-w-full overflow-hidden border border-[#E7E1DE] bg-white"
        >
          <div className="flex flex-col gap-4 border-b border-[#E7E1DE] px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
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
            rows={paginatedRows}
            startIndex={(currentPage - 1) * CATEGORIES_PAGE_SIZE}
            onEdit={openEditModal}
            onToggleStatus={toggleCategoryStatus}
            onProductLimitChange={updateCategoryProductLimit}
          />

          <TablePagination
            currentPage={currentPage}
            totalItems={totalCategories}
            pageSize={CATEGORIES_PAGE_SIZE}
            onPageChange={setCurrentPage}
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