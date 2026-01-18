"use client";

import { useState } from "react";
import { MoveLeft, MoveRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FormData {
  studyLevel: string;
  subject: string;
  location: string;
  session: string;
}

const TOTAL_STEPS = 4;

const studyLevels = [
  { value: "bachelors", label: "Bachelors" },
  { value: "masters", label: "Masters" },
  { value: "mba", label: "MBA" },
  { value: "phd", label: "PhD" },
];

const subjects = [
  { value: "computer-science", label: "Computer Science" },
  { value: "business", label: "Business Administration" },
  { value: "engineering", label: "Engineering" },
  { value: "medicine", label: "Medicine" },
  { value: "law", label: "Law" },
  { value: "arts", label: "Arts & Humanities" },
  { value: "science", label: "Natural Sciences" },
  { value: "social-science", label: "Social Sciences" },
];

const locations = [
  { value: "australia", label: "Australia" },
  { value: "uk", label: "United Kingdom" },
  { value: "usa", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "germany", label: "Germany" },
  { value: "france", label: "France" },
  { value: "netherlands", label: "Netherlands" },
  { value: "other", label: "Other" },
];

const sessions = [
  { value: "spring-2026", label: "Spring 2026" },
  { value: "fall-2026", label: "Fall 2026" },
  { value: "spring-2027", label: "Spring 2027" },
  { value: "fall-2027", label: "Fall 2027" },
  { value: "later", label: "Later" },
];

export default function FinduniversityForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    studyLevel: "",
    subject: "",
    location: "",
    session: "",
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Handle form submission
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Add your form submission logic here
    alert("Form submitted successfully!");
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.studyLevel !== "";
      case 2:
        return formData.subject !== "";
      case 3:
        return formData.location !== "";
      case 4:
        return formData.session !== "";
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <label className="block text-base font-semibold text-primary-foreground sm:text-lg">
              Select Study Level
            </label>
            <select
              value={formData.studyLevel}
              onChange={(e) => updateFormData("studyLevel", e.target.value)}
              className="w-full rounded-xl border-2 border-input bg-card px-5 py-3.5 text-base text-foreground shadow-sm transition-all hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Choose a study level...</option>
              {studyLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <label className="block text-base font-semibold text-primary-foreground sm:text-lg">
              Select Subject
            </label>
            <select
              value={formData.subject}
              onChange={(e) => updateFormData("subject", e.target.value)}
              className="w-full rounded-xl border-2 border-input bg-card px-5 py-3.5 text-base text-foreground shadow-sm transition-all hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Choose a subject...</option>
              {subjects.map((subject) => (
                <option key={subject.value} value={subject.value}>
                  {subject.label}
                </option>
              ))}
            </select>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <label className="block text-base font-semibold text-primary-foreground sm:text-lg">
              Select Location
            </label>
            <select
              value={formData.location}
              onChange={(e) => updateFormData("location", e.target.value)}
              className="w-full rounded-xl border-2 border-input bg-card px-5 py-3.5 text-base text-foreground shadow-sm transition-all hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Choose a location...</option>
              {locations.map((location) => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <label className="block text-base font-semibold text-primary-foreground sm:text-lg">
              Select Session
            </label>
            <select
              value={formData.session}
              onChange={(e) => updateFormData("session", e.target.value)}
              className="w-full rounded-xl border-2 border-input bg-card px-5 py-3.5 text-base text-foreground shadow-sm transition-all hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Choose a session...</option>
              {sessions.map((session) => (
                <option key={session.value} value={session.value}>
                  {session.label}
                </option>
              ))}
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl rounded-2xl bg-card/10 p-8 backdrop-blur-md shadow-xl sm:p-10">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-muted-foreground sm:text-base">
            Step {currentStep} of {TOTAL_STEPS}
          </p>
          <div className="flex gap-1.5">
            {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-2.5 w-10 rounded-full transition-all duration-300",
                  index + 1 <= currentStep
                    ? "bg-primary shadow-sm"
                    : "bg-card/20"
                )}
              />
            ))}
          </div>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-card/20">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8 min-h-[140px]">{renderStepContent()}</div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={currentStep === 1}
          className="text-primary-foreground hover:bg-card/20 hover:text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <MoveLeft className="h-4 w-4" />
          <span className="font-medium">Back</span>
        </Button>

        <Button
          variant="default"
          onClick={handleNext}
          disabled={!isStepValid()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all font-semibold px-6"
        >
          {currentStep === TOTAL_STEPS ? (
            <>
              <span>Submit</span>
              <CheckCircle2 className="h-4 w-4" />
            </>
          ) : (
            <>
              <span>Next</span>
              <MoveRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
