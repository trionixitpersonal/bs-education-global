import { ProcessStep } from "@/lib/mock-data/types";
import { Clock, CheckCircle2, Lightbulb } from "lucide-react";

interface ProcessStepCardProps {
  step: ProcessStep;
  isActive?: boolean;
  isCompleted?: boolean;
}

export function ProcessStepCard({
  step,
  isActive = false,
  isCompleted = false,
}: ProcessStepCardProps) {
  return (
    <div
      className={`rounded-lg border p-6 transition-all ${
        isActive
          ? "border-primary bg-primary/5 shadow-md"
          : isCompleted
          ? "border-primary/50 bg-primary/5"
          : "border-border bg-card"
      }`}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
              isActive
                ? "bg-primary text-primary-foreground"
                : isCompleted
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              step.stepNumber
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{step.duration}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">{step.description}</p>

      <div className="mb-4">
        <h4 className="mb-2 text-sm font-semibold">Requirements:</h4>
        <ul className="space-y-1">
          {step.requirements.map((req, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="h-3 w-3 mt-0.5 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">{req}</span>
            </li>
          ))}
        </ul>
      </div>

      {step.tips.length > 0 && (
        <div>
          <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <Lightbulb className="h-4 w-4 text-primary" />
            Tips:
          </h4>
          <ul className="space-y-1">
            {step.tips.map((tip, idx) => (
              <li key={idx} className="text-sm text-muted-foreground">
                • {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}