import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

import { navigationItems, sidebarMeta } from "../../app/config/navigation.config";
import { AUTH_ROUTES } from "../../features/auth/constants/auth.constants";
import { useAuthStore } from "../../features/auth/model/authStore";
import hareerMark from "../assets/logo/Hareer-mark.svg";
import vectorIcon from "../assets/icons/vector.svg";

function SidebarNavIcon({ item, isActive }) {
  if (item.iconType === "asset") {
    return (
      <img
        src={item.icon}
        alt=""
        aria-hidden="true"
        className="h-[22px] w-[22px] shrink-0 object-contain xl:h-[24px] xl:w-[24px]"
        style={{
          filter: isActive
            ? "brightness(0) saturate(100%) invert(82%) sepia(20%) saturate(836%) hue-rotate(306deg) brightness(92%) contrast(91%)"
            : "brightness(0) saturate(100%) invert(43%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(92%) contrast(88%)",
        }}
      />
    );
  }

  const Icon = item.icon;

  return (
    <Icon
      className="h-[22px] w-[22px] shrink-0 xl:h-[24px] xl:w-[24px]"
      strokeWidth={1.8}
    />
  );
}

function SidebarItem({ item, onClose, isCollapsed }) {
  return (
    <NavLink
      to={item.path}
      end={item.path === "/"}
      onClick={onClose}
      title={isCollapsed ? item.label : undefined}
      className={({ isActive }) =>
        [
          "group flex min-w-0 items-center gap-3 border-r-[3px] px-6 py-[14px] text-[14px] font-medium transition-colors xl:px-7 xl:py-[15px] xl:text-[15px]",
          isCollapsed ? "lg:justify-center lg:gap-0 lg:px-0 xl:px-0" : "",
          isActive
            ? "border-r-[#E3B2B2] bg-[#FBF1F1] text-[#E3B2B2]"
            : "border-r-transparent text-[#6F6A67] hover:bg-[#FBF1F1] hover:text-[#E3B2B2]",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          <SidebarNavIcon item={item} isActive={isActive} />
          <span
            className={[
              "min-w-0 truncate",
              isCollapsed ? "lg:hidden" : "",
            ].join(" ")}
          >
            {item.label}
          </span>
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }) {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const LogoutIcon = sidebarMeta.logoutIcon;

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await logout();
      onClose?.();
      navigate(AUTH_ROUTES.login, { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <div
        className={[
          "fixed inset-0 z-40 bg-black/30 transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={onClose}
      />

      <aside
        className={[
          "fixed left-0 top-0 z-50 flex h-screen w-[272px] max-w-[86vw] flex-col border-r border-[#E7E1DE] bg-[#F8F5F3] transition-all duration-300 ease-out",
          isCollapsed
            ? "lg:w-[80px] lg:max-w-none"
            : "lg:w-[252px] lg:max-w-none xl:w-[264px]",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        ].join(" ")}
      >
        <div
          className={[
            "flex h-[64px] shrink-0 items-center justify-between border-b border-[#E7E1DE] px-5 sm:h-[72px] sm:px-6 xl:h-[80px] xl:px-7",
            isCollapsed ? "lg:justify-center lg:px-0" : "",
          ].join(" ")}
        >
          <img
            src={hareerMark}
            alt="Hareer"
            className={[
              "h-11 w-11 shrink-0 rounded-full border border-[#EDE4E0] object-contain sm:h-12 sm:w-12 xl:h-[52px] xl:w-[52px]",
              isCollapsed ? "lg:hidden" : "",
            ].join(" ")}
          />

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={onToggleCollapse}
              className="hidden h-9 w-9 place-items-center rounded-full text-[#2D2926] transition hover:bg-[#F1ECE9] lg:grid xl:h-10 xl:w-10"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!isCollapsed}
            >
              <img
                src={vectorIcon}
                alt=""
                aria-hidden="true"
                className={[
                  "h-[22px] w-[22px] object-contain transition-transform duration-300 xl:h-[24px] xl:w-[24px]",
                  isCollapsed ? "rotate-180" : "",
                ].join(" ")}
              />
            </button>

            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full text-[#2D2926] transition hover:bg-[#F1ECE9] lg:hidden"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          className={[
            "shrink-0 px-6 pt-4 text-[13px] text-[#8A8581] xl:px-7 xl:pt-5",
            isCollapsed ? "lg:px-0 lg:text-center" : "",
          ].join(" ")}
        >
          <span className={isCollapsed ? "lg:hidden" : ""}>
            {sidebarMeta.overviewLabel}
          </span>
        </div>

        <nav className="mt-2 min-h-0 flex-1 overflow-y-auto overflow-x-hidden pb-4">
          {navigationItems.map((item) => (
            <SidebarItem
              key={item.path}
              item={item}
              onClose={onClose}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>

        <div
          className={[
            "shrink-0 border-t border-[#E7E1DE] px-6 py-5 xl:px-7 xl:py-6",
            isCollapsed ? "lg:px-0" : "",
          ].join(" ")}
        >
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            title={isCollapsed ? "Logout" : undefined}
            className={[
              "flex min-w-0 items-center gap-3 text-[14px] font-medium text-[#1F1B1A] transition hover:text-[#E3B2B2] disabled:cursor-not-allowed disabled:opacity-60 xl:text-[15px]",
              isCollapsed ? "lg:w-full lg:justify-center lg:gap-0" : "",
            ].join(" ")}
          >
            <LogoutIcon
              className="h-5 w-5 shrink-0 xl:h-[22px] xl:w-[22px]"
              strokeWidth={1.8}
            />

            <span
              className={[
                "truncate",
                isCollapsed ? "lg:hidden" : "",
              ].join(" ")}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
