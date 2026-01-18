import { DocumentGuide } from "./types";

/**
 * Mock data for documentation page
 * Simulates API response with realistic document guide information
 */
export async function getDocumentationData(): Promise<DocumentGuide[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    {
      id: "1",
      title: "Student Visa Documentation - United States",
      country: "United States",
      visaType: "F-1 Student Visa",
      documents: [
        "Valid passport",
        "Form I-20 (Certificate of Eligibility)",
        "DS-160 confirmation page",
        "SEVIS fee payment receipt",
        "Academic transcripts",
        "English proficiency test scores (TOEFL/IELTS)",
        "Financial documents",
        "Passport-sized photographs",
      ],
      checklist: [
        "Complete DS-160 form online",
        "Pay SEVIS fee ($350)",
        "Pay visa application fee ($160)",
        "Schedule visa interview",
        "Gather all required documents",
        "Prepare for interview questions",
        "Attend visa interview",
        "Wait for visa processing",
      ],
      templates: [
        "Financial Affidavit Template",
        "Statement of Purpose Template",
        "Cover Letter Template",
      ],
    },
    {
      id: "2",
      title: "Student Visa Documentation - United Kingdom",
      country: "United Kingdom",
      visaType: "Student Visa (Tier 4)",
      documents: [
        "Valid passport",
        "CAS (Confirmation of Acceptance for Studies)",
        "Tuberculosis test certificate (if required)",
        "Academic qualifications",
        "English language test results",
        "Financial evidence (28 days bank statements)",
        "ATAS certificate (if required)",
        "Passport-sized photographs",
      ],
      checklist: [
        "Receive CAS from university",
        "Complete online visa application",
        "Pay visa fee (£348-475)",
        "Pay healthcare surcharge (£470/year)",
        "Book biometric appointment",
        "Attend biometric appointment",
        "Submit documents",
        "Wait for decision (usually 3 weeks)",
      ],
      templates: [
        "Financial Evidence Letter Template",
        "Sponsor Letter Template",
        "Cover Letter Template",
      ],
    },
    {
      id: "3",
      title: "Student Visa Documentation - Canada",
      country: "Canada",
      visaType: "Study Permit",
      documents: [
        "Valid passport",
        "Letter of Acceptance from DLI",
        "Proof of financial support",
        "Immigration Medical Examination (if required)",
        "Police certificate (if required)",
        "English/French language test results",
        "Passport-sized photographs",
        "Biometrics (if required)",
      ],
      checklist: [
        "Receive Letter of Acceptance",
        "Create online account",
        "Complete study permit application",
        "Pay application fee (CAD $150)",
        "Pay biometrics fee (CAD $85)",
        "Complete medical exam (if required)",
        "Submit biometrics",
        "Wait for processing (4-6 weeks)",
      ],
      templates: [
        "Financial Support Letter Template",
        "Sponsor Declaration Template",
        "Cover Letter Template",
      ],
    },
    {
      id: "4",
      title: "Student Visa Documentation - Australia",
      country: "Australia",
      visaType: "Student Visa (Subclass 500)",
      documents: [
        "Valid passport",
        "Confirmation of Enrolment (CoE)",
        "Genuine Temporary Entrant (GTE) statement",
        "English language test results",
        "Financial capacity evidence",
        "Overseas Student Health Cover (OSHC)",
        "Academic transcripts",
        "Passport-sized photographs",
      ],
      checklist: [
        "Receive CoE from institution",
        "Obtain OSHC coverage",
        "Create ImmiAccount",
        "Complete visa application online",
        "Pay visa fee (AUD $620)",
        "Attend biometrics (if required)",
        "Wait for processing (1-4 months)",
        "Receive visa grant notification",
      ],
      templates: [
        "GTE Statement Template",
        "Financial Capacity Template",
        "Cover Letter Template",
      ],
    },
    {
      id: "5",
      title: "Student Visa Documentation - Germany",
      country: "Germany",
      visaType: "Student Visa",
      documents: [
        "Valid passport",
        "Admission letter from university",
        "Proof of financial resources (€11,208/year)",
        "Health insurance certificate",
        "Academic qualifications",
        "German language certificate (if required)",
        "Motivation letter",
        "Passport-sized photographs",
      ],
      checklist: [
        "Receive admission letter",
        "Open blocked account (Sperrkonto)",
        "Obtain health insurance",
        "Schedule visa appointment",
        "Complete visa application form",
        "Pay visa fee (€75)",
        "Attend visa interview",
        "Wait for processing (4-12 weeks)",
      ],
      templates: [
        "Motivation Letter Template",
        "Financial Declaration Template",
        "Cover Letter Template",
      ],
    },
    {
      id: "6",
      title: "Student Visa Documentation - France",
      country: "France",
      visaType: "Long-Stay Student Visa",
      documents: [
        "Valid passport",
        "Campus France authorization",
        "Admission letter from institution",
        "Proof of financial resources",
        "Health insurance",
        "French language certificate (if required)",
        "Academic transcripts",
        "Passport-sized photographs",
      ],
      checklist: [
        "Register with Campus France",
        "Complete Campus France procedure",
        "Receive Campus France authorization",
        "Schedule visa appointment",
        "Complete visa application",
        "Pay visa fee (€50-99)",
        "Attend visa appointment",
        "Wait for processing (2-3 weeks)",
      ],
      templates: [
        "Financial Guarantee Template",
        "Motivation Letter Template",
        "Cover Letter Template",
      ],
    },
    {
      id: "7",
      title: "Student Visa Documentation - Singapore",
      country: "Singapore",
      visaType: "Student Pass",
      documents: [
        "Valid passport",
        "In-Principle Approval (IPA) letter",
        "Student Pass application form",
        "Medical examination report",
        "Academic qualifications",
        "English language test results",
        "Financial documents",
        "Passport-sized photographs",
      ],
      checklist: [
        "Receive IPA from institution",
        "Complete medical examination",
        "Submit Student Pass application",
        "Pay processing fee (SGD $30)",
        "Pay issuance fee (SGD $60)",
        "Attend appointment at ICA",
        "Collect Student Pass",
        "Complete enrollment at institution",
      ],
      templates: [
        "Financial Declaration Template",
        "Cover Letter Template",
      ],
    },
    {
      id: "8",
      title: "Student Visa Documentation - Japan",
      country: "Japan",
      visaType: "Student Visa",
      documents: [
        "Valid passport",
        "Certificate of Eligibility (COE)",
        "Visa application form",
        "Academic qualifications",
        "Japanese language certificate (if required)",
        "Financial guarantee documents",
        "Letter of guarantee",
        "Passport-sized photographs",
      ],
      checklist: [
        "Receive COE from school",
        "Apply for visa at embassy/consulate",
        "Complete visa application form",
        "Pay visa fee (varies by country)",
        "Submit all documents",
        "Wait for processing (5-7 days)",
        "Collect visa",
        "Travel to Japan and complete registration",
      ],
      templates: [
        "Financial Guarantee Template",
        "Letter of Guarantee Template",
        "Cover Letter Template",
      ],
    },
  ];
}

/**
 * Get documentation guides filtered by country
 */
export async function getDocumentationByCountry(
  country: string
): Promise<DocumentGuide[]> {
  const all = await getDocumentationData();
  return all.filter((d) => d.country === country);
}

/**
 * Get documentation guides filtered by visa type
 */
export async function getDocumentationByVisaType(
  visaType: string
): Promise<DocumentGuide[]> {
  const all = await getDocumentationData();
  return all.filter((d) => d.visaType === visaType);
}