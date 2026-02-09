"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { DestinationDialog } from "@/components/admin/destinations/DestinationDialog";

interface Destination {
  id: string;
  city: string;
  country: string;
  cost_of_living: string;
  student_life?: string;
  culture?: string;
  image_url?: string;
}

export default function DestinationsAdminPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);

  const fetchDestinations = async () => {
    try {
      const response = await fetch("/api/study-destinations");
      const data = await response.json();
      setDestinations(data || []);
    } catch (error) {
      console.error("Failed to fetch destinations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleEdit = (destination: Destination) => {
    setEditingDestination(destination);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingDestination(null);
    fetchDestinations();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this destination?")) return;

    try {
      await fetch(`/api/study-destinations/${id}`, { method: "DELETE" });
      fetchDestinations();
    } catch (error) {
      console.error("Failed to delete destination:", error);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Study Destinations Management</h1>
        <Button className="flex items-center gap-2" onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Destination
        </Button>
      </div>

      <div className="rounded-lg border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  City
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Cost of Living
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {destinations.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No destinations found. Click "Add Destination" to create one.
                  </td>
                </tr>
              ) : (
                destinations.map((destination) => (
                  <tr key={destination.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="font-medium text-gray-900">{destination.city}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                      {destination.country}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                      {destination.cost_of_living}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleEdit(destination)}
                        >
                          <Pencil className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(destination.id)}
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

      {isDialogOpen && <DestinationDialog destination={editingDestination} onClose={handleDialogClose} />}
    </div>
  );
}
