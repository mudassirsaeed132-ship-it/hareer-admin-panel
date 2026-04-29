import { useMemo, useState } from "react";
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
        <Skeleton className="h-5 w-[300px]" />
      </div>

      <div className="border border-[#E9E3DF] bg-white p-5 sm:p-6 xl:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Skeleton className="h-7 w-[120px]" />
          <Skeleton className="h-[48px] w-[280px]" />
        </div>

        <div className="mt-5">
          <Skeleton className="h-[360px] w-full" />
        </div>
      </div>
    </div>
  );
}

export default function UsersPage() {
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

  const openCreateModal = () => {
    setEditingUser(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    setEditingUser(null);
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
      <div className="space-y-5 xl:space-y-6">
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
                onClick={openCreateModal}
                className="inline-flex h-[52px] items-center justify-center bg-[#E4B2B2] px-5 text-[16px] font-medium text-[#151210] transition hover:opacity-90"
              >
                + Add new user
              </button>
            }
          />
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
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
            className="overflow-hidden"
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
