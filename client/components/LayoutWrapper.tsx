"use client";

import { usePathname, useRouter } from "next/navigation";
import { NavbarWrapper } from "@/components/ui/navbarlayout";
import Footer from "@/components/Footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Don't show navbar and footer on admin routes
  const isAdminRoute = pathname?.startsWith("/admin");

  const handleLoginClick = () => {
    router.push("/login");
  };

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <NavbarWrapper onLoginClick={handleLoginClick}>{children}</NavbarWrapper>
      <Footer />
    </>
  );
}
