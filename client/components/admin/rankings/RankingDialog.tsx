"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Ranking {
  id?: string;
  university_name: string;
  rank: number;
  country: string;
  region: string;
  discipline: string;
  score: number;
  year: number;
}

interface Props {
  ranking: Ranking | null;
  onClose: () => void;
}

export function RankingDialog({ ranking, onClose }: Props) {
  const [formData, setFormData] = useState<Ranking>({
    university_name: "",
    rank: 0,
    country: "",
    region: "Global",
    discipline: "Overall",
    score: 0,
    year: new Date().getFullYear(),
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (ranking) {
      setFormData(ranking);
    }
  }, [ranking]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = ranking
        ? `/api/qs-rankings/${ranking.id}`
        : "/api/qs-rankings";
      const method = ranking ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save ranking");

      onClose();
    } catch (error) {
      console.error("Failed to save ranking:", error);
      alert("Failed to save ranking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {ranking ? "Edit Ranking" : "Add Ranking"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">University Name *</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              value={formData.university_name}
              onChange={(e) => setFormData({ ...formData, university_name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Country *</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rank *</label>
              <input
                type="number"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                value={formData.rank || ""}
                onChange={(e) => setFormData({ ...formData, rank: e.target.value ? parseInt(e.target.value) : 0 })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Region *</label>
              <select
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              >
                <option value="Global">Global</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="North America">North America</option>
                <option value="Latin America">Latin America</option>
                <option value="Middle East">Middle East</option>
                <option value="Africa">Africa</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Discipline *</label>
              <select
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                value={formData.discipline}
                onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
              >
                <option value="Overall">Overall</option>
                <option value="Engineering">Engineering</option>
                <option value="Business">Business</option>
                <option value="Medicine">Medicine</option>
                <option value="Arts">Arts</option>
                <option value="Science">Science</option>
                <option value="Technology">Technology</option>
                <option value="Law">Law</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Year *</label>
              <input
                type="number"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                value={formData.year || ""}
                onChange={(e) => setFormData({ ...formData, year: e.target.value ? parseInt(e.target.value) : new Date().getFullYear() })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Score *</label>
              <input
                type="number"
                step="0.01"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                value={formData.score || ""}
                onChange={(e) => setFormData({ ...formData, score: e.target.value ? parseFloat(e.target.value) : 0 })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
