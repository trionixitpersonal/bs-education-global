import { DocumentGuide } from "@/lib/mock-data/types";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface DocumentGuideCardProps {
  guide: DocumentGuide;
}

export function DocumentGuideCard({ guide }: DocumentGuideCardProps) {
  return (
    <div className="group relative flex flex-col rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-4">
        <h3 className="mb-2 text-xl font-semibold leading-tight">
          {guide.title}
        </h3>
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium">{guide.country}</span>
          <span>•</span>
          <span>{guide.visaType}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-2 flex items-center gap-2 text-sm">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-muted-foreground">Documents Required:</span>
        </div>
        <ul className="space-y-1">
          {guide.documents.slice(0, 4).map((doc, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="h-3 w-3 mt-1 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">{doc}</span>
            </li>
          ))}
          {guide.documents.length > 4 && (
            <li className="text-sm text-muted-foreground">
              +{guide.documents.length - 4} more documents
            </li>
          )}
        </ul>
      </div>

      <div className="mb-4">
        <span className="text-xs font-medium text-muted-foreground">
          Checklist Items: {guide.checklist.length}
        </span>
      </div>

      {guide.templates.length > 0 && (
        <div className="mb-4">
          <span className="text-xs font-medium text-muted-foreground">
            Templates Available: {guide.templates.length}
          </span>
        </div>
      )}

      <Button asChild className="mt-auto w-full" variant="outline">
        <Link href={`/documentation/${guide.id}`}>
          View Full Guide
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}