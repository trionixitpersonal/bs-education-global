import { QSRanking } from "./types";

/**
 * Mock data for QS rankings page
 * Simulates API response with realistic QS ranking information
 */
export async function getQSRankingsData(): Promise<QSRanking[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    {
      id: "1",
      university: "Massachusetts Institute of Technology",
      rank: 1,
      country: "United States",
      region: "North America",
      discipline: "Overall",
      score: 100,
    },
    {
      id: "2",
      university: "University of Cambridge",
      rank: 2,
      country: "United Kingdom",
      region: "Europe",
      discipline: "Overall",
      score: 99.2,
    },
    {
      id: "3",
      university: "Stanford University",
      rank: 3,
      country: "United States",
      region: "North America",
      discipline: "Overall",
      score: 98.7,
    },
    {
      id: "4",
      university: "University of Oxford",
      rank: 4,
      country: "United Kingdom",
      region: "Europe",
      discipline: "Overall",
      score: 98.5,
    },
    {
      id: "5",
      university: "Harvard University",
      rank: 5,
      country: "United States",
      region: "North America",
      discipline: "Overall",
      score: 98.2,
    },
    {
      id: "6",
      university: "Massachusetts Institute of Technology",
      rank: 1,
      country: "United States",
      region: "North America",
      discipline: "Engineering",
      score: 100,
    },
    {
      id: "7",
      university: "Stanford University",
      rank: 2,
      country: "United States",
      region: "North America",
      discipline: "Engineering",
      score: 98.5,
    },
    {
      id: "8",
      university: "University of Cambridge",
      rank: 3,
      country: "United Kingdom",
      region: "Europe",
      discipline: "Engineering",
      score: 97.8,
    },
    {
      id: "9",
      university: "ETH Zurich",
      rank: 4,
      country: "Switzerland",
      region: "Europe",
      discipline: "Engineering",
      score: 97.2,
    },
    {
      id: "10",
      university: "Imperial College London",
      rank: 5,
      country: "United Kingdom",
      region: "Europe",
      discipline: "Engineering",
      score: 96.8,
    },
    {
      id: "11",
      university: "Harvard University",
      rank: 1,
      country: "United States",
      region: "North America",
      discipline: "Business",
      score: 100,
    },
    {
      id: "12",
      university: "INSEAD",
      rank: 2,
      country: "France",
      region: "Europe",
      discipline: "Business",
      score: 98.5,
    },
    {
      id: "13",
      university: "London Business School",
      rank: 3,
      country: "United Kingdom",
      region: "Europe",
      discipline: "Business",
      score: 97.8,
    },
    {
      id: "14",
      university: "Stanford University",
      rank: 4,
      country: "United States",
      region: "North America",
      discipline: "Business",
      score: 97.2,
    },
    {
      id: "15",
      university: "University of Pennsylvania",
      rank: 5,
      country: "United States",
      region: "North America",
      discipline: "Business",
      score: 96.5,
    },
    {
      id: "16",
      university: "Harvard University",
      rank: 1,
      country: "United States",
      region: "North America",
      discipline: "Medicine",
      score: 100,
    },
    {
      id: "17",
      university: "University of Oxford",
      rank: 2,
      country: "United Kingdom",
      region: "Europe",
      discipline: "Medicine",
      score: 98.8,
    },
    {
      id: "18",
      university: "University of Cambridge",
      rank: 3,
      country: "United Kingdom",
      region: "Europe",
      discipline: "Medicine",
      score: 98.2,
    },
    {
      id: "19",
      university: "Johns Hopkins University",
      rank: 4,
      country: "United States",
      region: "North America",
      discipline: "Medicine",
      score: 97.5,
    },
    {
      id: "20",
      university: "Stanford University",
      rank: 5,
      country: "United States",
      region: "North America",
      discipline: "Medicine",
      score: 97.0,
    },
    {
      id: "21",
      university: "National University of Singapore",
      rank: 1,
      country: "Singapore",
      region: "Asia",
      discipline: "Overall",
      score: 95.8,
    },
    {
      id: "22",
      university: "Peking University",
      rank: 2,
      country: "China",
      region: "Asia",
      discipline: "Overall",
      score: 94.2,
    },
    {
      id: "23",
      university: "Tsinghua University",
      rank: 3,
      country: "China",
      region: "Asia",
      discipline: "Overall",
      score: 93.8,
    },
    {
      id: "24",
      university: "University of Tokyo",
      rank: 4,
      country: "Japan",
      region: "Asia",
      discipline: "Overall",
      score: 93.2,
    },
    {
      id: "25",
      university: "Nanyang Technological University",
      rank: 5,
      country: "Singapore",
      region: "Asia",
      discipline: "Overall",
      score: 92.5,
    },
    {
      id: "26",
      university: "Massachusetts Institute of Technology",
      rank: 1,
      country: "United States",
      region: "North America",
      discipline: "Technology",
      score: 100,
    },
    {
      id: "27",
      university: "Stanford University",
      rank: 2,
      country: "United States",
      region: "North America",
      discipline: "Technology",
      score: 98.8,
    },
    {
      id: "28",
      university: "Carnegie Mellon University",
      rank: 3,
      country: "United States",
      region: "North America",
      discipline: "Technology",
      score: 97.5,
    },
    {
      id: "29",
      university: "University of California, Berkeley",
      rank: 4,
      country: "United States",
      region: "North America",
      discipline: "Technology",
      score: 96.8,
    },
    {
      id: "30",
      university: "University of Cambridge",
      rank: 5,
      country: "United Kingdom",
      region: "Europe",
      discipline: "Technology",
      score: 96.2,
    },
  ];
}

/**
 * Get rankings filtered by region
 */
export async function getRankingsByRegion(
  region: QSRanking["region"]
): Promise<QSRanking[]> {
  const all = await getQSRankingsData();
  return all.filter((r) => r.region === region);
}

/**
 * Get rankings filtered by discipline
 */
export async function getRankingsByDiscipline(
  discipline: QSRanking["discipline"]
): Promise<QSRanking[]> {
  const all = await getQSRankingsData();
  return all.filter((r) => r.discipline === discipline);
}