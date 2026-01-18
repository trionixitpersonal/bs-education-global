import { getVisaGuideData } from "@/lib/mock-data/visa-guide-data";
import { VisaGuideCard } from "@/components/visa-guide/visa-guide-card";

export const metadata = {
  title: "Visa Guide | BS Education",
  description:
    "Complete guide to student visa requirements and application processes for major study destinations worldwide.",
};

export default async function VisaGuidePage() {
  const visaGuides = await getVisaGuideData();

  return (
    <main className="w-full overflow-x-hidden">
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
