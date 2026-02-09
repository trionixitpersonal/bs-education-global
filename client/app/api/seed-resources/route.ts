import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

const resourcesData = [
  {
    title: "Complete Guide to University Applications",
    description:
      "A comprehensive step-by-step guide covering everything from choosing universities to submitting applications and preparing for interviews.",
    category: "Guide",
    link: "#guide-applications",
    read_time: "15 min read",
    tags: ["Applications", "Admissions", "Guide"],
    published_at: "2024-01-15T00:00:00Z",
  },
  {
    title: "Understanding QS World University Rankings",
    description:
      "Learn how QS rankings work, what they measure, and how to use them effectively when choosing your study destination.",
    category: "Article",
    link: "#article-qs-rankings",
    read_time: "8 min read",
    tags: ["Rankings", "Universities", "Research"],
    published_at: "2024-02-01T00:00:00Z",
  },
  {
    title: "Statement of Purpose Writing Workshop",
    description:
      "Video tutorial series on crafting compelling statements of purpose that stand out to admissions committees.",
    category: "Video",
    link: "#video-sop",
    read_time: "45 min",
    tags: ["SOP", "Writing", "Admissions"],
    published_at: "2024-01-20T00:00:00Z",
  },
  {
    title: "University Comparison Tool",
    description:
      "Interactive tool to compare universities side-by-side based on rankings, programs, costs, and location factors.",
    category: "Tool",
    link: "#tool-comparison",
    read_time: null,
    tags: ["Comparison", "Universities", "Tool"],
    published_at: "2024-02-10T00:00:00Z",
  },
  {
    title: "CV/Resume Template for Graduate Applications",
    description:
      "Professional templates specifically designed for graduate school applications with examples and best practices.",
    category: "Template",
    link: "#template-cv",
    read_time: null,
    tags: ["CV", "Resume", "Template"],
    published_at: "2024-01-25T00:00:00Z",
  },
  {
    title: "Financial Planning for International Students",
    description:
      "Complete guide to budgeting, finding scholarships, managing expenses, and financial planning for studying abroad.",
    category: "Guide",
    link: "#guide-financial",
    read_time: "12 min read",
    tags: ["Finance", "Scholarships", "Budgeting"],
    published_at: "2024-02-05T00:00:00Z",
  },
  {
    title: "Visa Interview Preparation Tips",
    description:
      "Expert advice and common questions for student visa interviews with country-specific guidance.",
    category: "Article",
    link: "#article-visa-interview",
    read_time: "10 min read",
    tags: ["Visa", "Interview", "Preparation"],
    published_at: "2024-01-30T00:00:00Z",
  },
  {
    title: "English Proficiency Test Comparison",
    description:
      "Detailed comparison of IELTS, TOEFL, PTE, and Duolingo tests to help you choose the right exam.",
    category: "Guide",
    link: "#guide-english-tests",
    read_time: "7 min read",
    tags: ["English", "Tests", "IELTS", "TOEFL"],
    published_at: "2024-02-08T00:00:00Z",
  },
  {
    title: "Scholarship Application Checklist",
    description:
      "Downloadable checklist template to track your scholarship applications and deadlines.",
    category: "Template",
    link: "#template-scholarship",
    read_time: null,
    tags: ["Scholarships", "Checklist", "Template"],
    published_at: "2024-01-18T00:00:00Z",
  },
  {
    title: "Study Abroad Success Stories",
    description:
      "Inspiring video interviews with students who successfully navigated the application process and are now studying abroad.",
    category: "Video",
    link: "#video-success-stories",
    read_time: "30 min",
    tags: ["Success", "Stories", "Motivation"],
    published_at: "2024-02-12T00:00:00Z",
  },
  {
    title: "Country-Specific Admission Requirements",
    description:
      "Comprehensive guide covering admission requirements, deadlines, and processes for top study destinations.",
    category: "Guide",
    link: "#guide-country-requirements",
    read_time: "20 min read",
    tags: ["Requirements", "Countries", "Admissions"],
    published_at: "2024-02-15T00:00:00Z",
  },
  {
    title: "Academic Writing for International Students",
    description:
      "Video course on academic writing standards, citation styles, and writing techniques for university-level work.",
    category: "Video",
    link: "#video-academic-writing",
    read_time: "60 min",
    tags: ["Writing", "Academic", "Skills"],
    published_at: "2024-01-28T00:00:00Z",
  },
];

export async function POST() {
  try {
    console.log("Starting resources seeding...");

    // Delete all existing resources
    const { error: deleteError } = await supabaseAdmin
      .from("resources")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    if (deleteError) {
      console.error("Error deleting existing resources:", deleteError);
      throw deleteError;
    }

    // Insert new resources
    const { data, error: insertError } = await supabaseAdmin
      .from("resources")
      .insert(resourcesData)
      .select();

    if (insertError) {
      console.error("Error inserting resources:", insertError);
      throw insertError;
    }

    console.log(`Successfully inserted ${data?.length || 0} resources`);

    return NextResponse.json({
      success: true,
      message: `Successfully inserted ${data?.length || 0} resources`,
      count: data?.length || 0,
    });
  } catch (error) {
    console.error("Resources seeding failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed resources" },
      { status: 500 }
    );
  }
}
