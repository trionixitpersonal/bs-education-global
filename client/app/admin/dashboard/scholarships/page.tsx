"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";
import { ScholarshipDialog } from "@/components/admin/scholarships/ScholarshipDialog";

interface Scholarship {
  id: string;
  title: string;
  description: string;
  amount: string;
  deadline: string;
  country: string;
  university: string;
  level: string;
  category: string;
  is_active: boolean;
}

export default function ScholarshipsAdminPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState<Scholarship | null>(null);

  const fetchScholarships = async () => {
    try {
      const response = await fetch("/api/scholarships");
      const data = await response.json();
      setScholarships(data || []);
    } catch (error) {
      console.error("Failed to fetch scholarships:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this scholarship?")) return;

    try {
      await fetch(`/api/scholarships/${id}`, { method: "DELETE" });
      fetchScholarships();
    } catch (error) {
      console.error("Failed to delete scholarship:", error);
    }
  };

  const handleEdit = (scholarship: Scholarship) => {
    setEditingScholarship(scholarship);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingScholarship(null);
    fetchScholarships();
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Scholarships</h2>
          <p className="text-gray-600">Manage scholarship listings</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Scholarship
        </Button>
      </div>

      <div className="rounded-lg bg-white shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Deadline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {scholarships.map((scholarship) => (
                <tr key={scholarship.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{scholarship.title}</div>
                    <div className="text-sm text-gray-500">{scholarship.level}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {scholarship.amount}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {new Date(scholarship.deadline).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {scholarship.country}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {scholarship.is_active ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        <CheckCircle className="h-3 w-3" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                        <XCircle className="h-3 w-3" />
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(scholarship)}
                        className="gap-1"
                      >
                        <Pencil className="h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(scholarship.id)}
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
        <ScholarshipDialog
          scholarship={editingScholarship}
          onClose={handleDialogClose}
        />
      )}
    </div>
  );
}
