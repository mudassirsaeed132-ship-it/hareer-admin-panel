import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LazyMotion, domAnimation, m } from "framer-motion";
import SearchField from "../../../shared/ui/SearchField";
import FilterSelect from "../../../shared/ui/FilterSelect";
import PageSection from "../../../shared/ui/PageSection";
import EmptyState from "../../../shared/ui/EmptyState";
import Skeleton from "../../../shared/ui/Skeleton";
import TablePagination from "../../../shared/ui/TablePagination";
import InlineFeedback from "../../../shared/ui/InlineFeedback";
import VendorsTabs from "../components/VendorsTabs";
import VendorProfileShell from "../components/VendorProfileShell";
import VendorMetricsCards from "../components/VendorMetricsCards";
import VendorOrdersTable from "../components/VendorOrdersTable";
import VendorServiceRequestsTable from "../components/VendorServiceRequestsTable";
import VendorProductsTable from "../components/VendorProductsTable";
import AssignDeliveryAgentModal from "../components/AssignDeliveryAgentModal";
import useVendorDetailsData from "../hooks/useVendorDetailsData";
import useVendorTabs from "../hooks/useVendorTabs";
import {
  ORDER_STATUS_FILTER_OPTIONS,
  VENDORS_SECTION_TRANSITION,
} from "../constants/vendors.constants";
import { VENDOR_DETAILS_TABS } from "../constants/vendorTabs.constants";
import {
  filterServiceRequests,
  filterVendorOrders,
  filterVendorProducts,
} from "../utils/vendors.helpers";

const VENDOR_DETAILS_PAGE_SIZE = 10;

function VendorDetailSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-[40px] w-[160px]" />
      <Skeleton className="h-[180px] w-full" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-[120px] w-full" />
        ))}
      </div>

      <Skeleton className="h-[52px] w-full" />
      <Skeleton className="h-[360px] w-full" />
    </div>
  );
}

function paginateRows(rows = [], currentPage = 1) {
  const startIndex = (currentPage - 1) * VENDOR_DETAILS_PAGE_SIZE;
  return rows.slice(startIndex, startIndex + VENDOR_DETAILS_PAGE_SIZE);
}

export default function VendorDetailsPage() {
  const navigate = useNavigate();
  const { vendorId } = useParams();
  const MotionDiv = m.div;

  const {
    detail,
    loading,
    submitting,
    error,
    toggleVendorStatusForDetail,
    assignServiceRequest,
    rejectServiceRequest,
  } = useVendorDetailsData(vendorId);

  const { activeTab, setActiveTab } = useVendorTabs("orders");

  const [ordersQuery, setOrdersQuery] = useState("");
  const [ordersStatus, setOrdersStatus] = useState("accepted");
  const [serviceQuery, setServiceQuery] = useState("");
  const [productsQuery, setProductsQuery] = useState("");
  const [selectedServiceRequest, setSelectedServiceRequest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [feedback, setFeedback] = useState(null);

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
  };

  const filteredOrders = useMemo(() => {
    return filterVendorOrders(detail?.orders ?? [], ordersQuery, ordersStatus);
  }, [detail?.orders, ordersQuery, ordersStatus]);

  const filteredServiceRequests = useMemo(() => {
    return filterServiceRequests(detail?.serviceRequests ?? [], serviceQuery);
  }, [detail?.serviceRequests, serviceQuery]);

  const filteredProducts = useMemo(() => {
    return filterVendorProducts(detail?.products ?? [], productsQuery);
  }, [detail?.products, productsQuery]);

  const activeRows = useMemo(() => {
    if (activeTab === "orders") return filteredOrders;
    if (activeTab === "service-requests") return filteredServiceRequests;
    return filteredProducts;
  }, [activeTab, filteredOrders, filteredServiceRequests, filteredProducts]);

  const totalItems = activeRows.length;
  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / VENDOR_DETAILS_PAGE_SIZE)
  );
  const pageStartIndex = (currentPage - 1) * VENDOR_DETAILS_PAGE_SIZE;
  const paginatedRows = paginateRows(activeRows, currentPage);

  const handleToggleVendorStatus = async () => {
    const nextLabel = detail?.status === "active" ? "deactivated" : "activated";

    try {
      await toggleVendorStatusForDetail();
      showFeedback("success", `${detail.businessName} has been ${nextLabel}.`);
    } catch {
      showFeedback(
        "error",
        `Unable to update ${detail.businessName}. Please try again.`
      );
    }
  };

  const handleContactVendor = () => {
    if (detail?.owner?.email) {
      window.location.href = `mailto:${detail.owner.email}`;
      return;
    }

    showFeedback("error", "Vendor contact email is not available.");
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, ordersQuery, ordersStatus, serviceQuery, productsQuery]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  if (loading) {
    return <VendorDetailSkeleton />;
  }

  if (error || !detail) {
    return (
      <EmptyState
        title="Unable to load vendor detail"
        description={error || "Vendor detail is currently unavailable."}
      />
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="w-full max-w-full space-y-5 overflow-hidden xl:space-y-6">
        <MotionDiv
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={VENDORS_SECTION_TRANSITION}
        >
          <VendorProfileShell
            detail={detail}
            onBack={() => navigate("/vendors")}
            onToggleStatus={handleToggleVendorStatus}
            onContactVendor={handleContactVendor}
          />
        </MotionDiv>

        {feedback ? (
          <InlineFeedback
            type={feedback.type}
            message={feedback.message}
            onClose={() => setFeedback(null)}
          />
        ) : null}

        <MotionDiv
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...VENDORS_SECTION_TRANSITION, delay: 0.04 }}
        >
          <VendorMetricsCards metrics={detail.metrics} />
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...VENDORS_SECTION_TRANSITION, delay: 0.08 }}
        >
          <VendorsTabs
            items={VENDOR_DETAILS_TABS}
            activeValue={activeTab}
            onChange={setActiveTab}
          />
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...VENDORS_SECTION_TRANSITION, delay: 0.12 }}
          className="max-w-full overflow-hidden"
        >
          {activeTab === "orders" ? (
            <PageSection
              title="Orders List"
              titleClassName="text-[18px] font-semibold leading-none text-[#151210]"
              headerClassName="flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
              action={
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto lg:justify-end">
                  <SearchField
                    className="h-11 w-full sm:w-[280px] lg:w-[320px]"
                    placeholder="Search here..."
                    value={ordersQuery}
                    onChange={(event) => setOrdersQuery(event.target.value)}
                  />

                  <FilterSelect
                    options={ORDER_STATUS_FILTER_OPTIONS}
                    value={ordersStatus}
                    onChange={(event) => setOrdersStatus(event.target.value)}
                    className="h-11 w-full sm:w-[160px]"
                    label="Accepted"
                  />
                </div>
              }
              className="max-w-full overflow-hidden border border-[#E7E1DE] bg-white"
            >
              <VendorOrdersTable rows={paginatedRows} />

              <TablePagination
                currentPage={currentPage}
                totalItems={totalItems}
                pageSize={VENDOR_DETAILS_PAGE_SIZE}
                onPageChange={setCurrentPage}
              />
            </PageSection>
          ) : null}

          {activeTab === "service-requests" ? (
            <PageSection
              title="Service Requests"
              titleClassName="text-[18px] font-semibold leading-none text-[#151210]"
              headerClassName="flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
              action={
                <SearchField
                  className="h-11 w-full lg:w-[300px]"
                  placeholder="Search here..."
                  value={serviceQuery}
                  onChange={(event) => setServiceQuery(event.target.value)}
                />
              }
              className="max-w-full overflow-hidden border border-[#E7E1DE] bg-white"
            >
              <VendorServiceRequestsTable
                rows={paginatedRows}
                startIndex={pageStartIndex}
                onReject={(row) => rejectServiceRequest(row.id)}
                onAssign={(row) => setSelectedServiceRequest(row)}
              />

              <TablePagination
                currentPage={currentPage}
                totalItems={totalItems}
                pageSize={VENDOR_DETAILS_PAGE_SIZE}
                onPageChange={setCurrentPage}
              />
            </PageSection>
          ) : null}

          {activeTab === "products" ? (
            <PageSection
              title="Products"
              titleClassName="text-[18px] font-semibold leading-none text-[#151210]"
              headerClassName="flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
              action={
                <SearchField
                  className="h-11 w-full lg:w-[300px]"
                  placeholder="Search here..."
                  value={productsQuery}
                  onChange={(event) => setProductsQuery(event.target.value)}
                />
              }
              className="max-w-full overflow-hidden border border-[#E7E1DE] bg-white"
            >
              <VendorProductsTable rows={paginatedRows} />

              <TablePagination
                currentPage={currentPage}
                totalItems={totalItems}
                pageSize={VENDOR_DETAILS_PAGE_SIZE}
                onPageChange={setCurrentPage}
              />
            </PageSection>
          ) : null}
        </MotionDiv>

        <AssignDeliveryAgentModal
          open={Boolean(selectedServiceRequest)}
          onClose={() => setSelectedServiceRequest(null)}
          request={selectedServiceRequest}
          submitting={submitting}
          onSubmit={async (payload) => {
            await assignServiceRequest(selectedServiceRequest.id, payload);
            setSelectedServiceRequest(null);
          }}
        />
      </div>
    </LazyMotion>
  );
}