"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FileText, GraduationCap, Upload, Clock, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    totalDocuments: 0,
  });

  useEffect(() => {
    // Fetch user stats
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/dashboard/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const statCards = [
    {
      title: "Total Applications",
      value: stats.totalApplications,
      icon: GraduationCap,
      color: "bg-blue-500",
      href: "/dashboard/applications",
    },
    {
      title: "Pending Review",
      value: stats.pendingApplications,
      icon: Clock,
      color: "bg-yellow-500",
      href: "/dashboard/applications?status=pending",
    },
    {
      title: "Approved",
      value: stats.approvedApplications,
      icon: CheckCircle,
      color: "bg-green-500",
      href: "/dashboard/applications?status=approved",
    },
    {
      title: "Documents",
      value: stats.totalDocuments,
      icon: FileText,
      color: "bg-purple-500",
      href: "/dashboard/documents",
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Welcome back, {session?.user?.name?.split(" ")[0] || "Student"}! 👋
        </h1>
        <p className="text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base">
          Track your university applications and manage your documents all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link href="/dashboard/applications">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto">
              <GraduationCap className="h-4 w-4 mr-2" />
              New Application
            </Button>
          </Link>
          <Link href="/dashboard/documents">
            <Button variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
              <Upload className="h-4 w-4 mr-2" />
              Upload Documents
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`${stat.color} rounded-lg p-2 sm:p-3`}>
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
              </div>
              <h3 className="text-gray-600 text-xs sm:text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Recent Applications */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
            <Link href="/dashboard/applications" className="text-sm text-blue-600 hover:text-blue-700">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {stats.totalApplications === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <GraduationCap className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">No applications yet</p>
                <Link href="/dashboard/applications">
                  <Button variant="outline" className="mt-4">
                    Create your first application
                  </Button>
                </Link>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Your recent applications will appear here</p>
            )}
          </div>
        </div>

        {/* Recent Documents */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Documents</h2>
            <Link href="/dashboard/documents" className="text-sm text-blue-600 hover:text-blue-700">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {stats.totalDocuments === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">No documents uploaded</p>
                <Link href="/dashboard/documents">
                  <Button variant="outline" className="mt-4">
                    Upload your first document
                  </Button>
                </Link>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Your recent documents will appear here</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h2>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/find-universities"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <div className="bg-blue-100 rounded-lg p-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Find Universities</p>
              <p className="text-xs text-gray-500">Explore programs</p>
            </div>
          </Link>
          <Link
            href="/scholarships"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-colors"
          >
            <div className="bg-green-100 rounded-lg p-2">
              <FileText className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Scholarships</p>
              <p className="text-xs text-gray-500">Find funding</p>
            </div>
          </Link>
          <Link
            href="/visa-guide"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-colors"
          >
            <div className="bg-purple-100 rounded-lg p-2">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Visa Guide</p>
              <p className="text-xs text-gray-500">Application help</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
