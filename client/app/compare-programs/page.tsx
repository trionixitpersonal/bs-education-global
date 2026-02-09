"use client";

import { useState, useEffect } from "react";
import { Program } from "@/lib/mock-data/types";
import { ProgramSelector } from "@/components/compare-programs/program-selector";
import { ProgramComparisonTable } from "@/components/compare-programs/program-comparison-table";

export default function CompareProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedPrograms, setSelectedPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPrograms() {
      try {
        const response = await fetch('/api/programs');
        const data = await response.json();
        setPrograms(data);
      } catch (error) {
        console.error("Error loading programs:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPrograms();
  }, []);

  const handleSelect = (program: Program) => {
    if (selectedPrograms.length < 4) {
      setSelectedPrograms([...selectedPrograms, program]);
    }
  };

  const handleRemove = (programId: string) => {
    setSelectedPrograms(
      selectedPrograms.filter((p) => p.id !== programId)
    );
  };

  if (loading) {
    return (
      <main className="w-full overflow-x-hidden pt-24 lg:pt-28">
        <section className="w-full bg-background py-12 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <div className="mb-4 h-12 w-64 animate-pulse rounded bg-muted mx-auto" />
              <div className="mx-auto h-6 w-96 animate-pulse rounded bg-muted" />
            </div>
            <div className="h-96 animate-pulse rounded-lg bg-muted" />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="w-full overflow-x-hidden pt-24 lg:pt-28">
      <section className="w-full bg-background py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Compare Programs
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Compare academic programs across multiple universities to find
              your perfect fit. Select up to 4 programs to compare side by
              side.
            </p>
          </div>

          <ProgramSelector
            programs={programs}
            selectedPrograms={selectedPrograms}
            onSelect={handleSelect}
            onRemove={handleRemove}
            maxSelections={4}
          />

          {selectedPrograms.length >= 2 && (
            <div className="mt-8">
              <ProgramComparisonTable programs={selectedPrograms} />
            </div>
          )}

          {selectedPrograms.length < 2 && (
            <div className="rounded-lg border border-border bg-muted p-8 text-center">
              <p className="text-muted-foreground">
                Select at least 2 programs to start comparing
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}