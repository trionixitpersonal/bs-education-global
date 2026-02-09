"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { UniversityCard } from "@/components/find-universities/university-card";
import { UniversityFilters } from "@/components/find-universities/university-filters";
import FinduniversityForm from "@/components/ui/FinduniversityForm";
import { University } from "@/lib/mock-data/types";

export default function FindUniversitiesPage() {
  const searchParams = useSearchParams();
  const [universities, setUniversities] = useState<University[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    searchQuery: "",
    country: null as string | null,
    program: null as string | null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [universitiesRes, programsRes] = await Promise.all([
          fetch('/api/universities', { cache: 'no-store' }),
          fetch('/api/programs', { cache: 'no-store' })
        ]);
        
        if (universitiesRes.ok) {
          const universityData = await universitiesRes.json();
          setUniversities(universityData || []);
          setFilteredUniversities(universityData || []);
        }

        if (programsRes.ok) {
          const programData = await programsRes.json();
          setPrograms(programData || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Apply filters from URL parameters on page load
  useEffect(() => {
    const country = searchParams.get('country');
    const program = searchParams.get('program');
    
    if (country || program) {
      setFilters(prev => ({
        ...prev,
        country: country || prev.country,
        program: program || prev.program,
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    let result = [...universities];

    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (uni) =>
          uni.name.toLowerCase().includes(query) ||
          uni.country.toLowerCase().includes(query) ||
          uni.city.toLowerCase().includes(query) ||
          uni.description?.toLowerCase().includes(query)
      );
    }

    // Apply country filter
    if (filters.country) {
      result = result.filter((uni) => uni.country === filters.country);
    }

    // Apply program filter
    if (filters.program) {
      // Get university IDs that have programs matching the filter
      const matchingUniversityIds = programs
        .filter(prog => prog.name?.toLowerCase().includes(filters.program!.toLowerCase()))
        .map(prog => prog.university_id)
        .filter(Boolean);
      
      result = result.filter((uni) => matchingUniversityIds.includes(uni.id));
    }

    setFilteredUniversities(result);
  }, [filters, universities, programs]);

  const handleFilterChange = useCallback((newFilters: {
    searchQuery: string;
    country: string | null;
    program: string | null;
  }) => {
    setFilters(newFilters);
  }, []);

  return (
    <main className="w-full overflow-x-hidden">
      {/* Hero Section with Form */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px]" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm text-white">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              {filteredUniversities.length} Universities Available
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white lg:text-6xl">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-yellow-200 to-orange-300 bg-clip-text text-transparent">
                University Match
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
              Discover universities worldwide that match your academic goals,
              interests, and career aspirations. Search by country, program, or ranking.
            </p>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 mb-12">
              <div className="rounded-xl bg-white/10 backdrop-blur-sm p-4 border border-white/20">
                <div className="text-3xl font-bold text-white">{universities.length}+</div>
                <div className="text-sm text-blue-100">Universities</div>
              </div>
              <div className="rounded-xl bg-white/10 backdrop-blur-sm p-4 border border-white/20">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-blue-100">Countries</div>
              </div>
              <div className="rounded-xl bg-white/10 backdrop-blur-sm p-4 border border-white/20">
                <div className="text-3xl font-bold text-white">1000+</div>
                <div className="text-sm text-blue-100">Programs</div>
              </div>
            </div>

            {/* Search Form */}
            <div className="w-full">
              <FinduniversityForm />
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-gray-50 border-b border-gray-200 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <UniversityFilters onFilterChange={handleFilterChange} />
        </div>
      </section>

      {/* Results Section */}
      <section className="bg-white py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Results Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isLoading ? "Loading..." : `${filteredUniversities.length} Universities Found`}
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                {filters.country && `in ${filters.country}`}
                {filters.program && ` • ${filters.program}`}
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-xl border border-gray-200 bg-white p-6 animate-pulse">
                  <div className="h-48 w-full bg-gray-200 rounded-lg mb-4" />
                  <div className="h-6 w-24 bg-gray-200 rounded mb-3" />
                  <div className="h-8 w-3/4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-2/3 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {filteredUniversities.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredUniversities.map((university) => (
                    <UniversityCard key={university.id} university={university} />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">No universities found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search query to find more results.
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