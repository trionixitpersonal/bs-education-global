"use client";

import { Program } from "@/lib/mock-data/types";
import { GraduationCap, Clock, DollarSign, FileText } from "lucide-react";

interface ProgramComparisonTableProps {
  programs: Program[];
}

export function ProgramComparisonTable({
  programs,
}: ProgramComparisonTableProps) {
  if (programs.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-muted p-8 text-center">
        <p className="text-muted-foreground">
          Select at least 2 programs to compare
        </p>
      </div>
    );
  }

  const comparisonFields = [
    {
      label: "University",
      icon: GraduationCap,
      getValue: (p: Program) => p.university,
    },
    {
      label: "Level",
      getValue: (p: Program) => p.level,
    },
    {
      label: "Duration",
      icon: Clock,
      getValue: (p: Program) => p.duration,
    },
    {
      label: "Tuition",
      icon: DollarSign,
      getValue: (p: Program) => p.tuition,
    },
    {
      label: "Requirements",
      icon: FileText,
      getValue: (p: Program) => `${p.requirements.length} items`,
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="p-4 text-left font-semibold">Criteria</th>
            {programs.map((program) => (
              <th key={program.id} className="p-4 text-left font-semibold">
                <div className="max-w-xs">
                  <div className="font-medium">{program.name}</div>
                  <div className="text-sm font-normal text-muted-foreground">
                    {program.university}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonFields.map((field, idx) => (
            <tr key={idx} className="border-b border-border">
              <td className="p-4">
                <div className="flex items-center gap-2">
                  {field.icon && <field.icon className="h-4 w-4 text-muted-foreground" />}
                  <span className="font-medium">{field.label}</span>
                </div>
              </td>
              {programs.map((program) => (
                <td key={program.id} className="p-4">
                  {field.label === "Requirements" ? (
                    <div className="space-y-1">
                      <span className="text-sm">{field.getValue(program)}</span>
                      <details className="text-xs">
                        <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                          View all
                        </summary>
                        <ul className="mt-2 space-y-1 pl-4">
                          {program.requirements.map((req, reqIdx) => (
                            <li key={reqIdx} className="list-disc text-muted-foreground">
                              {req}
                            </li>
                          ))}
                        </ul>
                      </details>
                    </div>
                  ) : (
                    <span className="text-sm">{field.getValue(program)}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Description</span>
              </div>
            </td>
            {programs.map((program) => (
              <td key={program.id} className="p-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {program.description}
                </p>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}