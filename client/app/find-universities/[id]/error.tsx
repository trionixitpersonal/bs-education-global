"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <h2 className="mb-4 text-3xl font-bold">Something went wrong!</h2>
        <p className="mb-6 text-muted-foreground">
          We couldn't load this university's details.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={reset}>Try Again</Button>
          <Button asChild variant="outline">
            <Link href="/find-universities">Back to Universities</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
