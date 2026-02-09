"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Resource {
  id?: string;
  title: string;
  category: string;
  description: string;
  link: string;
  read_time?: string;
  tags?: string[];
  published_at?: string;
}

interface Props {
  resource: Resource | null;
  onClose: () => void;
}

export function ResourceDialog({ resource, onClose }: Props) {
  const [formData, setFormData] = useState<Resource>({
    title: "",
    category: "",
    description: "",
    link: "",
    read_time: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (resource) {
      setFormData({
        ...resource,
        tags: resource.tags || [],
        read_time: resource.read_time || "",
        link: resource.link || "",
      });
    }
  }, [resource]);

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((_, i) => i !== index) || [],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = resource
        ? `/api/resources/${resource.id}`
        : "/api/resources";
      const method = resource ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save resource");

      onClose();
    } catch (error) {
      console.error("Failed to save resource:", error);
      alert("Failed to save resource. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {resource ? "Edit Resource" : "Add Resource"}
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
            <label className="block text-sm font-medium text-gray-700">Category *</label>
            <select
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">Select Category</option>
              <option value="Guide">Guide</option>
              <option value="Article">Article</option>
              <option value="Video">Video</option>
              <option value="Tool">Tool</option>
              <option value="Template">Template</option>
            </select>
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

          <div>
            <label className="block text-sm font-medium text-gray-700">Link *</label>
            <input
              type="text"
              required
              placeholder="https://... or #anchor"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Read Time</label>
            <input
              type="text"
              placeholder="e.g., 15 min read"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              value={formData.read_time}
              onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tags</label>
            <div className="mt-1 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a tag..."
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddTag}
                  variant="outline"
                  className="whitespace-nowrap"
                >
                  Add
                </Button>
              </div>
              {formData.tags && formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm">
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(index)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
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
