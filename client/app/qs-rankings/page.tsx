"use client";

import { useEffect, useState, useCallback } from "react";
import { RankingTable } from "@/components/qs-rankings/ranking-table";
import { RankingFilters } from "@/components/qs-rankings/ranking-filters";

export default function QSRankingsPage() {
  const [rankings, setRankings] = useState<any[]>([]);
  const [filteredRankings, setFilteredRankings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<{ region: string | null; discipline: string | null }>({
    region: null,
    discipline: null,
  });

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await fetch("/api/qs-rankings");
        const data = await response.json();
        setRankings(data || []);
        setFilteredRankings(data || []);
      } catch (error) {
        console.error("Failed to fetch rankings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRankings();
  }, []);

  useEffect(() => {
    let filtered = [...rankings];

    if (filters.region) {
      filtered = filtered.filter((r) => r.region === filters.region);
    }

    if (filters.discipline) {
      filtered = filtered.filter((r) => r.discipline === filters.discipline);
    }

    setFilteredRankings(filtered);
  }, [filters, rankings]);

  const handleFilterChange = useCallback((newFilters: { region: string | null; discipline: string | null }) => {
    setFilters(newFilters);
  }, []);

  return (
    <main className="w-full overflow-x-hidden pt-24 lg:pt-28">
      <section className="w-full bg-background py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              QS World University Rankings
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Explore comprehensive QS rankings by region and academic discipline
              to evaluate institutions worldwide.
            </p>
          </div>

          <RankingFilters onFilterChange={handleFilterChange} />

          {isLoading ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">Loading rankings...</p>
            </div>
          ) : (
            <>
              <div className="mt-8">
                <RankingTable rankings={filteredRankings} />
              </div>

              {filteredRankings.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">
                    No rankings found. Try adjusting your filters.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}