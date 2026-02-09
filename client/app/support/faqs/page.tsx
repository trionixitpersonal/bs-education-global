"use client";

import { useEffect, useState } from "react";
import { MessageCircle, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { FAQAccordion } from "@/components/support/faq-accordion";
import { FAQ } from "@/lib/mock-data/types";

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFAQs() {
      try {
        // Use public endpoint to get only active FAQs
        const response = await fetch('/api/faqs/public');
        if (response.ok) {
          const data = await response.json();
          setFaqs(data || []);
          setFilteredFaqs(data || []);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFAQs();
  }, []);

  useEffect(() => {
    let result = [...faqs];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      result = result.filter((faq) => faq.category === selectedCategory);
    }

    setFilteredFaqs(result);
  }, [searchQuery, selectedCategory, faqs]);

  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

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
              <MessageCircle className="h-12 w-12 text-primary" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Find quick answers to the most common questions about applications, visas, and scholarships.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mx-auto mb-12 max-w-4xl space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-input bg-background py-3 pl-12 pr-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategory === null
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card hover:bg-muted"
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-card hover:bg-muted"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* FAQs List */}
          <div className="mx-auto max-w-4xl">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-20 animate-pulse rounded-lg bg-muted" />
                ))}
              </div>
            ) : filteredFaqs.length > 0 ? (
              <FAQAccordion faqs={filteredFaqs} />
            ) : (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">
                  No FAQs found matching your search.
                </p>
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <div className="mx-auto mt-16 max-w-4xl rounded-lg border border-border bg-muted/30 p-8 text-center">
            <h3 className="mb-2 text-2xl font-semibold">Still have questions?</h3>
            <p className="mb-6 text-muted-foreground">
              Can't find the answer you're looking for? Please contact our support team.
            </p>
            <Link
              href="/support/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
