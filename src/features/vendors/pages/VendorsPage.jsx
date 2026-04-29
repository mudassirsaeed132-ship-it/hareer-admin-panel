import { useMemo, useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import PageHeader from "../../../shared/layout/PageHeader";
import PageSection from "../../../shared/ui/PageSection";
import SearchField from "../../../shared/ui/SearchField";
import FilterSelect from "../../../shared/ui/FilterSelect";
import EmptyState from "../../../shared/ui/EmptyState";
import Skeleton from "../../../shared/ui/Skeleton";
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

function VendorsPageSkeleton() {
  return (
    <div className="space-y-5 xl:space-y-6">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-10 w-[170px]" />
        <Skeleton className="h-5 w-[280px]" />
      </div>

      <Skeleton className="h-[52px] w-full" />
      <Skeleton className="h-[420px] w-full" />
    </div>
  );
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

  if (loading) {
    return <VendorsPageSkeleton />;
  }

  if (error) {
    return <EmptyState title="Unable to load vendors" description={error} />;
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="space-y-5 xl:space-y-6">
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
        >
          <PageSection
            title={sectionTitle}
            titleClassName="text-[18px] font-semibold leading-none text-[#151210]"
            headerClassName="flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
            action={
              activeTab === "vendors" ? (
                <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row lg:items-center lg:justify-end">
                  <div className="w-full lg:w-[280px] lg:flex-none">
                    <SearchField
                      className="w-full"
                      placeholder="Search here..."
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                    />
                  </div>

                  <div className="w-full lg:w-auto lg:min-w-[112px] lg:flex-none">
                    <FilterSelect
                      options={VENDOR_STATUS_FILTER_OPTIONS}
                      value={vendorStatusFilter}
                      onChange={(event) =>
                        setVendorStatusFilter(event.target.value)
                      }
                      className="w-full lg:w-auto"
                      label="Active"
                    />
                  </div>
                </div>
              ) : activeTab === "payouts" ? (
                <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row lg:items-center lg:justify-end">
                  <div className="w-full lg:w-[280px] lg:flex-none">
                    <SearchField
                      className="w-full"
                      placeholder="Search by vendor..."
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                    />
                  </div>

                  <div className="w-full lg:w-auto lg:min-w-[126px] lg:flex-none">
                    <FilterSelect
                      options={PAYOUT_STATUS_FILTER_OPTIONS}
                      value={payoutStatusFilter}
                      onChange={(event) =>
                        setPayoutStatusFilter(event.target.value)
                      }
                      className="w-full lg:w-auto"
                      label="Pending"
                    />
                  </div>

                  <div className="w-full lg:w-auto lg:min-w-[150px] lg:flex-none">
                    <FilterSelect
                      options={PAYOUT_MONTH_FILTER_OPTIONS}
                      value={payoutMonthFilter}
                      onChange={(event) =>
                        setPayoutMonthFilter(event.target.value)
                      }
                      className="w-full lg:w-auto"
                      label="January 2026"
                    />
                  </div>
                </div>
              ) : (
                <SearchField
                  className="w-full lg:w-[280px]"
                  placeholder="Search here..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              )
            }
            className="overflow-hidden"
          >
            {activeTab === "vendors" ? (
              <VendorsTable
                rows={filteredVendors}
                onToggleStatus={toggleVendorRowStatus}
              />
            ) : null}

            {activeTab === "vendor-requests" ? (
              <VendorRequestsTable
                rows={filteredVendorRequests}
                onAccept={(row) => handleVendorRequestDecision(row, "accept")}
                onReject={(row) => handleVendorRequestDecision(row, "reject")}
              />
            ) : null}

            {activeTab === "service-requests" ? (
              <VendorServiceRequestsTable
                rows={filteredServiceRequests}
                onReject={(row) => handleRejectServiceRequest(row.id)}
                onAssign={(row) => setSelectedServiceRequest(row)}
              />
            ) : null}

            {activeTab === "payouts" ? (
              <VendorPayoutsTable
                rows={filteredPayouts}
                onOpenCommission={(row) => setSelectedPayout(row)}
                onReleasePayment={(row) => handleReleasePayout(row.id)}
              />
            ) : null}
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
