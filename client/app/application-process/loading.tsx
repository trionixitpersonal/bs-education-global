export default function ApplicationProcessLoading() {
  return (
    <main className="w-full overflow-x-hidden">
      <section className="w-full bg-background py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <div className="mb-4 h-12 w-64 animate-pulse rounded bg-muted mx-auto" />
            <div className="mx-auto h-6 w-96 animate-pulse rounded bg-muted" />
          </div>

          <div className="space-y-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-lg bg-muted"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}