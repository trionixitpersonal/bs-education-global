export default function SupportLoading() {
  return (
    <main className="w-full overflow-x-hidden">
      <section className="w-full bg-background py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 h-12 w-80 animate-pulse rounded bg-muted mx-auto" />
            <div className="mx-auto h-6 w-96 animate-pulse rounded bg-muted" />
          </div>

          <div className="mb-16">
            <div className="mb-6 h-8 w-48 animate-pulse rounded bg-muted" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-48 animate-pulse rounded-lg bg-muted"
                />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6 h-8 w-64 animate-pulse rounded bg-muted" />
            <div className="mx-auto max-w-3xl space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-lg bg-muted"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
