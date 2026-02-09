"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageCircle, CheckCircle, XCircle, Lightbulb, MessageSquare } from "lucide-react";

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

interface InterviewTipCardProps {
  tip: InterviewTip;
}

export function InterviewTipCard({ tip }: InterviewTipCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <InterviewTipDialog tip={tip} open={open} onOpenChange={setOpen} />
      <div className="group relative flex flex-col rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
        <div className="mb-4">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-3xl">{tip.icon}</span>
            <h3 className="text-xl font-semibold leading-tight">{tip.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{tip.category}</p>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-primary" />
            <span>{tip.common_questions.length} Common Questions</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>{tip.dos.length} Do's</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-600" />
            <span>{tip.donts.length} Don'ts</span>
          </div>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            <span>{tip.preparation_tips.length} Preparation Tips</span>
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

function InterviewTipDialog({
  tip,
  open,
  onOpenChange,
}: {
  tip: InterviewTip;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] !w-[40vw] !max-w-none overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <span className="text-3xl">{tip.icon}</span>
            {tip.title}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">{tip.category}</p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Common Questions */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Common Questions</h3>
            </div>
            <ul className="space-y-2">
              {tip.common_questions.map((question, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="mt-1 text-primary">Q{idx + 1}:</span>
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Do's */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold">Do's</h3>
            </div>
            <ul className="space-y-2">
              {tip.dos.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Don'ts */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600" />
              <h3 className="text-lg font-semibold">Don'ts</h3>
            </div>
            <ul className="space-y-2">
              {tip.donts.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Preparation Tips */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <h3 className="text-lg font-semibold">Preparation Tips</h3>
            </div>
            <ul className="space-y-2">
              {tip.preparation_tips.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Lightbulb className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sample Answers */}
          {tip.sample_answers.length > 0 && (
            <div>
              <div className="mb-3 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Sample Answers</h3>
              </div>
              <div className="space-y-3">
                {tip.sample_answers.map((answer, idx) => (
                  <div
                    key={idx}
                    className="rounded-md bg-muted/50 p-3 text-sm"
                  >
                    {answer}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
