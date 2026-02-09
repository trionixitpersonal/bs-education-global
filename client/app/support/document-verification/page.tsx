"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Upload, Check, ArrowLeft, FileText, Award, AlertCircle, X } from "lucide-react";
import Link from "next/link";

export default function DocumentVerificationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    documentType: "",
    country: "",
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
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        alert(`${file.name} is not a valid file type. Please upload PDF or JPG files.`);
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
      alert("Please upload at least one document for verification.");
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Create FormData to send files
      const formDataToSend = new FormData();
      formDataToSend.append("type", "verification");
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("documentType", formData.documentType);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("additionalInfo", formData.additionalInfo);
      
      // Append all files
      uploadedFiles.forEach((file) => {
        formDataToSend.append("files", file);
      });

      const response = await fetch("/api/contact/submit", {
        method: "POST",
        body: formDataToSend, // Send FormData instead of JSON
      });

      const result = await response.json();

      if (response.ok) {
        alert("Document verification request submitted! We'll process your documents and contact you within 3-5 business days.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          documentType: "",
          country: "",
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

  const verificationServices = [
    {
      title: "Transcript Verification",
      description: "Authenticate and certify academic transcripts",
      price: "$49",
      turnaround: "3-5 days",
    },
    {
      title: "Degree Certificate",
      description: "Verify and certify degree certificates",
      price: "$59",
      turnaround: "3-5 days",
    },
    {
      title: "WES Evaluation",
      description: "World Education Services credential evaluation",
      price: "$199",
      turnaround: "7-10 days",
    },
    {
      title: "Complete Package",
      description: "All academic documents verified and certified",
      price: "$149",
      turnaround: "5-7 days",
    },
  ];

  const benefits = [
    "Accepted by universities worldwide",
    "Apostille and notarization services",
    "Digital and physical copies provided",
    "Tracking and status updates",
    "Secure document handling",
    "Rush processing available",
  ];

  const documentTypes = [
    "High School Transcripts",
    "Bachelor's Degree Certificate",
    "Master's Degree Certificate",
    "Academic Transcripts",
    "Diploma Certificates",
    "Professional Certificates",
    "Other",
  ];

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "Netherlands",
    "Other",
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
              <ShieldCheck className="h-12 w-12 text-primary" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Document Verification
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Verify your academic documents and get them certified for international university applications.
            </p>
          </div>

          {/* Verification Services */}
          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold text-center">Verification Services</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {verificationServices.map((service, index) => (
                <div key={index} className="rounded-lg border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md">
                  <div className="mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{service.description}</p>
                  <div className="mb-2 flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                    <span className="text-sm text-muted-foreground">/ document</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Processing: {service.turnaround}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Request Form */}
            <div className="rounded-lg border border-border bg-card p-6 lg:p-8">
              <h2 className="mb-6 text-2xl font-semibold">Request Verification</h2>
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
                  <label htmlFor="documentType" className="mb-2 block text-sm font-medium">
                    Document Type *
                  </label>
                  <select
                    id="documentType"
                    required
                    value={formData.documentType}
                    onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select document type</option>
                    {documentTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="country" className="mb-2 block text-sm font-medium">
                    Destination Country *
                  </label>
                  <select
                    id="country"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select destination country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
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
                    accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/jpg,image/png"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <div 
                    onClick={handleUploadClick}
                    className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 text-center transition-colors hover:border-primary cursor-pointer"
                  >
                    <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="mb-1 text-sm font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PDF or JPG (max. 10MB per file)</p>
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
                    rows={3}
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Any specific requirements or urgent processing needs..."
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Submitting..." : "Submit for Verification"}
                </Button>
              </form>
            </div>

            {/* Information */}
            <div className="space-y-6">
              {/* Benefits */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">Why Verify Your Documents?</h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">Verification Process</h3>
                <div className="space-y-4">
                  {[
                    {
                      step: 1,
                      title: "Submit Documents",
                      description: "Upload clear copies of your academic documents",
                    },
                    {
                      step: 2,
                      title: "Authentication",
                      description: "We verify documents with issuing institutions",
                    },
                    {
                      step: 3,
                      title: "Certification",
                      description: "Documents are certified and notarized if required",
                    },
                    {
                      step: 4,
                      title: "Delivery",
                      description: "Receive verified documents via email and courier",
                    },
                  ].map((item) => (
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

              {/* Important Note */}
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
                <div className="mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Important</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Ensure your original documents are clear and legible. Verification times may vary based on institution response times.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
