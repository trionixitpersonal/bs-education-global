"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileCheck, Upload, Check, ArrowLeft, FileText, AlertCircle, X } from "lucide-react";
import Link from "next/link";

export default function ApplicationReviewPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reviewType: "",
    additionalInfo: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const validFiles: File[] = [];
    
    for (const file of newFiles) {
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        alert(`${file.name} is not a valid file type. Please upload PDF, DOC, or DOCX files.`);
        continue;
      }
      
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum file size is 10MB.`);
        continue;
      }
      
      validFiles.push(file);
    }
    
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (uploadedFiles.length === 0) {
      alert("Please upload at least one document for review.");
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Create FormData to send files
      const formDataToSend = new FormData();
      formDataToSend.append("type", "review");
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("reviewType", formData.reviewType);
      formDataToSend.append("additionalInfo", formData.additionalInfo);
      
      // Append all files
      console.log(`Uploading ${uploadedFiles.length} files:`);
      uploadedFiles.forEach((file, index) => {
        console.log(`File ${index + 1}: ${file.name} (${file.size} bytes)`);
        formDataToSend.append("files", file);
      });

      console.log("Submitting form...");
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        body: formDataToSend, // Send FormData instead of JSON
      });

      const result = await response.json();
      console.log("Response:", result);

      if (response.ok) {
        alert("Application review request submitted! We'll review your documents and get back to you within 2-3 business days.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          reviewType: "",
          additionalInfo: "",
        });
        setUploadedFiles([]);
      } else {
        alert("Failed to submit request: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const reviewServices = [
    {
      title: "Statement of Purpose (SOP)",
      description: "Get expert feedback on your personal statement",
      price: "$99",
      turnaround: "2-3 days",
    },
    {
      title: "CV/Resume Review",
      description: "Professional review and suggestions for improvement",
      price: "$79",
      turnaround: "1-2 days",
    },
    {
      title: "Letter of Recommendation",
      description: "Ensure your LORs meet university standards",
      price: "$89",
      turnaround: "2-3 days",
    },
    {
      title: "Complete Application Package",
      description: "Comprehensive review of all application materials",
      price: "$249",
      turnaround: "5-7 days",
    },
  ];

  const whatWeCheck = [
    "Grammar, spelling, and punctuation",
    "Content structure and flow",
    "Alignment with university requirements",
    "Strength of arguments and examples",
    "Overall presentation and formatting",
    "Suggestions for improvement",
  ];

  const process = [
    {
      step: 1,
      title: "Submit Your Documents",
      description: "Upload your application materials through our secure portal",
    },
    {
      step: 2,
      title: "Expert Review",
      description: "Our experienced reviewers analyze your documents in detail",
    },
    {
      step: 3,
      title: "Receive Feedback",
      description: "Get comprehensive feedback with specific suggestions",
    },
    {
      step: 4,
      title: "Revise & Resubmit",
      description: "Make improvements and submit for a final check (optional)",
    },
  ];

  return (
    <main className="w-full overflow-x-hidden bg-background pt-24 lg:pt-28">
      <section className="w-full py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link 
              href="/support"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Support
            </Link>
          </div>

          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-4">
              <FileCheck className="h-12 w-12 text-primary" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Application Review Service
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Get expert feedback on your application materials including SOP, CV, and recommendation letters.
            </p>
          </div>

          {/* Review Services */}
          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold text-center">Our Review Services</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {reviewServices.map((service, index) => (
                <div key={index} className="rounded-lg border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md">
                  <div className="mb-4">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{service.description}</p>
                  <div className="mb-2 flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                    <span className="text-sm text-muted-foreground">/ document</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Turnaround: {service.turnaround}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Request Form */}
            <div className="rounded-lg border border-border bg-card p-6 lg:p-8">
              <h2 className="mb-6 text-2xl font-semibold">Request a Review</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="+61 400 000 000"
                  />
                </div>

                <div>
                  <label htmlFor="reviewType" className="mb-2 block text-sm font-medium">
                    Service Type *
                  </label>
                  <select
                    id="reviewType"
                    required
                    value={formData.reviewType}
                    onChange={(e) => setFormData({ ...formData, reviewType: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select a service</option>
                    {reviewServices.map((service, index) => (
                      <option key={index} value={service.title}>
                        {service.title} - {service.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Upload Documents *
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <div 
                    onClick={handleUploadClick}
                    className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 text-center transition-colors hover:border-primary cursor-pointer"
                  >
                    <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="mb-1 text-sm font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PDF, DOC, or DOCX (max. 10MB)</p>
                  </div>
                  
                  {/* Display uploaded files */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between rounded-lg border border-border bg-muted/50 px-3 py-2"
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <FileText className="h-4 w-4 text-primary shrink-0" />
                            <span className="text-sm truncate">{file.name}</span>
                            <span className="text-xs text-muted-foreground shrink-0">
                              ({(file.size / 1024).toFixed(2)} KB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="ml-2 rounded-full p-1 hover:bg-destructive/10 text-destructive shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="additionalInfo" className="mb-2 block text-sm font-medium">
                    Additional Information
                  </label>
                  <textarea
                    id="additionalInfo"
                    rows={4}
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Any specific concerns or areas you'd like us to focus on..."
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  <FileCheck className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Submitting..." : "Submit for Review"}
                </Button>
              </form>
            </div>

            {/* Information */}
            <div className="space-y-6">
              {/* What We Check */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">What We Check</h3>
                <ul className="space-y-3">
                  {whatWeCheck.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">How It Works</h3>
                <div className="space-y-4">
                  {process.map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="mb-1 font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantee */}
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
                <div className="mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Our Guarantee</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  If you're not satisfied with our review, we'll revise it for free or provide a full refund within 7 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
