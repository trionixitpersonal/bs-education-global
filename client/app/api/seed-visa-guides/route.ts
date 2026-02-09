import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

const visaGuidesData = [
  {
    country: "United States",
    flag_emoji: "🇺🇸",
    visa_type: "F-1 Student Visa",
    requirements: [
      "SEVIS I-20 form from accredited school",
      "Valid passport (6 months validity)",
      "Financial proof (bank statements)",
      "Academic transcripts and diplomas",
      "English proficiency test scores",
      "DS-160 application form",
    ],
    processing_time: "2-8 weeks",
    cost: "$160 (SEVIS fee: $350)",
    documents: [
      "Passport",
      "I-20 form",
      "DS-160 confirmation",
      "Financial documents",
      "Academic records",
      "English test scores",
      "Passport photos",
    ],
    description:
      "The F-1 visa is for academic students enrolled in an academic program or English Language Program. You must be enrolled as a full-time student at an accredited educational institution.",
  },
  {
    country: "United Kingdom",
    flag_emoji: "🇬🇧",
    visa_type: "Student Visa (Tier 4)",
    requirements: [
      "CAS (Confirmation of Acceptance for Studies)",
      "Valid passport",
      "Financial proof (£1,334/month for London, £1,023/month outside)",
      "English proficiency (IELTS/TOEFL)",
      "Tuberculosis test (if required)",
      "Academic qualifications",
    ],
    processing_time: "3-6 weeks",
    cost: "£363 (standard) or £490 (priority)",
    documents: [
      "Passport",
      "CAS statement",
      "Financial evidence",
      "Academic certificates",
      "English test results",
      "TB test certificate",
      "Passport photos",
    ],
    description:
      "The UK Student Visa allows you to study at a licensed student sponsor. You can apply up to 6 months before your course starts if you're applying from outside the UK.",
  },
  {
    country: "Canada",
    flag_emoji: "🇨🇦",
    visa_type: "Study Permit",
    requirements: [
      "Letter of acceptance from DLI",
      "Valid passport",
      "Proof of financial support (CAD $10,000+ per year)",
      "No criminal record",
      "Medical exam (if required)",
      "English/French proficiency",
    ],
    processing_time: "4-20 weeks",
    cost: "CAD $150 (permit) + CAD $85 (biometrics)",
    documents: [
      "Passport",
      "Letter of acceptance",
      "Financial proof",
      "Academic transcripts",
      "Language test scores",
      "Medical exam results",
      "Police clearance certificate",
    ],
    description:
      "A study permit is a document that allows foreign nationals to study at designated learning institutions (DLIs) in Canada. You need a study permit to study in Canada if your program is longer than 6 months.",
  },
  {
    country: "Australia",
    flag_emoji: "🇦🇺",
    visa_type: "Student Visa (Subclass 500)",
    requirements: [
      "Confirmation of Enrolment (CoE)",
      "Valid passport",
      "Financial capacity (AUD $21,041 per year)",
      "English proficiency (IELTS 6.0+)",
      "Health insurance (OSHC)",
      "Genuine Temporary Entrant requirement",
    ],
    processing_time: "1-4 months",
    cost: "AUD $650",
    documents: [
      "Passport",
      "CoE documents",
      "Financial evidence",
      "English test results",
      "OSHC certificate",
      "Academic qualifications",
      "Health examination results",
    ],
    description:
      "The Student Visa (Subclass 500) allows you to stay in Australia to study full-time in a recognized education institution. You can include family members in your application.",
  },
  {
    country: "Germany",
    flag_emoji: "🇩🇪",
    visa_type: "Student Visa / Residence Permit",
    requirements: [
      "University admission letter",
      "Valid passport",
      "Financial proof (€11,208 per year blocked account)",
      "Health insurance",
      "German language proficiency (if required)",
      "Academic qualifications",
    ],
    processing_time: "4-12 weeks",
    cost: "€75 (visa) + €100 (residence permit)",
    documents: [
      "Passport",
      "Admission letter",
      "Blocked account proof",
      "Health insurance certificate",
      "Academic certificates",
      "Language certificates",
      "Passport photos",
      "Biometric data",
    ],
    description:
      "Germany offers excellent education opportunities with many programs in English. You'll need a student visa to enter and then apply for a residence permit for studies after arrival.",
  },
  {
    country: "France",
    flag_emoji: "🇫🇷",
    visa_type: "Long-Stay Student Visa",
    requirements: [
      "Enrollment certificate from French institution",
      "Valid passport",
      "Financial proof (€615/month minimum)",
      "French language proficiency (if required)",
      "Health insurance",
      "Accommodation proof",
    ],
    processing_time: "2-8 weeks",
    cost: "€99 (visa fee)",
    documents: [
      "Passport",
      "Enrollment certificate",
      "Financial guarantee",
      "Language certificates",
      "Health insurance",
      "Accommodation proof",
      "Academic transcripts",
      "CV and motivation letter",
    ],
    description:
      "France offers world-class education with affordable tuition fees. The long-stay student visa allows you to study in France for more than 90 days.",
  },
];

export async function POST() {
  try {
    console.log("Starting Visa Guides seeding...");

    // Delete existing visa guides
    const { error: deleteError } = await supabaseAdmin
      .from("visa_guides")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    if (deleteError) {
      console.error("Error clearing existing visa guides:", deleteError);
    }

    // Insert new visa guides
    const { data, error } = await supabaseAdmin
      .from("visa_guides")
      .insert(visaGuidesData)
      .select();

    if (error) {
      console.error("Error inserting visa guides:", error);
      return NextResponse.json(
        { error: error.message, details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Successfully inserted ${data?.length} visa guides`,
      count: data?.length,
    });
  } catch (error: any) {
    console.error("Seeding failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to seed visa guides" },
      { status: 500 }
    );
  }
}
