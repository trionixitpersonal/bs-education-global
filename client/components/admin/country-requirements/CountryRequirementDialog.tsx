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

interface CountryRequirement {
  id?: string;
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

interface CountryRequirementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requirement: CountryRequirement | null;
}

export function CountryRequirementDialog({
  open,
  onOpenChange,
  requirement,
}: CountryRequirementDialogProps) {
  const [formData, setFormData] = useState<CountryRequirement>({
    country: "",
    flag_icon: "",
    visa_types: [],
    processing_time: "",
    application_fee: "",
    financial_requirements: "",
    language_requirements: [],
    key_requirements: [],
    important_notes: [],
  });

  useEffect(() => {
    if (requirement) {
      setFormData(requirement);
    } else {
      setFormData({
        country: "",
        flag_icon: "",
        visa_types: [],
        processing_time: "",
        application_fee: "",
        financial_requirements: "",
        language_requirements: [],
        key_requirements: [],
        important_notes: [],
      });
    }
  }, [requirement, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = requirement
        ? `/api/country-requirements/${requirement.id}`
        : "/api/country-requirements";
      const method = requirement ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error saving requirement:", error);
    }
  };

  const handleAddVisaType = () => {
    setFormData({
      ...formData,
      visa_types: [...formData.visa_types, ""],
    });
  };

  const handleRemoveVisaType = (index: number) => {
    setFormData({
      ...formData,
      visa_types: formData.visa_types.filter((_, i) => i !== index),
    });
  };

  const handleVisaTypeChange = (index: number, value: string) => {
    const newTypes = [...formData.visa_types];
    newTypes[index] = value;
    setFormData({ ...formData, visa_types: newTypes });
  };

  const handleAddLanguageRequirement = () => {
    setFormData({
      ...formData,
      language_requirements: [...formData.language_requirements, ""],
    });
  };

  const handleRemoveLanguageRequirement = (index: number) => {
    setFormData({
      ...formData,
      language_requirements: formData.language_requirements.filter(
        (_, i) => i !== index
      ),
    });
  };

  const handleLanguageRequirementChange = (index: number, value: string) => {
    const newReqs = [...formData.language_requirements];
    newReqs[index] = value;
    setFormData({ ...formData, language_requirements: newReqs });
  };

  const handleAddKeyRequirement = () => {
    setFormData({
      ...formData,
      key_requirements: [...formData.key_requirements, ""],
    });
  };

  const handleRemoveKeyRequirement = (index: number) => {
    setFormData({
      ...formData,
      key_requirements: formData.key_requirements.filter((_, i) => i !== index),
    });
  };

  const handleKeyRequirementChange = (index: number, value: string) => {
    const newReqs = [...formData.key_requirements];
    newReqs[index] = value;
    setFormData({ ...formData, key_requirements: newReqs });
  };

  const handleAddImportantNote = () => {
    setFormData({
      ...formData,
      important_notes: [...formData.important_notes, ""],
    });
  };

  const handleRemoveImportantNote = (index: number) => {
    setFormData({
      ...formData,
      important_notes: formData.important_notes.filter((_, i) => i !== index),
    });
  };

  const handleImportantNoteChange = (index: number, value: string) => {
    const newNotes = [...formData.important_notes];
    newNotes[index] = value;
    setFormData({ ...formData, important_notes: newNotes });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {requirement ? "Edit" : "Add"} Country Requirement
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Country</label>
              <input
                type="text"
                required
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                className="w-full rounded-md border px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Flag Icon (Emoji)
              </label>
              <input
                type="text"
                required
                value={formData.flag_icon}
                onChange={(e) =>
                  setFormData({ ...formData, flag_icon: e.target.value })
                }
                className="w-full rounded-md border px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Processing Time
              </label>
              <input
                type="text"
                required
                value={formData.processing_time}
                onChange={(e) =>
                  setFormData({ ...formData, processing_time: e.target.value })
                }
                className="w-full rounded-md border px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Application Fee
              </label>
              <input
                type="text"
                required
                value={formData.application_fee}
                onChange={(e) =>
                  setFormData({ ...formData, application_fee: e.target.value })
                }
                className="w-full rounded-md border px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Financial Requirements
            </label>
            <textarea
              required
              value={formData.financial_requirements}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  financial_requirements: e.target.value,
                })
              }
              className="w-full rounded-md border px-3 py-2"
              rows={3}
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">Visa Types</label>
              <Button type="button" size="sm" onClick={handleAddVisaType}>
                Add Type
              </Button>
            </div>
            <div className="space-y-2">
              {formData.visa_types.map((type, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={type}
                    onChange={(e) => handleVisaTypeChange(index, e.target.value)}
                    className="flex-1 rounded-md border px-3 py-2"
                    placeholder="Visa type"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRemoveVisaType(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">Language Requirements</label>
              <Button
                type="button"
                size="sm"
                onClick={handleAddLanguageRequirement}
              >
                Add Requirement
              </Button>
            </div>
            <div className="space-y-2">
              {formData.language_requirements.map((req, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) =>
                      handleLanguageRequirementChange(index, e.target.value)
                    }
                    className="flex-1 rounded-md border px-3 py-2"
                    placeholder="Language requirement"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRemoveLanguageRequirement(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">Key Requirements</label>
              <Button type="button" size="sm" onClick={handleAddKeyRequirement}>
                Add Requirement
              </Button>
            </div>
            <div className="space-y-2">
              {formData.key_requirements.map((req, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) =>
                      handleKeyRequirementChange(index, e.target.value)
                    }
                    className="flex-1 rounded-md border px-3 py-2"
                    placeholder="Key requirement"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRemoveKeyRequirement(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">Important Notes</label>
              <Button type="button" size="sm" onClick={handleAddImportantNote}>
                Add Note
              </Button>
            </div>
            <div className="space-y-2">
              {formData.important_notes.map((note, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={note}
                    onChange={(e) =>
                      handleImportantNoteChange(index, e.target.value)
                    }
                    className="flex-1 rounded-md border px-3 py-2"
                    placeholder="Important note"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRemoveImportantNote(index)}
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
            <Button type="submit">
              {requirement ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
