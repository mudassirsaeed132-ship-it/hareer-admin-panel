function getCellValue(column, row, index) {
  if (typeof column.cell === "function") {
    return column.cell(row, index);
  }

  const value = row?.[column.key];
  return value ?? "—";
}

function getAlignClass(align = "left") {
  if (align === "center") return "text-center";
  if (align === "right") return "text-right";
  return "text-left";
}

export default function Table({
  columns = [],
  rows = [],
  rowKey,
  emptyMessage = "No data available.",
  className = "",
  tableClassName = "",
  minWidthClassName = "min-w-[1180px]",
  showVerticalDividers = true,
}) {
  const hasRows = Array.isArray(rows) && rows.length > 0;

  return (
    <div
      className={`table-scroll-area w-full overflow-x-auto overflow-y-hidden ${className}`}
    >
      <table
        className={`w-full border-collapse ${minWidthClassName} ${tableClassName}`}
      >
        <thead>
          <tr className="border-b border-[#E7E1DE]">
            {columns.map((column, index) => {
              const isLast = index === columns.length - 1;

              return (
                <th
                  key={column.key ?? index}
                  style={column.width ? { width: column.width } : undefined}
                  className={[
                    "bg-white px-4 py-4 align-middle text-[13px] font-medium leading-[1.5] text-[#7E7671] sm:px-5 sm:py-5 xl:px-6",
                    getAlignClass(column.align),
                    showVerticalDividers && !isLast ? "border-r border-[#E7E1DE]" : "",
                    column.headerClassName ?? "",
                  ].join(" ")}
                >
                  {column.header}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {hasRows ? (
            rows.map((row, rowIndex) => {
              const resolvedRowKey =
                typeof rowKey === "function"
                  ? rowKey(row, rowIndex)
                  : row?.id ?? rowIndex;

              return (
                <tr
                  key={resolvedRowKey}
                  className="border-b border-[#E7E1DE] last:border-b-0"
                >
                  {columns.map((column, columnIndex) => {
                    const isLast = columnIndex === columns.length - 1;

                    return (
                      <td
                        key={column.key ?? columnIndex}
                        className={[
                          "bg-white px-4 py-5 align-middle text-[15px] leading-[1.6] text-[#1B1716] sm:px-5 sm:py-6 xl:px-6 xl:py-7 xl:text-[16px]",
                          getAlignClass(column.align),
                          showVerticalDividers && !isLast ? "border-r border-[#E7E1DE]" : "",
                          column.cellClassName ?? "",
                        ].join(" ")}
                      >
                        {getCellValue(column, row, rowIndex)}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-12 text-center text-[15px] text-[#7E7671]"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}