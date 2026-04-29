export default function DataTable({
  columns,
  rows,
  rowKey = "id",
  minWidth = "980px",
}) {
  const resolveRowKey = (row, index) => {
    if (typeof rowKey === "function") return rowKey(row, index);
    return row[rowKey] ?? index;
  };

  return (
    <div className="overflow-x-auto">
      <table
        className="w-full border-collapse"
        style={{ minWidth }}
      >
        <thead>
          <tr className="border-b border-[#E9E3DF] text-left">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-5 text-[16px] font-medium text-[#7D7773] sm:px-8"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr
              key={resolveRowKey(row, index)}
              className="border-b border-[#E9E3DF] last:border-b-0"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-6 py-7 text-[18px] text-[#151210] sm:px-8"
                >
                  {column.render ? column.render(row, index) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}