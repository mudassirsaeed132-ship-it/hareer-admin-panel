import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import PageHeader from "../../../shared/layout/PageHeader";
import FilterSelect from "../../../shared/ui/FilterSelect";
import Skeleton from "../../../shared/ui/Skeleton";
import EmptyState from "../../../shared/ui/EmptyState";
import usePrefersReducedMotion from "../../../shared/hooks/usePrefersReducedMotion";
import useDashboardData from "../hooks/useDashboardData";
import DashboardDateRangeModal from "../components/DashboardDateRangeModal";
import DashboardMetrics from "../components/DashboardMetrics";
import OrdersOverviewChart from "../components/OrdersOverviewChart";
import PaymentsOverviewChart from "../components/PaymentsOverviewChart";
import TopSellingStoresTable from "../components/TopSellingStoresTable";
import CommissionCalculatorButton from "../components/CommissionCalculatorButton";
import {
  DEFAULT_DASHBOARD_DATE_RANGE,
  DASHBOARD_SECTION_TRANSITION,
  DASHBOARD_STAGGER_TRANSITION,
} from "../constants/dashboard.constants";

function DashboardPageSkeleton() {
  return (
    <div className="space-y-5 xl:space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <Skeleton className="h-10 w-[240px] rounded-[12px] sm:h-12 sm:w-[300px]" />
        <Skeleton className="h-[48px] w-[220px] rounded-[16px]" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="border border-[#E9E3DF] bg-white px-5 py-5 sm:px-6 sm:py-6"
          >
            <Skeleton className="h-7 w-7 rounded-full" />
            <Skeleton className="mt-8 h-7 w-[120px] rounded-[8px]" />
            <Skeleton className="mt-3 h-4 w-[110px] rounded-[8px]" />
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.45fr_1fr]">
        <Skeleton className="h-[360px] rounded-[2px]" />
        <Skeleton className="h-[360px] rounded-[2px]" />
      </div>

      <Skeleton className="h-[320px] rounded-[2px]" />
    </div>
  );
}

export default function DashboardPage() {
  const shouldReduceMotion = usePrefersReducedMotion();
  const [dateRange, setDateRange] = useState(DEFAULT_DASHBOARD_DATE_RANGE);
  const [isDateRangeModalOpen, setIsDateRangeModalOpen] = useState(false);
  const { data, loading, error, refetch } = useDashboardData(dateRange);
  const MotionDiv = m.div;

  if (loading) {
    return <DashboardPageSkeleton />;
  }

  if (error || !data) {
    return (
      <EmptyState
        title="Unable to load dashboard"
        description={error || "Dashboard data is currently unavailable."}
        action={
          <button
            type="button"
            onClick={refetch}
            className="inline-flex h-[48px] items-center justify-center bg-[#E3B2B2] px-5 text-[15px] font-medium text-[#1F1B1A] transition hover:opacity-90"
          >
            Try again
          </button>
        }
      />
    );
  }

  const sectionMotion = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: DASHBOARD_SECTION_TRANSITION,
      };

  const staggerMotion = shouldReduceMotion
    ? {}
    : {
        initial: "hidden",
        animate: "show",
        variants: {
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.05,
              ...DASHBOARD_STAGGER_TRANSITION,
            },
          },
        },
      };

  const itemMotion = shouldReduceMotion
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 14 },
          show: { opacity: 1, y: 0 },
        },
      };

  return (
    <LazyMotion features={domAnimation}>
      <div className="space-y-5 xl:space-y-6">
        <MotionDiv {...sectionMotion}>
          <PageHeader
            title={`Welcome ${data.greetingName}!`}
            action={
              <FilterSelect
                icon={CalendarDays}
                label={data.dateRangeLabel}
                onClick={() => setIsDateRangeModalOpen(true)}
                ariaLabel={`Select dashboard date range. Current range: ${data.dateRangeLabel}`}
                ariaHaspopup="dialog"
                ariaExpanded={isDateRangeModalOpen}
                showChevron={false}
                className="rounded-[16px] border-transparent px-4 sm:min-w-[220px]"
              />
            }
          />
        </MotionDiv>

        <MotionDiv {...staggerMotion}>
          <MotionDiv {...itemMotion}>
            <DashboardMetrics items={data.metrics} />
          </MotionDiv>
        </MotionDiv>

        <div className="grid gap-5 xl:grid-cols-[1.45fr_1fr]">
          <MotionDiv {...sectionMotion}>
            <OrdersOverviewChart overview={data.ordersOverview} />
          </MotionDiv>

          <MotionDiv {...sectionMotion}>
            <PaymentsOverviewChart overview={data.paymentsOverview} />
          </MotionDiv>
        </div>

        <MotionDiv {...sectionMotion}>
          <TopSellingStoresTable rows={data.topSellingStores} />
        </MotionDiv>

        <DashboardDateRangeModal
          open={isDateRangeModalOpen}
          dateRange={dateRange}
          onClose={() => setIsDateRangeModalOpen(false)}
          onApply={(nextDateRange) => {
            setDateRange(nextDateRange);
            setIsDateRangeModalOpen(false);
          }}
        />

        <CommissionCalculatorButton />
      </div>
    </LazyMotion>
  );
}