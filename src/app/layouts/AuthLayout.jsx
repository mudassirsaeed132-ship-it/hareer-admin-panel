import { Outlet } from "react-router-dom";
import AuthShell from "../../shared/layout/AuthShell";

export default function AuthLayout() {
  return (
    <AuthShell>
      <Outlet />
    </AuthShell>
  );
}