import { getApplicationProcessData } from "@/lib/mock-data/application-process-data";
import { ProcessTimeline } from "@/components/application-process/process-timeline";

export const metadata = {
  title: "Application Process | BS Education",
  description:
    "Step-by-step guidance through the visa application process from start to approval.",
};

export default async function ApplicationProcessPage() {
  const steps = await getApplicationProcessData();

  return (
    <main className="w-full overflow-x-hidden">
      <section className="w-full bg-background py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Application Process
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Step-by-step guidance through the visa application process from
              start to approval. Follow our comprehensive timeline to ensure you
              complete all requirements on time.
            </p>
          </div>

          <div className="mt-8">
            <ProcessTimeline steps={steps} />
          </div>
        </div>
      </section>
    </main>
  );
}