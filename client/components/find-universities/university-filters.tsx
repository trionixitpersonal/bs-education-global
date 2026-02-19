"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Filter } from "lucide-react";

interface UniversityFiltersProps {
  onFilterChange: (filters: {
    searchQuery: string;
    country: string | null;
    program: string | null;
  }) => void;
}

export function UniversityFilters({ onFilterChange }: UniversityFiltersProps) {
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

  // Notify parent component when filters change
  useEffect(() => {
    onFilterChange({
      searchQuery,
      country: selectedCountry,
      program: selectedProgram,
    });
  }, [searchQuery, selectedCountry, selectedProgram, onFilterChange]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCountry(null);
    setSelectedProgram(null);
  };

  const hasActiveFilters =
    selectedCountry || selectedProgram;

  return (
    <div className="space-y-6">
      {/* Filters Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filter Universities</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-9 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <X className="mr-1.5 h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Filters Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Country Filter */}
        <div>
          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Country
          </label>
          <div className="flex flex-wrap gap-2">
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
                className={
                  selectedCountry === country
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 shadow-sm"
                    : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                }
              >
                {country}
              </Button>
            ))}
          </div>
        </div>

        {/* Program Filter */}
        <div>
          <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Program
          </label>
          <div className="flex flex-wrap gap-2">
            {programs.map((program) => (
              <Button
                key={program}
                variant={selectedProgram === program ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  setSelectedProgram(selectedProgram === program ? null : program)
                }
                className={
                  selectedProgram === program
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 shadow-sm"
                    : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                }
              >
                {program}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}