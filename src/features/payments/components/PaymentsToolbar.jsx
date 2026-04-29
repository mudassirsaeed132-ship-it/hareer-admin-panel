import SearchField from "../../../shared/ui/SearchField";

export default function PaymentsToolbar({
  searchQuery,
  onSearchChange,
}) {
  return (
    <div className="flex w-full justify-end lg:w-auto lg:flex-none">
      <div className="w-full lg:w-[280px] lg:flex-none">
        <SearchField
          className="w-full"
          placeholder="Search here..."
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
    </div>
  );
}
