import {
  Bolt,
  CircleDollarSign,
  LogOut,
} from "lucide-react";

import homeIcon from "../../shared/assets/icons/home.svg";
import ordersIcon from "../../shared/assets/icons/receipt-2.svg";
import vendorsIcon from "../../shared/assets/icons/people.svg";
import usersIcon from "../../shared/assets/icons/profile-2user.svg";

export const sidebarMeta = {
  overviewLabel: "Overview",
  logoutIcon: LogOut,
};

export const navigationItems = [
  {
    label: "Dashboard",
    path: "/",
    iconType: "asset",
    icon: homeIcon,
  },
  {
    label: "Orders",
    path: "/orders",
    iconType: "asset",
    icon: ordersIcon,
  },
  {
    label: "Categories",
    path: "/categories",
    iconType: "lucide",
    icon: Bolt,
  },
  {
    label: "Vendors",
    path: "/vendors",
    iconType: "asset",
    icon: usersIcon,
  },
  {
    label: "Users",
    path: "/users",
    iconType: "asset",
    icon: vendorsIcon,
  },
  {
    label: "Payments",
    path: "/payments",
    iconType: "lucide",
    icon: CircleDollarSign,
  },
];
