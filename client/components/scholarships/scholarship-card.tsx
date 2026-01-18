import { Scholarship } from "@/lib/mock-data/types";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, GraduationCap, DollarSign } from "lucide-react";
import Link from "next/link";

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

export function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  const isDeadlineSoon =
    new Date(scholarship.deadline) <
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  return (
    <div className="group relative flex flex-col rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="mb-2 text-xl font-semibold leading-tight">
            {scholarship.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {scholarship.description}
          </p>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <DollarSign className="h-4 w-4" />
        <span className="font-medium text-foreground">{scholarship.amount}</span>
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{scholarship.country}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <GraduationCap className="h-4 w-4" />
          <span>{scholarship.level}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            Deadline:{" "}
            <span
              className={isDeadlineSoon ? "font-semibold text-destructive" : ""}
            >
              {new Date(scholarship.deadline).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </span>
        </div>
      </div>

      <div className="mb-4">
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {scholarship.category}
        </span>
      </div>

      <div className="mt-auto flex gap-2">
        <Button asChild className="flex-1">
          <Link href={scholarship.applicationLink}>Apply Now</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/scholarships/${scholarship.id}`}>Details</Link>
        </Button>
      </div>
    </div>
  );
}
