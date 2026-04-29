import { cn } from "../lib/cn";

export default function PageHeader({
  title,
  description,
  action,
  className = "",
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between",
        className
      )}
    >
      <div>
        <h1 className="font-serif text-[24px] leading-[1.1] text-[#151210]">
          {title}
        </h1>

        {description ? (
          <p className="mt-3 text-[16px] leading-[1.45] text-[#6F6A67]">
            {description}
          </p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
