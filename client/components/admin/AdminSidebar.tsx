"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  TrendingUp,
  MapPin,
  FileText,
  HelpCircle,
  MessageSquare,
  Users,
  Settings,
  Award,
  Plane,
  FileClock,
  Globe,
  MessageCircleQuestion,
  Luggage,
  Briefcase,
  Info,
  ClipboardList,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: ClipboardList, label: "Applications", href: "/admin/dashboard/applications" },
  { icon: GraduationCap, label: "Universities", href: "/admin/dashboard/universities" },
  { icon: BookOpen, label: "Programs", href: "/admin/dashboard/programs" },
  { icon: Award, label: "Scholarships", href: "/admin/dashboard/scholarships" },
  { icon: TrendingUp, label: "QS Rankings", href: "/admin/dashboard/rankings" },
  { icon: MapPin, label: "Destinations", href: "/admin/dashboard/destinations" },
  { icon: Plane, label: "Visa Guides", href: "/admin/dashboard/visa-guides" },
  { icon: FileClock, label: "Documentation", href: "/admin/dashboard/documentation" },
  { icon: Globe, label: "Country Requirements", href: "/admin/dashboard/country-requirements" },
  { icon: MessageCircleQuestion, label: "Interview Prep", href: "/admin/dashboard/interview-preparation" },
  { icon: Luggage, label: "Post Arrival", href: "/admin/dashboard/post-arrival-support" },
  { icon: FileText, label: "Resources", href: "/admin/dashboard/resources" },
  { icon: HelpCircle, label: "FAQs", href: "/admin/dashboard/faqs" },
  { icon: MessageSquare, label: "Contact", href: "/admin/dashboard/contact" },
  { icon: Users, label: "Users", href: "/admin/dashboard/users" },
  { icon: Info, label: "About Us", href: "/admin/dashboard/about" },
  { icon: FileText, label: "Blog Posts", href: "/admin/dashboard/blog" },
  { icon: Briefcase, label: "Careers", href: "/admin/dashboard/careers" },
  { icon: Settings, label: "Settings", href: "/admin/dashboard/settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white">
      <div className="flex h-full flex-col">
        <div className="p-4">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8" />
            <span className="text-xl font-bold">BS Edu Admin</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
