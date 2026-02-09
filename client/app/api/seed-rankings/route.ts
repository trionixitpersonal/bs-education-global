import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

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

export async function POST() {
  try {
    console.log("Starting QS Rankings seeding...");

    // Delete existing rankings
    const { error: deleteError } = await supabaseAdmin
      .from("qs_rankings")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    if (deleteError) {
      console.error("Error clearing existing rankings:", deleteError);
    }

    // Insert new rankings in batches to avoid timeout
    const batchSize = 10;
    let totalInserted = 0;

    for (let i = 0; i < rankingsData.length; i += batchSize) {
      const batch = rankingsData.slice(i, i + batchSize);
      const { data, error } = await supabaseAdmin
        .from("qs_rankings")
        .insert(batch)
        .select();

      if (error) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
        return NextResponse.json(
          { error: error.message, details: error },
          { status: 500 }
        );
      }

      totalInserted += data?.length || 0;
    }

    return NextResponse.json({
      success: true,
      message: `Successfully inserted ${totalInserted} rankings`,
      count: totalInserted,
    });
  } catch (error: any) {
    console.error("Seeding failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to seed rankings" },
      { status: 500 }
    );
  }
}
