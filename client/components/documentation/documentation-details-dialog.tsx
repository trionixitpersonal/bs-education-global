"use client";

import { DocumentGuide } from "@/lib/mock-data/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, CheckCircle2, File } from "lucide-react";

interface DocumentationDetailsDialogProps {
  guide: DocumentGuide;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DocumentationDetailsDialog({
  guide,
  open,
  onOpenChange,
}: DocumentationDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] !w-[40vw] !max-w-none overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{guide.title}</DialogTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium">{guide.country}</span>
            <span>•</span>
            <span>{guide.visaType}</span>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Documents Section */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Documents Required</h3>
            </div>
            <ul className="space-y-2">
              {guide.documents.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="text-sm">{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Checklist Section */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Application Checklist</h3>
            </div>
            <ol className="space-y-2">
              {guide.checklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5 text-sm">{item}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Templates Section */}
          {guide.templates.length > 0 && (
            <div>
              <div className="mb-3 flex items-center gap-2">
                <File className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Available Templates</h3>
              </div>
              <ul className="space-y-2">
                {guide.templates.map((template, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <File className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    <span className="text-sm">{template}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
