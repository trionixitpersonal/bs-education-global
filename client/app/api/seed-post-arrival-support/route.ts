import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

const postArrivalSupportData = [
  {
    category: "Immigration & Legal",
    title: "Immigration Registration",
    icon: "🛂",
    description: "Complete mandatory immigration registration and obtain your residence permit within the required timeframe.",
    timeline: "First 1-2 weeks",
    key_steps: [
      "Report to immigration office or police station (country-specific)",
      "Submit passport, visa, and university documents",
      "Provide proof of address and registration",
      "Pay registration fees if applicable",
      "Attend biometric appointment if required",
      "Collect residence permit or registration certificate",
    ],
    important_contacts: [
      "University International Office: Check university website",
      "Local Immigration Office: Check regional government website",
      "Embassy/Consulate: Keep contact information handy",
      "Emergency Police: 911/999/112 (depending on country)",
    ],
    useful_resources: [
      "University arrival guide and checklist",
      "Government immigration website",
      "International student handbook",
      "Local expat forums and groups",
    ],
  },
  {
    category: "Accommodation",
    title: "Housing Setup",
    icon: "🏠",
    description: "Secure and set up your accommodation, complete all necessary registrations, and understand your tenancy rights.",
    timeline: "First week",
    key_steps: [
      "Check in to university housing or private accommodation",
      "Sign tenancy agreement and inventory checklist",
      "Register your address with local authorities",
      "Set up utilities (electricity, water, internet)",
      "Purchase renter's insurance if recommended",
      "Familiarize yourself with house rules and facilities",
      "Meet flatmates or neighbors",
    ],
    important_contacts: [
      "University Accommodation Office",
      "Landlord or letting agency contact",
      "Building management or porter",
      "Utility providers customer service",
      "Local housing support services",
    ],
    useful_resources: [
      "Tenancy agreement template and guides",
      "Local area guide and maps",
      "Shopping areas for furniture and household items",
      "Public transport information",
    ],
  },
  {
    category: "Banking & Finance",
    title: "Bank Account Setup",
    icon: "💳",
    description: "Open a local bank account to manage your finances, receive payments, and avoid international transaction fees.",
    timeline: "First 2 weeks",
    key_steps: [
      "Research student-friendly banks and accounts",
      "Gather required documents (passport, visa, university letter)",
      "Visit bank branch or apply online",
      "Provide proof of address",
      "Activate your account and set up online banking",
      "Order debit/credit cards",
      "Set up international transfers if needed",
    ],
    important_contacts: [
      "University recommended banks",
      "Student banking advisors",
      "International money transfer services",
      "Campus ATM locations",
    ],
    useful_resources: [
      "Student bank account comparison websites",
      "Currency exchange rate monitors",
      "Budgeting apps and tools",
      "Financial advice services for international students",
    ],
  },
  {
    category: "Healthcare",
    title: "Health Insurance & Medical Registration",
    icon: "🏥",
    description: "Register with healthcare services and ensure you have appropriate health insurance coverage.",
    timeline: "First 2 weeks",
    key_steps: [
      "Verify health insurance coverage (mandatory in most countries)",
      "Register with university health center or local GP/doctor",
      "Obtain health insurance card or number",
      "Complete medical history forms",
      "Understand emergency services procedures",
      "Locate nearest hospitals and pharmacies",
      "Register for prescription services if needed",
    ],
    important_contacts: [
      "University Health Services",
      "Health Insurance Provider",
      "Local Doctor/GP Surgery",
      "Emergency Services: 911/999/112",
      "Mental Health Support Hotline",
    ],
    useful_resources: [
      "Healthcare system guide for international students",
      "List of English-speaking doctors",
      "Pharmacy locations and hours",
      "Mental health and counseling services",
    ],
  },
  {
    category: "Academic",
    title: "University Enrollment & Orientation",
    icon: "🎓",
    description: "Complete university registration, attend orientation programs, and set up your academic accounts and systems.",
    timeline: "First week",
    key_steps: [
      "Attend mandatory orientation sessions",
      "Complete online enrollment and course registration",
      "Obtain student ID card",
      "Set up university email and online learning platforms",
      "Meet academic advisor or personal tutor",
      "Join orientation tours and campus introduction",
      "Register for any placement tests if required",
      "Purchase required textbooks and materials",
    ],
    important_contacts: [
      "International Student Office",
      "Academic Department",
      "Personal Tutor/Academic Advisor",
      "Student Services",
      "Library Help Desk",
    ],
    useful_resources: [
      "University student portal",
      "Course timetables and syllabi",
      "Library and study resources",
      "Academic skills workshops",
      "Student union and societies",
    ],
  },
  {
    category: "Transportation",
    title: "Local Transport Setup",
    icon: "🚌",
    description: "Understand local transportation options and set up travel cards or passes for daily commuting.",
    timeline: "First week",
    key_steps: [
      "Research public transport options (bus, metro, tram, train)",
      "Apply for student transport discount card",
      "Purchase monthly or semester travel pass",
      "Download local transport apps",
      "Learn main routes to campus, accommodation, and city center",
      "Consider bike rental or purchase if applicable",
      "Understand peak hours and schedules",
    ],
    important_contacts: [
      "University Transport Office",
      "Local Transport Authority",
      "Student Union Travel Desk",
      "Bike rental services",
    ],
    useful_resources: [
      "Public transport maps and apps",
      "Student discount schemes",
      "Bike paths and cycling safety guides",
      "Airport and city transport connections",
    ],
  },
  {
    category: "Social Integration",
    title: "Building Your Network",
    icon: "👥",
    description: "Connect with other students, join societies, and integrate into campus and local community life.",
    timeline: "First month",
    key_steps: [
      "Attend welcome events and social activities",
      "Join student clubs, societies, or sports teams",
      "Connect with other international students",
      "Participate in buddy or mentoring programs",
      "Join online student groups and forums",
      "Explore the city and local culture",
      "Attend cultural exchange events",
    ],
    important_contacts: [
      "Student Union",
      "International Student Society",
      "Course Representatives",
      "Buddy Program Coordinator",
    ],
    useful_resources: [
      "Student society directory",
      "Campus events calendar",
      "Social media groups for international students",
      "Local cultural events and activities",
    ],
  },
  {
    category: "Employment",
    title: "Understanding Work Rights",
    icon: "💼",
    description: "Understand your visa work restrictions and explore on-campus or part-time job opportunities if permitted.",
    timeline: "After settling in (2-4 weeks)",
    key_steps: [
      "Check your visa work restrictions and hour limits",
      "Obtain necessary work permits or tax numbers",
      "Register with university career services",
      "Explore on-campus job opportunities",
      "Prepare CV/resume in local format",
      "Understand minimum wage and employment rights",
      "Consider work-study programs or internships",
    ],
    important_contacts: [
      "University Career Services",
      "Student Jobs Board",
      "Tax Office/Revenue Service",
      "Employment Rights Helpline",
    ],
    useful_resources: [
      "Student job portals and boards",
      "CV writing workshops",
      "Work permit application guides",
      "Employment law resources for students",
    ],
  },
];

export async function POST() {
  try {
    console.log("Starting post arrival support seeding...");

    // Delete all existing post arrival support
    const { error: deleteError } = await supabaseAdmin
      .from("post_arrival_support")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    if (deleteError) {
      console.error("Error deleting existing post arrival support:", deleteError);
      throw deleteError;
    }

    // Insert new post arrival support
    const { data, error: insertError } = await supabaseAdmin
      .from("post_arrival_support")
      .insert(postArrivalSupportData)
      .select();

    if (insertError) {
      console.error("Error inserting post arrival support:", insertError);
      throw insertError;
    }

    console.log(`Successfully inserted ${data?.length || 0} post arrival support guides`);

    return NextResponse.json({
      success: true,
      message: `Successfully inserted ${data?.length || 0} post arrival support guides`,
      count: data?.length || 0,
    });
  } catch (error) {
    console.error("Post arrival support seeding failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed post arrival support" },
      { status: 500 }
    );
  }
}
