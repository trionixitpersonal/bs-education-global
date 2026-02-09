"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, Phone, Link as LinkIcon, Clock } from "lucide-react";

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

interface PostArrivalCardProps {
  support: PostArrivalSupport;
}

export function PostArrivalCard({ support }: PostArrivalCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PostArrivalDialog support={support} open={open} onOpenChange={setOpen} />
      <div className="group relative flex flex-col rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
        <div className="mb-4">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-3xl">{support.icon}</span>
            <h3 className="text-xl font-semibold leading-tight">
              {support.title}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">{support.category}</p>
          <p className="mt-2 text-sm">{support.description}</p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span>{support.key_steps.length} Key Steps</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" />
            <span>{support.important_contacts.length} Important Contacts</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>{support.timeline}</span>
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="mt-6 w-full rounded-md border border-primary bg-transparent px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          View Details
        </button>
      </div>
    </>
  );
}

function PostArrivalDialog({
  support,
  open,
  onOpenChange,
}: {
  support: PostArrivalSupport;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] !w-[40vw] !max-w-none overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <span className="text-3xl">{support.icon}</span>
            {support.title}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">{support.category}</p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Description */}
          <div>
            <p className="text-sm">{support.description}</p>
          </div>

          {/* Timeline */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Timeline</h3>
            </div>
            <p className="text-sm">{support.timeline}</p>
          </div>

          {/* Key Steps */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Key Steps</h3>
            </div>
            <ol className="space-y-2">
              {support.key_steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5 text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Important Contacts */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Important Contacts</h3>
            </div>
            <ul className="space-y-2">
              {support.important_contacts.map((contact, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>{contact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Resources */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Useful Resources</h3>
            </div>
            <ul className="space-y-2">
              {support.useful_resources.map((resource, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <LinkIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>{resource}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
