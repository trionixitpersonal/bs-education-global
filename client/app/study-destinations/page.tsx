"use client";

import { useEffect, useState, useCallback } from "react";
import { DestinationCard } from "@/components/study-destinations/destination-card";
import { DestinationFilters } from "@/components/study-destinations/destination-filters";
import { DestinationDetailsDialog } from "@/components/study-destinations/destination-details-dialog";

export default function StudyDestinationsPage() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState<any | null>(null);
  const [filters, setFilters] = useState<{ country: string | null }>({
    country: null,
  });

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("/api/study-destinations");
        const data = await response.json();
        setDestinations(data || []);
        setFilteredDestinations(data || []);
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  useEffect(() => {
    let filtered = [...destinations];

    if (filters.country) {
      filtered = filtered.filter((d) => d.country === filters.country);
    }

    setFilteredDestinations(filtered);
  }, [filters, destinations]);

  const handleFilterChange = useCallback((newFilters: { country: string | null }) => {
    setFilters(newFilters);
  }, []);

  return (
    <main className="w-full overflow-x-hidden pt-24 lg:pt-28">
      <section className="w-full bg-background py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Study Destinations
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Get detailed insights into student life at leading universities in
              vibrant cities worldwide. Discover cost of living, culture, and
              academic opportunities.
            </p>
          </div>

          <DestinationFilters onFilterChange={handleFilterChange} />

          {isLoading ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">Loading destinations...</p>
            </div>
          ) : (
            <>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredDestinations.map((destination) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                    onDetailsClick={() => setSelectedDestination(destination)}
                  />
                ))}
              </div>

              {filteredDestinations.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">
                    No destinations found. Try adjusting your filters.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {selectedDestination && (
        <DestinationDetailsDialog
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}
    </main>
  );
}