"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { UniversityDialog } from "@/components/admin/universities/UniversityDialog";

interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  ranking: number;
  description: string;
  tuition_range: string;
  image_url?: string;
  website_url?: string;
}

export default function UniversitiesAdminPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState<University | null>(null);

  const fetchUniversities = async () => {
    try {
      const response = await fetch("/api/universities");
      const data = await response.json();
      setUniversities(data || []);
    } catch (error) {
      console.error("Failed to fetch universities:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this university?")) return;

    try {
      await fetch(`/api/universities/${id}`, { method: "DELETE" });
      fetchUniversities();
    } catch (error) {
      console.error("Failed to delete university:", error);
    }
  };

  const handleEdit = (university: University) => {
    setEditingUniversity(university);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingUniversity(null);
    fetchUniversities();
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Universities</h2>
          <p className="text-gray-600">Manage university listings</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add University
        </Button>
      </div>

      <div className="rounded-lg bg-white shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Ranking
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Tuition
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {universities.map((university) => (
                <tr key={university.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="font-medium text-gray-900">{university.name}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {university.city}, {university.country}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    #{university.ranking || "N/A"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {university.tuition_range || "N/A"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(university)}
                        className="gap-1"
                      >
                        <Pencil className="h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(university.id)}
                        className="gap-1 text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isDialogOpen && (
        <UniversityDialog
          university={editingUniversity}
          onClose={handleDialogClose}
        />
      )}
    </div>
  );
}
