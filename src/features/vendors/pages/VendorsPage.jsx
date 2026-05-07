import { useEffect, useMemo, useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import PageHeader from "../../../shared/layout/PageHeader";
import PageSection from "../../../shared/ui/PageSection";
import SearchField from "../../../shared/ui/SearchField";
import FilterSelect from "../../../shared/ui/FilterSelect";
import EmptyState from "../../../shared/ui/EmptyState";
import Skeleton from "../../../shared/ui/Skeleton";
import TablePagination from "../../../shared/ui/TablePagination";
import VendorsTabs from "../components/VendorsTabs";
import VendorsTable from "../components/VendorsTable";
import VendorRequestsTable from "../components/VendorRequestsTable";
import VendorServiceRequestsTable from "../components/VendorServiceRequestsTable";
import VendorPayoutsTable from "../components/VendorPayoutsTable";
import AssignDeliveryAgentModal from "../components/AssignDeliveryAgentModal";
import CommissionSettingsModal from "../components/CommissionSettingsModal";
import useVendorsData from "../hooks/useVendorsData";
import useVendorTabs from "../hooks/useVendorTabs";
import {
  PAYOUT_MONTH_FILTER_OPTIONS,
  PAYOUT_STATUS_FILTER_OPTIONS,
  VENDORS_SECTION_TRANSITION,
  VENDOR_STATUS_FILTER_OPTIONS,
} from "../constants/vendors.constants";
import { VENDORS_OVERVIEW_TABS } from "../constants/vendorTabs.constants";
import {
  filterPayouts,
  filterServiceRequests,
  filterVendorRequests,
  filterVendors,
} from "../utils/vendors.helpers";

const VENDORS_PAGE_SIZE = 10;

function VendorsPageSkeleton() {
  return (
    <div className="space-y-5 xl:space-y-6">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-10 w-[170px]" />
        <Skeleton className="h-5 w-[280px] max-w-full" />
      </div>

      <Skeleton className="h-[52px] w-full" />
      <Skeleton className="h-[420px] w-full" />
    </div>
  );
}

function paginateRows(rows = [], currentPage = 1) {
  const startIndex = (currentPage - 1) * VENDORS_PAGE_SIZE;
  return rows.slice(startIndex, startIndex + VENDORS_PAGE_SIZE);
}

export default function VendorsPage() {
  const {
    overview,
    loading,
    submitting,
    error,
    toggleVendorRowStatus,
    handleVendorRequestDecision,
    handleAssignServiceRequest,
    handleRejectServiceRequest,
    handleSaveCommissionSettings,
    handleReleasePayout,
  } = useVendorsData();

  const { activeTab, setActiveTab } = useVendorTabs("vendors");

  const [searchQuery, setSearchQuery] = useState("");
  const [vendorStatusFilter, setVendorStatusFilter] = useState("active");
  const [payoutStatusFilter, setPayoutStatusFilter] = useState("pending");
  const [payoutMonthFilter, setPayoutMonthFilter] = useState("January 2026");
  const [selectedServiceRequest, setSelectedServiceRequest] = useState(null);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const MotionDiv = m.div;

  const filteredVendors = useMemo(() => {
    return filterVendors(overview.vendors, searchQuery, vendorStatusFilter);
  }, [overview.vendors, searchQuery, vendorStatusFilter]);

  const filteredVendorRequests = useMemo(() => {
    return filterVendorRequests(overview.vendorRequests, searchQuery);
  }, [overview.vendorRequests, searchQuery]);

  const filteredServiceRequests = useMemo(() => {
    return filterServiceRequests(overview.serviceRequests, searchQuery);
  }, [overview.serviceRequests, searchQuery]);

  const filteredPayouts = useMemo(() => {
    return filterPayouts(
      overview.payouts,
      searchQuery,
      payoutStatusFilter,
      payoutMonthFilter
    );
  }, [overview.payouts, searchQuery, payoutStatusFilter, payoutMonthFilter]);

  const sectionTitle = useMemo(() => {
    if (activeTab === "vendors") return "Vendors";
    if (activeTab === "vendor-requests") return "Vendor Requests";
    if (activeTab === "service-requests") return "Service Requests";
    return "Payouts";
  }, [activeTab]);

  const activeRows = useMemo(() => {
    if (activeTab === "vendors") return filteredVendors;
    if (activeTab === "vendor-requests") return filteredVendorRequests;
    if (activeTab === "service-requests") return filteredServiceRequests;
    return filteredPayouts;
  }, [
    activeTab,
    filteredVendors,
    filteredVendorRequests,
    filteredServiceRequests,
    filteredPayouts,
  ]);

  const totalItems = activeRows.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / VENDORS_PAGE_SIZE));
  const pageStartIndex = (currentPage - 1) * VENDORS_PAGE_SIZE;
  const paginatedRows = paginateRows(activeRows, currentPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    activeTab,
    searchQuery,
    vendorStatusFilter,
    payoutStatusFilter,
    payoutMonthFilter,
  ]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  if (loading) {
    return <VendorsPageSkeleton />;
  }

  if (error) {
    return <EmptyState title="Unable to load vendors" description={error} />;
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full max-w-full space-y-5 overflow-hidden xl:space-y-6">
        <MotionDiv
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={VENDORS_SECTION_TRANSITION}
        >
          <PageHeader
            title="Vendors"
            description="Here you can view vendors requests."
            action={
              <button
                type="button"
                className="inline-flex h-11 w-full items-center justify-center bg-[#E4B2B2] px-4 text-[14px] font-medium text-[#151210] transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#E4B2B2]/60 focus:ring-offset-2 sm:h-[46px] sm:w-auto sm:px-5 sm:text-[15px] lg:h-[52px] lg:text-[16px]"
              >
                Export PDF
              </button>
            }
          />
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...VENDORS_SECTION_TRANSITION, delay: 0.04 }}
        >
          <VendorsTabs
            items={VENDORS_OVERVIEW_TABS}
            activeValue={activeTab}
            onChange={(value) => {
              setActiveTab(value);
              setSearchQuery("");
            }}
          />
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...VENDORS_SECTION_TRANSITION, delay: 0.08 }}
          className="max-w-full overflow-hidden"
        >
          <PageSection
            title={sectionTitle}
            titleClassName="text-[18px] font-semibold leading-none text-[#151210]"
            headerClassName="flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
            action={
              activeTab === "vendors" ? (
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto lg:justify-end">
                  <SearchField
                    className="h-11 w-full sm:w-[280px] lg:w-[320px]"
                    placeholder="Search here..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />

                  <FilterSelect
                    options={VENDOR_STATUS_FILTER_OPTIONS}
                    value={vendorStatusFilter}
                    onChange={(event) =>
                      setVendorStatusFilter(event.target.value)
                    }
                    className="h-11 w-full sm:w-[160px]"
                    label="Active"
                  />
                </div>
              ) : activeTab === "payouts" ? (
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto lg:justify-end">
                  <SearchField
                    className="h-11 w-full sm:w-[260px] lg:w-[300px]"
                    placeholder="Search by vendor..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />

                  <FilterSelect
                    options={PAYOUT_STATUS_FILTER_OPTIONS}
                    value={payoutStatusFilter}
                    onChange={(event) =>
                      setPayoutStatusFilter(event.target.value)
                    }
                    className="h-11 w-full sm:w-[160px]"
                    label="Pending"
                  />

                  <FilterSelect
                    options={PAYOUT_MONTH_FILTER_OPTIONS}
                    value={payoutMonthFilter}
                    onChange={(event) =>
                      setPayoutMonthFilter(event.target.value)
                    }
                    className="h-11 w-full sm:w-[170px]"
                    label="January 2026"
                  />
                </div>
              ) : (
                <SearchField
                  className="h-11 w-full lg:w-[300px]"
                  placeholder="Search here..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              )
            }
            className="max-w-full overflow-hidden border border-[#E7E1DE] bg-white"
          >
            {activeTab === "vendors" ? (
              <VendorsTable
                rows={paginatedRows}
                startIndex={pageStartIndex}
                onToggleStatus={toggleVendorRowStatus}
              />
            ) : null}

            {activeTab === "vendor-requests" ? (
              <VendorRequestsTable
                rows={paginatedRows}
                startIndex={pageStartIndex}
                onAccept={(row) => handleVendorRequestDecision(row, "accept")}
                onReject={(row) => handleVendorRequestDecision(row, "reject")}
              />
            ) : null}

            {activeTab === "service-requests" ? (
              <VendorServiceRequestsTable
                rows={paginatedRows}
                startIndex={pageStartIndex}
                onReject={(row) => handleRejectServiceRequest(row.id)}
                onAssign={(row) => setSelectedServiceRequest(row)}
              />
            ) : null}

            {activeTab === "payouts" ? (
              <VendorPayoutsTable
                rows={paginatedRows}
                startIndex={pageStartIndex}
                onOpenCommission={(row) => setSelectedPayout(row)}
                onReleasePayment={(row) => handleReleasePayout(row.id)}
              />
            ) : null}

            <TablePagination
              currentPage={currentPage}
              totalItems={totalItems}
              pageSize={VENDORS_PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </PageSection>
        </MotionDiv>

        <AssignDeliveryAgentModal
          open={Boolean(selectedServiceRequest)}
          onClose={() => setSelectedServiceRequest(null)}
          request={selectedServiceRequest}
          submitting={submitting}
          onSubmit={async (payload) => {
            await handleAssignServiceRequest(selectedServiceRequest.id, payload);
            setSelectedServiceRequest(null);
          }}
        />

        <CommissionSettingsModal
          open={Boolean(selectedPayout)}
          onClose={() => setSelectedPayout(null)}
          payout={selectedPayout}
          submitting={submitting}
          onSubmit={async (payload) => {
            await handleSaveCommissionSettings(selectedPayout.id, payload);
            setSelectedPayout(null);
          }}
        />
      </div>
    </LazyMotion>
  );
}