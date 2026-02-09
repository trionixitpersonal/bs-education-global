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

interface InterviewTip {
  id?: string;
  category: string;
  title: string;
  icon: string;
  common_questions: string[];
  dos: string[];
  donts: string[];
  preparation_tips: string[];
  sample_answers: string[];
}

interface InterviewPreparationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tip: InterviewTip | null;
}

export function InterviewPreparationDialog({
  open,
  onOpenChange,
  tip,
}: InterviewPreparationDialogProps) {
  const [formData, setFormData] = useState<InterviewTip>({
    category: "",
    title: "",
    icon: "",
    common_questions: [],
    dos: [],
    donts: [],
    preparation_tips: [],
    sample_answers: [],
  });

  useEffect(() => {
    if (tip) {
      setFormData(tip);
    } else {
      setFormData({
        category: "",
        title: "",
        icon: "",
        common_questions: [],
        dos: [],
        donts: [],
        preparation_tips: [],
        sample_answers: [],
      });
    }
  }, [tip, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = tip
        ? `/api/interview-preparation/${tip.id}`
        : "/api/interview-preparation";
      const method = tip ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error saving tip:", error);
    }
  };

  const handleArrayAdd = (field: keyof InterviewTip) => {
    setFormData({
      ...formData,
      [field]: [...(formData[field] as string[]), ""],
    });
  };

  const handleArrayRemove = (field: keyof InterviewTip, index: number) => {
    setFormData({
      ...formData,
      [field]: (formData[field] as string[]).filter((_, i) => i !== index),
    });
  };

  const handleArrayChange = (
    field: keyof InterviewTip,
    index: number,
    value: string
  ) => {
    const newArray = [...(formData[field] as string[])];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{tip ? "Edit" : "Add"} Interview Tip</DialogTitle>
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

          {/* Common Questions */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">Common Questions</label>
              <Button
                type="button"
                size="sm"
                onClick={() => handleArrayAdd("common_questions")}
              >
                Add Question
              </Button>
            </div>
            <div className="space-y-2">
              {formData.common_questions.map((question, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) =>
                      handleArrayChange("common_questions", index, e.target.value)
                    }
                    className="flex-1 rounded-md border px-3 py-2"
                    placeholder="Question"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => handleArrayRemove("common_questions", index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Do's */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">Do's</label>
              <Button type="button" size="sm" onClick={() => handleArrayAdd("dos")}>
                Add Do
              </Button>
            </div>
            <div className="space-y-2">
              {formData.dos.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange("dos", index, e.target.value)}
                    className="flex-1 rounded-md border px-3 py-2"
                    placeholder="Do"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => handleArrayRemove("dos", index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Don'ts */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">Don'ts</label>
              <Button
                type="button"
                size="sm"
                onClick={() => handleArrayAdd("donts")}
              >
                Add Don't
              </Button>
            </div>
            <div className="space-y-2">
              {formData.donts.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleArrayChange("donts", index, e.target.value)
                    }
                    className="flex-1 rounded-md border px-3 py-2"
                    placeholder="Don't"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => handleArrayRemove("donts", index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Preparation Tips */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">Preparation Tips</label>
              <Button
                type="button"
                size="sm"
                onClick={() => handleArrayAdd("preparation_tips")}
              >
                Add Tip
              </Button>
            </div>
            <div className="space-y-2">
              {formData.preparation_tips.map((tip, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={tip}
                    onChange={(e) =>
                      handleArrayChange("preparation_tips", index, e.target.value)
                    }
                    className="flex-1 rounded-md border px-3 py-2"
                    placeholder="Tip"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => handleArrayRemove("preparation_tips", index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Answers */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium">Sample Answers</label>
              <Button
                type="button"
                size="sm"
                onClick={() => handleArrayAdd("sample_answers")}
              >
                Add Answer
              </Button>
            </div>
            <div className="space-y-2">
              {formData.sample_answers.map((answer, index) => (
                <div key={index} className="flex gap-2">
                  <textarea
                    value={answer}
                    onChange={(e) =>
                      handleArrayChange("sample_answers", index, e.target.value)
                    }
                    className="flex-1 rounded-md border px-3 py-2"
                    placeholder="Sample answer"
                    rows={3}
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => handleArrayRemove("sample_answers", index)}
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
            <Button type="submit">{tip ? "Update" : "Create"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
