"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Book, HelpCircle, Search } from "lucide-react";

import { HelpCenterArticle } from "@/lib/mock-data/help-center-articles";

type HelpCenterClientProps = {
  articles: HelpCenterArticle[];
};

export default function HelpCenterClient({ articles }: HelpCenterClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(articles.map((article) => article.category)));
    return ["All", ...unique];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === "All" || article.category === activeCategory;

      if (!normalizedQuery) {
        return matchesCategory;
      }

      const matchesQuery =
        article.title.toLowerCase().includes(normalizedQuery) ||
        article.description.toLowerCase().includes(normalizedQuery) ||
        article.category.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [articles, activeCategory, searchQuery]);

  return (
    <section className="w-full py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="mx-auto mb-12 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search for articles, guides, and answers..."
              className="w-full rounded-lg border border-input bg-background py-3 pl-12 pr-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">Browse by Category</h2>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-lg border border-border p-4 text-sm font-medium transition-all ${
                    isActive
                      ? "border-primary bg-primary/10 text-primary"
                      : "bg-card hover:border-primary hover:bg-primary/5"
                  }`}
                  aria-pressed={isActive}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="mb-6 text-2xl font-semibold">Popular Articles</h2>
          {filteredArticles.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
              No articles match your search. Try another keyword or category.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <div
                  key={article.slug}
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
                  <Link
                    href={`/support/help-center/${article.slug}`}
                    className="inline-flex items-center text-sm font-medium text-primary"
                  >
                    Read Article
                    <Book className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
