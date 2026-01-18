import { Resource } from "./types";

/**
 * Mock data for resources page
 * Simulates API response with realistic resource information
 */
export async function getResourcesData(): Promise<Resource[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    {
      id: "1",
      title: "Complete Guide to University Applications",
      description:
        "A comprehensive step-by-step guide covering everything from choosing universities to submitting applications and preparing for interviews.",
      category: "Guide",
      link: "#guide-applications",
      readTime: "15 min read",
      tags: ["Applications", "Admissions", "Guide"],
      publishedAt: "2024-01-15",
    },
    {
      id: "2",
      title: "Understanding QS World University Rankings",
      description:
        "Learn how QS rankings work, what they measure, and how to use them effectively when choosing your study destination.",
      category: "Article",
      link: "#article-qs-rankings",
      readTime: "8 min read",
      tags: ["Rankings", "Universities", "Research"],
      publishedAt: "2024-02-01",
    },
    {
      id: "3",
      title: "Statement of Purpose Writing Workshop",
      description:
        "Video tutorial series on crafting compelling statements of purpose that stand out to admissions committees.",
      category: "Video",
      link: "#video-sop",
      readTime: "45 min",
      tags: ["SOP", "Writing", "Admissions"],
      publishedAt: "2024-01-20",
    },
    {
      id: "4",
      title: "University Comparison Tool",
      description:
        "Interactive tool to compare universities side-by-side based on rankings, programs, costs, and location factors.",
      category: "Tool",
      link: "#tool-comparison",
      tags: ["Comparison", "Universities", "Tool"],
      publishedAt: "2024-02-10",
    },
    {
      id: "5",
      title: "CV/Resume Template for Graduate Applications",
      description:
        "Professional templates specifically designed for graduate school applications with examples and best practices.",
      category: "Template",
      link: "#template-cv",
      tags: ["CV", "Resume", "Template"],
      publishedAt: "2024-01-25",
    },
    {
      id: "6",
      title: "Financial Planning for International Students",
      description:
        "Complete guide to budgeting, finding scholarships, managing expenses, and financial planning for studying abroad.",
      category: "Guide",
      link: "#guide-financial",
      readTime: "12 min read",
      tags: ["Finance", "Scholarships", "Budgeting"],
      publishedAt: "2024-02-05",
    },
    {
      id: "7",
      title: "Visa Interview Preparation Tips",
      description:
        "Expert advice and common questions for student visa interviews with country-specific guidance.",
      category: "Article",
      link: "#article-visa-interview",
      readTime: "10 min read",
      tags: ["Visa", "Interview", "Preparation"],
      publishedAt: "2024-01-30",
    },
    {
      id: "8",
      title: "English Proficiency Test Comparison",
      description:
        "Detailed comparison of IELTS, TOEFL, PTE, and Duolingo tests to help you choose the right exam.",
      category: "Guide",
      link: "#guide-english-tests",
      readTime: "7 min read",
      tags: ["English", "Tests", "IELTS", "TOEFL"],
      publishedAt: "2024-02-08",
    },
    {
      id: "9",
      title: "Scholarship Application Checklist",
      description:
        "Downloadable checklist template to track your scholarship applications and deadlines.",
      category: "Template",
      link: "#template-scholarship",
      tags: ["Scholarships", "Checklist", "Template"],
      publishedAt: "2024-01-18",
    },
    {
      id: "10",
      title: "Study Abroad Success Stories",
      description:
        "Inspiring video interviews with students who successfully navigated the application process and are now studying abroad.",
      category: "Video",
      link: "#video-success-stories",
      readTime: "30 min",
      tags: ["Success", "Stories", "Motivation"],
      publishedAt: "2024-02-12",
    },
    {
      id: "11",
      title: "Country-Specific Admission Requirements",
      description:
        "Comprehensive guide covering admission requirements, deadlines, and processes for top study destinations.",
      category: "Guide",
      link: "#guide-country-requirements",
      readTime: "20 min read",
      tags: ["Requirements", "Countries", "Admissions"],
      publishedAt: "2024-02-15",
    },
    {
      id: "12",
      title: "Academic Writing for International Students",
      description:
        "Video course on academic writing standards, citation styles, and writing techniques for university-level work.",
      category: "Video",
      link: "#video-academic-writing",
      readTime: "60 min",
      tags: ["Writing", "Academic", "Skills"],
      publishedAt: "2024-01-28",
    },
  ];
}

/**
 * Get resources by category
 */
export async function getResourcesByCategory(
  category: Resource["category"]
): Promise<Resource[]> {
  const all = await getResourcesData();
  return all.filter((r) => r.category === category);
}
