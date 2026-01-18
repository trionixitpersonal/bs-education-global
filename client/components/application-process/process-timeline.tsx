"use client";

import { ProcessStep } from "@/lib/mock-data/types";
import { ProcessStepCard } from "./process-step-card";
import { useState } from "react";

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (stepNumber: number) => {
    if (activeStep === stepNumber) {
      setActiveStep(null);
    } else {
      setActiveStep(stepNumber);
    }
  };

  const toggleCompleted = (stepNumber: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepNumber)) {
      newCompleted.delete(stepNumber);
    } else {
      newCompleted.add(stepNumber);
    }
    setCompletedSteps(newCompleted);
  };

  const sortedSteps = [...steps].sort((a, b) => a.stepNumber - b.stepNumber);

  return (
    <div className="space-y-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Application Process Timeline</h2>
        <div className="text-sm text-muted-foreground">
          {completedSteps.size} of {steps.length} steps completed
        </div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 top-0 h-full w-0.5 bg-border" />

        <div className="space-y-8">
          {sortedSteps.map((step, idx) => (
            <div key={step.id} className="relative flex gap-6">
              {/* Timeline dot */}
              <div className="relative z-10 flex-shrink-0">
                <div
                  className={`h-10 w-10 rounded-full border-4 transition-colors ${
                    completedSteps.has(step.stepNumber)
                      ? "border-primary bg-primary"
                      : activeStep === step.stepNumber
                      ? "border-primary bg-primary/20"
                      : "border-border bg-background"
                  }`}
                />
              </div>

              {/* Step content */}
              <div className="flex-1 pb-8">
                <button
                  onClick={() => toggleStep(step.stepNumber)}
                  className="w-full text-left"
                >
                  <ProcessStepCard
                    step={step}
                    isActive={activeStep === step.stepNumber}
                    isCompleted={completedSteps.has(step.stepNumber)}
                  />
                </button>
                <button
                  onClick={() => toggleCompleted(step.stepNumber)}
                  className="mt-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  {completedSteps.has(step.stepNumber)
                    ? "Mark as incomplete"
                    : "Mark as complete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}