"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function SupportError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Support page error:", error);
  }, [error]);

  return (
    <main className="w-full overflow-x-hidden">
      <section className="w-full bg-background py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <h2 className="mb-4 text-2xl font-bold">
              Something went wrong!
            </h2>
            <p className="mb-6 text-muted-foreground">
              We couldn't load the support page. Please try again.
            </p>
            <Button onClick={reset} variant="default">
              Try again
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
