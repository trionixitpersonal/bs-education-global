import { Program } from "./types";

/**
 * Mock data for compare programs page
 * Simulates API response with realistic program information
 */
export async function getProgramsData(): Promise<Program[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    {
      id: "1",
      name: "Master of Science in Computer Science",
      university: "Massachusetts Institute of Technology",
      level: "Graduate",
      duration: "2 years",
      tuition: "$53,450/year",
      requirements: [
        "Bachelor's degree in related field",
        "GRE scores",
        "TOEFL/IELTS (for international students)",
        "3 letters of recommendation",
        "Statement of purpose",
      ],
      description:
        "Advanced program covering algorithms, machine learning, systems, and theoretical computer science.",
    },
    {
      id: "2",
      name: "Master of Science in Computer Science",
      university: "Stanford University",
      level: "Graduate",
      duration: "2 years",
      tuition: "$56,169/year",
      requirements: [
        "Bachelor's degree in CS or related field",
        "Strong programming background",
        "GRE scores recommended",
        "TOEFL/IELTS",
        "3 letters of recommendation",
      ],
      description:
        "Comprehensive program with focus on AI, systems, and human-computer interaction.",
    },
    {
      id: "3",
      name: "Master of Science in Computer Science",
      university: "University of Cambridge",
      level: "Graduate",
      duration: "1 year",
      tuition: "£33,825/year",
      requirements: [
        "First-class honors degree",
        "Strong mathematical background",
        "IELTS 7.5 or equivalent",
        "2 academic references",
        "Research proposal",
      ],
      description:
        "Intensive one-year program with emphasis on research and advanced topics in computer science.",
    },
    {
      id: "4",
      name: "Master of Business Administration (MBA)",
      university: "Harvard Business School",
      level: "Graduate",
      duration: "2 years",
      tuition: "$73,440/year",
      requirements: [
        "Bachelor's degree",
        "GMAT/GRE scores",
        "2+ years work experience",
        "TOEFL/IELTS",
        "2 letters of recommendation",
        "Essays and interview",
      ],
      description:
        "World-renowned MBA program focusing on leadership, strategy, and global business.",
    },
    {
      id: "5",
      name: "Master of Business Administration (MBA)",
      university: "Stanford Graduate School of Business",
      level: "Graduate",
      duration: "2 years",
      tuition: "$74,706/year",
      requirements: [
        "Bachelor's degree",
        "GMAT/GRE scores",
        "Work experience preferred",
        "TOEFL/IELTS",
        "2 letters of recommendation",
        "Essays",
      ],
      description:
        "Innovative MBA program with focus on entrepreneurship, innovation, and leadership.",
    },
    {
      id: "6",
      name: "Master of Business Administration (MBA)",
      university: "London Business School",
      level: "Graduate",
      duration: "15-21 months",
      tuition: "£87,900 total",
      requirements: [
        "Bachelor's degree",
        "GMAT/GRE scores",
        "3+ years work experience",
        "IELTS 7.5 or equivalent",
        "2 professional references",
        "Essays and interview",
      ],
      description:
        "Flexible MBA program offering global perspective and strong network in London.",
    },
    {
      id: "7",
      name: "Bachelor of Engineering",
      university: "Imperial College London",
      level: "Undergraduate",
      duration: "3-4 years",
      tuition: "£33,750/year",
      requirements: [
        "A-levels or equivalent",
        "Mathematics and Physics required",
        "IELTS 6.5 or equivalent",
        "Personal statement",
        "References",
      ],
      description:
        "Comprehensive engineering program with options in mechanical, electrical, civil, and more.",
    },
    {
      id: "8",
      name: "Bachelor of Science in Engineering",
      university: "ETH Zurich",
      level: "Undergraduate",
      duration: "3 years",
      tuition: "CHF 730/semester",
      requirements: [
        "Swiss Matura or equivalent",
        "Strong mathematics and physics",
        "German language proficiency",
        "Entrance examination",
      ],
      description:
        "Rigorous engineering program with strong emphasis on mathematics and practical applications.",
    },
    {
      id: "9",
      name: "Master of Science in Data Science",
      university: "University of Toronto",
      level: "Graduate",
      duration: "16 months",
      tuition: "CAD $48,000 total",
      requirements: [
        "Bachelor's degree in quantitative field",
        "Strong programming skills",
        "TOEFL/IELTS",
        "3 letters of recommendation",
        "Statement of purpose",
      ],
      description:
        "Interdisciplinary program combining statistics, computer science, and domain expertise.",
    },
    {
      id: "10",
      name: "Master of Science in Data Science",
      university: "University of Melbourne",
      level: "Graduate",
      duration: "2 years",
      tuition: "AUD $44,736/year",
      requirements: [
        "Bachelor's degree with mathematics/statistics",
        "Programming experience",
        "IELTS 6.5 or equivalent",
        "2 academic references",
        "Personal statement",
      ],
      description:
        "Comprehensive data science program with focus on machine learning and big data analytics.",
    },
    {
      id: "11",
      name: "PhD in Computer Science",
      university: "Massachusetts Institute of Technology",
      level: "PhD",
      duration: "5-6 years",
      tuition: "Fully funded",
      requirements: [
        "Master's degree or equivalent",
        "Strong research background",
        "GRE scores",
        "TOEFL/IELTS",
        "3 letters of recommendation",
        "Research proposal",
      ],
      description:
        "Research-intensive PhD program with opportunities to work with leading researchers.",
    },
    {
      id: "12",
      name: "PhD in Computer Science",
      university: "University of Cambridge",
      level: "PhD",
      duration: "3-4 years",
      tuition: "Varies (scholarships available)",
      requirements: [
        "Master's degree with distinction",
        "Research experience",
        "IELTS 7.5 or equivalent",
        "2 academic references",
        "Research proposal",
        "Interview",
      ],
      description:
        "Rigorous PhD program with focus on original research and academic excellence.",
    },
  ];
}

/**
 * Get programs filtered by level
 */
export async function getProgramsByLevel(
  level: Program["level"]
): Promise<Program[]> {
  const all = await getProgramsData();
  return all.filter((p) => p.level === level);
}

/**
 * Get programs filtered by university
 */
export async function getProgramsByUniversity(
  university: string
): Promise<Program[]> {
  const all = await getProgramsData();
  return all.filter((p) => p.university === university);
}