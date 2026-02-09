import { PostArrivalCard } from "@/components/post-arrival-support/post-arrival-card";

export const metadata = {
  title: "Post Arrival Support | BS Education",
  description:
    "Essential information and support for your first steps after arriving in your study destination.",
};

interface PostArrivalSupport {
  id: string;
  category: string;
  title: string;
  icon: string;
  description: string;
  key_steps: string[];
  important_contacts: string[];
  useful_resources: string[];
  timeline: string;
}

async function getPostArrivalSupport() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/post-arrival-support`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch post arrival support");
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching post arrival support:", error);
    return [];
  }
}

export default async function PostArrivalSupportPage() {
  const supports = await getPostArrivalSupport();

  return (
    <main className="w-full overflow-x-hidden pt-24 lg:pt-28">
      <section className="w-full bg-background py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              Post Arrival Support
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Essential information and support for your first steps after
              arriving in your study destination.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {supports.map((support: PostArrivalSupport) => (
              <PostArrivalCard key={support.id} support={support} />
            ))}
          </div>

          {supports.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No post arrival support information found.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
