"use client";

export default function InterviewPreparationError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="w-full overflow-x-hidden pt-24 lg:pt-28">
      <section className="w-full bg-background py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>
            <p className="mb-6 text-muted-foreground">{error.message}</p>
            <button
              onClick={reset}
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
            >
              Try again
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
