"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CountryRequirementDialog } from "@/components/admin/country-requirements/CountryRequirementDialog";

interface CountryRequirement {
  id: string;
  country: string;
  flag_icon: string;
  visa_types: string[];
  processing_time: string;
  application_fee: string;
  financial_requirements: string;
  language_requirements: string[];
  key_requirements: string[];
  important_notes: string[];
}

export default function CountryRequirementsAdmin() {
  const [requirements, setRequirements] = useState<CountryRequirement[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRequirement, setEditingRequirement] = useState<CountryRequirement | null>(null);

  useEffect(() => {
    fetchRequirements();
  }, []);

  const fetchRequirements = async () => {
    try {
      const response = await fetch("/api/country-requirements");
      const data = await response.json();
      setRequirements(data);
    } catch (error) {
      console.error("Error fetching requirements:", error);
    }
  };

  const handleEdit = (requirement: CountryRequirement) => {
    setEditingRequirement(requirement);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this requirement?")) return;

    try {
      const response = await fetch(`/api/country-requirements/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchRequirements();
      }
    } catch (error) {
      console.error("Error deleting requirement:", error);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingRequirement(null);
    fetchRequirements();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Country Requirements</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          Add Country Requirement
        </Button>
      </div>

      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-4 text-left">Country</th>
              <th className="p-4 text-left">Visa Types</th>
              <th className="p-4 text-left">Processing Time</th>
              <th className="p-4 text-left">Fee</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requirements.map((requirement) => (
              <tr key={requirement.id} className="border-b">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{requirement.flag_icon}</span>
                    <span>{requirement.country}</span>
                  </div>
                </td>
                <td className="p-4">{requirement.visa_types.length} types</td>
                <td className="p-4">{requirement.processing_time}</td>
                <td className="p-4">{requirement.application_fee}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(requirement)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(requirement.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CountryRequirementDialog
        open={isDialogOpen}
        onOpenChange={handleDialogClose}
        requirement={editingRequirement}
      />
    </div>
  );
}
