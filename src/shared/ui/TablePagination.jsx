export default function TablePagination({
  currentPage = 1,
  totalItems = 0,
  pageSize = 10,
  onPageChange,
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const goToPrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex flex-col gap-3 border-t border-[#E7E1DE] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[13px] text-[#7E7671]">
        Showing{" "}
        <span className="font-medium text-[#151210]">{startItem}</span>
        {" - "}
        <span className="font-medium text-[#151210]">{endItem}</span>
        {" of "}
        <span className="font-medium text-[#151210]">{totalItems}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={goToPrevious}
          disabled={currentPage === 1}
          className="inline-flex h-9 items-center justify-center border border-[#E7E1DE] bg-[#F8F5F3] px-4 text-[13px] font-medium text-[#151210] transition hover:bg-[#F2EEEB] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <div className="inline-flex h-9 min-w-9 items-center justify-center border border-[#E7E1DE] bg-white px-3 text-[13px] font-medium text-[#151210]">
          {currentPage} / {totalPages}
        </div>

        <button
          type="button"
          onClick={goToNext}
          disabled={currentPage === totalPages}
          className="inline-flex h-9 items-center justify-center border border-[#E7E1DE] bg-[#F8F5F3] px-4 text-[13px] font-medium text-[#151210] transition hover:bg-[#F2EEEB] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}