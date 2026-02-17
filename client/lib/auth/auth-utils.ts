import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function requireAuth() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      redirect("/login");
    }

    return session;
  } catch (error) {
    console.error("Failed to get session:", error);
    redirect("/login");
  }
}

export async function requireAdmin() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      redirect("/admin/login");
    }

    const user = session.user as any;
    if (user.role !== "admin" && user.role !== "super_admin") {
      redirect("/");
    }

    return session;
  } catch (error) {
    console.error("Failed to get admin session:", error);
    redirect("/admin/login");
  }
}
