import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

const destinationsData = [
  {
    city: "Cambridge",
    country: "United Kingdom",
    cost_of_living: "£12,000-15,000/year",
    student_life:
      "Historic university town with vibrant student community, excellent libraries, and rich academic traditions. Great cycling city with easy access to London.",
    culture:
      "Rich history, beautiful architecture, world-class museums, and diverse international community. Strong focus on academic excellence and research.",
  },
  {
    city: "London",
    country: "United Kingdom",
    cost_of_living: "£15,000-20,000/year",
    student_life:
      "Cosmopolitan city with endless opportunities for networking, internships, and cultural experiences. Excellent public transport and diverse neighborhoods.",
    culture:
      "World-class museums, theaters, restaurants, and nightlife. Multicultural hub with students from around the globe. Rich history and modern innovation.",
  },
  {
    city: "Boston",
    country: "United States",
    cost_of_living: "$18,000-25,000/year",
    student_life:
      "Student-friendly city with numerous universities creating a vibrant academic atmosphere. Great public transport, parks, and cultural venues.",
    culture:
      "Historic city with strong academic tradition, world-renowned museums, excellent food scene, and easy access to New England's natural beauty.",
  },
  {
    city: "Stanford",
    country: "United States",
    cost_of_living: "$20,000-28,000/year",
    student_life:
      "Beautiful campus setting near Silicon Valley with excellent facilities, sports, and outdoor activities. Strong entrepreneurial culture.",
    culture:
      "Innovation hub with access to tech industry, beautiful California weather, proximity to San Francisco, and focus on entrepreneurship.",
  },
  {
    city: "Toronto",
    country: "Canada",
    cost_of_living: "CAD $15,000-20,000/year",
    student_life:
      "Multicultural city with excellent public transit, diverse neighborhoods, and vibrant arts scene. Safe and welcoming for international students.",
    culture:
      "One of the world's most diverse cities, excellent food scene, major sports teams, and strong focus on inclusivity and innovation.",
  },
  {
    city: "Vancouver",
    country: "Canada",
    cost_of_living: "CAD $16,000-22,000/year",
    student_life:
      "Beautiful coastal city with mountains and ocean. Excellent outdoor activities, safe environment, and strong focus on sustainability.",
    culture:
      "Multicultural city with Asian influence, excellent food scene, beautiful natural surroundings, and laid-back West Coast lifestyle.",
  },
  {
    city: "Melbourne",
    country: "Australia",
    cost_of_living: "AUD $18,000-25,000/year",
    student_life:
      "Vibrant arts and culture scene, excellent coffee culture, great public transport, and numerous festivals and events throughout the year.",
    culture:
      "Known as Australia's cultural capital with world-class restaurants, live music, street art, and diverse neighborhoods. Four distinct seasons.",
  },
  {
    city: "Sydney",
    country: "Australia",
    cost_of_living: "AUD $20,000-28,000/year",
    student_life:
      "Iconic harbor city with beautiful beaches, excellent public transport, and vibrant nightlife. Great weather and outdoor lifestyle.",
    culture:
      "Stunning natural harbor, world-famous landmarks, diverse food scene, and strong focus on work-life balance. Cosmopolitan and welcoming.",
  },
  {
    city: "Zurich",
    country: "Switzerland",
    cost_of_living: "CHF 18,000-24,000/year",
    student_life:
      "Clean, safe, and efficient city with excellent public transport. Beautiful lake and mountain views, high quality of life.",
    culture:
      "Multilingual city (German, French, Italian), world-class museums, excellent food, and strong focus on innovation and research.",
  },
  {
    city: "Singapore",
    country: "Singapore",
    cost_of_living: "SGD $12,000-18,000/year",
    student_life:
      "Modern, efficient city-state with excellent infrastructure, safe environment, and easy access to Southeast Asia. Great food scene.",
    culture:
      "Multicultural hub with Chinese, Malay, and Indian influences. Clean, green city with excellent public transport and strong focus on education.",
  },
  {
    city: "Munich",
    country: "Germany",
    cost_of_living: "€10,000-14,000/year",
    student_life:
      "Beautiful Bavarian city with excellent public transport, numerous parks, and strong student community. Great work-life balance.",
    culture:
      "Rich history, world-famous Oktoberfest, excellent museums, beautiful architecture, and strong focus on engineering and innovation.",
  },
  {
    city: "Tokyo",
    country: "Japan",
    cost_of_living: "¥1,200,000-1,800,000/year",
    student_life:
      "Fascinating blend of traditional and modern, excellent public transport, safe city, and unique cultural experiences. Great food scene.",
    culture:
      "Rich traditional culture alongside cutting-edge technology, excellent food, beautiful temples, and strong focus on education and innovation.",
  },
];

export async function POST() {
  try {
    console.log("Starting Study Destinations seeding...");

    // Delete existing destinations
    const { error: deleteError } = await supabaseAdmin
      .from("study_destinations")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    if (deleteError) {
      console.error("Error clearing existing destinations:", deleteError);
    }

    // Insert new destinations in batches
    const batchSize = 10;
    let totalInserted = 0;

    for (let i = 0; i < destinationsData.length; i += batchSize) {
      const batch = destinationsData.slice(i, i + batchSize);
      const { data, error } = await supabaseAdmin
        .from("study_destinations")
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
      message: `Successfully inserted ${totalInserted} destinations`,
      count: totalInserted,
    });
  } catch (error: any) {
    console.error("Seeding failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to seed destinations" },
      { status: 500 }
    );
  }
}
