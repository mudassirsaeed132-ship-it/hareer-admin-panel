import SearchField from "../../../shared/ui/SearchField";

export default function UsersToolbar({
  query,
  onQueryChange,
}) {
  return (
    <SearchField
      className="h-11 w-full lg:w-[280px]"
      placeholder="Search here..."
      value={query}
      onChange={(event) => onQueryChange(event.target.value)}
    />
  );
}