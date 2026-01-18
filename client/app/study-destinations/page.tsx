import { getStudyDestinationsData } from "@/lib/mock-data/study-destinations-data";
import { DestinationCard } from "@/components/study-destinations/destination-card";
import { DestinationFilters } from "@/components/study-destinations/destination-filters";

export const metadata = {
  title: "Study Destinations | BS Education",
  description:
    "Get detailed insights into student life at leading universities in vibrant cities worldwide.",
};

export default async function StudyDestinationsPage() {
  const destinations = await getStudyDestinationsData();

  return (
    <main className="w-full overflow-x-hidden">
      <section className="w-full bg-background py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Study Destinations
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Get detailed insights into student life at leading universities in
              vibrant cities worldwide. Discover cost of living, culture, and
              academic opportunities.
            </p>
          </div>

          <DestinationFilters />

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
              />
            ))}
          </div>

          {destinations.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No destinations found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}