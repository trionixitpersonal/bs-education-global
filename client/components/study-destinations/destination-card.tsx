import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Heart, ArrowRight } from "lucide-react";

interface Destination {
  id: string;
  city: string;
  country: string;
  cost_of_living: string;
  student_life?: string;
  culture?: string;
  image_url?: string;
}

interface DestinationCardProps {
  destination: Destination;
  onDetailsClick?: () => void;
}

export function DestinationCard({ destination, onDetailsClick }: DestinationCardProps) {
  return (
    <div className="group relative flex flex-col rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">
            {destination.city}, {destination.country}
          </h3>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2 text-sm">
        <DollarSign className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">Cost of Living:</span>
        <span className="font-medium text-foreground">
          {destination.cost_of_living}
        </span>
      </div>

      {destination.student_life && (
        <div className="mb-4">
          <div className="mb-2 flex items-center gap-2 text-sm">
            <Heart className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-muted-foreground">Student Life:</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {destination.student_life}
          </p>
        </div>
      )}

      {destination.culture && (
        <div className="mb-4">
          <span className="font-medium text-muted-foreground text-sm">Culture:</span>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {destination.culture}
          </p>
        </div>
      )}

      <Button onClick={onDetailsClick} className="mt-auto w-full" variant="outline">
        Learn More
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}