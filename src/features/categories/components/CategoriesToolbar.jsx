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
    <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row lg:items-center lg:justify-end">
      <div className="w-full lg:w-[280px] lg:flex-none">
        <SearchField
          className="w-full"
          placeholder="Search here..."
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>

      <div className="w-full lg:w-auto lg:min-w-[116px] lg:flex-none">
        <FilterSelect
          options={CATEGORY_TYPE_FILTER_OPTIONS}
          value={typeFilter}
          onChange={onTypeFilterChange}
          className="w-full lg:w-auto"
          label="Shopping"
        />
      </div>
    </div>
  );
}