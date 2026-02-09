"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, Clock, DollarSign, Globe, AlertCircle } from "lucide-react";

interface CountryRequirement {
  id: string;
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

interface CountryRequirementCardProps {
  requirement: CountryRequirement;
}

export function CountryRequirementCard({
  requirement,
}: CountryRequirementCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CountryRequirementDialog
        requirement={requirement}
        open={open}
        onOpenChange={setOpen}
      />
      <div className="group relative flex flex-col rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
        <div className="mb-4">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-4xl">{requirement.flag_icon}</span>
            <h3 className="text-xl font-semibold leading-tight">
              {requirement.country}
            </h3>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>{requirement.visa_types.length} Visa Types</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{requirement.processing_time}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>{requirement.application_fee}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="mt-auto w-full rounded-md border border-primary bg-transparent px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          View Requirements
        </button>
      </div>
    </>
  );
}

function CountryRequirementDialog({
  requirement,
  open,
  onOpenChange,
}: {
  requirement: CountryRequirement;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] !w-[40vw] !max-w-none overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <span className="text-4xl">{requirement.flag_icon}</span>
            {requirement.country} - Visa Requirements
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Visa Types */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Available Visa Types</h3>
            </div>
            <ul className="space-y-1">
              {requirement.visa_types.map((type, idx) => (
                <li key={idx} className="text-sm">
                  • {type}
                </li>
              ))}
            </ul>
          </div>

          {/* Processing Time & Fee */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Processing Time</h3>
              </div>
              <p className="text-sm">{requirement.processing_time}</p>
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Application Fee</h3>
              </div>
              <p className="text-sm">{requirement.application_fee}</p>
            </div>
          </div>

          {/* Financial Requirements */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Financial Requirements</h3>
            </div>
            <p className="text-sm">{requirement.financial_requirements}</p>
          </div>

          {/* Language Requirements */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Language Requirements</h3>
            </div>
            <ul className="space-y-1">
              {requirement.language_requirements.map((req, idx) => (
                <li key={idx} className="text-sm">
                  • {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Key Requirements */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Key Requirements</h3>
            </div>
            <ul className="space-y-2">
              {requirement.key_requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Important Notes */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Important Notes</h3>
            </div>
            <ul className="space-y-2">
              {requirement.important_notes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
