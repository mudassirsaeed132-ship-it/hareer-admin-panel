import { Menu } from "lucide-react";

import SearchField from "../ui/SearchField";
import Breadcrumbs from "./Breadcrumbs";
import TopbarNotifications from "./TopbarNotifications";
import TopbarProfileMenu from "./TopbarProfileMenu";

export default function Topbar({ onOpenSidebar }) {
  return (
    <header className="sticky top-0 z-30 w-full max-w-full border-b border-[#E7E1DE] bg-[#F8F5F3]/95 backdrop-blur">
      <div className="flex h-[64px] w-full min-w-0 items-center justify-between gap-3 px-4 sm:px-5 lg:h-[72px] lg:px-6 xl:h-[76px] xl:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] border border-[#E7E1DE] bg-white text-[#2D2926] transition hover:bg-[#FBF1F1] sm:h-11 sm:w-11 lg:hidden"
            onClick={onOpenSidebar}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="min-w-0 flex-1 overflow-hidden">
            <Breadcrumbs />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="hidden lg:block">
            <SearchField
              className="w-[220px] xl:w-[280px] 2xl:w-[360px]"
              placeholder="Search here..."
            />
          </div>

          <TopbarNotifications />

          <TopbarProfileMenu />
        </div>
      </div>
    </header>
  );
}