import Link from "next/link";
import { notFound } from "next/navigation";
import { getBaseUrl } from "@/lib/server-url";

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

async function getVisaGuide(id: string): Promise<VisaGuide | null> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/visa-guides/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    return (await res.json()) as VisaGuide;
  } catch (error) {
    console.error("Error fetching visa guide:", error);
    return null;
  }
}

export default async function VisaGuideDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const guide = await getVisaGuide(params.id);

  if (!guide) {
    notFound();
  }

  return (
    <main className="w-full overflow-x-hidden pt-24 lg:pt-28">
      <section className="w-full bg-background py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/visa-guide"
              className="text-sm font-medium text-primary hover:underline"
            >
              Back to Visa Guide
            </Link>
          </div>

          <div className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="text-4xl">{guide.flag_emoji}</span>
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                {guide.country}
              </h1>
            </div>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {guide.description}
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <p className="text-xs font-medium text-muted-foreground">
                Visa Type
              </p>
              <p className="mt-2 text-sm font-semibold text-foreground">
                {guide.visa_type}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <p className="text-xs font-medium text-muted-foreground">
                Processing Time
              </p>
              <p className="mt-2 text-sm font-semibold text-foreground">
                {guide.processing_time}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <p className="text-xs font-medium text-muted-foreground">Cost</p>
              <p className="mt-2 text-sm font-semibold text-foreground">
                {guide.cost}
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-8 lg:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Key Requirements</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {guide.requirements.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Required Documents</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {guide.documents.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {guide.guide_link && (
            <div className="mx-auto mt-10 max-w-2xl text-center">
              <a
                href={guide.guide_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-primary px-5 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                View External Guide
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
