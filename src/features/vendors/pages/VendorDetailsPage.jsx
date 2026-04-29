import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LazyMotion, domAnimation, m } from "framer-motion";
import SearchField from "../../../shared/ui/SearchField";
import FilterSelect from "../../../shared/ui/FilterSelect";
import PageSection from "../../../shared/ui/PageSection";
import EmptyState from "../../../shared/ui/EmptyState";
import Skeleton from "../../../shared/ui/Skeleton";
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

  const filteredOrders = useMemo(() => {
    return filterVendorOrders(detail?.orders ?? [], ordersQuery, ordersStatus);
  }, [detail?.orders, ordersQuery, ordersStatus]);

  const filteredServiceRequests = useMemo(() => {
    return filterServiceRequests(detail?.serviceRequests ?? [], serviceQuery);
  }, [detail?.serviceRequests, serviceQuery]);

  const filteredProducts = useMemo(() => {
    return filterVendorProducts(detail?.products ?? [], productsQuery);
  }, [detail?.products, productsQuery]);

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
      <div className="space-y-5 xl:space-y-6">
        <MotionDiv
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={VENDORS_SECTION_TRANSITION}
        >
          <VendorProfileShell
            detail={detail}
            onBack={() => navigate("/vendors")}
            onToggleStatus={toggleVendorStatusForDetail}
          />
        </MotionDiv>

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
        >
          {activeTab === "orders" ? (
            <PageSection
              title="Orders List"
              titleClassName="text-[18px] font-semibold leading-none text-[#151210]"
              headerClassName="flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
              action={
                <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row lg:items-center lg:justify-end">
                  <div className="w-full lg:w-[280px] lg:flex-none">
                    <SearchField
                      className="w-full"
                      placeholder="Search here..."
                      value={ordersQuery}
                      onChange={(event) => setOrdersQuery(event.target.value)}
                    />
                  </div>

                  <div className="w-full lg:w-auto lg:min-w-[126px] lg:flex-none">
                    <FilterSelect
                      options={ORDER_STATUS_FILTER_OPTIONS}
                      value={ordersStatus}
                      onChange={(event) => setOrdersStatus(event.target.value)}
                      className="w-full lg:w-auto"
                      label="Accepted"
                    />
                  </div>
                </div>
              }
              className="overflow-hidden"
            >
              <VendorOrdersTable rows={filteredOrders} />
            </PageSection>
          ) : null}

          {activeTab === "service-requests" ? (
            <PageSection
              title="Service Requests"
              titleClassName="text-[18px] font-semibold leading-none text-[#151210]"
              headerClassName="flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
              action={
                <SearchField
                  className="w-full lg:w-[280px]"
                  placeholder="Search here..."
                  value={serviceQuery}
                  onChange={(event) => setServiceQuery(event.target.value)}
                />
              }
              className="overflow-hidden"
            >
              <VendorServiceRequestsTable
                rows={filteredServiceRequests}
                onReject={(row) => rejectServiceRequest(row.id)}
                onAssign={(row) => setSelectedServiceRequest(row)}
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
                  className="w-full lg:w-[280px]"
                  placeholder="Search here..."
                  value={productsQuery}
                  onChange={(event) => setProductsQuery(event.target.value)}
                />
              }
              className="overflow-hidden"
            >
              <VendorProductsTable rows={filteredProducts} />
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
