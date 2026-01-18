"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

export function UniversityFilters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

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

  const programs = [
    "Engineering",
    "Computer Science",
    "Business",
    "Medicine",
    "Arts",
    "Sciences",
    "Law",
    "Architecture",
  ];

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCountry(null);
    setSelectedProgram(null);
  };

  const hasActiveFilters =
    searchQuery || selectedCountry || selectedProgram;

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search universities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-input bg-background px-10 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filters */}
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
              onClick={() =>
                setSelectedCountry(
                  selectedCountry === country ? null : country
                )
              }
            >
              {country}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Program:
          </span>
          {programs.map((program) => (
            <Button
              key={program}
              variant={selectedProgram === program ? "default" : "outline"}
              size="sm"
              onClick={() =>
                setSelectedProgram(selectedProgram === program ? null : program)
              }
            >
              {program}
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