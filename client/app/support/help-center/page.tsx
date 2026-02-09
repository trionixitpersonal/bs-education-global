import { Button } from "@/components/ui/button";
import { HelpCircle, Book, FileText, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Help Center | BS Education",
  description: "Browse our comprehensive knowledge base with articles, guides, and answers to common questions.",
};

export default function HelpCenterPage() {
  const articles = [
    {
      id: 1,
      category: "Getting Started",
      title: "How to Choose the Right University",
      description: "A comprehensive guide to selecting universities that match your academic goals and career aspirations.",
      readTime: "5 min read",
    },
    {
      id: 2,
      category: "Applications",
      title: "Understanding Application Requirements",
      description: "Learn about common application requirements across different countries and universities.",
      readTime: "7 min read",
    },
    {
      id: 3,
      category: "Scholarships",
      title: "Finding and Applying for Scholarships",
      description: "Tips and strategies for discovering scholarship opportunities and creating winning applications.",
      readTime: "6 min read",
    },
    {
      id: 4,
      category: "Visa Process",
      title: "Step-by-Step Visa Application Guide",
      description: "Everything you need to know about applying for a student visa in your destination country.",
      readTime: "8 min read",
    },
    {
      id: 5,
      category: "Documentation",
      title: "Preparing Your Academic Documents",
      description: "How to gather, verify, and submit the required academic documents for your application.",
      readTime: "4 min read",
    },
    {
      id: 6,
      category: "Financial Planning",
      title: "Budgeting for Study Abroad",
      description: "Create a realistic budget covering tuition, living expenses, and other costs.",
      readTime: "6 min read",
    },
  ];

  const categories = [
    "Getting Started",
    "Applications",
    "Scholarships",
    "Visa Process",
    "Documentation",
    "Financial Planning",
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
              <HelpCircle className="h-12 w-12 text-primary" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Help Center
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Browse our comprehensive knowledge base with articles, guides, and answers to common questions.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mx-auto mb-12 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for articles, guides, and answers..."
                className="w-full rounded-lg border border-input bg-background py-3 pl-12 pr-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold">Browse by Category</h2>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
              {categories.map((category) => (
                <button
                  key={category}
                  className="rounded-lg border border-border bg-card p-4 text-sm font-medium transition-all hover:border-primary hover:bg-primary/5"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Articles */}
          <div>
            <h2 className="mb-6 text-2xl font-semibold">Popular Articles</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">
                    {article.title}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {article.description}
                  </p>
                  <div className="flex items-center text-sm font-medium text-primary">
                    Read Article
                    <Book className="ml-2 h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support CTA */}
          <div className="mt-16 rounded-lg border border-border bg-muted/30 p-8 text-center">
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
