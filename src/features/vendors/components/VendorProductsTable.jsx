import { useMemo } from "react";
import Table from "../../../shared/ui/Table";
import { formatCurrency } from "../../../shared/lib/formatCurrency";

export default function VendorProductsTable({ rows = [] }) {
  const columns = useMemo(
    () => [
      {
        key: "productName",
        header: "Product Name",
        width: "28%",
        headerClassName: "min-w-[180px] whitespace-nowrap",
        cellClassName: "min-w-[180px] whitespace-nowrap font-medium",
      },
      {
        key: "sku",
        header: "SKU",
        width: "18%",
        headerClassName: "min-w-[120px] whitespace-nowrap",
        cellClassName: "min-w-[120px] whitespace-nowrap",
      },
      {
        key: "category",
        header: "Category",
        width: "18%",
        headerClassName: "min-w-[130px] whitespace-nowrap",
        cellClassName: "min-w-[130px] whitespace-nowrap",
      },
      {
        key: "stock",
        header: "Stock",
        width: "14%",
        headerClassName: "min-w-[90px] whitespace-nowrap",
        cellClassName: "min-w-[90px] whitespace-nowrap",
      },
      {
        key: "price",
        header: "Price",
        width: "18%",
        cell: (row) => formatCurrency(row.price, row.currency),
        headerClassName: "min-w-[110px] whitespace-nowrap",
        cellClassName: "min-w-[110px] whitespace-nowrap",
      },
    ],
    []
  );

  return (
    <Table
      columns={columns}
      rows={rows}
      rowKey={(row) => row.id}
      minWidthClassName="min-w-[760px]"
      tableClassName="table-fixed"
    />
  );
}