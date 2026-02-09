"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FAQ {
  id?: string;
  question: string;
  answer: string;
  category?: string;
  order_index?: number;
  is_active?: boolean;
}

interface Props {
  faq: FAQ | null;
  onClose: () => void;
}

export function FAQDialog({ faq, onClose }: Props) {
  const [formData, setFormData] = useState<FAQ>({
    question: "",
    answer: "",
    category: "",
    order_index: 0,
    is_active: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (faq) {
      setFormData(faq);
    }
  }, [faq]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = faq
        ? `/api/faqs/${faq.id}`
        : "/api/faqs";
      const method = faq ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save FAQ");

      onClose();
    } catch (error) {
      console.error("Failed to save FAQ:", error);
      alert("Failed to save FAQ. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {faq ? "Edit FAQ" : "Add FAQ"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Question *</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Answer *</label>
            <textarea
              rows={5}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Select Category</option>
                <option value="Universities">Universities</option>
                <option value="Applications">Applications</option>
                <option value="Visa">Visa</option>
                <option value="Scholarships">Scholarships</option>
                <option value="General">General</option>
                <option value="Financial">Financial</option>
                <option value="Accommodation">Accommodation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Order</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                value={formData.order_index || ""}
                onChange={(e) => setFormData({ ...formData, order_index: e.target.value ? parseInt(e.target.value) : 0 })}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
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
