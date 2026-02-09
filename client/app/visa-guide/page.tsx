"use client";

import { useEffect, useState } from "react";
import { VisaGuideCard } from "@/components/visa-guide/visa-guide-card";

interface VisaGuide {
  id: string;
  country: string;
  flag_emoji: string;
  visa_type: string;
  requirements: string[];
  processing_time: string;
  cost: string;
  documents: string[];
  description: string;
  guide_link?: string;
}

export default function VisaGuidePage() {
  const [visaGuides, setVisaGuides] = useState<VisaGuide[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVisaGuides = async () => {
      try {
        const response = await fetch("/api/visa-guides");
        const data = await response.json();
        
        // Map database fields to match the component's expected format
        const mappedData = data.map((guide: any) => ({
          id: guide.id,
          country: guide.country,
          flag: guide.flag_emoji,
          visaType: guide.visa_type,
          requirements: guide.requirements || [],
          processingTime: guide.processing_time,
          cost: guide.cost,
          documents: guide.documents || [],
          description: guide.description,
          guideLink: guide.guide_link,
        }));
        
        setVisaGuides(mappedData);
      } catch (error) {
        console.error("Failed to fetch visa guides:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisaGuides();
  }, []);

  if (isLoading) {
    return (
      <main className="w-full overflow-x-hidden pt-24 lg:pt-28">
        <section className="w-full bg-background py-12 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center p-8">
              <div className="text-lg">Loading visa guides...</div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="w-full overflow-x-hidden pt-24 lg:pt-28">
      <section className="w-full bg-background py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Student Visa Guide
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Comprehensive visa information for international students. Find
              requirements, documents, and step-by-step application processes
              for your study destination.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {visaGuides.map((guide) => (
              <VisaGuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
