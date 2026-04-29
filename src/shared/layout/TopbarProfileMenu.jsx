import { ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import avatarImage from "../assets/icons/Ellipse.svg";
import { useDropdown } from "../hooks/useDropdown";
import { AUTH_ROUTES } from "../../features/auth/constants/auth.constants";
import { useAuthStore } from "../../features/auth/model/authStore";

export default function TopbarProfileMenu() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const { dropdownRef, isOpen, toggleDropdown, closeDropdown } = useDropdown();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const displayName = user?.name || "Kevin B.";
  const displayEmail = user?.email || "admin@hareer.com";

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await logout();
      closeDropdown();
      navigate(AUTH_ROUTES.login, { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative shrink-0">
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex h-10 shrink-0 items-center gap-2 border border-[#E7E1DE] bg-white px-2 transition hover:bg-[#FBF1F1] sm:h-[44px] sm:px-3 xl:h-[52px] xl:gap-3 xl:px-4"
        aria-label="Open profile menu"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <img
          src={avatarImage}
          alt={displayName}
          className="h-8 w-8 shrink-0 rounded-full object-cover sm:h-9 sm:w-9 xl:h-11 xl:w-11"
        />

        <span className="hidden max-w-[120px] truncate text-[14px] font-semibold text-[#1F1B1A] md:block xl:text-[16px]">
          {displayName}
        </span>

        <ChevronDown
          className={[
            "hidden h-4 w-4 shrink-0 text-[#1F1B1A] transition-transform sm:block xl:h-5 xl:w-5",
            isOpen ? "rotate-180" : "rotate-0",
          ].join(" ")}
          strokeWidth={1.8}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-[260px] max-w-[calc(100vw-32px)] border border-[#E7E1DE] bg-white shadow-[0_18px_45px_rgba(31,27,26,0.10)]">
          <div className="flex items-center gap-3 border-b border-[#E7E1DE] px-4 py-4">
            <img
              src={avatarImage}
              alt={displayName}
              className="h-11 w-11 shrink-0 rounded-full object-cover"
            />

            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold text-[#1F1B1A]">
                {displayName}
              </p>
              <p className="mt-0.5 truncate text-[13px] text-[#6F6A67]">
                {displayEmail}
              </p>
            </div>
          </div>

          <div className="py-2">
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-[14px] font-medium text-[#F04438] transition hover:bg-[#FFF1F1] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogOut className="h-4.5 w-4.5 shrink-0" strokeWidth={1.8} />
              <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
