import FilterSelect from "../../../shared/ui/FilterSelect";
import SearchField from "../../../shared/ui/SearchField";
import { CATEGORY_TYPE_FILTER_OPTIONS } from "../constants/categories.constants";

export default function CategoriesToolbar({
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
}) {
  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto lg:justify-end">
      <SearchField
        className="h-11 w-full sm:w-[280px] lg:w-[320px]"
        placeholder="Search here..."
        value={searchQuery}
        onChange={onSearchChange}
      />

      <FilterSelect
        options={CATEGORY_TYPE_FILTER_OPTIONS}
        value={typeFilter}
        onChange={onTypeFilterChange}
        className="h-11 w-full sm:w-[160px]"
        label="Shopping"
      />
    </div>
  );
}