import { LazyMotion, domAnimation, m } from "framer-motion";
import PageHeader from "../../../shared/layout/PageHeader";
import PageSection from "../../../shared/ui/PageSection";
import EmptyState from "../../../shared/ui/EmptyState";
import Skeleton from "../../../shared/ui/Skeleton";
import OrdersToolbar from "../components/OrdersToolbar";
import OrdersTable from "../components/OrdersTable";
import OrderDetailsDrawer from "../components/OrderDetailsDrawer";
import useOrdersData from "../hooks/useOrdersData";
import useOrdersFilters from "../hooks/useOrdersFilters";
import { ORDERS_PAGE_ACTION_LABEL } from "../constants/orders.constants";

function OrdersPageSkeleton() {
  return (
    <div className="space-y-5 xl:space-y-6">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-10 w-[140px]" />
        <Skeleton className="h-5 w-[300px]" />
      </div>

      <div className="border border-[#E9E3DF] bg-white p-5 sm:p-6 xl:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Skeleton className="h-7 w-[120px]" />
          <div className="flex flex-col gap-3 lg:flex-row">
            <Skeleton className="h-[48px] w-[280px]" />
            <Skeleton className="h-[48px] w-[140px]" />
          </div>
        </div>

        <div className="mt-5">
          <Skeleton className="h-[440px] w-full" />
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
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

  const {
    query,
    setQuery,
    status,
    setStatus,
    filteredOrders,
  } = useOrdersFilters(orders);

  if (loading) {
    return <OrdersPageSkeleton />;
  }

  if (error) {
    return (
      <EmptyState
        title="Unable to load orders"
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
            title="Orders"
            description="Here you can view your vendors orders."
            action={
              <button
                type="button"
                className="inline-flex h-[52px] items-center justify-center bg-[#E4B2B2] px-5 text-[16px] font-medium text-[#151210] transition hover:opacity-90"
              >
                {ORDERS_PAGE_ACTION_LABEL}
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
            className="overflow-hidden"
          >
            <OrdersTable rows={filteredOrders} onView={openOrderDetails} />
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
