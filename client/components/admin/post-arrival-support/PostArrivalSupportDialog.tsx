"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface PostArrivalSupport {
  id?: string;
  category: string;
  title: string;
  icon: string;
  description: string;
  key_steps: string[];
  important_contacts: string[];
  useful_resources: string[];
  timeline: string;
}

interface PostArrivalSupportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  support: PostArrivalSupport | null;
}

export function PostArrivalSupportDialog({
  open,
  onOpenChange,
  support,
}: PostArrivalSupportDialogProps) {
  const [formData, setFormData] = useState<PostArrivalSupport>({
    category: "",
    title: "",
    icon: "",
    description: "",
    key_steps: [],
    important_contacts: [],
    useful_resources: [],
    timeline: "",
  });

  useEffect(() => {
    if (support) {
      setFormData(support);
    } else {
      setFormData({
        category: "",
        title: "",
        icon: "",
        description: "",
        key_steps: [],
        important_contacts: [],
        useful_resources: [],
        timeline: "",
      });
    }
  }, [support, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = support
        ? `/api/post-arrival-support/${support.id}`
        : "/api/post-arrival-support";
      const method = support ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error saving support:", error);
    }
  };

  const handleArrayAdd = (field: keyof PostArrivalSupport) => {
    setFormData({
      ...formData,
      [field]: [...(formData[field] as string[]), ""],
    });
  };

  const handleArrayRemove = (field: keyof PostArrivalSupport, index: number) => {
    setFormData({
      ...formData,
      [field]: (formData[field] as string[]).filter((_, i) => i !== index),
    });
  };

  const handleArrayChange = (
    field: keyof PostArrivalSupport,
    index: number,
    value: string
  ) => {
    const newArray = [...(formData[field] as string[])];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{support ? "Edit" : "Add"} Support Guide</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Category</label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full rounded-md border px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Icon (Emoji)
              </label>
              <input
                type="text"
                required
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                className="w-full rounded-md border px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full rounded-md border px-3 py-2"
              rows={3}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Timeline</label>
            <input
              type="text"
              required
              value={formData.timeline}
              onChange={(e) =>
                setFormData({ ...formData, timeline: e.target.value })
              }
              className="w-full rounded-md border px-3 py-2"
              placeholder="e.g., First 2 weeks"
            />
          </div>

          {/* Key Steps */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">Key Steps</label>
              <Button
                type="button"
                size="sm"
                onClick={() => handleArrayAdd("key_steps")}
              >
                Add Step
              </Button>
            </div>
            <div className="space-y-2">
              {formData.key_steps.map((step, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={step}
                    onChange={(e) =>
                      handleArrayChange("key_steps", index, e.target.value)
                    }
                    className="flex-1 rounded-md border px-3 py-2"
                    placeholder="Step"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => handleArrayRemove("key_steps", index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Important Contacts */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">Important Contacts</label>
              <Button
                type="button"
                size="sm"
                onClick={() => handleArrayAdd("important_contacts")}
              >
                Add Contact
              </Button>
            </div>
            <div className="space-y-2">
              {formData.important_contacts.map((contact, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) =>
                      handleArrayChange("important_contacts", index, e.target.value)
                    }
                    className="flex-1 rounded-md border px-3 py-2"
                    placeholder="Contact"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => handleArrayRemove("important_contacts", index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Useful Resources */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">Useful Resources</label>
              <Button
                type="button"
                size="sm"
                onClick={() => handleArrayAdd("useful_resources")}
              >
                Add Resource
              </Button>
            </div>
            <div className="space-y-2">
              {formData.useful_resources.map((resource, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={resource}
                    onChange={(e) =>
                      handleArrayChange("useful_resources", index, e.target.value)
                    }
                    className="flex-1 rounded-md border px-3 py-2"
                    placeholder="Resource"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => handleArrayRemove("useful_resources", index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">{support ? "Update" : "Create"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
