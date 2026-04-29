import PageSection from "../../../shared/ui/PageSection";
import Table from "../../../shared/ui/Table";
import { formatCurrency } from "../../../shared/lib/formatCurrency";
import { formatNumber } from "../../../shared/lib/formatNumber";

const columns = [
  {
    key: "serial",
    header: "Sr #",
    width: "7%",
    cell: (_, index) => (
      <span className="font-semibold text-[#151210]">
        {String(index + 1).padStart(2, "0")}
      </span>
    ),
    cellClassName: "font-semibold whitespace-nowrap",
  },
  {
    key: "storeName",
    header: "Store Name",
    width: "16%",
    cell: (row) => (
      <span className="font-medium text-[#151210]">{row.storeName}</span>
    ),
  },
  {
    key: "category",
    header: "Category",
    width: "14%",
  },
  {
    key: "location",
    header: "Location",
    width: "15%",
  },
  {
    key: "totalProducts",
    header: "Total Products",
    width: "15%",
    cell: (row) => <span>{formatNumber(row.totalProducts)}</span>,
    cellClassName: "whitespace-nowrap",
  },
  {
    key: "totalOrders",
    header: "Total Orders",
    width: "15%",
    cell: (row) => <span>{formatNumber(row.totalOrders)}</span>,
    cellClassName: "whitespace-nowrap",
  },
  {
    key: "totalRevenue",
    header: "Total Revenue",
    width: "18%",
    cell: (row) => (
      <span className="whitespace-nowrap">
        {formatCurrency(row.totalRevenue, row.currency)}
      </span>
    ),
    cellClassName: "whitespace-nowrap",
  },
];

export default function TopSellingStoresTable({ rows = [] }) {
  return (
    <PageSection
      title="Top Selling Stores"
      withDivider
      className="overflow-hidden"
      headerClassName="px-5 py-4 sm:px-6 sm:py-5 xl:px-7"
      titleClassName="text-[18px] font-semibold leading-none text-[#151210]"
    >
      <Table
        columns={columns}
        rows={rows}
        rowKey={(row) => row.id}
        minWidthClassName="min-w-[760px] lg:min-w-full"
        tableClassName="lg:table-fixed"
      />
    </PageSection>
  );
}