"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DestinationFiltersProps {
  onFilterChange: (filters: { country: string | null }) => void;
}

export function DestinationFilters({ onFilterChange }: DestinationFiltersProps) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "Switzerland",
    "Singapore",
    "Japan",
  ];

  const clearFilters = () => {
    setSelectedCountry(null);
    onFilterChange({ country: null });
  };

  const hasActiveFilters = selectedCountry;

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Country:
          </span>
          {countries.map((country) => (
            <Button
              key={country}
              variant={selectedCountry === country ? "default" : "outline"}
              size="sm"
              onClick={() => {
                const newCountry = selectedCountry === country ? null : country;
                setSelectedCountry(newCountry);
                onFilterChange({ country: newCountry });
              }}
            >
              {country}
            </Button>
          ))}
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="ml-auto"
          >
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}