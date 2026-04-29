import { LazyMotion, domAnimation, m } from "framer-motion";
import PageHeader from "../../../shared/layout/PageHeader";
import EmptyState from "../../../shared/ui/EmptyState";
import Skeleton from "../../../shared/ui/Skeleton";
import PaymentSummaryCards from "../components/PaymentSummaryCards";
import PaymentsTable from "../components/PaymentsTable";
import PaymentsToolbar from "../components/PaymentsToolbar";
import { PAYMENTS_PAGE_TRANSITION } from "../constants/payments.constants";
import usePaymentsData from "../hooks/usePaymentsData";

function PaymentsPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-10 w-[320px]" />
        <Skeleton className="h-5 w-[420px]" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
        <Skeleton className="h-[110px] w-full" />
        <Skeleton className="h-[110px] w-full" />
      </div>

      <Skeleton className="h-[420px] w-full" />
    </div>
  );
}

export default function PaymentsPage() {
  const {
    summary,
    rows,
    searchQuery,
    setSearchQuery,
    loading,
    error,
  } = usePaymentsData();
  const MotionDiv = m.div;
  const MotionSection = m.section;

  if (loading) {
    return <PaymentsPageSkeleton />;
  }

  if (error) {
    return <EmptyState title="Unable to load payments" description={error} />;
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="space-y-6">
        <MotionDiv
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={PAYMENTS_PAGE_TRANSITION}
        >
          <PageHeader
            title="Payments & Transactions"
            description="Here you can view payments and transactions history."
            action={
              <button
                type="button"
                className="inline-flex h-[52px] items-center justify-center bg-[#E4B2B2] px-5 text-[16px] font-medium text-[#151210] transition hover:opacity-90"
              >
                Export PDF
              </button>
            }
          />
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...PAYMENTS_PAGE_TRANSITION, delay: 0.04 }}
        >
          <PaymentSummaryCards summary={summary} />
        </MotionDiv>

        <MotionSection
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...PAYMENTS_PAGE_TRANSITION, delay: 0.08 }}
          className="border border-[#EEE8E4] bg-white"
        >
          <div className="flex flex-col gap-4 border-b border-[#EEE8E4] px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-[18px] font-semibold leading-none text-[#151210]">
              Payments List
            </h2>

            <PaymentsToolbar
              searchQuery={searchQuery}
              onSearchChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>

          <PaymentsTable rows={rows} />
        </MotionSection>
      </div>
    </LazyMotion>
  );
}
