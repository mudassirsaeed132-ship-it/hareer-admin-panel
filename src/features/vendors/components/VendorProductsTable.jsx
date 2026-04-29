import { useMemo } from "react";
import Table from "../../../shared/ui/Table";
import { formatCurrency } from "../../../shared/lib/formatCurrency";

export default function VendorProductsTable({ rows = [] }) {
  const columns = useMemo(
    () => [
      {
        key: "productName",
        header: "Product Name",
        headerClassName: "whitespace-nowrap",
        cellClassName: "whitespace-nowrap",
      },
      {
        key: "sku",
        header: "SKU",
        headerClassName: "whitespace-nowrap",
        cellClassName: "whitespace-nowrap",
      },
      {
        key: "category",
        header: "Category",
        headerClassName: "whitespace-nowrap",
        cellClassName: "whitespace-nowrap",
      },
      {
        key: "stock",
        header: "Stock",
        headerClassName: "whitespace-nowrap",
        cellClassName: "whitespace-nowrap",
      },
      {
        key: "price",
        header: "Price",
        cell: (row) => formatCurrency(row.price, row.currency),
        headerClassName: "whitespace-nowrap",
        cellClassName: "whitespace-nowrap",
      },
    ],
    []
  );

  return (
    <Table
      columns={columns}
      rows={rows}
      rowKey={(row) => row.id}
      minWidthClassName="min-w-[900px]"
      tableClassName="table-auto"
    />
  );
}