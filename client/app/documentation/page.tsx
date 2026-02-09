import { DocumentGuideCard } from "@/components/documentation/document-guide-card";
import { DocumentGuide } from "@/lib/mock-data/types";

export const metadata = {
  title: "Documentation Support | BS Education",
  description:
    "Get help with preparing and organizing all required documents for your visa application.",
};

async function getDocumentationGuides() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/documentation`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch documentation guides");
      return [];
    }

    const data = await res.json();
    
    // Map database fields to frontend fields
    return data.map((guide: any) => ({
      id: guide.id,
      title: guide.title,
      country: guide.country,
      visaType: guide.visa_type,
      documents: guide.documents,
      checklist: guide.checklist,
      templates: guide.templates,
    })) as DocumentGuide[];
  } catch (error) {
    console.error("Error fetching documentation guides:", error);
    return [];
  }
}

export default async function DocumentationPage() {
  const guides = await getDocumentationGuides();

  return (
    <main className="w-full overflow-x-hidden pt-24 lg:pt-28">
      <section className="w-full bg-background py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Documentation Support
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Get help with preparing and organizing all required documents for
              your visa application. Find checklists, guides, and templates for
              each country.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <DocumentGuideCard key={guide.id} guide={guide} />
            ))}
          </div>

          {guides.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No documentation guides found.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}