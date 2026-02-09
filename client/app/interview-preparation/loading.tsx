export default function InterviewPreparationLoading() {
  return (
    <main className="w-full overflow-x-hidden pt-24 lg:pt-28">
      <section className="w-full bg-background py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="mb-4 h-12 w-2/3 mx-auto bg-muted animate-pulse rounded" />
            <div className="mx-auto max-w-2xl h-6 bg-muted animate-pulse rounded" />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-card p-6 shadow-sm"
              >
                <div className="h-64 bg-muted animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
