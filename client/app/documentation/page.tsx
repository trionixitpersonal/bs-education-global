import { getDocumentationData } from "@/lib/mock-data/documentation-data";
import { DocumentGuideCard } from "@/components/documentation/document-guide-card";

export const metadata = {
  title: "Documentation Support | BS Education",
  description:
    "Get help with preparing and organizing all required documents for your visa application.",
};

export default async function DocumentationPage() {
  const guides = await getDocumentationData();

  return (
    <main className="w-full overflow-x-hidden">
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