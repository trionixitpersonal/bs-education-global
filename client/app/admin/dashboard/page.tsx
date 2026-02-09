import { requireAdmin } from "@/lib/auth/auth-utils";
import { StatsCards } from "@/components/admin/StatsCards";

export default async function AdminDashboardPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome to BS Education admin dashboard</p>
      </div>

      <StatsCards />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-semibold">Recent Activity</h3>
          <p className="text-sm text-gray-500">No recent activity to display</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>
          <div className="space-y-2">
            <a
              href="/admin/dashboard/universities"
              className="block rounded-md bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
            >
              Add New University
            </a>
            <a
              href="/admin/dashboard/scholarships"
              className="block rounded-md bg-green-50 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100"
            >
              Add New Scholarship
            </a>
            <a
              href="/admin/dashboard/programs"
              className="block rounded-md bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-100"
            >
              Add New Program
            </a>
            <a
              href="/admin/dashboard/blog"
              className="block rounded-md bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700 hover:bg-orange-100"
            >
              Manage Blog Posts
            </a>
            <a
              href="/admin/dashboard/about"
              className="block rounded-md bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100"
            >
              Edit About Us
            </a>
            <a
              href="/admin/dashboard/careers"
              className="block rounded-md bg-pink-50 px-4 py-2 text-sm font-medium text-pink-700 hover:bg-pink-100"
            >
              Manage Careers
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
