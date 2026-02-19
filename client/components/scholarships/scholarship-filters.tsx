"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface ScholarshipFiltersProps {
  onFilterChange: (filters: {
    searchQuery: string;
    country: string | null;
    level: string | null;
    category: string | null;
  }) => void;
}

export function ScholarshipFilters({ onFilterChange }: ScholarshipFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
  ];

  const levels = ["Undergraduate", "Graduate", "PhD", "All"];

  const categories = [
    "Merit-Based",
    "Need-Based",
    "Subject-Specific",
    "Country-Specific",
    "University-Specific",
    "Athletic",
    "Minority",
    "Research",
  ];

  const updateFilters = useCallback((search: string, country: string | null, level: string | null, category: string | null) => {
    onFilterChange({
      searchQuery: search,
      country: country,
      level: level,
      category: category,
    });
  }, [onFilterChange]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    updateFilters(value, selectedCountry, selectedLevel, selectedCategory);
  };

  const handleCountryChange = (country: string) => {
    const newCountry = selectedCountry === country ? null : country;
    setSelectedCountry(newCountry);
    updateFilters(searchQuery, newCountry, selectedLevel, selectedCategory);
  };

  const handleLevelChange = (level: string) => {
    const newLevel = selectedLevel === level ? null : level;
    setSelectedLevel(newLevel);
    updateFilters(searchQuery, selectedCountry, newLevel, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    updateFilters(searchQuery, selectedCountry, selectedLevel, newCategory);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCountry(null);
    setSelectedLevel(null);
    setSelectedCategory(null);
    updateFilters("", null, null, null);
  };

  const hasActiveFilters =
    searchQuery || selectedCountry || selectedLevel || selectedCategory;

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search scholarships..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full rounded-lg border border-input bg-background px-10 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearchChange("")}
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
              onClick={() => handleCountryChange(country)}
            >
              {country}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Level:
          </span>
          {levels.map((level) => (
            <Button
              key={level}
              variant={selectedLevel === level ? "default" : "outline"}
              size="sm"
              onClick={() => handleLevelChange(level)}
            >
              {level}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Category:
          </span>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(category)}
            >
              {category}
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
