"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, RefreshCw } from "lucide-react";
import { ProgramDialog } from "@/components/admin/programs/ProgramDialog";

interface University {
  id: string;
  name: string;
}

interface Program {
  id: string;
  university_id?: string;
  name: string;
  level: string;
  duration: string;
  tuition: string;
  description: string;
  requirements?: string[];
  universities?: University;
}

export default function ProgramsAdminPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);

  const fetchPrograms = async () => {
    setIsLoading(true);
    try {
      // Add timestamp to prevent caching
      const response = await fetch(`/api/programs?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      const data = await response.json();
      console.log('Fetched programs:', data.length, 'programs');
      setPrograms(data || []);
    } catch (error) {
      console.error("Failed to fetch programs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this program?")) return;

    try {
      const response = await fetch(`/api/programs/${id}`, { method: "DELETE" });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete program");
      }
      fetchPrograms();
    } catch (error: any) {
      console.error("Failed to delete program:", error);
      alert(`Failed to delete program: ${error.message}`);
    }
  };

  const handleEdit = (program: Program) => {
    setEditingProgram(program);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingProgram(null);
    fetchPrograms();
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Programs Management</h1>
          <p className="text-sm text-gray-600 mt-1">Total: {programs.length} programs</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={fetchPrograms} 
            variant="outline" 
            className="flex items-center gap-2"
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => setIsDialogOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Program
          </Button>
        </div>
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
                  Program Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Duration
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
              {programs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No programs found. Click "Add Program" to create one.
                  </td>
                </tr>
              ) : (
                programs.map((program) => (
                  <tr key={program.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {program.universities?.name || 'Unknown University'}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="font-medium text-gray-900">{program.name}</div>
                      <div className="text-xs text-gray-400">ID: {program.id.slice(0, 8)}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                      {program.level}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                      {program.duration}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                      {program.tuition}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(program)}
                          className="flex items-center gap-1"
                        >
                          <Pencil className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(program.id)}
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

      {isDialogOpen && (
        <ProgramDialog
          program={editingProgram}
          onClose={handleDialogClose}
        />
      )}
    </div>
  );
}
