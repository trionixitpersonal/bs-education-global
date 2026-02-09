"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Scholarship {
  id?: string;
  title: string;
  description: string;
  amount: string;
  deadline: string;
  eligibility: string[];
  country: string;
  university: string;
  level: string;
  category: string;
  application_link?: string;
  is_active: boolean;
}

interface Props {
  scholarship: Scholarship | null;
  onClose: () => void;
}

export function ScholarshipDialog({ scholarship, onClose }: Props) {
  const [formData, setFormData] = useState<Scholarship>({
    title: "",
    description: "",
    amount: "",
    deadline: "",
    eligibility: [],
    country: "",
    university: "",
    level: "All",
    category: "",
    application_link: "",
    is_active: true,
  });
  const [universities, setUniversities] = useState<{ id: string; name: string; country: string }[]>([]);
  const [eligibilityInput, setEligibilityInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    if (scholarship) {
      setFormData(scholarship);
      setEligibilityInput(scholarship.eligibility.join("\n"));
    }
  }, [scholarship]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const eligibilityArray = eligibilityInput
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item);

      // Map user-friendly level names to database values
      const levelMapping: { [key: string]: string } = {
        'Bachelors': 'Undergraduate',
        'Masters': 'Graduate',
        'MBA': 'Undergraduate',
        'PhD': 'PhD',
        'All': 'All'
      };

      const mappedLevel = levelMapping[formData.level] || formData.level;

      const url = scholarship
        ? `/api/scholarships/${scholarship.id}`
        : "/api/scholarships";
      const method = scholarship ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...formData, 
          level: mappedLevel,
          eligibility: eligibilityArray 
        }),
      });

      onClose();
    } catch (error) {
      console.error("Failed to save scholarship:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {scholarship ? "Edit Scholarship" : "Add Scholarship"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title *</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description *</label>
            <textarea
              rows={3}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount *</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Deadline *</label>
              <input
                type="date"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Country *</label>
              <select
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                value={formData.country}
                onChange={(e) => {
                  setFormData({ ...formData, country: e.target.value, university: "" });
                }}
              >
                <option value="">Select Country...</option>
                <option value="Australia">Australia</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Netherlands">Netherlands</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">University *</label>
              <select
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                value={formData.university || ""}
                onChange={(e) => {
                  setFormData({ 
                    ...formData, 
                    university: e.target.value
                  });
                }}
              >
                <option value="">Select University...</option>
                {universities
                  .filter(uni => !formData.country || uni.country === formData.country)
                  .map((uni) => (
                    <option key={uni.id} value={uni.name}>
                      {uni.name}
                    </option>
                  ))}
              </select>
            </div>
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
                <option value="">Select Level...</option>
                <option value="All">All Levels</option>
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="MBA">MBA</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category *</label>
              <select
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Select Category...</option>
                <option value="Merit-Based">Merit-Based</option>
                <option value="Need-Based">Need-Based</option>
                <option value="Subject-Specific">Subject-Specific</option>
                <option value="Country-Specific">Country-Specific</option>
                <option value="University-Specific">University-Specific</option>
                <option value="Athletic">Athletic</option>
                <option value="Minority">Minority</option>
                <option value="Research">Research</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Eligibility Requirements (one per line)
            </label>
            <textarea
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              value={eligibilityInput}
              onChange={(e) => setEligibilityInput(e.target.value)}
              placeholder="Enter each requirement on a new line"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Application Link</label>
            <input
              type="url"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              value={formData.application_link}
              onChange={(e) => setFormData({ ...formData, application_link: e.target.value })}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_active"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
            />
            <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
              Active
            </label>
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
