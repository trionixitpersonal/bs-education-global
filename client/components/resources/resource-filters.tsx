"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Resource } from "@/lib/mock-data/types";

export function ResourceFilters() {
  const [selectedCategory, setSelectedCategory] = useState<
    Resource["category"] | null
  >(null);

  const categories: Resource["category"][] = [
    "Guide",
    "Article",
    "Video",
    "Tool",
    "Template",
  ];

  const clearFilters = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <span className="text-sm font-medium text-muted-foreground">
          Category:
        </span>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() =>
              setSelectedCategory(
                selectedCategory === category ? null : category
              )
            }
          >
            {category}
          </Button>
        ))}
        {selectedCategory && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="w-full sm:ml-auto sm:w-auto"
          >
            Clear Filter
          </Button>
        )}
      </div>
    </div>
  );
}
