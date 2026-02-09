"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { RankingDialog } from "@/components/admin/rankings/RankingDialog";

interface Ranking {
  id: string;
  university_name: string;
  rank: number;
  country: string;
  region: string;
  discipline: string;
  score: number;
  year: number;
}

export default function RankingsAdminPage() {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRanking, setEditingRanking] = useState<Ranking | null>(null);

  const fetchRankings = async () => {
    try {
      const response = await fetch("/api/qs-rankings");
      const data = await response.json();
      setRankings(data || []);
    } catch (error) {
      console.error("Failed to fetch rankings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, []);

  const handleEdit = (ranking: Ranking) => {
    setEditingRanking(ranking);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingRanking(null);
    fetchRankings();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ranking?")) return;

    try {
      await fetch(`/api/qs-rankings/${id}`, { method: "DELETE" });
      fetchRankings();
    } catch (error) {
      console.error("Failed to delete ranking:", error);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">QS Rankings Management</h1>
        <Button className="flex items-center gap-2" onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Ranking
        </Button>
      </div>

      <div className="rounded-lg border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  University
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Discipline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Score
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rankings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No rankings found. Click "Add Ranking" to create one.
                  </td>
                </tr>
              ) : (
                rankings.map((ranking) => (
                  <tr key={ranking.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {ranking.university_name}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                      {ranking.country}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                      #{ranking.rank}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                      {ranking.discipline}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                      {ranking.year}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                      {ranking.score}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleEdit(ranking)}
                        >
                          <Pencil className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(ranking.id)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isDialogOpen && <RankingDialog ranking={editingRanking} onClose={handleDialogClose} />}
    </div>
  );
}
