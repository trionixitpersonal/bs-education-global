"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DocumentGuide {
  id?: string;
  title: string;
  country: string;
  visa_type: string;
  documents?: string[];
  checklist?: string[];
  templates?: string[];
}

interface Props {
  guide: DocumentGuide | null;
  onClose: () => void;
}

export function DocumentationDialog({ guide, onClose }: Props) {
  const [formData, setFormData] = useState<DocumentGuide>({
    title: "",
    country: "",
    visa_type: "",
    documents: [],
    checklist: [],
    templates: [],
  });
  const [documentInput, setDocumentInput] = useState("");
  const [checklistInput, setChecklistInput] = useState("");
  const [templateInput, setTemplateInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (guide) {
      setFormData({
        ...guide,
        documents: guide.documents || [],
        checklist: guide.checklist || [],
        templates: guide.templates || [],
      });
    }
  }, [guide]);

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

  const handleAddChecklist = () => {
    if (checklistInput.trim()) {
      setFormData({
        ...formData,
        checklist: [...(formData.checklist || []), checklistInput.trim()],
      });
      setChecklistInput("");
    }
  };

  const handleRemoveChecklist = (index: number) => {
    setFormData({
      ...formData,
      checklist: formData.checklist?.filter((_, i) => i !== index) || [],
    });
  };

  const handleAddTemplate = () => {
    if (templateInput.trim()) {
      setFormData({
        ...formData,
        templates: [...(formData.templates || []), templateInput.trim()],
      });
      setTemplateInput("");
    }
  };

  const handleRemoveTemplate = (index: number) => {
    setFormData({
      ...formData,
      templates: formData.templates?.filter((_, i) => i !== index) || [],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = guide
        ? `/api/documentation/${guide.id}`
        : "/api/documentation";
      const method = guide ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error(errorData.error || "Failed to save documentation guide");
      }

      onClose();
    } catch (error) {
      console.error("Failed to save documentation guide:", error);
      alert(`Failed to save documentation guide: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {guide ? "Edit Documentation Guide" : "Add Documentation Guide"}
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
                placeholder="e.g., F-1 Student Visa"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                value={formData.visa_type}
                onChange={(e) => setFormData({ ...formData, visa_type: e.target.value })}
              />
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

          <div>
            <label className="block text-sm font-medium text-gray-700">Application Checklist</label>
            <div className="mt-1 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a checklist item..."
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  value={checklistInput}
                  onChange={(e) => setChecklistInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddChecklist();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddChecklist}
                  variant="outline"
                  className="whitespace-nowrap"
                >
                  Add
                </Button>
              </div>
              {formData.checklist && formData.checklist.length > 0 && (
                <div className="space-y-1">
                  {formData.checklist.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 rounded bg-gray-50 px-3 py-2">
                      <span className="flex-1 text-sm">{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveChecklist(index)}
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
            <label className="block text-sm font-medium text-gray-700">Templates</label>
            <div className="mt-1 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a template name..."
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  value={templateInput}
                  onChange={(e) => setTemplateInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTemplate();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddTemplate}
                  variant="outline"
                  className="whitespace-nowrap"
                >
                  Add
                </Button>
              </div>
              {formData.templates && formData.templates.length > 0 && (
                <div className="space-y-1">
                  {formData.templates.map((template, index) => (
                    <div key={index} className="flex items-center gap-2 rounded bg-gray-50 px-3 py-2">
                      <span className="flex-1 text-sm">{template}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTemplate(index)}
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
