import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import HelpCenterClient from "@/components/support/help-center-client";
import { helpCenterArticles } from "@/lib/mock-data/help-center-articles";

export const metadata = {
  title: "Help Center | BS Education",
  description: "Browse our comprehensive knowledge base with articles, guides, and answers to common questions.",
};

export default function HelpCenterPage() {
  return (
    <main className="w-full overflow-x-hidden bg-background pt-24 lg:pt-28">
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
      </div>

      <HelpCenterClient articles={helpCenterArticles} />

      <section className="w-full pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-border bg-muted/30 p-8 text-center">
            <h3 className="mb-2 text-2xl font-semibold">Can't find what you're looking for?</h3>
            <p className="mb-6 text-muted-foreground">
              Our support team is ready to help you with any questions you have.
            </p>
            <Button asChild size="lg">
              <Link href="/support/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
