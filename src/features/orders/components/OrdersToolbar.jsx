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
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto">
      <SearchField
        className="h-11 w-full sm:w-[270px] lg:w-[300px]"
        placeholder="Search here..."
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />

      <FilterSelect
        options={ORDERS_STATUS_FILTER_OPTIONS}
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
        label="All Statuses"
        className="h-11 w-full sm:w-[170px]"
      />
    </div>
  );
}