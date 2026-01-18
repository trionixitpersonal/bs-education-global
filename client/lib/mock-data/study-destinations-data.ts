import { StudyDestination } from "./types";

/**
 * Mock data for study destinations page
 * Simulates API response with realistic study destination information
 */
export async function getStudyDestinationsData(): Promise<StudyDestination[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    {
      id: "1",
      city: "Cambridge",
      country: "United Kingdom",
      universities: [
        "University of Cambridge",
        "Anglia Ruskin University",
      ],
      costOfLiving: "£12,000-15,000/year",
      studentLife:
        "Historic university town with vibrant student community, excellent libraries, and rich academic traditions. Great cycling city with easy access to London.",
      culture:
        "Rich history, beautiful architecture, world-class museums, and diverse international community. Strong focus on academic excellence and research.",
    },
    {
      id: "2",
      city: "London",
      country: "United Kingdom",
      universities: [
        "Imperial College London",
        "London School of Economics",
        "University College London",
        "King's College London",
      ],
      costOfLiving: "£15,000-20,000/year",
      studentLife:
        "Cosmopolitan city with endless opportunities for networking, internships, and cultural experiences. Excellent public transport and diverse neighborhoods.",
      culture:
        "World-class museums, theaters, restaurants, and nightlife. Multicultural hub with students from around the globe. Rich history and modern innovation.",
    },
    {
      id: "3",
      city: "Boston",
      country: "United States",
      universities: [
        "Harvard University",
        "Massachusetts Institute of Technology",
        "Boston University",
        "Northeastern University",
      ],
      costOfLiving: "$18,000-25,000/year",
      studentLife:
        "Student-friendly city with numerous universities creating a vibrant academic atmosphere. Great public transport, parks, and cultural venues.",
      culture:
        "Historic city with strong academic tradition, world-renowned museums, excellent food scene, and easy access to New England's natural beauty.",
    },
    {
      id: "4",
      city: "Stanford",
      country: "United States",
      universities: ["Stanford University"],
      costOfLiving: "$20,000-28,000/year",
      studentLife:
        "Beautiful campus setting near Silicon Valley with excellent facilities, sports, and outdoor activities. Strong entrepreneurial culture.",
      culture:
        "Innovation hub with access to tech industry, beautiful California weather, proximity to San Francisco, and focus on entrepreneurship.",
    },
    {
      id: "5",
      city: "Toronto",
      country: "Canada",
      universities: [
        "University of Toronto",
        "York University",
        "Ryerson University",
      ],
      costOfLiving: "CAD $15,000-20,000/year",
      studentLife:
        "Multicultural city with excellent public transit, diverse neighborhoods, and vibrant arts scene. Safe and welcoming for international students.",
      culture:
        "One of the world's most diverse cities, excellent food scene, major sports teams, and strong focus on inclusivity and innovation.",
    },
    {
      id: "6",
      city: "Vancouver",
      country: "Canada",
      universities: [
        "University of British Columbia",
        "Simon Fraser University",
      ],
      costOfLiving: "CAD $16,000-22,000/year",
      studentLife:
        "Beautiful coastal city with mountains and ocean. Excellent outdoor activities, safe environment, and strong focus on sustainability.",
      culture:
        "Multicultural city with Asian influence, excellent food scene, beautiful natural surroundings, and laid-back West Coast lifestyle.",
    },
    {
      id: "7",
      city: "Melbourne",
      country: "Australia",
      universities: [
        "University of Melbourne",
        "Monash University",
        "RMIT University",
      ],
      costOfLiving: "AUD $18,000-25,000/year",
      studentLife:
        "Vibrant arts and culture scene, excellent coffee culture, great public transport, and numerous festivals and events throughout the year.",
      culture:
        "Known as Australia's cultural capital with world-class restaurants, live music, street art, and diverse neighborhoods. Four distinct seasons.",
    },
    {
      id: "8",
      city: "Sydney",
      country: "Australia",
      universities: [
        "University of Sydney",
        "UNSW Sydney",
        "University of Technology Sydney",
      ],
      costOfLiving: "AUD $20,000-28,000/year",
      studentLife:
        "Iconic harbor city with beautiful beaches, excellent public transport, and vibrant nightlife. Great weather and outdoor lifestyle.",
      culture:
        "Stunning natural harbor, world-famous landmarks, diverse food scene, and strong focus on work-life balance. Cosmopolitan and welcoming.",
    },
    {
      id: "9",
      city: "Zurich",
      country: "Switzerland",
      universities: ["ETH Zurich", "University of Zurich"],
      costOfLiving: "CHF 18,000-24,000/year",
      studentLife:
        "Clean, safe, and efficient city with excellent public transport. Beautiful lake and mountain views, high quality of life.",
      culture:
        "Multilingual city (German, French, Italian), world-class museums, excellent food, and strong focus on innovation and research.",
    },
    {
      id: "10",
      city: "Singapore",
      country: "Singapore",
      universities: [
        "National University of Singapore",
        "Nanyang Technological University",
      ],
      costOfLiving: "SGD $12,000-18,000/year",
      studentLife:
        "Modern, efficient city-state with excellent infrastructure, safe environment, and easy access to Southeast Asia. Great food scene.",
      culture:
        "Multicultural hub with Chinese, Malay, and Indian influences. Clean, green city with excellent public transport and strong focus on education.",
    },
    {
      id: "11",
      city: "Munich",
      country: "Germany",
      universities: [
        "Technical University of Munich",
        "Ludwig Maximilian University",
      ],
      costOfLiving: "€10,000-14,000/year",
      studentLife:
        "Beautiful Bavarian city with excellent public transport, numerous parks, and strong student community. Great work-life balance.",
      culture:
        "Rich history, world-famous Oktoberfest, excellent museums, beautiful architecture, and strong focus on engineering and innovation.",
    },
    {
      id: "12",
      city: "Tokyo",
      country: "Japan",
      universities: [
        "University of Tokyo",
        "Waseda University",
        "Keio University",
      ],
      costOfLiving: "¥1,200,000-1,800,000/year",
      studentLife:
        "Fascinating blend of traditional and modern, excellent public transport, safe city, and unique cultural experiences. Great food scene.",
      culture:
        "Rich traditional culture alongside cutting-edge technology, excellent food, beautiful temples, and strong focus on education and innovation.",
    },
  ];
}

/**
 * Get destinations filtered by country
 */
export async function getDestinationsByCountry(
  country: string
): Promise<StudyDestination[]> {
  const all = await getStudyDestinationsData();
  return all.filter((d) => d.country === country);
}