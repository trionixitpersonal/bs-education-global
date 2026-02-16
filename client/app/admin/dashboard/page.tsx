import { requireAdmin } from "@/lib/auth/auth-utils";
import { StatsCards } from "@/components/admin/StatsCards";
import { AlertCircle, GraduationCap, Award, BookOpen, Users, FileText, Settings } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const adminSections = [
    {
      icon: Users,
      title: "User Management",
      description: "Manage users and approve accounts",
      link: "/admin/dashboard/users",
      color: "bg-indigo-500",
    },
    {
      icon: GraduationCap,
      title: "Universities",
      description: "Add, edit, and manage universities",
      link: "/admin/dashboard/universities",
      color: "bg-blue-500",
    },
    {
      icon: BookOpen,
      title: "Programs",
      description: "Manage academic programs",
      link: "/admin/dashboard/programs",
      color: "bg-purple-500",
    },
    {
      icon: Award,
      title: "Scholarships",
      description: "Add and manage scholarships",
      link: "/admin/dashboard/scholarships",
      color: "bg-green-500",
    },
    {
      icon: FileText,
      title: "Content Management",
      description: "Manage blog, FAQs, and resources",
      link: "/admin/dashboard/blog",
      color: "bg-orange-500",
    },
    {
      icon: Settings,
      title: "Settings",
      description: "Configure system settings",
      link: "/admin/dashboard/settings",
      color: "bg-gray-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="mt-2 text-gray-600">Welcome to BS Education admin dashboard. Manage all aspects of your platform here.</p>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Admin Sections */}
        <div className="lg:col-span-2">
          <h3 className="mb-4 text-xl font-semibold">Management Sections</h3>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {adminSections.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.title}
                  href={section.link}
                  className="rounded-lg bg-white p-5 shadow transition-all hover:shadow-lg hover:scale-105 cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`rounded-lg p-3 ${section.color} group-hover:shadow-lg transition-all`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-gray-700">{section.title}</h4>
                      <p className="text-sm text-gray-600 group-hover:text-gray-700">{section.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Links Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>
            <div className="space-y-2">
              <Link
                href="/admin/dashboard/users?tab=pending"
                className="block rounded-md bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 hover:bg-red-100 transition-colors"
              >
                👤 Approve Pending Users
              </Link>
              <Link
                href="/admin/dashboard/universities"
                className="block rounded-md bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                🎓 Add University
              </Link>
              <Link
                href="/admin/dashboard/scholarships"
                className="block rounded-md bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700 hover:bg-green-100 transition-colors"
              >
                🏆 Add Scholarship
              </Link>
              <Link
                href="/admin/dashboard/programs"
                className="block rounded-md bg-purple-50 px-4 py-2.5 text-sm font-medium text-purple-700 hover:bg-purple-100 transition-colors"
              >
                📚 Add Program
              </Link>
              <Link
                href="/admin/dashboard/blog"
                className="block rounded-md bg-orange-50 px-4 py-2.5 text-sm font-medium text-orange-700 hover:bg-orange-100 transition-colors"
              >
                ✍️ Manage Blog
              </Link>
              <Link
                href="/admin/dashboard/contact"
                className="block rounded-md bg-cyan-50 px-4 py-2.5 text-sm font-medium text-cyan-700 hover:bg-cyan-100 transition-colors"
              >
                📧 Contact Messages
              </Link>
            </div>
          </div>

          {/* Help & Resources */}
          <div className="rounded-lg bg-blue-50 border-l-4 border-blue-500 p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
            <p className="text-sm text-blue-700 mb-3">
              Check the documentation or contact support for assistance.
            </p>
            <div className="space-y-1">
              <p className="text-xs text-blue-600">
                <strong>Email:</strong> support@bsedu.com.au
              </p>
              <p className="text-xs text-blue-600">
                <strong>Phone:</strong> +61 1300 598 410
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
