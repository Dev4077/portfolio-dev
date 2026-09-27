import { checkAuth } from "@/app/actions/auth";

export default async function AdminDashboard() {
  await checkAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome to the admin dashboard. Use the sidebar to navigate to different sections to edit your portfolio.</p>
    </div>
  );
}
