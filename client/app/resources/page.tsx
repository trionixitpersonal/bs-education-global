import { getResourcesData } from "@/lib/mock-data/resources-data";
import { ResourceCard } from "@/components/resources/resource-card";
import { ResourceFilters } from "@/components/resources/resource-filters";

export const metadata = {
  title: "Resources | BS Education",
  description:
    "Access guides, articles, videos, tools, and templates to help you with your study abroad journey.",
};

export default async function ResourcesPage() {
  const resources = await getResourcesData();

  return (
    <main className="w-full overflow-x-hidden">
      <section className="w-full bg-background py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Resources
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Access comprehensive guides, articles, videos, tools, and
              templates to support your study abroad journey.
            </p>
          </div>

          <ResourceFilters />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>

          {resources.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No resources found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
