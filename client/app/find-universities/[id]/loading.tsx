export default function Loading() {
  return (
    <div className="w-full overflow-x-hidden bg-background">
      <section className="w-full bg-gradient-to-b from-primary/10 to-background py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 h-6 w-32 animate-pulse rounded bg-muted" />

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-8 w-24 animate-pulse rounded bg-muted" />
              <div className="h-12 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <div className="h-6 w-32 animate-pulse rounded bg-muted mb-4" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-64 animate-pulse rounded bg-muted mb-8" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-6">
                <div className="h-6 w-20 animate-pulse rounded bg-muted mb-3" />
                <div className="h-6 w-3/4 animate-pulse rounded bg-muted mb-2" />
                <div className="space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
