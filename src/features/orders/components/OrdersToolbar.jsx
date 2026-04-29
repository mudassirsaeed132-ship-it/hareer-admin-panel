import SearchField from "../../../shared/ui/SearchField";
import FilterSelect from "../../../shared/ui/FilterSelect";
import { ORDERS_STATUS_FILTER_OPTIONS } from "../constants/orders.constants";

export default function OrdersToolbar({
  query,
  onQueryChange,
  status,
  onStatusChange,
}) {
  return (
    <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row lg:items-center">
      <SearchField
        className="w-full lg:w-[280px]"
        placeholder="Search here..."
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />

      <FilterSelect
        options={ORDERS_STATUS_FILTER_OPTIONS}
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
        label="All Statuses"
        className="w-full lg:w-[170px]"
      />
    </div>
  );
}