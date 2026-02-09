"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export function AdminHeader() {
  const { data: session } = useSession();

  return (
    <header className="border-b bg-white px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          {session?.user && (
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                <User className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">
                  {session.user.name || session.user.email}
                </span>
                <span className="text-xs text-gray-500 capitalize">
                  {(session.user as any).role || 'Admin'}
                </span>
              </div>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}

