import { Link, useLocation } from "react-router-dom";
import { ChevronsRight } from "lucide-react";
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
      <ol className="flex min-w-0 max-w-full items-center overflow-hidden">
        {breadcrumbs.map((item, index) => {
          const isLast = item.isActive || index === breadcrumbs.length - 1;

          return (
            <li
              key={`${item.href}-${item.label}`}
              className="flex min-w-0 items-center"
            >
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="mx-2 inline-flex h-[18px] w-[22px] shrink-0 items-center justify-center"
                >
                  <ChevronsRight
                    className="h-[18px] w-[18px] text-[#6F6A67]"
                    strokeWidth={2.4}
                  />
                </span>
              ) : null}

              {isLast ? (
                <span
                  className={cn(
                    "block truncate text-[14px] font-medium leading-none text-[#E3B2B2]",
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
                    "block truncate text-[14px] font-medium leading-none text-[#6F6A67] transition-colors",
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