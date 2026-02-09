import { InterviewTipCard } from "@/components/interview-preparation/interview-tip-card";

export const metadata = {
  title: "Visa Interview Preparation | BS Education",
  description:
    "Expert tips and practice resources to help you prepare for your visa interview.",
};

interface InterviewTip {
  id: string;
  category: string;
  title: string;
  icon: string;
  common_questions: string[];
  dos: string[];
  donts: string[];
  preparation_tips: string[];
  sample_answers: string[];
}

async function getInterviewPreparation() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/interview-preparation`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch interview preparation");
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching interview preparation:", error);
    return [];
  }
}

export default async function InterviewPreparationPage() {
  const tips = await getInterviewPreparation();

  return (
    <main className="w-full overflow-x-hidden pt-24 lg:pt-28">
      <section className="w-full bg-background py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Visa Interview Preparation
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Expert tips and practice resources to help you ace your visa
              interview and increase your chances of approval.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tips.map((tip: InterviewTip) => (
              <InterviewTipCard key={tip.id} tip={tip} />
            ))}
          </div>

          {tips.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No interview preparation tips found.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
