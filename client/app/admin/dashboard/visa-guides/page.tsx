"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { VisaGuideDialog } from "@/components/admin/visa-guides/VisaGuideDialog";

interface VisaGuide {
  id: string;
  country: string;
  flag_emoji?: string;
  visa_type: string;
  requirements: string[];
  processing_time: string;
  cost: string;
  documents?: string[];
  description?: string;
  guide_link?: string;
}

export default function VisaGuidesAdminPage() {
  const [guides, setGuides] = useState<VisaGuide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVisaGuide, setEditingVisaGuide] = useState<VisaGuide | undefined>(undefined);

  const fetchGuides = async () => {
    try {
      const response = await fetch("/api/visa-guides");
      const data = await response.json();
      setGuides(data || []);
    } catch (error) {
      console.error("Failed to fetch visa guides:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  const handleEdit = (guide: VisaGuide) => {
    setEditingVisaGuide(guide);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingVisaGuide(undefined);
    fetchGuides();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this visa guide?")) return;

    try {
      await fetch(`/api/visa-guides/${id}`, { method: "DELETE" });
      fetchGuides();
    } catch (error) {
      console.error("Failed to delete visa guide:", error);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Visa Guides Management</h1>
        <Button className="flex items-center gap-2" onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Visa Guide
        </Button>
      </div>

      <div className="rounded-lg border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Visa Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Processing Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Cost
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {guides.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No visa guides found. Click "Add Visa Guide" to create one.
                  </td>
                </tr>
              ) : (
                guides.map((guide) => (
                  <tr key={guide.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="font-medium text-gray-900">{guide.country}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{guide.visa_type}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                      {guide.processing_time}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                      {guide.cost}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleEdit(guide)}
                        >
                          <Pencil className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(guide.id)}
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

      {isDialogOpen && <VisaGuideDialog visaGuide={editingVisaGuide} onClose={handleDialogClose} />}
    </div>
  );
}
