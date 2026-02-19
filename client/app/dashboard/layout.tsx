import { ReactNode } from "react";
import { requireAuth } from "@/lib/auth/auth-utils";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAuth();

  return (
    <DashboardShell>{children}</DashboardShell>
  );
}
