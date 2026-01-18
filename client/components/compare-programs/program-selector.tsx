"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Program } from "@/lib/mock-data/types";
import { X, Plus } from "lucide-react";

interface ProgramSelectorProps {
  programs: Program[];
  selectedPrograms: Program[];
  onSelect: (program: Program) => void;
  onRemove: (programId: string) => void;
  maxSelections?: number;
}

export function ProgramSelector({
  programs,
  selectedPrograms,
  onSelect,
  onRemove,
  maxSelections = 4,
}: ProgramSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPrograms = programs.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.university.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const canAddMore = selectedPrograms.length < maxSelections;

  return (
    <div className="mb-8 space-y-4">
      <div>
        <h3 className="mb-4 text-lg font-semibold">
          Select Programs to Compare ({selectedPrograms.length}/{maxSelections})
        </h3>
        {selectedPrograms.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {selectedPrograms.map((program) => (
              <div
                key={program.id}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2"
              >
                <span className="text-sm font-medium">
                  {program.name} - {program.university}
                </span>
                <button
                  onClick={() => onRemove(program.id)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {canAddMore && (
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Search programs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <div className="max-h-60 space-y-2 overflow-y-auto rounded-lg border border-border bg-background p-2">
            {filteredPrograms
              .filter((p) => !selectedPrograms.find((sp) => sp.id === p.id))
              .map((program) => (
                <button
                  key={program.id}
                  onClick={() => onSelect(program)}
                  className="flex w-full items-center justify-between rounded-md border border-border bg-card p-3 text-left transition-colors hover:bg-muted"
                >
                  <div className="flex-1">
                    <div className="font-medium">{program.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {program.university} • {program.level}
                    </div>
                  </div>
                  <Plus className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
          </div>
        </div>
      )}

      {!canAddMore && (
        <div className="rounded-lg border border-border bg-muted p-4 text-center text-sm text-muted-foreground">
          Maximum {maxSelections} programs selected. Remove a program to add another.
        </div>
      )}
    </div>
  );
}