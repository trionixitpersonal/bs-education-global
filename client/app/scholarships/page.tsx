import { getScholarshipsData } from "@/lib/mock-data/scholarships-data";
import { ScholarshipCard } from "@/components/scholarships/scholarship-card";
import { ScholarshipFilters } from "@/components/scholarships/scholarship-filters";

export const metadata = {
  title: "Scholarships | BS Education",
  description:
    "Discover international scholarships for undergraduate, graduate, and PhD programs worldwide.",
};

export default async function ScholarshipsPage() {
  const scholarships = await getScholarshipsData();

  return (
    <main className="w-full overflow-x-hidden">
      <section className="w-full bg-background py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Scholarships
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Discover funding opportunities for your international education
              journey. Find scholarships that match your academic goals and
              financial needs.
            </p>
          </div>

          <ScholarshipFilters />

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {scholarships.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>

          {scholarships.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No scholarships found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
