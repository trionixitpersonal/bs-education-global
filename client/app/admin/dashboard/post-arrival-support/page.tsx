"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PostArrivalSupportDialog } from "@/components/admin/post-arrival-support/PostArrivalSupportDialog";

interface PostArrivalSupport {
  id: string;
  category: string;
  title: string;
  icon: string;
  description: string;
  key_steps: string[];
  important_contacts: string[];
  useful_resources: string[];
  timeline: string;
}

export default function PostArrivalSupportAdmin() {
  const [supports, setSupports] = useState<PostArrivalSupport[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSupport, setEditingSupport] = useState<PostArrivalSupport | null>(null);

  useEffect(() => {
    fetchSupports();
  }, []);

  const fetchSupports = async () => {
    try {
      const response = await fetch("/api/post-arrival-support");
      const data = await response.json();
      setSupports(data);
    } catch (error) {
      console.error("Error fetching supports:", error);
    }
  };

  const handleEdit = (support: PostArrivalSupport) => {
    setEditingSupport(support);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this support?")) return;

    try {
      const response = await fetch(`/api/post-arrival-support/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchSupports();
      }
    } catch (error) {
      console.error("Error deleting support:", error);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingSupport(null);
    fetchSupports();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Post Arrival Support</h1>
        <Button onClick={() => setIsDialogOpen(true)}>Add Support Guide</Button>
      </div>

      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Timeline</th>
              <th className="p-4 text-left">Steps</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {supports.map((support) => (
              <tr key={support.id} className="border-b">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{support.icon}</span>
                    <span>{support.title}</span>
                  </div>
                </td>
                <td className="p-4">{support.category}</td>
                <td className="p-4">{support.timeline}</td>
                <td className="p-4">{support.key_steps.length}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(support)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(support.id)}
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

      <PostArrivalSupportDialog
        open={isDialogOpen}
        onOpenChange={handleDialogClose}
        support={editingSupport}
      />
    </div>
  );
}
