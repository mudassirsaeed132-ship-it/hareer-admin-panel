export default function TableCellPill({
  as: Component = "span",
  children,
  size = "md",
  className = "",
  ...props
}) {
  const sizeClassMap = {
    xs: "h-8 min-w-[62px] px-2.5 text-[12px]",
    sm: "h-8 min-w-[72px] px-3 text-[12px]",
    md: "h-8 min-w-[82px] px-3 text-[12px]",
    lg: "h-8 min-w-[104px] px-3 text-[12px]",
    xl: "h-8 min-w-[126px] px-3.5 text-[12px]",
    "2xl": "h-8 min-w-[148px] px-4 text-[12px]",
  };

  return (
    <Component
      className={`inline-flex shrink-0 items-center justify-center whitespace-nowrap font-medium leading-none ${
        sizeClassMap[size] || sizeClassMap.md
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}