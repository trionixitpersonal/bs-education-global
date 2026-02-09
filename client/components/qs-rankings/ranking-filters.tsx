"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface RankingFiltersProps {
  onFilterChange: (filters: { region: string | null; discipline: string | null }) => void;
}

export function RankingFilters({ onFilterChange }: RankingFiltersProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null);

  const regions: string[] = [
    "Global",
    "Asia",
    "Europe",
    "North America",
    "Latin America",
    "Middle East",
    "Africa",
  ];

  const disciplines: string[] = [
    "Overall",
    "Engineering",
    "Business",
    "Medicine",
    "Arts",
    "Science",
    "Technology",
    "Law",
  ];

  const clearFilters = () => {
    setSelectedRegion(null);
    setSelectedDiscipline(null);
    onFilterChange({ region: null, discipline: null });
  };

  const hasActiveFilters = selectedRegion || selectedDiscipline;

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Region:
          </span>
          {regions.map((region) => (
            <Button
              key={region}
              variant={selectedRegion === region ? "default" : "outline"}
              size="sm"
              onClick={() => {
                const newRegion = selectedRegion === region ? null : region;
                setSelectedRegion(newRegion);
                onFilterChange({ region: newRegion, discipline: selectedDiscipline });
              }}
            >
              {region}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Discipline:
          </span>
          {disciplines.map((discipline) => (
            <Button
              key={discipline}
              variant={selectedDiscipline === discipline ? "default" : "outline"}
              size="sm"
              onClick={() => {
                const newDiscipline = selectedDiscipline === discipline ? null : discipline;
                setSelectedDiscipline(newDiscipline);
                onFilterChange({ region: selectedRegion, discipline: newDiscipline });
              }}
            >
              {discipline}
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