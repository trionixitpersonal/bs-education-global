import { X, MapPin, DollarSign, Heart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Destination {
  id: string;
  city: string;
  country: string;
  cost_of_living: string;
  student_life?: string;
  culture?: string;
  image_url?: string;
}

interface DestinationDetailsDialogProps {
  destination: Destination;
  onClose: () => void;
}

export function DestinationDetailsDialog({ destination, onClose }: DestinationDetailsDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div 
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-6">
          <div className="flex items-center gap-3">
            <MapPin className="h-6 w-6 text-primary" />
            <div>
              <h2 className="text-2xl font-bold">{destination.city}</h2>
              <p className="text-sm text-muted-foreground">{destination.country}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image */}
          {destination.image_url && (
            <div className="relative h-64 w-full overflow-hidden rounded-lg">
              <img
                src={destination.image_url}
                alt={`${destination.city}, ${destination.country}`}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* Cost of Living */}
          <div className="rounded-lg bg-primary/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Cost of Living</h3>
            </div>
            <p className="text-2xl font-bold text-primary">{destination.cost_of_living}</p>
          </div>

          {/* Student Life */}
          {destination.student_life && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Heart className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Student Life</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {destination.student_life}
              </p>
            </div>
          )}

          {/* Culture */}
          {destination.culture && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Globe className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">Culture & Lifestyle</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {destination.culture}
              </p>
            </div>
          )}
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 border-t bg-white p-6">
          <div className="flex gap-3">
            <Button onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
