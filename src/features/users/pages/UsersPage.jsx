import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LazyMotion, domAnimation, m } from "framer-motion";
import PageHeader from "../../../shared/layout/PageHeader";
import PageSection from "../../../shared/ui/PageSection";
import EmptyState from "../../../shared/ui/EmptyState";
import Skeleton from "../../../shared/ui/Skeleton";
import UsersToolbar from "../components/UsersToolbar";
import UsersTable from "../components/UsersTable";
import UserFormModal from "../components/UserFormModal";
import useUsersData from "../hooks/useUsersData";
import useUsersFilters from "../hooks/useUsersFilters";

function UsersPageSkeleton() {
  return (
    <div className="space-y-5 xl:space-y-6">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-10 w-[140px]" />
        <Skeleton className="h-5 w-[300px] max-w-full" />
      </div>

      <div className="border border-[#E9E3DF] bg-white p-5 sm:p-6 xl:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Skeleton className="h-7 w-[120px]" />
          <Skeleton className="h-[48px] w-full lg:w-[280px]" />
        </div>

        <div className="mt-5">
          <Skeleton className="h-[360px] w-full" />
        </div>
      </div>
    </div>
  );
}

export default function UsersPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    users,
    loading,
    submitting,
    error,
    createUserRecord,
    updateUserRecord,
    deleteUserRecord,
    toggleUserRecordStatus,
  } = useUsersData();

  const { query, setQuery, filteredUsers } = useUsersFilters(users);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const MotionDiv = m.div;

  const modalMode = useMemo(
    () => (editingUser ? "edit" : "create"),
    [editingUser]
  );

  const removeModeFromUrl = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("mode");
    setSearchParams(nextParams, { replace: true });
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setIsFormModalOpen(true);
  };

  const openCreateModalFromButton = () => {
    openCreateModal();

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("mode", "add");
    setSearchParams(nextParams, { replace: true });
  };

  const openEditModal = (user) => {
    removeModeFromUrl();
    setEditingUser(user);
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    setEditingUser(null);
    removeModeFromUrl();
  };

  const handleSubmitUser = async (values) => {
    if (editingUser) {
      await updateUserRecord(editingUser.id, values);
    } else {
      await createUserRecord(values);
    }

    closeFormModal();
  };

  const handleDeleteUser = async (user) => {
    await deleteUserRecord(user.id);
  };

  useEffect(() => {
    const mode = searchParams.get("mode");

    if (mode === "add") {
      setEditingUser(null);
      setIsFormModalOpen(true);
    }
  }, [searchParams]);

  if (loading) {
    return <UsersPageSkeleton />;
  }

  if (error) {
    return (
      <EmptyState
        title="Unable to load users"
        description={error}
      />
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full max-w-full space-y-5 overflow-hidden xl:space-y-6">
        <MotionDiv
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <PageHeader
            title="Users"
            description="Here you can view and edit your users."
            action={
              <button
                type="button"
                onClick={openCreateModalFromButton}
                aria-label="Add new user"
                className="inline-flex h-11 w-full items-center justify-center bg-[#E4B2B2] px-4 text-[14px] font-medium text-[#151210] transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#E4B2B2]/60 focus:ring-offset-2 sm:h-[46px] sm:w-auto sm:px-5 sm:text-[15px] lg:h-[52px] lg:text-[16px]"
              >
                + Add new user
              </button>
            }
          />
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.04,
          }}
          className="max-w-full overflow-hidden"
        >
          <PageSection
            title="Users List"
            titleClassName="text-[18px] font-semibold leading-none text-[#151210]"
            headerClassName="flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
            action={
              <UsersToolbar
                query={query}
                onQueryChange={setQuery}
              />
            }
            className="max-w-full overflow-hidden border border-[#E7E1DE] bg-white"
          >
            <UsersTable
              rows={filteredUsers}
              onEdit={openEditModal}
              onDelete={handleDeleteUser}
              onToggleStatus={toggleUserRecordStatus}
            />
          </PageSection>
        </MotionDiv>

        <UserFormModal
          open={isFormModalOpen}
          onClose={closeFormModal}
          mode={modalMode}
          initialValues={editingUser}
          onSubmit={handleSubmitUser}
          submitting={submitting}
        />
      </div>
    </LazyMotion>
  );
}