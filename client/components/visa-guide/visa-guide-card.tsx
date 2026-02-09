import { VisaGuide } from "@/lib/mock-data/types";
import { Button } from "@/components/ui/button";
import {
  Clock,
  DollarSign,
  FileText,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface VisaGuideCardProps {
  guide: VisaGuide;
}

export function VisaGuideCard({ guide }: VisaGuideCardProps) {
  return (
    <div className="group relative flex flex-col rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-4xl">{guide.flag}</span>
        <div>
          <h3 className="text-xl font-semibold">{guide.country}</h3>
          <p className="text-sm text-muted-foreground">{guide.visaType}</p>
        </div>
      </div>

      <p className="mb-6 text-sm text-muted-foreground line-clamp-3">
        {guide.description}
      </p>

      <div className="mb-6 space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Processing:</span>
          <span className="font-medium">{guide.processingTime}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Cost:</span>
          <span className="font-medium">{guide.cost}</span>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div>
            <span className="text-muted-foreground">Documents:</span>
            <span className="ml-1 font-medium">{guide.documents.length} required</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          Key Requirements:
        </p>
        <ul className="space-y-1">
          {guide.requirements.slice(0, 3).map((req, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs">
              <CheckCircle2 className="h-3 w-3 mt-0.5 text-primary flex-shrink-0" />
              <span className="text-muted-foreground line-clamp-1">{req}</span>
            </li>
          ))}
          {guide.requirements.length > 3 && (
            <li className="text-xs text-muted-foreground">
              +{guide.requirements.length - 3} more requirements
            </li>
          )}
        </ul>
      </div>

      <Button asChild className="mt-auto w-full" variant="outline">
        {guide.guideLink ? (
          <a href={guide.guideLink} target="_blank" rel="noopener noreferrer">
            View Full Guide
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        ) : (
          <Link href={`/visa-guide/${guide.id}`}>
            View Full Guide
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        )}
      </Button>
    </div>
  );
}
