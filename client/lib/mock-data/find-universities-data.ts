import { University } from "./types";

/**
 * Mock data for find universities page
 * Simulates API response with realistic university information
 */
export async function getUniversitiesData(): Promise<University[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    {
      id: "1",
      name: "Massachusetts Institute of Technology",
      country: "United States",
      city: "Cambridge",
      ranking: 1,
      programs: ["Engineering", "Computer Science", "Business", "Architecture"],
      tuition: "$53,450/year",
      description:
        "MIT is a world-renowned institution known for cutting-edge research and innovation in science, technology, and engineering.",
    },
    {
      id: "2",
      name: "University of Cambridge",
      country: "United Kingdom",
      city: "Cambridge",
      ranking: 2,
      programs: ["Arts", "Sciences", "Engineering", "Medicine", "Law"],
      tuition: "£33,825/year",
      description:
        "One of the world's oldest and most prestigious universities, Cambridge offers exceptional academic programs across all disciplines.",
    },
    {
      id: "3",
      name: "Stanford University",
      country: "United States",
      city: "Stanford",
      ranking: 3,
      programs: ["Engineering", "Business", "Medicine", "Law", "Education"],
      tuition: "$56,169/year",
      description:
        "Located in the heart of Silicon Valley, Stanford is a leader in innovation, entrepreneurship, and academic excellence.",
    },
    {
      id: "4",
      name: "University of Oxford",
      country: "United Kingdom",
      city: "Oxford",
      ranking: 4,
      programs: ["Humanities", "Sciences", "Medicine", "Law", "Business"],
      tuition: "£26,770-37,510/year",
      description:
        "Oxford combines centuries of tradition with cutting-edge research, offering world-class education in a historic setting.",
    },
    {
      id: "5",
      name: "Harvard University",
      country: "United States",
      city: "Cambridge",
      ranking: 5,
      programs: ["Arts", "Sciences", "Business", "Law", "Medicine", "Engineering"],
      tuition: "$54,269/year",
      description:
        "Harvard is America's oldest institution of higher learning, known for academic excellence and producing world leaders.",
    },
    {
      id: "6",
      name: "California Institute of Technology",
      country: "United States",
      city: "Pasadena",
      ranking: 6,
      programs: ["Engineering", "Science", "Mathematics", "Physics"],
      tuition: "$56,862/year",
      description:
        "Caltech is a world-renowned science and engineering institute with a focus on research and innovation.",
    },
    {
      id: "7",
      name: "Imperial College London",
      country: "United Kingdom",
      city: "London",
      ranking: 7,
      programs: ["Engineering", "Medicine", "Business", "Natural Sciences"],
      tuition: "£33,750-46,650/year",
      description:
        "Imperial focuses exclusively on science, engineering, medicine, and business, with a strong emphasis on research.",
    },
    {
      id: "8",
      name: "University of Toronto",
      country: "Canada",
      city: "Toronto",
      ranking: 21,
      programs: ["Arts", "Sciences", "Engineering", "Business", "Medicine"],
      tuition: "CAD $45,690-58,160/year",
      description:
        "Canada's leading university, known for research excellence and diverse academic programs in a vibrant urban setting.",
    },
    {
      id: "9",
      name: "University of Melbourne",
      country: "Australia",
      city: "Melbourne",
      ranking: 14,
      programs: ["Arts", "Sciences", "Engineering", "Business", "Medicine", "Law"],
      tuition: "AUD $37,344-48,960/year",
      description:
        "Australia's top-ranked university, offering world-class education in one of the world's most livable cities.",
    },
    {
      id: "10",
      name: "ETH Zurich",
      country: "Switzerland",
      city: "Zurich",
      ranking: 8,
      programs: ["Engineering", "Science", "Architecture", "Mathematics"],
      tuition: "CHF 730/semester",
      description:
        "Switzerland's leading technical university, known for excellence in engineering, science, and technology.",
    },
    {
      id: "11",
      name: "National University of Singapore",
      country: "Singapore",
      city: "Singapore",
      ranking: 8,
      programs: ["Engineering", "Business", "Medicine", "Law", "Arts"],
      tuition: "SGD $17,550-38,200/year",
      description:
        "Asia's top-ranked university, offering world-class education in a dynamic, multicultural environment.",
    },
    {
      id: "12",
      name: "University of British Columbia",
      country: "Canada",
      city: "Vancouver",
      ranking: 34,
      programs: ["Arts", "Sciences", "Engineering", "Business", "Medicine"],
      tuition: "CAD $38,946-52,612/year",
      description:
        "UBC is a global center for research and teaching, consistently ranked among the top 40 universities worldwide.",
    },
    {
      id: "13",
      name: "University of Sydney",
      country: "Australia",
      city: "Sydney",
      ranking: 19,
      programs: ["Arts", "Sciences", "Engineering", "Business", "Medicine", "Law"],
      tuition: "AUD $40,000-52,000/year",
      description:
        "Australia's first university, offering comprehensive programs in a beautiful campus setting in the heart of Sydney.",
    },
    {
      id: "14",
      name: "Technical University of Munich",
      country: "Germany",
      city: "Munich",
      ranking: 37,
      programs: ["Engineering", "Science", "Medicine", "Business"],
      tuition: "€147-€1,500/semester",
      description:
        "Germany's leading technical university, known for excellence in engineering, natural sciences, and technology.",
    },
    {
      id: "15",
      name: "University of Tokyo",
      country: "Japan",
      city: "Tokyo",
      ranking: 28,
      programs: ["Engineering", "Science", "Medicine", "Arts", "Law"],
      tuition: "¥535,800/year",
      description:
        "Japan's most prestigious university, offering world-class education and research opportunities in Asia's leading metropolis.",
    },
  ];
}

/**
 * Get universities filtered by country
 */
export async function getUniversitiesByCountry(
  country: string
): Promise<University[]> {
  const all = await getUniversitiesData();
  return all.filter((u) => u.country === country);
}

/**
 * Get universities filtered by program
 */
export async function getUniversitiesByProgram(
  program: string
): Promise<University[]> {
  const all = await getUniversitiesData();
  return all.filter((u) => u.programs.includes(program));
}