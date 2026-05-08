import { useEffect, useMemo, useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import PageHeader from "../../../shared/layout/PageHeader";
import PageSection from "../../../shared/ui/PageSection";
import SearchField from "../../../shared/ui/SearchField";
import FilterSelect from "../../../shared/ui/FilterSelect";
import EmptyState from "../../../shared/ui/EmptyState";
import Skeleton from "../../../shared/ui/Skeleton";
import TablePagination from "../../../shared/ui/TablePagination";
import InlineFeedback from "../../../shared/ui/InlineFeedback";
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

const EXPORT_CONFIG = {
  vendors: {
    fileName: "vendors-export.pdf",
    title: "Vendors Export",
    columns: [
      { label: "Vendor Name", value: (row) => row.vendorName },
      { label: "Business Name", value: (row) => row.businessName },
      { label: "Category", value: (row) => row.category },
      { label: "Website", value: (row) => row.website },
      { label: "Location", value: (row) => row.location },
      { label: "Status", value: (row) => row.status },
    ],
  },
  "vendor-requests": {
    fileName: "vendor-requests-export.pdf",
    title: "Vendor Requests Export",
    columns: [
      { label: "Vendor Name", value: (row) => row.vendorName },
      { label: "Business Name", value: (row) => row.businessName },
      { label: "Category", value: (row) => row.category },
      { label: "Website", value: (row) => row.website },
      { label: "Location", value: (row) => row.location },
      { label: "Status", value: (row) => row.status },
    ],
  },
  "service-requests": {
    fileName: "service-requests-export.pdf",
    title: "Service Requests Export",
    columns: [
      { label: "Vendor Name", value: (row) => row.vendorName },
      { label: "Category", value: (row) => row.category },
      { label: "Duration", value: (row) => row.duration },
      { label: "Description", value: (row) => row.description },
      { label: "Status", value: (row) => row.status },
      { label: "Riders Needed", value: (row) => row.ridersNeeded },
      { label: "Service Fee", value: (row) => row.serviceFee },
      { label: "Payment Terms", value: (row) => row.paymentTerms },
    ],
  },
  payouts: {
    fileName: "payouts-export.pdf",
    title: "Payouts Export",
    columns: [
      { label: "Vendor", value: (row) => row.vendorName },
      { label: "Owner Name", value: (row) => row.ownerName },
      { label: "Month", value: (row) => row.month },
      {
        label: "Total Sales",
        value: (row) => `${row.totalSales ?? 0} ${row.currency ?? ""}`.trim(),
      },
      { label: "Status", value: (row) => row.status },
      { label: "Commission Rate", value: (row) => `${row.commissionRate ?? 0}%` },
      {
        label: "Commission Amount",
        value: (row) => `${row.commissionAmount ?? 0} ${row.currency ?? ""}`.trim(),
      },
    ],
  },
};

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

function cleanPdfText(value) {
  if (value === null || value === undefined) return "—";

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value)
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapePdfText(value) {
  return cleanPdfText(value)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function truncatePdfText(value, maxLength = 90) {
  const text = cleanPdfText(value);

  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength - 3)}...`;
}

function buildPdfLines({ title, rows, columns }) {
  const lines = [
    title,
    `Generated: ${new Date().toLocaleString()}`,
    `Total Records: ${rows.length}`,
    "",
  ];

  rows.forEach((row, index) => {
    lines.push(`Record ${String(index + 1).padStart(2, "0")}`);

    columns.forEach((column) => {
      const value =
        typeof column.value === "function" ? column.value(row, index) : row[column.key];

      lines.push(`${column.label}: ${truncatePdfText(value)}`);
    });

    lines.push("");
  });

  return lines;
}

function createPdfBlob({ title, rows, columns }) {
  const lines = buildPdfLines({ title, rows, columns });
  const linesPerPage = 44;
  const pages = [];

  for (let index = 0; index < lines.length; index += linesPerPage) {
    pages.push(lines.slice(index, index + linesPerPage));
  }

  const objects = [];
  const offsets = [];
  const pageObjectIds = [];
  const contentObjectIds = [];

  const addObject = (content) => {
    objects.push(content);
    return objects.length;
  };

  const catalogId = addObject("<< /Type /Catalog /Pages 2 0 R >>");
  const pagesId = addObject("");

  pages.forEach(() => {
    pageObjectIds.push(objects.length + 1);
    contentObjectIds.push(objects.length + 2);

    addObject("");
    addObject("");
  });

  const fontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

  pages.forEach((pageLines, pageIndex) => {
    const content = [
      "BT",
      "/F1 10 Tf",
      "14 TL",
      "40 790 Td",
      ...pageLines.map((line) => `(${escapePdfText(line)}) Tj T*`),
      "ET",
    ].join("\n");

    const contentId = contentObjectIds[pageIndex];
    const pageId = pageObjectIds[pageIndex];

    objects[contentId - 1] = `<< /Length ${content.length} >>\nstream\n${content}\nendstream`;

    objects[pageId - 1] =
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 612 792] ` +
      `/Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`;
  });

  objects[pagesId - 1] =
    `<< /Type /Pages /Kids [${pageObjectIds
      .map((id) => `${id} 0 R`)
      .join(" ")}] /Count ${pageObjectIds.length} >>`;

  let pdf = "%PDF-1.4\n";

  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = pdf.length;

  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";

  offsets.forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });

  pdf +=
    `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\n` +
    `startxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
}

function downloadPdfFile({ fileName, title, rows, columns }) {
  if (!rows.length) return false;

  const blob = createPdfBlob({ title, rows, columns });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return true;
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
  const [feedback, setFeedback] = useState(null);

  const MotionDiv = m.div;

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
  };

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

  const handleExportPdf = () => {
    try {
      const config = EXPORT_CONFIG[activeTab] || EXPORT_CONFIG.vendors;

      if (!activeRows.length) {
        showFeedback("error", "No data available to export.");
        return;
      }

      const downloaded = downloadPdfFile({
        fileName: config.fileName,
        title: config.title,
        rows: activeRows,
        columns: config.columns,
      });

      if (!downloaded) {
        showFeedback("error", "No data available to export.");
        return;
      }

      showFeedback("success", "PDF file downloaded successfully.");
    } catch {
      showFeedback("error", "Unable to export PDF. Please try again.");
    }
  };

  const handleToggleVendorStatus = async (row) => {
    const nextLabel = row.status === "active" ? "deactivated" : "activated";

    try {
      await toggleVendorRowStatus(row);
      showFeedback("success", `${row.businessName} has been ${nextLabel}.`);
    } catch {
      showFeedback(
        "error",
        `Unable to update ${row.businessName}. Please try again.`
      );
    }
  };

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
                onClick={handleExportPdf}
                className="inline-flex h-10 w-full items-center justify-center bg-[#E4B2B2] px-4 text-[14px] font-medium text-[#151210] transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#E4B2B2]/60 focus:ring-offset-2 sm:w-auto sm:min-w-[116px]"
              >
                Export PDF
              </button>
            }
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
                onToggleStatus={handleToggleVendorStatus}
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