import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { helpCenterArticles } from "@/lib/mock-data/help-center-articles";

type HelpCenterArticlePageProps = {
  params: { slug: string };
};

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return helpCenterArticles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: HelpCenterArticlePageProps) {
  const article = helpCenterArticles.find((entry) => entry.slug === params.slug);

  if (!article) {
    return {
      title: "Help Center | BS Education",
    };
  }

  return {
    title: `${article.title} | Help Center`,
    description: article.description,
  };
}

export default function HelpCenterArticlePage({ params }: HelpCenterArticlePageProps) {
  const article = helpCenterArticles.find((entry) => entry.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="w-full overflow-x-hidden bg-background pt-24 lg:pt-28">
      <section className="w-full py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/support/help-center"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Help Center
            </Link>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {article.category}
              </span>
              <span>{article.readTime}</span>
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {article.title}
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              {article.description}
            </p>

            <div className="space-y-4 text-base text-foreground">
              {article.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
