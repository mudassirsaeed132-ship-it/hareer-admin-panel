import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppShell from "../../shared/layout/AppShell";
import Sidebar from "../../shared/layout/Sidebar";
import Topbar from "../../shared/layout/Topbar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AppShell
      sidebar={
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      }
      header={<Topbar onOpenSidebar={() => setSidebarOpen(true)} />}
    >
      <Outlet />
    </AppShell>
  );
}