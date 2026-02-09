import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    discover: [
      { name: "Universities", href: "/find-universities" },
      { name: "Programs", href: "/compare-programs" },
      { name: "Scholarships", href: "/scholarships" },
      { name: "Countries", href: "/study-destinations" },
      { name: "QS Rankings", href: "/qs-rankings" },
    ],
    visa: [
      { name: "Visa Guide", href: "/visa-guide" },
      { name: "Documentation", href: "/documentation" },
      { name: "Application Process", href: "/application-process" },
      { name: "Country Requirements", href: "/country-requirements" },
      { name: "Interview Preparation", href: "/interview-preparation" },
    ],
    support: [
      { name: "Help Center", href: "/support" },
      { name: "Resources", href: "/resources" },
      { name: "Post-Arrival Support", href: "/post-arrival-support" },
      { name: "FAQs", href: "/support#faqs" },
      { name: "Contact Us", href: "/support#contact" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
  ];

  return (
    <footer className="w-full border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-6">
            {/* Logo and Description */}
            <div className="lg:col-span-2 space-y-5">
              <Link href="/" className="inline-block">
                <Image
                  src="/logos/bs_edu_logo_large.png"
                  alt="BS Edu Logo"
                  width={150}
                  height={50}
                  className="h-auto w-auto"
                />
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                Your trusted partner for personalized admission support. Get
                academic details from universities in just a few clicks.
              </p>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a
                    href="mailto:info@bsedu.com"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    info@bsedu.com
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a
                    href="tel:+1234567890"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">123 Education Street, City, Country</span>
                </div>
              </div>
            </div>

            {/* Discover Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Discover
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.discover.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visa Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Visa
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.visa.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Support
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Company
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {currentYear} BS Edu. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
