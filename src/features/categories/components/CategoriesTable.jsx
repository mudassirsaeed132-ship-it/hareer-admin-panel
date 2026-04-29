import CategoryStatusBadge from "./CategoryStatusBadge";
import ProductLimitationSelect from "./ProductLimitationSelect";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const HEADER_CELL_CLASS =
  "border-b border-r border-[#EEE8E4] bg-white px-[16px] py-[16px] text-left text-[14px] font-normal leading-[20px] text-[#7B7672] last:border-r-0";

const BODY_CELL_CLASS =
  "border-b border-r border-[#EEE8E4] px-[16px] py-[14px] align-middle last:border-r-0";

function SubcategoryChips({ items = [] }) {
  return (
    <div className="flex min-h-[40px] flex-wrap content-center gap-x-2 gap-y-2">
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="inline-flex h-[32px] items-center bg-[#FFF7F7] px-3 text-[13px] font-medium leading-none text-[#E5B2B2]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function ActionButtons({ row, onEdit, onToggleStatus }) {
  const isActive = row.status === "active";

  if (isActive) {
    return (
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onEdit(row)}
          className="inline-flex h-[36px] min-w-[74px] items-center justify-center bg-[#F3F1F1] px-4 text-[14px] font-medium text-[#151210] transition hover:bg-[#ECE8E8]"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onToggleStatus(row.id)}
          className="inline-flex h-[36px] min-w-[114px] items-center justify-center border border-[#F16D6D] bg-white px-4 text-[14px] font-medium text-[#E53935] transition hover:bg-[#FFF6F6]"
        >
          Deactivate
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onToggleStatus(row.id)}
      className="inline-flex h-[36px] min-w-[112px] items-center justify-center bg-[#E4B2B2] px-4 text-[14px] font-medium text-[#151210] transition hover:opacity-90"
    >
      Activate
    </button>
  );
}

export default function CategoriesTable({
  rows = [],
  onEdit,
  onToggleStatus,
  onProductLimitChange,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1088px] border-collapse bg-white table-fixed">
        <colgroup>
          <col className="w-[64px]" />
          <col className="w-[150px]" />
          <col className="w-[380px]" />
          <col className="w-[240px]" />
          <col className="w-[140px]" />
          <col className="w-[180px]" />
        </colgroup>

        <thead>
          <tr>
            <th className={HEADER_CELL_CLASS}>Sr #</th>
            <th className={HEADER_CELL_CLASS}>Category</th>
            <th className={HEADER_CELL_CLASS}>Subcategories</th>
            <th className={HEADER_CELL_CLASS}>Products Limitation</th>
            <th className={HEADER_CELL_CLASS}>Status</th>
            <th className={HEADER_CELL_CLASS}>Action</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              <td
                className={cn(
                  BODY_CELL_CLASS,
                  "text-[16px] font-semibold leading-none text-[#151210]"
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </td>

              <td
                className={cn(
                  BODY_CELL_CLASS,
                  "text-[16px] font-medium leading-[22px] text-[#151210]"
                )}
              >
                {row.categoryName}
              </td>

              <td className={BODY_CELL_CLASS}>
                <SubcategoryChips items={row.subcategories} />
              </td>

              <td className={BODY_CELL_CLASS}>
                <div className="flex min-h-[40px] items-center">
                  <ProductLimitationSelect
                    value={row.productLimit}
                    onChange={(event) =>
                      onProductLimitChange(row.id, event.target.value)
                    }
                  />
                </div>
              </td>

              <td className={BODY_CELL_CLASS}>
                <div className="flex min-h-[40px] items-center">
                  <CategoryStatusBadge status={row.status} />
                </div>
              </td>

              <td className={BODY_CELL_CLASS}>
                <div className="flex min-h-[40px] items-center">
                  <ActionButtons
                    row={row}
                    onEdit={onEdit}
                    onToggleStatus={onToggleStatus}
                  />
                </div>
              </td>
            </tr>
          ))}

          {!rows.length ? (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-10 text-center text-[15px] text-[#7B7672]"
              >
                No categories found.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}