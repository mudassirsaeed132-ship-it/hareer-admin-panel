import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LazyMotion, domAnimation, m } from "framer-motion";
import PageHeader from "../../../shared/layout/PageHeader";
import PageSection from "../../../shared/ui/PageSection";
import EmptyState from "../../../shared/ui/EmptyState";
import Skeleton from "../../../shared/ui/Skeleton";
import TablePagination from "../../../shared/ui/TablePagination";
import OrdersToolbar from "../components/OrdersToolbar";
import OrdersTable from "../components/OrdersTable";
import OrderDetailsDrawer from "../components/OrderDetailsDrawer";
import useOrdersData from "../hooks/useOrdersData";
import useOrdersFilters from "../hooks/useOrdersFilters";
import { ORDERS_PAGE_ACTION_LABEL } from "../constants/orders.constants";

const ORDERS_PAGE_SIZE = 10;

function OrdersPageSkeleton() {
  return (
    <div className="space-y-4 xl:space-y-5">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-9 w-[140px]" />
        <Skeleton className="h-5 w-[300px] max-w-full" />
      </div>

      <div className="border border-[#E7E1DE] bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Skeleton className="h-7 w-[120px]" />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Skeleton className="h-[44px] w-full sm:w-[280px]" />
            <Skeleton className="h-[44px] w-full sm:w-[150px]" />
          </div>
        </div>

        <div className="mt-4">
          <Skeleton className="h-[420px] w-full" />
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    orders,
    loading,
    error,
    isDrawerOpen,
    selectedOrderDetail,
    detailLoading,
    detailError,
    openOrderDetails,
    closeOrderDetails,
    confirmSelectedOrder,
  } = useOrdersData();

  const MotionDiv = m.div;

  const { query, setQuery, status, setStatus, filteredOrders } =
    useOrdersFilters(orders);

  const totalOrders = filteredOrders.length;
  const totalPages = Math.max(1, Math.ceil(totalOrders / ORDERS_PAGE_SIZE));

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ORDERS_PAGE_SIZE;
    const endIndex = startIndex + ORDERS_PAGE_SIZE;

    return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, currentPage]);

  const handleAddNewUser = () => {
    navigate("/users?mode=add");
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [query, status]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  if (loading) {
    return <OrdersPageSkeleton />;
  }

  if (error) {
    return <EmptyState title="Unable to load orders" description={error} />;
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full max-w-full space-y-4 overflow-hidden xl:space-y-5">
        <MotionDiv
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <PageHeader
            title="Orders"
            description="Here you can view your vendors orders."
            action={
              <button
                type="button"
                onClick={handleAddNewUser}
                aria-label="Add new user"
                className="inline-flex h-11 w-full items-center justify-center bg-[#E4B2B2] px-4 text-[14px] font-medium text-[#151210] transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#E4B2B2]/60 focus:ring-offset-2 sm:h-[46px] sm:w-auto sm:px-5 sm:text-[15px] lg:h-[52px] lg:text-[16px]"
              >
                {ORDERS_PAGE_ACTION_LABEL}
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
            title="Orders List"
            titleClassName="text-[18px] font-semibold leading-none text-[#151210]"
            headerClassName="flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
            action={
              <OrdersToolbar
                query={query}
                onQueryChange={setQuery}
                status={status}
                onStatusChange={setStatus}
              />
            }
            className="max-w-full overflow-hidden border border-[#E7E1DE] bg-white"
          >
            <OrdersTable rows={paginatedOrders} onView={openOrderDetails} />

            <TablePagination
              currentPage={currentPage}
              totalItems={totalOrders}
              pageSize={ORDERS_PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </PageSection>
        </MotionDiv>

        <OrderDetailsDrawer
          open={isDrawerOpen}
          onClose={closeOrderDetails}
          detail={selectedOrderDetail}
          loading={detailLoading}
          error={detailError}
          onConfirm={confirmSelectedOrder}
        />
      </div>
    </LazyMotion>
  );
}