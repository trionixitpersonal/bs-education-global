"use client";

import { useEffect, useState } from "react";
import { ResourceCard } from "@/components/resources/resource-card";
import { ResourceFilters } from "@/components/resources/resource-filters";

interface Resource {
  id: string;
  title: string;
  description: string;
  category: "Guide" | "Article" | "Video" | "Tool" | "Template";
  link: string;
  read_time?: string;
  tags: string[];
  published_at?: string;
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch("/api/resources");
        const data = await response.json();
        
        setResources(data || []);
      } catch (error) {
        console.error("Failed to fetch resources:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (isLoading) {
    return (
      <main className="w-full overflow-x-hidden pt-24 lg:pt-28">
        <section className="w-full bg-background py-12 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center p-8">
              <div className="text-lg">Loading resources...</div>
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
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Resources
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Access comprehensive guides, articles, videos, tools, and
              templates to support your study abroad journey.
            </p>
          </div>

          <ResourceFilters />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>

          {resources.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No resources found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
