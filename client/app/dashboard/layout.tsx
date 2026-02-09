import { ReactNode } from "react";
import { requireAuth } from "@/lib/auth/auth-utils";
import { UserSidebar } from "@/components/dashboard/UserSidebar";
import { UserHeader } from "@/components/dashboard/UserHeader";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAuth();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <UserSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <UserHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
