import { Bell, CheckCheck, Clock } from "lucide-react";
import { useMemo, useState } from "react";

import { useDropdown } from "../hooks/useDropdown";

const INITIAL_NOTIFICATIONS = [
  {
    id: "order-1001",
    title: "New order received",
    message: "Chris Taylor placed a new order worth 100 LYD.",
    time: "2 min ago",
    type: "Order",
    isUnread: true,
  },
  {
    id: "payment-1002",
    title: "Payment pending",
    message: "Payment from Shan Marsh is still pending review.",
    time: "18 min ago",
    type: "Payment",
    isUnread: true,
  },
  {
    id: "vendor-1003",
    title: "Vendor request",
    message: "J. Junaid Jamshed submitted a profile update request.",
    time: "1 hr ago",
    type: "Vendor",
    isUnread: false,
  },
  {
    id: "category-1004",
    title: "Category update",
    message: "A new subcategory was added under Clothing.",
    time: "Today",
    type: "Category",
    isUnread: false,
  },
];

export default function TopbarNotifications() {
  const { dropdownRef, isOpen, toggleDropdown, closeDropdown } = useDropdown();
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => notification.isUnread).length,
    [notifications]
  );

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        isUnread: false,
      }))
    );
  };

  return (
    <div ref={dropdownRef} className="relative shrink-0">
      <button
        type="button"
        onClick={toggleDropdown}
        className="relative grid h-10 w-10 shrink-0 place-items-center border border-[#E7E1DE] bg-white text-[#1F1B1A] transition hover:bg-[#FBF1F1] sm:h-[44px] sm:w-[44px] xl:h-[52px] xl:w-[52px]"
        aria-label="Open notifications"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Bell className="h-5 w-5" strokeWidth={1.8} />

        {unreadCount > 0 && (
          <span className="absolute right-2 top-2 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-[#E8B0B2] px-1 text-[10px] font-semibold leading-none text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-[320px] max-w-[calc(100vw-32px)] border border-[#E7E1DE] bg-white shadow-[0_18px_45px_rgba(31,27,26,0.10)] sm:w-[380px]">
          <div className="flex items-center justify-between border-b border-[#E7E1DE] px-4 py-4">
            <div>
              <h3 className="text-[16px] font-semibold text-[#1F1B1A]">
                Notifications
              </h3>
              <p className="mt-1 text-[13px] text-[#6F6A67]">
                {unreadCount > 0
                  ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                  : "All caught up"}
              </p>
            </div>

            <button
              type="button"
              onClick={markAllAsRead}
              className="flex items-center gap-1.5 text-[13px] font-medium text-[#E3B2B2] transition hover:text-[#DFA1A3]"
            >
              <CheckCheck className="h-4 w-4" />
              Mark read
            </button>
          </div>

          <div className="max-h-[360px] overflow-y-auto">
            {notifications.map((notification) => (
              <button
                key={notification.id}
                type="button"
                onClick={closeDropdown}
                className="flex w-full gap-3 border-b border-[#F1ECE9] px-4 py-4 text-left transition last:border-b-0 hover:bg-[#FBF1F1]"
              >
                <span
                  className={[
                    "mt-1 h-2.5 w-2.5 shrink-0 rounded-full",
                    notification.isUnread ? "bg-[#E8B0B2]" : "bg-[#D8D2CE]",
                  ].join(" ")}
                />

                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-3">
                    <span className="truncate text-[14px] font-semibold text-[#1F1B1A]">
                      {notification.title}
                    </span>

                    <span className="shrink-0 rounded-full bg-[#F8F6F4] px-2 py-1 text-[11px] font-medium text-[#6F6A67]">
                      {notification.type}
                    </span>
                  </span>

                  <span className="mt-1 block text-[13px] leading-[1.45] text-[#6F6A67]">
                    {notification.message}
                  </span>

                  <span className="mt-2 flex items-center gap-1.5 text-[12px] text-[#8A8581]">
                    <Clock className="h-3.5 w-3.5" />
                    {notification.time}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className="border-t border-[#E7E1DE] px-4 py-3">
            <button
              type="button"
              onClick={closeDropdown}
              className="h-10 w-full bg-[#FBF1F1] text-[14px] font-medium text-[#1F1B1A] transition hover:bg-[#E8B0B2]"
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}