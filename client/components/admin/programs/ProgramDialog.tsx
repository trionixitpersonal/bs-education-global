"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Program {
  id?: string;
  university_id?: string;
  name: string;
  level: string;
  duration: string;
  tuition: string;
  description: string;
  requirements?: string[];
}

interface Props {
  program: Program | null;
  onClose: () => void;
}

export function ProgramDialog({ program, onClose }: Props) {
  const [formData, setFormData] = useState<Program>({
    name: "",
    level: "",
    duration: "",
    tuition: "",
    description: "",
    requirements: [],
  });
  const [universities, setUniversities] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // Fetch universities for dropdown
    async function fetchUniversities() {
      try {
        const response = await fetch("/api/universities");
        const data = await response.json();
        setUniversities(data || []);
      } catch (error) {
        console.error("Failed to fetch universities:", error);
      }
    }
    fetchUniversities();
  }, []);

  useEffect(() => {
    if (program) {
      setFormData(program);
    } else {
      // Reset to initial state for new program
      setFormData({
        name: "",
        level: "",
        duration: "",
        tuition: "",
        description: "",
        requirements: [],
      });
    }
    setErrorMessage("");
  }, [program]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const url = program
        ? `/api/programs/${program.id}`
        : "/api/programs";
      const method = program ? "PUT" : "POST";

      console.log("Submitting program data:", JSON.stringify(formData, null, 2));

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Server error:", responseData);
        // Handle duplicate error (409) or other errors
        if (response.status === 409) {
          setErrorMessage(responseData.message || "This program already exists for this university.");
        } else {
          setErrorMessage(responseData.error || responseData.details?.message || "Failed to save program");
        }
        return;
      }

      onClose();
    } catch (error: any) {
      console.error("Failed to save program:", error);
      setErrorMessage(error.message || 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {program ? "Edit Program" : "Add Program"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="rounded-md bg-red-50 border border-red-200 p-4">
              <p className="text-sm text-red-800">{errorMessage}</p>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700">University *</label>
            <select
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              value={formData.university_id || ""}
              onChange={(e) => setFormData({ ...formData, university_id: e.target.value })}
            >
              <option value="">Select University...</option>
              {universities.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Program Name *</label>
            <select
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            >
              <option value="">Choose a subject...</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Business Administration">Business Administration</option>
              <option value="Engineering">Engineering</option>
              <option value="Medicine">Medicine</option>
              <option value="Law">Law</option>
              <option value="Arts & Humanities">Arts & Humanities</option>
              <option value="Natural Sciences">Natural Sciences</option>
              <option value="Social Sciences">Social Sciences</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Level *</label>
              <select
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              >
                <option value="">Select Level</option>
                <option value="Undergraduate">Undergraduate (Bachelors/MBA)</option>
                <option value="Graduate">Graduate (Masters)</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration *</label>
              <input
                type="text"
                required
                placeholder="e.g., 2 years"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tuition *</label>
            <input
              type="text"
              required
              placeholder="e.g., $20,000 - $30,000"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              value={formData.tuition}
              onChange={(e) => setFormData({ ...formData, tuition: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Requirements</label>
            <textarea
              rows={4}
              placeholder="Enter each requirement on a new line&#10;e.g.,&#10;Bachelor's degree in related field&#10;IELTS 6.5 or equivalent&#10;GPA 3.0 minimum"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              value={formData.requirements?.join('\n') || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                requirements: e.target.value.split('\n').filter(r => r.trim() !== '')
              })}
            />
            <p className="mt-1 text-xs text-gray-500">Enter each requirement on a separate line</p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="min-w-[100px]">
              {isLoading ? "Saving..." : program ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
