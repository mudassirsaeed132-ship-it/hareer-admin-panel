import CategoryStatusBadge from "./CategoryStatusBadge";
import ProductLimitationSelect from "./ProductLimitationSelect";
import TableCellPill from "../../../shared/ui/TableCellPill";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const HEADER_CELL_CLASS =
  "border-b border-r border-[#E7E1DE] bg-white px-3 py-3 text-left align-middle text-[12px] font-medium leading-[1.35] text-[#7E7671] last:border-r-0";

const BODY_CELL_CLASS =
  "border-b border-r border-[#E7E1DE] bg-white px-3 py-3 align-middle text-[14px] leading-[1.35] text-[#151210] last:border-r-0";

function SubcategoryChips({ items = [] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="inline-flex h-8 items-center bg-[#FFF7F7] px-3 text-[12px] font-medium leading-none text-[#E5B2B2]"
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
        <TableCellPill
          as="button"
          type="button"
          size="md"
          onClick={() => onEdit(row)}
          className="border border-[#E7E1DE] bg-[#F8F5F3] text-[#151210] transition hover:bg-[#F2EEEB]"
        >
          Edit
        </TableCellPill>

        <TableCellPill
          as="button"
          type="button"
          size="lg"
          onClick={() => onToggleStatus(row.id)}
          className="border border-[#F16D6D] bg-white text-[#E53935] transition hover:bg-[#FFF6F6]"
        >
          Deactivate
        </TableCellPill>
      </div>
    );
  }

  return (
    <TableCellPill
      as="button"
      type="button"
      size="lg"
      onClick={() => onToggleStatus(row.id)}
      className="bg-[#E4B2B2] text-[#151210] transition hover:opacity-90"
    >
      Activate
    </TableCellPill>
  );
}

function MobileCategoryCard({
  row,
  displayIndex,
  onEdit,
  onToggleStatus,
  onProductLimitChange,
}) {
  return (
    <article className="border border-[#E7E1DE] bg-white">
      <div className="flex items-start justify-between gap-3 border-b border-[#E7E1DE] px-3 py-3">
        <div>
          <p className="text-[12px] font-medium text-[#7E7671]">Sr #</p>
          <p className="mt-1 text-[14px] font-semibold text-[#151210]">
            {displayIndex}
          </p>
        </div>

        <CategoryStatusBadge status={row.status} />
      </div>

      <div className="space-y-4 px-3 py-3 text-[13px]">
        <InfoRow label="Category" value={row.categoryName} />

        <div>
          <p className="mb-2 text-[#7E7671]">Subcategories</p>
          <SubcategoryChips items={row.subcategories} />
        </div>

        <div>
          <p className="mb-2 text-[#7E7671]">Products Limitation</p>
          <ProductLimitationSelect
            value={row.productLimit}
            onChange={(event) =>
              onProductLimitChange(row.id, event.target.value)
            }
          />
        </div>

        <div className="flex items-center justify-end">
          <ActionButtons
            row={row}
            onEdit={onEdit}
            onToggleStatus={onToggleStatus}
          />
        </div>
      </div>
    </article>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-[#7E7671]">{label}</span>
      <span className="max-w-[60%] text-right font-medium text-[#151210]">
        {value ?? "—"}
      </span>
    </div>
  );
}

export default function CategoriesTable({
  rows = [],
  startIndex = 0,
  onEdit,
  onToggleStatus,
  onProductLimitChange,
}) {
  return (
    <>
      <div className="hidden max-w-full overflow-x-auto md:block">
        <table className="w-full min-w-[1000px] border-collapse border-spacing-0 border-t border-[#E7E1DE] bg-white table-fixed">
          <colgroup>
            <col className="w-[70px]" />
            <col className="w-[145px]" />
            <col className="w-[350px]" />
            <col className="w-[230px]" />
            <col className="w-[140px]" />
            <col className="w-[230px]" />
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
            {rows.map((row, index) => {
              const displayIndex = String(startIndex + index + 1).padStart(
                2,
                "0"
              );

              return (
                <tr key={row.id}>
                  <td
                    className={cn(
                      BODY_CELL_CLASS,
                      "font-semibold whitespace-nowrap"
                    )}
                  >
                    {displayIndex}
                  </td>

                  <td
                    className={cn(
                      BODY_CELL_CLASS,
                      "font-semibold whitespace-nowrap"
                    )}
                  >
                    {row.categoryName}
                  </td>

                  <td className={BODY_CELL_CLASS}>
                    <SubcategoryChips items={row.subcategories} />
                  </td>

                  <td className={BODY_CELL_CLASS}>
                    <ProductLimitationSelect
                      value={row.productLimit}
                      onChange={(event) =>
                        onProductLimitChange(row.id, event.target.value)
                      }
                    />
                  </td>

                  <td className={BODY_CELL_CLASS}>
                    <CategoryStatusBadge status={row.status} />
                  </td>

                  <td className={BODY_CELL_CLASS}>
                    <ActionButtons
                      row={row}
                      onEdit={onEdit}
                      onToggleStatus={onToggleStatus}
                    />
                  </td>
                </tr>
              );
            })}

            {!rows.length ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-[14px] text-[#7B7672]"
                >
                  No categories found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 border-t border-[#E7E1DE] p-3 md:hidden">
        {rows.length ? (
          rows.map((row, index) => {
            const displayIndex = String(startIndex + index + 1).padStart(
              2,
              "0"
            );

            return (
              <MobileCategoryCard
                key={row.id}
                row={row}
                displayIndex={displayIndex}
                onEdit={onEdit}
                onToggleStatus={onToggleStatus}
                onProductLimitChange={onProductLimitChange}
              />
            );
          })
        ) : (
          <div className="px-4 py-10 text-center text-[14px] text-[#7B7672]">
            No categories found.
          </div>
        )}
      </div>
    </>
  );
}