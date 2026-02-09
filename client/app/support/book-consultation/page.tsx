"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, Users, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";

export default function BookConsultationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    consultationType: "general",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData
      const formDataToSend = new FormData();
      formDataToSend.append("type", "consultation");
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("time", formData.time);
      formDataToSend.append("consultationType", formData.consultationType);
      formDataToSend.append("additionalInfo", formData.message);

      const response = await fetch("/api/contact/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Consultation booked! You'll receive a confirmation email shortly.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          consultationType: "general",
          message: "",
        });
      } else {
        alert("Failed to book consultation: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to book consultation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const consultationTypes = [
    {
      value: "general",
      title: "General Consultation",
      description: "Discuss your study abroad plans and get personalized advice",
      duration: "30 minutes",
    },
    {
      value: "university",
      title: "University Selection",
      description: "Help choosing the right universities based on your profile",
      duration: "45 minutes",
    },
    {
      value: "application",
      title: "Application Review",
      description: "Review your application materials and get expert feedback",
      duration: "60 minutes",
    },
    {
      value: "visa",
      title: "Visa Guidance",
      description: "Learn about visa requirements and application process",
      duration: "45 minutes",
    },
  ];

  const benefits = [
    "Expert guidance from experienced education counselors",
    "Personalized recommendations based on your profile",
    "Questions and answers session",
    "Action plan for your study abroad journey",
    "Follow-up support via email",
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
              <Calendar className="h-12 w-12 text-primary" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Book a Consultation Call
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Schedule a one-on-one consultation with our education advisors to discuss your study abroad plans.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Booking Form */}
            <div className="rounded-lg border border-border bg-card p-6 lg:p-8">
              <h2 className="mb-6 text-2xl font-semibold">Schedule Your Consultation</h2>
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

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="date" className="mb-2 block text-sm font-medium">
                      Preferred Date *
                    </label>
                    <input
                      id="date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>

                  <div>
                    <label htmlFor="time" className="mb-2 block text-sm font-medium">
                      Preferred Time *
                    </label>
                    <input
                      id="time"
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="consultationType" className="mb-2 block text-sm font-medium">
                    Consultation Type *
                  </label>
                  <select
                    id="consultationType"
                    required
                    value={formData.consultationType}
                    onChange={(e) => setFormData({ ...formData, consultationType: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {consultationTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.title} ({type.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Tell us about your study abroad goals..."
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Consultation
                </Button>
              </form>
            </div>

            {/* Information Sidebar */}
            <div className="space-y-6">
              {/* Consultation Types */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">Consultation Types</h3>
                <div className="space-y-4">
                  {consultationTypes.map((type) => (
                    <div key={type.value} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="mb-1 flex items-center justify-between">
                        <h4 className="font-medium">{type.title}</h4>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {type.duration}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What to Expect */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">What to Expect</h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Platform Info */}
              <div className="rounded-lg border border-border bg-primary/5 p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Online Video Call</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  All consultations are conducted via secure video conferencing. You'll receive a meeting link after booking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
