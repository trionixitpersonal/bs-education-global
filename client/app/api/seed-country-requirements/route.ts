import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

const countryRequirementsData = [
  {
    country: "Australia",
    flag_icon: "🇦🇺",
    visa_types: [
      "Student Visa (Subclass 500)",
      "Student Guardian Visa (Subclass 590)",
      "Training Visa (Subclass 407)",
    ],
    processing_time: "4-6 weeks",
    application_fee: "AUD $620",
    financial_requirements: "Proof of AUD $21,041 per year for living costs, plus tuition fees and travel expenses",
    language_requirements: [
      "IELTS overall score of 5.5 (or equivalent)",
      "TOEFL iBT score of 46 (or equivalent)",
      "PTE Academic score of 42 (or equivalent)",
    ],
    key_requirements: [
      "Confirmation of Enrolment (CoE) from an Australian institution",
      "Genuine Temporary Entrant (GTE) statement",
      "Overseas Student Health Cover (OSHC) for the entire stay",
      "Proof of financial capacity",
      "English language proficiency test results",
      "Health examination and police clearance (if required)",
    ],
    important_notes: [
      "Visa processing times may vary based on application completeness",
      "Some nationalities may require additional security checks",
      "Working rights: 40 hours per fortnight during semester, unlimited during breaks",
      "Dependents can be included in the application",
    ],
  },
  {
    country: "United Kingdom",
    flag_icon: "🇬🇧",
    visa_types: [
      "Student Visa (Tier 4)",
      "Short-term Study Visa",
      "Child Student Visa",
    ],
    processing_time: "3 weeks (outside UK)",
    application_fee: "£348-475",
    financial_requirements: "Proof of course fees plus £1,334 per month (London) or £1,023 per month (outside London) for up to 9 months",
    language_requirements: [
      "IELTS for UKVI - minimum 5.5 overall",
      "TOEFL iBT - minimum 72 overall",
      "PTE Academic UKVI - minimum 51 overall",
    ],
    key_requirements: [
      "Confirmation of Acceptance for Studies (CAS) from licensed UK institution",
      "Tuberculosis test certificate (if from listed countries)",
      "Proof of financial support for at least 28 consecutive days",
      "Valid passport",
      "ATAS certificate (for certain subjects)",
      "Biometric information",
    ],
    important_notes: [
      "Immigration Health Surcharge (IHS) of £470 per year is mandatory",
      "Working rights: 20 hours per week during term, full-time during holidays",
      "Visa valid for duration of course plus extra time",
      "Can switch to Graduate Route visa after completing degree",
    ],
  },
  {
    country: "Canada",
    flag_icon: "🇨🇦",
    visa_types: [
      "Study Permit",
      "Quebec Acceptance Certificate (CAQ)",
      "Co-op Work Permit",
    ],
    processing_time: "4-6 weeks (online)",
    application_fee: "CAD $150",
    financial_requirements: "Proof of CAD $10,000 per year (outside Quebec) or CAD $11,000 (in Quebec), plus tuition fees",
    language_requirements: [
      "IELTS - minimum 6.0 overall",
      "TOEFL iBT - minimum 80 overall",
      "CELPIP - minimum 7 in each skill",
      "TEF Canada (for French programs)",
    ],
    key_requirements: [
      "Letter of Acceptance from Designated Learning Institution (DLI)",
      "Proof of financial support",
      "Valid passport",
      "Immigration medical examination (if required)",
      "Police certificate (if required)",
      "Statement of purpose",
    ],
    important_notes: [
      "Biometrics fee of CAD $85 required",
      "Study permit allows off-campus work up to 20 hours per week",
      "Post-Graduation Work Permit (PGWP) available after graduation",
      "Quebec students need separate CAQ before study permit",
    ],
  },
  {
    country: "United States",
    flag_icon: "🇺🇸",
    visa_types: [
      "F-1 Student Visa",
      "M-1 Vocational Student Visa",
      "J-1 Exchange Visitor Visa",
    ],
    processing_time: "2-8 weeks",
    application_fee: "$160 + $350 SEVIS fee",
    financial_requirements: "Proof of sufficient funds to cover tuition and living expenses for entire program duration",
    language_requirements: [
      "TOEFL iBT - typically 79-80 minimum",
      "IELTS - typically 6.5 minimum",
      "Duolingo - typically 105 minimum",
      "Or institution's placement test",
    ],
    key_requirements: [
      "Form I-20 from SEVP-approved school",
      "Valid passport (valid for at least 6 months)",
      "DS-160 confirmation page",
      "SEVIS fee payment receipt",
      "Visa interview appointment",
      "Financial documents",
    ],
    important_notes: [
      "Visa interview is mandatory at U.S. Embassy/Consulate",
      "F-1 students can work on-campus up to 20 hours per week",
      "OPT (Optional Practical Training) available after completion",
      "Apply for visa 120 days before program start date",
    ],
  },
  {
    country: "Germany",
    flag_icon: "🇩🇪",
    visa_types: [
      "Student Visa",
      "Student Applicant Visa",
      "Language Course Visa",
    ],
    processing_time: "6-12 weeks",
    application_fee: "€75",
    financial_requirements: "Blocked account (Sperrkonto) with €11,208 per year (€934 per month)",
    language_requirements: [
      "TestDaF (minimum level 4 in all sections for German-taught programs)",
      "DSH (Deutsche Sprachprüfung für den Hochschulzugang)",
      "Goethe-Zertifikat (B2-C2 level)",
      "IELTS or TOEFL for English-taught programs",
    ],
    key_requirements: [
      "University admission letter or conditional admission",
      "Blocked account or scholarship proof",
      "Health insurance coverage",
      "Academic qualifications and transcripts",
      "Language proficiency certificate",
      "Motivation letter",
    ],
    important_notes: [
      "Students can work 120 full days or 240 half days per year",
      "18-month job-seeking visa available after graduation",
      "Public university tuition is free or minimal in most states",
      "Residence permit issued upon arrival in Germany",
    ],
  },
  {
    country: "France",
    flag_icon: "🇫🇷",
    visa_types: [
      "Long-Stay Student Visa (VLS-TS)",
      "Short-Stay Student Visa",
      "Concours Visa",
    ],
    processing_time: "2-3 weeks",
    application_fee: "€50-99",
    financial_requirements: "Proof of €615 per month (minimum) or €7,380 per year",
    language_requirements: [
      "DELF/DALF (B2 level for French-taught programs)",
      "TCF or TEF (for French language)",
      "IELTS or TOEFL (for English-taught programs)",
      "Campus France language assessment",
    ],
    key_requirements: [
      "Campus France authorization",
      "Admission letter from French institution",
      "Proof of financial resources",
      "Health insurance",
      "Accommodation proof",
      "Academic transcripts and diplomas",
    ],
    important_notes: [
      "Campus France registration is mandatory for most countries",
      "Students can work up to 964 hours per year (20 hours per week)",
      "Automatic 1-year residence permit renewal for master's students",
      "€90 visa validation fee upon arrival (OFII procedure)",
    ],
  },
];

export async function POST() {
  try {
    console.log("Starting country requirements seeding...");

    // Delete all existing country requirements
    const { error: deleteError } = await supabaseAdmin
      .from("country_requirements")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    if (deleteError) {
      console.error("Error deleting existing country requirements:", deleteError);
      throw deleteError;
    }

    // Insert new country requirements
    const { data, error: insertError } = await supabaseAdmin
      .from("country_requirements")
      .insert(countryRequirementsData)
      .select();

    if (insertError) {
      console.error("Error inserting country requirements:", insertError);
      throw insertError;
    }

    console.log(`Successfully inserted ${data?.length || 0} country requirements`);

    return NextResponse.json({
      success: true,
      message: `Successfully inserted ${data?.length || 0} country requirements`,
      count: data?.length || 0,
    });
  } catch (error) {
    console.error("Country requirements seeding failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed country requirements" },
      { status: 500 }
    );
  }
}
