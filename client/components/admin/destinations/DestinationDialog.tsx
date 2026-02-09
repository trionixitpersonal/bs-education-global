"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Destination {
  id?: string;
  city: string;
  country: string;
  cost_of_living: string;
  student_life?: string;
  culture?: string;
  image_url?: string;
}

interface Props {
  destination: Destination | null;
  onClose: () => void;
}

export function DestinationDialog({ destination, onClose }: Props) {
  const [formData, setFormData] = useState<Destination>({
    city: "",
    country: "",
    cost_of_living: "",
    student_life: "",
    culture: "",
    image_url: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (destination) {
      setFormData(destination);
    }
  }, [destination]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = destination
        ? `/api/study-destinations/${destination.id}`
        : "/api/study-destinations";
      const method = destination ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save destination");

      onClose();
    } catch (error) {
      console.error("Failed to save destination:", error);
      alert("Failed to save destination. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {destination ? "Edit Destination" : "Add Destination"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">City *</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cost of Living *</label>
            <input
              type="text"
              required
              placeholder="e.g., $15,000-20,000/year"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              value={formData.cost_of_living}
              onChange={(e) => setFormData({ ...formData, cost_of_living: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Student Life</label>
            <textarea
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              value={formData.student_life}
              onChange={(e) => setFormData({ ...formData, student_life: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Culture</label>
            <textarea
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              value={formData.culture}
              onChange={(e) => setFormData({ ...formData, culture: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            />
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
