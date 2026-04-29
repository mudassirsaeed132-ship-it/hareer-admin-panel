import { navigationItems } from "./navigation.config";

function titleCase(value = "") {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

const staticBreadcrumbs = navigationItems.reduce(
  (acc, item) => {
    acc[item.path] = item.label;
    return acc;
  },
  {
    "/": "Dashboard",
  }
);

const customBreadcrumbLabels = {
  vendors: "Vendors",
  orders: "Orders",
  categories: "Categories",
  users: "Users",
  payments: "Payments",
  dashboard: "Dashboard",
};

export function getBreadcrumbs(pathname = "/") {
  const cleanPath = pathname.split("?")[0].replace(/\/$/, "") || "/";

  if (cleanPath === "/") {
    return [
      {
        label: "Dashboard",
        href: "/",
        isActive: true,
      },
    ];
  }

  const segments = cleanPath.split("/").filter(Boolean);

  const breadcrumbs = [
    {
      label: "Dashboard",
      href: "/",
      isActive: false,
    },
  ];

  let currentPath = "";

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    const isLast = index === segments.length - 1;
    const isDynamicSegment = /^[0-9a-zA-Z_-]{8,}$/.test(segment);

    let label =
      staticBreadcrumbs[currentPath] ||
      customBreadcrumbLabels[segment] ||
      titleCase(segment);

    if (isDynamicSegment && index > 0) {
      label = "Details";
    }

    const isDuplicateDashboard =
      label === "Dashboard" && breadcrumbs.some((item) => item.label === "Dashboard");

    if (isDuplicateDashboard) return;

    breadcrumbs.push({
      label,
      href: currentPath,
      isActive: isLast,
    });
  });

  return breadcrumbs;
}