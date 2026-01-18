import { getQSRankingsData } from "@/lib/mock-data/qs-rankings-data";
import { RankingTable } from "@/components/qs-rankings/ranking-table";
import { RankingFilters } from "@/components/qs-rankings/ranking-filters";

export const metadata = {
  title: "QS Rankings | BS Education",
  description:
    "Explore comprehensive QS rankings by region and academic discipline to evaluate institutions.",
};

export default async function QSRankingsPage() {
  const rankings = await getQSRankingsData();

  return (
    <main className="w-full overflow-x-hidden">
      <section className="w-full bg-background py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              QS World University Rankings
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Explore comprehensive QS rankings by region and academic discipline
              to evaluate institutions worldwide.
            </p>
          </div>

          <RankingFilters />

          <div className="mt-8">
            <RankingTable rankings={rankings} />
          </div>

          {rankings.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No rankings found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}