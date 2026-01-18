"use client";

import { QSRanking } from "@/lib/mock-data/types";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { useState } from "react";

interface RankingTableProps {
  rankings: QSRanking[];
}

export function RankingTable({ rankings }: RankingTableProps) {
  const [sortBy, setSortBy] = useState<"rank" | "score">("rank");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedRankings = [...rankings].sort((a, b) => {
    if (sortBy === "rank") {
      return sortOrder === "asc" ? a.rank - b.rank : b.rank - a.rank;
    } else {
      return sortOrder === "asc" ? a.score - b.score : b.score - a.score;
    }
  });

  const handleSort = (field: "rank" | "score") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  if (rankings.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-muted p-8 text-center">
        <p className="text-muted-foreground">No rankings found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="p-4 text-left">
              <button
                onClick={() => handleSort("rank")}
                className="flex items-center gap-2 font-semibold hover:text-primary"
              >
                Rank
                {sortBy === "rank" ? (
                  sortOrder === "asc" ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )
                ) : (
                  <Minus className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </th>
            <th className="p-4 text-left font-semibold">University</th>
            <th className="p-4 text-left font-semibold">Country</th>
            <th className="p-4 text-left font-semibold">Region</th>
            <th className="p-4 text-left font-semibold">Discipline</th>
            <th className="p-4 text-left">
              <button
                onClick={() => handleSort("score")}
                className="flex items-center gap-2 font-semibold hover:text-primary"
              >
                Score
                {sortBy === "score" ? (
                  sortOrder === "asc" ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )
                ) : (
                  <Minus className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedRankings.map((ranking) => (
            <tr
              key={ranking.id}
              className="border-b border-border transition-colors hover:bg-muted/50"
            >
              <td className="p-4">
                <span className="text-lg font-bold text-primary">
                  #{ranking.rank}
                </span>
              </td>
              <td className="p-4 font-medium">{ranking.university}</td>
              <td className="p-4 text-sm text-muted-foreground">
                {ranking.country}
              </td>
              <td className="p-4">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {ranking.region}
                </span>
              </td>
              <td className="p-4">
                <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium">
                  {ranking.discipline}
                </span>
              </td>
              <td className="p-4">
                <span className="font-semibold">{ranking.score.toFixed(1)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}