"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavItem {
  name: string;
  link: string;
}

interface NavbarWrapperProps {
  children: React.ReactNode;
  navItems?: NavItem[];
  showLoginButton?: boolean;
  showBookCallButton?: boolean;
  onLoginClick?: () => void;
  onBookCallClick?: () => void;
}

const discoverItems: { title: string; href: string; description: string }[] = [
  {
    title: "Find Universities",
    href: "/find-universities",
    description:
      "Search and discover universities worldwide that match your academic goals and preferences.",
  },
  {
    title: "Compare Programs",
    href: "/compare-programs",
    description:
      "Compare academic programs across multiple universities to find your perfect fit.",
  },
  {
    title: "QS Rankings",
    href: "/qs-rankings",
    description:
      "Explore comprehensive QS rankings by region and academic discipline to evaluate institutions.",
  },
  {
    title: "Study Destinations",
    href: "/study-destinations",
    description:
      "Get detailed insights into student life at leading universities in vibrant cities worldwide.",
  },
];

const visaItems: { title: string; href: string; description: string }[] = [
  {
    title: "Visa Guide",
    href: "/visa-guide",
    description:
      "Complete guide to student visa requirements and application processes for major study destinations.",
  },
  {
    title: "Documentation Support",
    href: "/documentation",
    description:
      "Get help with preparing and organizing all required documents for your visa application.",
  },
  {
    title: "Application Process",
    href: "/application-process",
    description:
      "Step-by-step guidance through the visa application process from start to approval.",
  },
  {
    title: "Country-Specific Requirements",
    href: "#country-requirements",
    description:
      "Detailed visa requirements and procedures for Australia, UK, USA, Canada, and more.",
  },
  {
    title: "Visa Interview Preparation",
    href: "#visa-interview",
    description:
      "Expert tips and practice resources to help you prepare for your visa interview.",
  },
  {
    title: "Post-Arrival Support",
    href: "#post-arrival",
    description:
      "Essential information and support for your first steps after arriving in your study destination.",
  },
];

export function NavbarWrapper({
  children,
  showLoginButton = true,
  showBookCallButton = true,
  onLoginClick,
  onBookCallClick,
}: NavbarWrapperProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mobile menu items - simplified version for mobile
  const mobileMenuItems = [
    { name: "Home", link: "/" },
    { name: "Find Universities", link: "/find-universities" },
    { name: "Compare Programs", link: "/compare-programs" },
    { name: "Visa Guide", link: "/visa-guide" },
    { name: "Scholarships", link: "/scholarships" },
    { name: "Resources", link: "/resources" },
    { name: "Support", link: "/support" },
  ];

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody className="bg-white dark:bg-white">
          <NavbarLogo />
          <NavigationMenu className="ml-6 flex-1">
            <NavigationMenuList className="flex-wrap">
              {/* <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem> */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Discover</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-4">
                      <NavigationMenuLink asChild>
                        <Link
                          className="bg-blue-300 from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                          href="/"
                        >
                          <div className="mb-2 text-lg font-medium sm:mt-4">
                            Personalised Admission Support
                          </div>
                          <p className="text-muted-foreground text-sm leading-tight">
                            Get academic details from universities in just a{" "}
                            <strong>few clicks</strong>.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {discoverItems.map((item) => (
                      <ListItem
                        key={item.title}
                        href={item.href}
                        title={item.title}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Visa</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {visaItems.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem className="hidden md:block">
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/scholarships">Scholarships</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="hidden md:block">
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/resources">Resources</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="hidden md:block">
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/support">Support</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              {/* <NavigationMenuItem className="hidden md:block">
                <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="#" className="flex-row items-center gap-2">
                          <CircleHelpIcon />
                          Backlog
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="#" className="flex-row items-center gap-2">
                          <CircleIcon />
                          To Do
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="#" className="flex-row items-center gap-2">
                          <CircleCheckIcon />
                          Done
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem> */}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="ml-auto flex items-center gap-4 flex-shrink-0">
            <NavbarButton variant="secondary" onClick={onLoginClick}>
              Book a call
            </NavbarButton>
            <NavbarButton variant="primary" onClick={onBookCallClick}>
              Login
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {mobileMenuItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              {showLoginButton && (
                <NavbarButton
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLoginClick?.();
                  }}
                  variant="secondary"
                  className="w-full"
                >
                  Login
                </NavbarButton>
              )}
              {showBookCallButton && (
                <NavbarButton
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onBookCallClick?.();
                  }}
                  variant="primary"
                  className="w-full"
                >
                  Book a call
                </NavbarButton>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Content wrapper - preserves the structure needed for navbar resizing */}
      {children}
    </div>
  );
}
function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
