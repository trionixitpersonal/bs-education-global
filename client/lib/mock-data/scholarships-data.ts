import { Scholarship } from "./types";

/**
 * Mock data for scholarships page
 * Simulates API response with realistic scholarship information
 */
export async function getScholarshipsData(): Promise<Scholarship[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    {
      id: "1",
      title: "Fulbright Foreign Student Program",
      description:
        "The Fulbright Program is the flagship international educational exchange program sponsored by the U.S. government.",
      amount: "Full tuition + living expenses",
      deadline: "2024-10-15",
      eligibility: [
        "Bachelor's degree or equivalent",
        "English proficiency (TOEFL/IELTS)",
        "Academic excellence",
        "Leadership potential",
      ],
      country: "United States",
      university: "Multiple Universities",
      level: "Graduate",
      category: "Government",
      applicationLink: "#apply-fulbright",
    },
    {
      id: "2",
      title: "Chevening Scholarships",
      description:
        "Chevening Scholarships are awarded to outstanding emerging leaders from all over the world to pursue a one-year master's degree in the UK.",
      amount: "Full tuition + £1,000+ monthly stipend",
      deadline: "2024-11-01",
      eligibility: [
        "2+ years work experience",
        "Undergraduate degree",
        "English proficiency",
        "Return to home country for 2 years",
      ],
      country: "United Kingdom",
      university: "Multiple Universities",
      level: "Graduate",
      category: "Government",
      applicationLink: "#apply-chevening",
    },
    {
      id: "3",
      title: "Australia Awards Scholarships",
      description:
        "Australia Awards Scholarships are long-term awards administered by the Department of Foreign Affairs and Trade.",
      amount: "Full tuition + living allowance",
      deadline: "2024-04-30",
      eligibility: [
        "Minimum 18 years old",
        "Citizen of eligible country",
        "Meet English requirements",
        "Not hold another scholarship",
      ],
      country: "Australia",
      university: "Multiple Universities",
      level: "All",
      category: "Government",
      applicationLink: "#apply-australia",
    },
    {
      id: "4",
      title: "Vanier Canada Graduate Scholarships",
      description:
        "The Vanier Canada Graduate Scholarships program helps Canadian institutions attract highly qualified doctoral students.",
      amount: "$50,000 per year for 3 years",
      deadline: "2024-11-01",
      eligibility: [
        "Pursuing doctoral studies",
        "Academic excellence",
        "Research potential",
        "Leadership skills",
      ],
      country: "Canada",
      university: "Multiple Universities",
      level: "PhD",
      category: "Government",
      applicationLink: "#apply-vanier",
    },
    {
      id: "5",
      title: "Erasmus Mundus Joint Master Degrees",
      description:
        "Erasmus Mundus Joint Master Degrees are prestigious international master's programs jointly delivered by an international consortium of higher education institutions.",
      amount: "Full tuition + €1,000-3,000 monthly",
      deadline: "2024-02-15",
      eligibility: [
        "Bachelor's degree",
        "Academic excellence",
        "Language requirements vary",
        "No nationality restrictions",
      ],
      country: "Multiple Countries",
      university: "European Universities",
      level: "Graduate",
      category: "EU Program",
      applicationLink: "#apply-erasmus",
    },
    {
      id: "6",
      title: "Rhodes Scholarships",
      description:
        "The Rhodes Scholarship is the oldest and perhaps most prestigious international scholarship program, enabling outstanding young people from around the world to study at the University of Oxford.",
      amount: "Full tuition + living expenses",
      deadline: "2024-10-01",
      eligibility: [
        "Age 18-28",
        "Academic excellence",
        "Leadership qualities",
        "Service to others",
      ],
      country: "United Kingdom",
      university: "University of Oxford",
      level: "Graduate",
      category: "Private",
      applicationLink: "#apply-rhodes",
    },
    {
      id: "7",
      title: "Gates Cambridge Scholarships",
      description:
        "Gates Cambridge Scholarships are awarded to outstanding applicants from countries outside the UK to pursue a full-time postgraduate degree at the University of Cambridge.",
      amount: "Full tuition + living allowance",
      deadline: "2024-12-01",
      eligibility: [
        "Outstanding academic achievement",
        "Leadership potential",
        "Commitment to improving lives",
        "Good fit with Cambridge",
      ],
      country: "United Kingdom",
      university: "University of Cambridge",
      level: "Graduate",
      category: "Private",
      applicationLink: "#apply-gates",
    },
    {
      id: "8",
      title: "Swiss Government Excellence Scholarships",
      description:
        "The Swiss Government Excellence Scholarships provide graduates from all fields with the opportunity to pursue doctoral or postdoctoral research in Switzerland.",
      amount: "CHF 1,920 monthly + tuition waiver",
      deadline: "2024-09-30",
      eligibility: [
        "Master's degree for PhD",
        "PhD for postdoc",
        "Research proposal",
        "Academic excellence",
      ],
      country: "Switzerland",
      university: "Swiss Universities",
      level: "PhD",
      category: "Government",
      applicationLink: "#apply-swiss",
    },
  ];
}

/**
 * Get scholarships filtered by country
 */
export async function getScholarshipsByCountry(
  country: string
): Promise<Scholarship[]> {
  const all = await getScholarshipsData();
  return all.filter((s) => s.country === country);
}

/**
 * Get scholarships filtered by level
 */
export async function getScholarshipsByLevel(
  level: Scholarship["level"]
): Promise<Scholarship[]> {
  const all = await getScholarshipsData();
  return all.filter((s) => s.level === level || s.level === "All");
}
