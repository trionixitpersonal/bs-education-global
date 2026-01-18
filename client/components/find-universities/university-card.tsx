import { University } from "@/lib/mock-data/types";
import { Button } from "@/components/ui/button";
import { MapPin, Award, GraduationCap, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";

interface UniversityCardProps {
  university: University;
}

export function UniversityCard({ university }: UniversityCardProps) {
  return (
    <div className="group relative flex flex-col rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary">
              #{university.ranking}
            </span>
          </div>
          <h3 className="mb-2 text-xl font-semibold leading-tight">
            {university.name}
          </h3>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{university.city}, {university.country}</span>
          </div>
        </div>
      </div>

      <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
        {university.description}
      </p>

      <div className="mb-4 flex items-center gap-2 text-sm">
        <DollarSign className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">Tuition:</span>
        <span className="font-medium text-foreground">{university.tuition}</span>
      </div>

      <div className="mb-4">
        <div className="mb-2 flex items-center gap-2 text-sm">
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-muted-foreground">Programs:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {university.programs.slice(0, 3).map((program, idx) => (
            <span
              key={idx}
              className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
            >
              {program}
            </span>
          ))}
          {university.programs.length > 3 && (
            <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              +{university.programs.length - 3} more
            </span>
          )}
        </div>
      </div>

      <Button asChild className="mt-auto w-full" variant="outline">
        <Link href={`/find-universities/${university.id}`}>
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}