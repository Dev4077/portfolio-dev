import { checkAuth } from "@/app/actions/auth";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await checkAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <AdminSidebar />
      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden relative">
        <div className="absolute inset-0 pixel-grid opacity-30 z-0 pointer-events-none fixed"></div>
        <div className="p-4 md:p-8 relative z-10 w-full max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
