"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Upload,
  User,
  GraduationCap,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: GraduationCap, label: "My Applications", href: "/dashboard/applications" },
  { icon: FileText, label: "My Documents", href: "/dashboard/documents" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
];

export function UserSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-gradient-to-b from-blue-900 to-blue-800 text-white">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-blue-700">
        <GraduationCap className="h-8 w-8 mr-2" />
        <h1 className="text-xl font-bold">BS Education</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-700 text-white"
                  : "text-blue-100 hover:bg-blue-800 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="border-t border-blue-700 p-6">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-blue-100 hover:bg-blue-800 hover:text-white transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
