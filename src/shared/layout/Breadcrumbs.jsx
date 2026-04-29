import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { getBreadcrumbs } from "../../app/config/breadcrumbs.config";
import { cn } from "../lib/cn";

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  const breadcrumbs = getBreadcrumbs(pathname);

  if (!breadcrumbs.length) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex min-w-0 max-w-full items-center overflow-hidden"
    >
      <ol className="flex min-w-0 max-w-full items-center gap-1 overflow-hidden">
        {breadcrumbs.map((item, index) => {
          const isLast = item.isActive || index === breadcrumbs.length - 1;

          return (
            <li
              key={`${item.href}-${item.label}`}
              className="flex min-w-0 items-center gap-1"
            >
              {index > 0 && (
                <ChevronRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-[#2D2926] sm:h-[18px] sm:w-[18px]"
                  strokeWidth={2}
                />
              )}

              {isLast ? (
                <span
                  className={cn(
                    "block truncate text-[14px] font-medium text-[#E3B2B2]",
                    "sm:text-[15px] xl:text-[16px]"
                  )}
                  title={item.label}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className={cn(
                    "block truncate text-[14px] font-medium text-[#6F6A67] transition-colors",
                    "hover:text-[#E3B2B2] sm:text-[15px] xl:text-[16px]"
                  )}
                  title={item.label}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}