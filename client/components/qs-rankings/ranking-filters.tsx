"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { QSRanking } from "@/lib/mock-data/types";

export function RankingFilters() {
  const [selectedRegion, setSelectedRegion] = useState<QSRanking["region"] | null>(null);
  const [selectedDiscipline, setSelectedDiscipline] = useState<QSRanking["discipline"] | null>(null);

  const regions: QSRanking["region"][] = [
    "Global",
    "Asia",
    "Europe",
    "North America",
    "Latin America",
    "Middle East",
    "Africa",
  ];

  const disciplines: QSRanking["discipline"][] = [
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
              onClick={() =>
                setSelectedRegion(selectedRegion === region ? null : region)
              }
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
              onClick={() =>
                setSelectedDiscipline(
                  selectedDiscipline === discipline ? null : discipline
                )
              }
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