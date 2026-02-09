import { createClient } from "@supabase/supabase-js";

// Load env variables from Next.js config
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing environment variables!");
  console.error("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "✓" : "✗");
  console.error("SUPABASE_SERVICE_ROLE_KEY:", supabaseServiceKey ? "✓" : "✗");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const rankingsData = [
  {
    university_name: "Massachusetts Institute of Technology",
    rank: 1,
    country: "United States",
    region: "North America",
    discipline: "Overall",
    score: 100,
    year: 2024,
  },
  {
    university_name: "University of Cambridge",
    rank: 2,
    country: "United Kingdom",
    region: "Europe",
    discipline: "Overall",
    score: 99.2,
    year: 2024,
  },
  {
    university_name: "Stanford University",
    rank: 3,
    country: "United States",
    region: "North America",
    discipline: "Overall",
    score: 98.7,
    year: 2024,
  },
  {
    university_name: "University of Oxford",
    rank: 4,
    country: "United Kingdom",
    region: "Europe",
    discipline: "Overall",
    score: 98.5,
    year: 2024,
  },
  {
    university_name: "Harvard University",
    rank: 5,
    country: "United States",
    region: "North America",
    discipline: "Overall",
    score: 98.2,
    year: 2024,
  },
  {
    university_name: "Massachusetts Institute of Technology",
    rank: 1,
    country: "United States",
    region: "North America",
    discipline: "Engineering",
    score: 100,
    year: 2024,
  },
  {
    university_name: "Stanford University",
    rank: 2,
    country: "United States",
    region: "North America",
    discipline: "Engineering",
    score: 98.5,
    year: 2024,
  },
  {
    university_name: "University of Cambridge",
    rank: 3,
    country: "United Kingdom",
    region: "Europe",
    discipline: "Engineering",
    score: 97.8,
    year: 2024,
  },
  {
    university_name: "ETH Zurich",
    rank: 4,
    country: "Switzerland",
    region: "Europe",
    discipline: "Engineering",
    score: 97.2,
    year: 2024,
  },
  {
    university_name: "Imperial College London",
    rank: 5,
    country: "United Kingdom",
    region: "Europe",
    discipline: "Engineering",
    score: 96.8,
    year: 2024,
  },
  {
    university_name: "Harvard University",
    rank: 1,
    country: "United States",
    region: "North America",
    discipline: "Business",
    score: 100,
    year: 2024,
  },
  {
    university_name: "INSEAD",
    rank: 2,
    country: "France",
    region: "Europe",
    discipline: "Business",
    score: 98.5,
    year: 2024,
  },
  {
    university_name: "London Business School",
    rank: 3,
    country: "United Kingdom",
    region: "Europe",
    discipline: "Business",
    score: 97.8,
    year: 2024,
  },
  {
    university_name: "Stanford University",
    rank: 4,
    country: "United States",
    region: "North America",
    discipline: "Business",
    score: 97.2,
    year: 2024,
  },
  {
    university_name: "University of Pennsylvania",
    rank: 5,
    country: "United States",
    region: "North America",
    discipline: "Business",
    score: 96.5,
    year: 2024,
  },
  {
    university_name: "Harvard University",
    rank: 1,
    country: "United States",
    region: "North America",
    discipline: "Medicine",
    score: 100,
    year: 2024,
  },
  {
    university_name: "University of Oxford",
    rank: 2,
    country: "United Kingdom",
    region: "Europe",
    discipline: "Medicine",
    score: 98.8,
    year: 2024,
  },
  {
    university_name: "University of Cambridge",
    rank: 3,
    country: "United Kingdom",
    region: "Europe",
    discipline: "Medicine",
    score: 98.2,
    year: 2024,
  },
  {
    university_name: "Johns Hopkins University",
    rank: 4,
    country: "United States",
    region: "North America",
    discipline: "Medicine",
    score: 97.5,
    year: 2024,
  },
  {
    university_name: "Stanford University",
    rank: 5,
    country: "United States",
    region: "North America",
    discipline: "Medicine",
    score: 97.0,
    year: 2024,
  },
  {
    university_name: "National University of Singapore",
    rank: 1,
    country: "Singapore",
    region: "Asia",
    discipline: "Overall",
    score: 95.8,
    year: 2024,
  },
  {
    university_name: "Peking University",
    rank: 2,
    country: "China",
    region: "Asia",
    discipline: "Overall",
    score: 94.2,
    year: 2024,
  },
  {
    university_name: "Tsinghua University",
    rank: 3,
    country: "China",
    region: "Asia",
    discipline: "Overall",
    score: 93.8,
    year: 2024,
  },
  {
    university_name: "University of Tokyo",
    rank: 4,
    country: "Japan",
    region: "Asia",
    discipline: "Overall",
    score: 93.2,
    year: 2024,
  },
  {
    university_name: "Nanyang Technological University",
    rank: 5,
    country: "Singapore",
    region: "Asia",
    discipline: "Overall",
    score: 92.5,
    year: 2024,
  },
  {
    university_name: "Massachusetts Institute of Technology",
    rank: 1,
    country: "United States",
    region: "North America",
    discipline: "Technology",
    score: 100,
    year: 2024,
  },
  {
    university_name: "Stanford University",
    rank: 2,
    country: "United States",
    region: "North America",
    discipline: "Technology",
    score: 98.8,
    year: 2024,
  },
  {
    university_name: "Carnegie Mellon University",
    rank: 3,
    country: "United States",
    region: "North America",
    discipline: "Technology",
    score: 97.5,
    year: 2024,
  },
  {
    university_name: "University of California, Berkeley",
    rank: 4,
    country: "United States",
    region: "North America",
    discipline: "Technology",
    score: 96.8,
    year: 2024,
  },
  {
    university_name: "University of Cambridge",
    rank: 5,
    country: "United Kingdom",
    region: "Europe",
    discipline: "Technology",
    score: 96.2,
    year: 2024,
  },
];

async function seedQSRankings() {
  console.log("Starting QS Rankings seeding...");

  try {
    // First, run the migration to add university_name column
    console.log("Running migration to add university_name column...");
    const { error: migrationError } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        ALTER TABLE public.qs_rankings
        ADD COLUMN IF NOT EXISTS university_name TEXT;

        ALTER TABLE public.qs_rankings
        ALTER COLUMN university_id DROP NOT NULL;

        ALTER TABLE public.qs_rankings
        DROP CONSTRAINT IF EXISTS qs_rankings_university_id_fkey;
      `
    });

    if (migrationError) {
      console.log("Migration might have failed (or already applied):", migrationError.message);
      // Continue anyway as the column might already exist
    } else {
      console.log("Migration completed");
    }

    // Delete existing rankings
    const { error: deleteError } = await supabaseAdmin
      .from("qs_rankings")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all

    if (deleteError) {
      console.error("Error clearing existing rankings:", deleteError);
    } else {
      console.log("Cleared existing rankings");
    }

    // Insert new rankings
    const { data, error } = await supabaseAdmin
      .from("qs_rankings")
      .insert(rankingsData)
      .select();

    if (error) {
      console.error("Error inserting rankings:", error);
      throw error;
    }

    console.log(`Successfully inserted ${data?.length} rankings`);
    console.log("Seeding complete!");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedQSRankings();
