import AuthHeader from "../../features/auth/components/AuthHeader";
import AuthFooter from "../../features/auth/components/AuthFooter";

export default function AuthShell({ children }) {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-[#F8F6F4] text-[#1F1B1A]">
      <AuthHeader />

      <main className="flex min-h-0 flex-1 items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        {children}
      </main>

      <AuthFooter />
    </div>
  );
}