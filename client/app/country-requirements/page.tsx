import { CountryRequirementCard } from "@/components/country-requirements/country-requirement-card";

export const metadata = {
  title: "Country Specific Requirements | BS Education",
  description:
    "Detailed visa requirements and procedures for studying in different countries.",
};

interface CountryRequirement {
  id: string;
  country: string;
  flag_icon: string;
  visa_types: string[];
  processing_time: string;
  application_fee: string;
  financial_requirements: string;
  language_requirements: string[];
  key_requirements: string[];
  important_notes: string[];
}

async function getCountryRequirements() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/country-requirements`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch country requirements");
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching country requirements:", error);
    return [];
  }
}

export default async function CountryRequirementsPage() {
  const requirements = await getCountryRequirements();

  return (
    <main className="w-full overflow-x-hidden pt-24 lg:pt-28">
      <section className="w-full bg-background py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Country Specific Requirements
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Detailed visa requirements and procedures for major study
              destinations around the world.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {requirements.map((requirement: CountryRequirement) => (
              <CountryRequirementCard
                key={requirement.id}
                requirement={requirement}
              />
            ))}
          </div>

          {requirements.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No country requirements found.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
