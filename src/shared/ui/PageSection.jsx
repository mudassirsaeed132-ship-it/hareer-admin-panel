import { cn } from "../lib/cn";

export default function PageSection({
  title,
  titleClassName = "",
  action,
  children,
  className = "",
  headerClassName = "",
  contentClassName = "",
  withDivider = false,
}) {
  return (
    <section className={cn("border border-[#E9E3DF] bg-white", className)}>
      {title || action ? (
        <div
          className={cn(
            "flex items-start justify-between gap-4 px-5 py-5 sm:px-6 xl:px-7",
            withDivider && "border-b border-[#E9E3DF]",
            headerClassName
          )}
        >
          {title ? (
            <h2 className={cn("font-semibold text-[#151210]", titleClassName)}>
              {title}
            </h2>
          ) : (
            <div />
          )}

          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      ) : null}

      <div className={cn(contentClassName)}>{children}</div>
    </section>
  );
}