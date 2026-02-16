"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Award, BookOpen, MapPin, Users, CheckCircle } from "lucide-react";

export function StatsCards() {
  const [stats, setStats] = useState({
    universities: 0,
    scholarships: 0,
    programs: 0,
    destinations: 0,
    totalUsers: 0,
    pendingApprovals: 0,
  });

  useEffect(() => {
    // Fetch stats from API
    const fetchStats = async () => {
      try {
        const [universities, scholarships, programs, users] = await Promise.all([
          fetch("/api/universities").then((r) => r.json()),
          fetch("/api/scholarships").then((r) => r.json()),
          fetch("/api/programs").then((r) => r.json()),
          fetch("/api/users").then((r) => r.json()),
        ]);

        // Calculate pending approvals from users
        const allUsers = Array.isArray(users) ? users : [];
        const pendingCount = allUsers.filter(
          (u: any) => u.role === "user" && !u.is_approved
        ).length;

        setStats({
          universities: universities?.length || 0,
          scholarships: scholarships?.length || 0,
          programs: programs?.length || 0,
          destinations: 0,
          totalUsers: allUsers.length || 0,
          pendingApprovals: pendingCount,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Universities",
      value: stats.universities,
      icon: GraduationCap,
      color: "bg-blue-500",
      link: "/admin/dashboard/universities",
    },
    {
      title: "Scholarships",
      value: stats.scholarships,
      icon: Award,
      color: "bg-green-500",
      link: "/admin/dashboard/scholarships",
    },
    {
      title: "Programs",
      value: stats.programs,
      icon: BookOpen,
      color: "bg-purple-500",
      link: "/admin/dashboard/programs",
    },
    {
      title: "Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-indigo-500",
      link: "/admin/dashboard/users",
    },
  ];

  const alerts = [
    {
      title: "Pending Approvals",
      value: stats.pendingApprovals,
      icon: CheckCircle,
      color: "bg-red-500",
      link: "/admin/dashboard/users",
      badge: stats.pendingApprovals > 0,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <a
              key={card.title}
              href={card.link}
              className="block rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-lg cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`rounded-lg p-3 ${card.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Alert Cards */}
      {alerts.map((alert) => {
        const Icon = alert.icon;
        return alert.badge ? (
          <a
            key={alert.title}
            href={alert.link}
            className="block rounded-lg bg-red-50 border-2 border-red-200 p-6 transition-all hover:shadow-lg cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`rounded-lg p-3 ${alert.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-red-700">{alert.title}</p>
                  <p className="text-3xl font-bold text-red-900">{alert.value} {alert.value === 1 ? "user" : "users"}</p>
                </div>
              </div>
              <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold text-white">
                Action needed
              </span>
            </div>
          </a>
        ) : null;
      })}
    </div>
  );
}
