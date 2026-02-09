import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect("/login");
  }
  
  return session;
}

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect("/admin/login");
  }
  
  const user = session.user as any;
  if (user.role !== "admin" && user.role !== "super_admin") {
    redirect("/");
  }
  
  return session;
}
