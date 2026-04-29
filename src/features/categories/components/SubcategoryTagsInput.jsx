import { Search, X } from "lucide-react";
import { useMemo } from "react";

export default function SubcategoryTagsInput({
  items = [],
  inputValue,
  onInputChange,
  onAdd,
  onRemove,
  placeholder = "Sub category",
}) {
  const showPlaceholder = useMemo(() => items.length === 0, [items.length]);

  return (
    <div className="flex items-start gap-2">
      <div className="min-w-0 flex-1">
        <div className="flex max-h-[74px] min-h-[34px] flex-wrap items-start gap-2 overflow-y-auto pr-1">
          {items.map((item) => (
            <span
              key={item}
              className="inline-flex h-[32px] items-center gap-2 bg-[#FFF6F6] px-3 text-[13px] font-medium text-[#E2B2B2]"
            >
              {item}
              <button
                type="button"
                onClick={() => onRemove(item)}
                className="inline-flex items-center justify-center"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}

          <input
            type="text"
            value={inputValue}
            onChange={(event) => onInputChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                onAdd();
              }
            }}
            placeholder={showPlaceholder ? placeholder : ""}
            className="min-w-[110px] flex-1 border-none bg-transparent p-0 text-[14px] text-[#151210] outline-none placeholder:text-[#E2B2B2]"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center text-[#151210]"
      >
        <Search className="h-4.5 w-4.5" />
      </button>
    </div>
  );
}