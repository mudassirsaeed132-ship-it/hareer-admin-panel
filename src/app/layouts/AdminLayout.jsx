import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppShell from "../../shared/layout/AppShell";
import Sidebar from "../../shared/layout/Sidebar";
import Topbar from "../../shared/layout/Topbar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <AppShell
      isCollapsed={sidebarCollapsed}
      sidebar={
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
        />
      }
      header={<Topbar onOpenSidebar={() => setSidebarOpen(true)} />}
    >
      <Outlet />
    </AppShell>
  );
}