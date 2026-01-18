import { getUniversitiesData } from "@/lib/mock-data/find-universities-data";
import { UniversityCard } from "@/components/find-universities/university-card";
import { UniversityFilters } from "@/components/find-universities/university-filters";
import FinduniversityForm from "@/components/ui/FinduniversityForm";

export const metadata = {
  title: "Find Universities | BS Education",
  description:
    "Search and discover universities worldwide that match your academic goals and preferences.",
};

export default async function FindUniversitiesPage() {
  const universities = await getUniversitiesData();

  return (
    <main className="w-full overflow-x-hidden">
      <section className="w-full bg-background py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Find Universities
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Discover universities worldwide that match your academic goals,
              interests, and career aspirations. Search by country, program, or
              ranking.
            </p>
          </div>

          <div className="mb-8">
            <FinduniversityForm />
          </div>

          <UniversityFilters />

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {universities.map((university) => (
              <UniversityCard key={university.id} university={university} />
            ))}
          </div>

          {universities.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No universities found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}