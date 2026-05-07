export default function TableCellPill({
  as: Component = "span",
  children,
  size = "md",
  className = "",
  ...props
}) {
  const sizeClassMap = {
    xs: "h-8 min-w-[64px] px-3 text-[12px]",
    sm: "h-8 min-w-[74px] px-3 text-[12px]",
    md: "h-8 min-w-[86px] px-3 text-[12px]",
    lg: "h-8 min-w-[112px] px-3.5 text-[12px]",
    xl: "h-8 min-w-[132px] px-3.5 text-[12px]",
    "2xl": "h-8 min-w-[152px] px-4 text-[12px]",
  };

  return (
    <Component
      className={`inline-flex items-center justify-center whitespace-nowrap font-medium leading-none ${sizeClassMap[size] || sizeClassMap.md} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}