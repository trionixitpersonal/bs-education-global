"use client";

import { useEffect, useState } from "react";
import { ScholarshipCard } from "@/components/scholarships/scholarship-card";
import { ScholarshipFilters } from "@/components/scholarships/scholarship-filters";
import { ScholarshipDetailsDialog } from "@/components/scholarships/scholarship-details-dialog";

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [filteredScholarships, setFilteredScholarships] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedScholarship, setSelectedScholarship] = useState<any | null>(null);
  const [filters, setFilters] = useState({
    searchQuery: "",
    country: null as string | null,
    level: null as string | null,
    category: null as string | null,
  });

  useEffect(() => {
    async function fetchScholarships() {
      try {
        const response = await fetch('/api/scholarships', { cache: 'no-store' });
        if (response.ok) {
          const data = await response.json();
          const activeScholarships = data.filter((s: any) => s.is_active === true) || [];
          setScholarships(activeScholarships);
          setFilteredScholarships(activeScholarships);
        }
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchScholarships();
  }, []);

  useEffect(() => {
    let result = [...scholarships];

    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (scholarship) =>
          scholarship.title.toLowerCase().includes(query) ||
          scholarship.description.toLowerCase().includes(query) ||
          scholarship.category.toLowerCase().includes(query) ||
          scholarship.university.toLowerCase().includes(query)
      );
    }

    // Apply country filter
    if (filters.country) {
      result = result.filter((scholarship) => scholarship.country === filters.country);
    }

    // Apply level filter
    if (filters.level) {
      result = result.filter((scholarship) => 
        scholarship.level === filters.level || scholarship.level === 'All'
      );
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter((scholarship) => scholarship.category === filters.category);
    }

    setFilteredScholarships(result);
  }, [filters, scholarships]);

  const handleFilterChange = (newFilters: {
    searchQuery: string;
    country: string | null;
    level: string | null;
    category: string | null;
  }) => {
    setFilters(newFilters);
  };

  return (
    <main className="w-full overflow-x-hidden pt-24 lg:pt-28">
      <section className="w-full bg-background py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Scholarships
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Discover funding opportunities for your international education
              journey. Find scholarships that match your academic goals and
              financial needs.
            </p>
          </div>

          <ScholarshipFilters onFilterChange={handleFilterChange} />

          {isLoading ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-lg border border-border bg-card p-6 animate-pulse">
                  <div className="h-6 w-3/4 bg-muted rounded mb-4" />
                  <div className="h-4 w-full bg-muted rounded mb-2" />
                  <div className="h-4 w-2/3 bg-muted rounded" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredScholarships.map((scholarship) => (
                  <ScholarshipCard 
                    key={scholarship.id} 
                    scholarship={scholarship}
                    onDetailsClick={() => setSelectedScholarship(scholarship)}
                  />
                ))}
              </div>

              {filteredScholarships.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">
                    No scholarships found. Try adjusting your filters.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {selectedScholarship && (
        <ScholarshipDetailsDialog
          scholarship={selectedScholarship}
          onClose={() => setSelectedScholarship(null)}
        />
      )}
    </main>
  );
}
