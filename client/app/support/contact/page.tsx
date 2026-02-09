"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ContactSupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData
      const formDataToSend = new FormData();
      formDataToSend.append("type", "contact");
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("message", formData.message);

      const response = await fetch("/api/contact/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Message sent! We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("Failed to send message: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "support@bsedu.com.au",
      action: "Send Email",
      link: "mailto:support@bsedu.com.au",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "+61 (0) 3 9999 9999",
      action: "Call Us",
      link: "tel:+61399999999",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Available 24/7",
      action: "Start Chat",
      link: "#chat",
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
              <Mail className="h-12 w-12 text-primary" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Contact Support
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Get in touch with our support team via email, phone, or live chat. We're here to help 24/7.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="rounded-lg border border-border bg-card p-6 lg:p-8">
              <h2 className="mb-6 text-2xl font-semibold">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Full Name
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
                    Email Address
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
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Tell us more about your question..."
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Other Ways to Reach Us</h2>
              
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="rounded-lg border border-border bg-card p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <method.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{method.title}</h3>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                    <Button asChild variant="outline" className="w-full">
                      <a href={method.link}>{method.action}</a>
                    </Button>
                  </div>
                ))}
              </div>

              {/* Office Information */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 font-semibold">Office Location</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div className="text-sm">
                      <p>123 Education Street</p>
                      <p>Melbourne, VIC 3000</p>
                      <p>Australia</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div className="text-sm">
                      <p className="font-medium">Business Hours:</p>
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
