export default function VendorsTabs({
  items = [],
  activeValue,
  onChange,
}) {
  return (
    <div className="flex flex-wrap border border-[#EEE8E4] bg-white">
      {items.map((item) => {
        const isActive = item.value === activeValue;

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={`inline-flex h-[46px] items-center justify-center px-4 text-[15px] font-medium transition sm:px-5 ${
              isActive
                ? "bg-[#E4B2B2] text-[#151210]"
                : "bg-white text-[#7B7672] hover:bg-[#FBF1F1] hover:text-[#151210]"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}