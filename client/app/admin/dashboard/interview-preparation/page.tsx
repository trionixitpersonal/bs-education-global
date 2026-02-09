"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { InterviewPreparationDialog } from "@/components/admin/interview-preparation/InterviewPreparationDialog";

interface InterviewTip {
  id: string;
  category: string;
  title: string;
  icon: string;
  common_questions: string[];
  dos: string[];
  donts: string[];
  preparation_tips: string[];
  sample_answers: string[];
}

export default function InterviewPreparationAdmin() {
  const [tips, setTips] = useState<InterviewTip[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTip, setEditingTip] = useState<InterviewTip | null>(null);

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    try {
      const response = await fetch("/api/interview-preparation");
      const data = await response.json();
      setTips(data);
    } catch (error) {
      console.error("Error fetching tips:", error);
    }
  };

  const handleEdit = (tip: InterviewTip) => {
    setEditingTip(tip);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tip?")) return;

    try {
      const response = await fetch(`/api/interview-preparation/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchTips();
      }
    } catch (error) {
      console.error("Error deleting tip:", error);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingTip(null);
    fetchTips();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Interview Preparation</h1>
        <Button onClick={() => setIsDialogOpen(true)}>Add Interview Tip</Button>
      </div>

      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Questions</th>
              <th className="p-4 text-left">Tips</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tips.map((tip) => (
              <tr key={tip.id} className="border-b">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{tip.icon}</span>
                    <span>{tip.title}</span>
                  </div>
                </td>
                <td className="p-4">{tip.category}</td>
                <td className="p-4">{tip.common_questions.length}</td>
                <td className="p-4">{tip.preparation_tips.length}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(tip)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(tip.id)}
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

      <InterviewPreparationDialog
        open={isDialogOpen}
        onOpenChange={handleDialogClose}
        tip={editingTip}
      />
    </div>
  );
}
