import { ProcessStep } from "./types";

/**
 * Mock data for application process page
 * Simulates API response with realistic application process information
 */
export async function getApplicationProcessData(): Promise<ProcessStep[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    {
      id: "1",
      stepNumber: 1,
      title: "Research and Choose Programs",
      description:
        "Research universities and programs that match your academic goals, interests, and career aspirations. Consider factors like ranking, location, cost, and program structure.",
      country: "All Countries",
      duration: "2-4 months",
      requirements: [
        "Define your academic and career goals",
        "Research universities and programs",
        "Check entry requirements",
        "Review application deadlines",
        "Consider financial requirements",
      ],
      tips: [
        "Start early - give yourself plenty of time",
        "Create a spreadsheet to track programs",
        "Reach out to current students or alumni",
        "Attend virtual information sessions",
        "Consider backup options",
      ],
    },
    {
      id: "2",
      stepNumber: 2,
      title: "Prepare Required Documents",
      description:
        "Gather and prepare all necessary documents including transcripts, test scores, letters of recommendation, and personal statements.",
      country: "All Countries",
      duration: "1-2 months",
      requirements: [
        "Official academic transcripts",
        "Standardized test scores (GRE, GMAT, SAT, etc.)",
        "English proficiency test (TOEFL, IELTS, etc.)",
        "Letters of recommendation (2-3)",
        "Statement of purpose or personal essay",
        "CV or resume",
        "Portfolio (if required)",
      ],
      tips: [
        "Request transcripts early - they can take time",
        "Give recommenders at least 4-6 weeks notice",
        "Take standardized tests well in advance",
        "Keep multiple copies of all documents",
        "Get documents translated if needed",
      ],
    },
    {
      id: "3",
      stepNumber: 3,
      title: "Submit University Applications",
      description:
        "Complete and submit your applications through the university's online portal or application system before the deadline.",
      country: "All Countries",
      duration: "2-4 weeks",
      requirements: [
        "Complete online application form",
        "Upload all required documents",
        "Pay application fees",
        "Submit before deadline",
        "Confirm receipt of application",
      ],
      tips: [
        "Double-check all information before submitting",
        "Submit well before the deadline",
        "Keep confirmation emails and receipts",
        "Follow up if you don't receive confirmation",
        "Apply to multiple programs for better chances",
      ],
    },
    {
      id: "4",
      stepNumber: 4,
      title: "Receive Admission Decision",
      description:
        "Wait for universities to review your application and receive admission decisions. This can take several weeks to months.",
      country: "All Countries",
      duration: "4-12 weeks",
      requirements: [
        "Monitor application status",
        "Respond to any additional requests",
        "Review admission offers carefully",
        "Compare multiple offers",
        "Accept or decline offers",
      ],
      tips: [
        "Be patient - processing takes time",
        "Check your email regularly",
        "Respond promptly to any requests",
        "Compare financial aid packages",
        "Ask questions if anything is unclear",
      ],
    },
    {
      id: "5",
      stepNumber: 5,
      title: "Apply for Student Visa",
      description:
        "Once accepted, begin the student visa application process for your chosen country. Requirements vary by country.",
      country: "All Countries",
      duration: "4-12 weeks",
      requirements: [
        "Receive admission letter/CoE",
        "Complete visa application form",
        "Gather required documents",
        "Pay visa fees",
        "Schedule visa interview (if required)",
        "Attend biometrics appointment (if required)",
      ],
      tips: [
        "Start visa process immediately after acceptance",
        "Check country-specific requirements",
        "Book appointments early",
        "Prepare thoroughly for interviews",
        "Keep copies of all visa documents",
      ],
    },
    {
      id: "6",
      stepNumber: 6,
      title: "Secure Funding and Scholarships",
      description:
        "Finalize your funding arrangements including scholarships, loans, or personal savings to cover tuition and living expenses.",
      country: "All Countries",
      duration: "2-6 months",
      requirements: [
        "Apply for scholarships",
        "Secure student loans (if needed)",
        "Open bank accounts",
        "Arrange money transfers",
        "Obtain financial guarantees",
      ],
      tips: [
        "Apply for scholarships early",
        "Research all funding options",
        "Consider part-time work opportunities",
        "Budget for unexpected expenses",
        "Keep financial documents organized",
      ],
    },
    {
      id: "7",
      stepNumber: 7,
      title: "Arrange Accommodation",
      description:
        "Find and secure accommodation near your university. Options include university housing, private rentals, or homestays.",
      country: "All Countries",
      duration: "1-3 months",
      requirements: [
        "Research accommodation options",
        "Apply for university housing",
        "Or find private accommodation",
        "Sign rental agreements",
        "Arrange move-in dates",
      ],
      tips: [
        "Apply for university housing early",
        "Visit or view accommodations if possible",
        "Read rental agreements carefully",
        "Consider location and transportation",
        "Budget for deposits and first month's rent",
      ],
    },
    {
      id: "8",
      stepNumber: 8,
      title: "Prepare for Departure",
      description:
        "Make final preparations including booking flights, purchasing insurance, packing, and completing pre-departure requirements.",
      country: "All Countries",
      duration: "2-4 weeks",
      requirements: [
        "Book flights",
        "Purchase travel insurance",
        "Complete health requirements",
        "Pack essential items",
        "Notify banks and update addresses",
        "Arrange airport pickup (if needed)",
      ],
      tips: [
        "Book flights early for better prices",
        "Check baggage allowances",
        "Pack important documents in carry-on",
        "Notify family and friends",
        "Research local customs and culture",
        "Download useful apps for your destination",
      ],
    },
    {
      id: "9",
      stepNumber: 9,
      title: "Arrive and Settle In",
      description:
        "Upon arrival, complete registration, orientation, and settle into your new environment. Attend orientation sessions and meet new people.",
      country: "All Countries",
      duration: "1-2 weeks",
      requirements: [
        "Complete university registration",
        "Attend orientation sessions",
        "Open local bank account",
        "Register with local authorities (if required)",
        "Obtain student ID and access cards",
        "Set up phone and internet",
      ],
      tips: [
        "Arrive a few days early if possible",
        "Attend all orientation sessions",
        "Explore your new city",
        "Join student clubs and organizations",
        "Make friends and build your network",
        "Don't hesitate to ask for help",
      ],
    },
  ];
}

/**
 * Get process steps filtered by country
 */
export async function getProcessStepsByCountry(
  country: string
): Promise<ProcessStep[]> {
  const all = await getApplicationProcessData();
  if (country === "All Countries") {
    return all;
  }
  // For country-specific steps, you could filter or add country-specific data
  return all;
}