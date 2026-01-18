import { getSupportOptions, getFAQs } from "@/lib/mock-data/support-data";
import { SupportOptionCard } from "@/components/support/support-option-card";
import { FAQAccordion } from "@/components/support/faq-accordion";

export const metadata = {
  title: "Support | BS Education",
  description:
    "Get help with your study abroad journey. Contact our support team, browse FAQs, or book a consultation.",
};

export default async function SupportPage() {
  const [supportOptions, faqs] = await Promise.all([
    getSupportOptions(),
    getFAQs(),
  ]);

  return (
    <main className="w-full overflow-x-hidden">
      <section className="w-full bg-background py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Support Center
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              We're here to help you every step of the way. Get answers to your
              questions, connect with our team, or schedule a consultation.
            </p>
          </div>

          {/* Support Options */}
          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">How can we help?</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {supportOptions.map((option) => (
                <SupportOptionCard key={option.id} option={option} />
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h2 className="mb-6 text-2xl font-semibold">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto max-w-3xl">
              <FAQAccordion faqs={faqs} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
