import { PostArrivalCard } from "@/components/post-arrival-support/post-arrival-card";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

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
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Missing Supabase environment variables for post arrival support fetch");
      return [];
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { data, error } = await supabase
      .from("post_arrival_support")
      .select("*")
      .order("category", { ascending: true });

    if (error) {
      console.error("Supabase error fetching post arrival support:", error);
      return [];
    }

    return (data || []).map((support: any) => ({
      id: support.id,
      category: support.category,
      title: support.title,
      icon: support.icon,
      description: support.description,
      key_steps: support.key_steps || [],
      important_contacts: support.important_contacts || [],
      useful_resources: support.useful_resources || [],
      timeline: support.timeline || "",
    })) as PostArrivalSupport[];
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
