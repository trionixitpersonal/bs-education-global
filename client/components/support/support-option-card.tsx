import { SupportOption } from "@/lib/mock-data/types";
import { Button } from "@/components/ui/button";
import {
  HelpCircle,
  Mail,
  MessageCircle,
  Calendar,
  FileCheck,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface SupportOptionCardProps {
  option: SupportOption;
}

const iconMap = {
  "help-circle": HelpCircle,
  mail: Mail,
  "message-circle": MessageCircle,
  calendar: Calendar,
  "file-check": FileCheck,
  "shield-check": ShieldCheck,
};

export function SupportOptionCard({ option }: SupportOptionCardProps) {
  const Icon = iconMap[option.icon as keyof typeof iconMap] || HelpCircle;

  return (
    <div className="group relative flex flex-col rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">{option.title}</h3>
      </div>

      <p className="mb-6 flex-1 text-sm text-muted-foreground">
        {option.description}
      </p>

      <Button asChild variant="outline" className="w-full">
        <Link href={option.link}>
          {option.category === "Booking"
            ? "Book Now"
            : option.category === "Contact"
            ? "Contact Us"
            : "Learn More"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
