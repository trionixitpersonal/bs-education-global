"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface VisaGuide {
  id?: string;
  country: string;
  flag_emoji?: string;
  visa_type: string;
  requirements?: string[];
  processing_time?: string;
  cost?: string;
  documents?: string[];
  description?: string;
  guide_link?: string;
}

interface Props {
  visaGuide: VisaGuide | null;
  onClose: () => void;
}

export function VisaGuideDialog({ visaGuide, onClose }: Props) {
  const [formData, setFormData] = useState<VisaGuide>({
    country: "",
    visa_type: "",
    requirements: [],
    processing_time: "",
    cost: "",
    documents: [],
    description: "",
    guide_link: "",
  });
  const [requirementInput, setRequirementInput] = useState("");
  const [documentInput, setDocumentInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (visaGuide) {
      setFormData({
        ...visaGuide,
        requirements: visaGuide.requirements || [],
        documents: visaGuide.documents || [],
        processing_time: visaGuide.processing_time || "",
        cost: visaGuide.cost || "",
        description: visaGuide.description || "",
        guide_link: visaGuide.guide_link || "",
      });
    }
  }, [visaGuide]);

  const handleAddRequirement = () => {
    if (requirementInput.trim()) {
      setFormData({
        ...formData,
        requirements: [...(formData.requirements || []), requirementInput.trim()],
      });
      setRequirementInput("");
    }
  };

  const handleRemoveRequirement = (index: number) => {
    setFormData({
      ...formData,
      requirements: formData.requirements?.filter((_, i) => i !== index) || [],
    });
  };

  const handleAddDocument = () => {
    if (documentInput.trim()) {
      setFormData({
        ...formData,
        documents: [...(formData.documents || []), documentInput.trim()],
      });
      setDocumentInput("");
    }
  };

  const handleRemoveDocument = (index: number) => {
    setFormData({
      ...formData,
      documents: formData.documents?.filter((_, i) => i !== index) || [],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = visaGuide
        ? `/api/visa-guides/${visaGuide.id}`
        : "/api/visa-guides";
      const method = visaGuide ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error(errorData.error || "Failed to save visa guide");
      }

      onClose();
    } catch (error) {
      console.error("Failed to save visa guide:", error);
      alert(`Failed to save visa guide: ${error instanceof Error ? error.message : 'Unknown error'}. Check console for details.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {visaGuide ? "Edit Visa Guide" : "Add Visa Guide"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              <label className="block text-sm font-medium text-gray-700">Visa Type *</label>
              <input
                type="text"
                required
                placeholder="e.g., Student Visa (Subclass 500)"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                value={formData.visa_type}
                onChange={(e) => setFormData({ ...formData, visa_type: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Processing Time</label>
              <input
                type="text"
                placeholder="e.g., 4-6 weeks"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                value={formData.processing_time}
                onChange={(e) => setFormData({ ...formData, processing_time: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cost</label>
              <input
                type="text"
                placeholder="e.g., $620 AUD"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
              />
            </div>
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
            <label className="block text-sm font-medium text-gray-700">Full Guide Link</label>
            <input
              type="url"
              placeholder="https://example.com/visa-guide"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              value={formData.guide_link}
              onChange={(e) => setFormData({ ...formData, guide_link: e.target.value })}
            />
            <p className="mt-1 text-xs text-gray-500">Optional: Link for the "View Full Guide" button</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Key Requirements</label>
            <div className="mt-1 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a requirement..."
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  value={requirementInput}
                  onChange={(e) => setRequirementInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddRequirement();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddRequirement}
                  variant="outline"
                  className="whitespace-nowrap"
                >
                  Add
                </Button>
              </div>
              {formData.requirements && formData.requirements.length > 0 && (
                <div className="space-y-1">
                  {formData.requirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 rounded bg-gray-50 px-3 py-2">
                      <span className="flex-1 text-sm">{req}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveRequirement(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Required Documents</label>
            <div className="mt-1 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a document..."
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  value={documentInput}
                  onChange={(e) => setDocumentInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddDocument();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddDocument}
                  variant="outline"
                  className="whitespace-nowrap"
                >
                  Add
                </Button>
              </div>
              {formData.documents && formData.documents.length > 0 && (
                <div className="space-y-1">
                  {formData.documents.map((doc, index) => (
                    <div key={index} className="flex items-center gap-2 rounded bg-gray-50 px-3 py-2">
                      <span className="flex-1 text-sm">{doc}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDocument(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
