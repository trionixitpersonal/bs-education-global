/**
 * Type definitions for mock data across all pages
 */

export interface Scholarship {
  id: string;
  title: string;
  description: string;
  amount: string;
  deadline: string;
  eligibility: string[];
  country: string;
  university: string;
  level: "Undergraduate" | "Graduate" | "PhD" | "All";
  category: string;
  applicationLink: string;
}

export interface VisaGuide {
  id: string;
  country: string;
  flag: string;
  visaType: string;
  requirements: string[];
  processingTime: string;
  cost: string;
  documents: string[];
  description: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: "Guide" | "Article" | "Video" | "Tool" | "Template";
  link: string;
  readTime?: string;
  tags: string[];
  publishedAt: string;
}

export interface SupportOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
  category: "Help" | "Contact" | "FAQ" | "Booking";
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  ranking: number;
  programs: string[];
  tuition: string;
  image?: string;
  description: string;
}

export interface Program {
  id: string;
  name: string;
  university: string;
  level: "Undergraduate" | "Graduate" | "PhD";
  duration: string;
  tuition: string;
  requirements: string[];
  description: string;
}

export interface QSRanking {
  id: string;
  university: string;
  rank: number;
  country: string;
  region: "Global" | "Asia" | "Europe" | "North America" | "Latin America" | "Middle East" | "Africa";
  discipline: "Engineering" | "Business" | "Medicine" | "Arts" | "Science" | "Technology" | "Law" | "Overall";
  score: number;
}

export interface StudyDestination {
  id: string;
  city: string;
  country: string;
  universities: string[];
  costOfLiving: string;
  studentLife: string;
  culture: string;
}

export interface DocumentGuide {
  id: string;
  title: string;
  country: string;
  visaType: string;
  documents: string[];
  checklist: string[];
  templates: string[];
}

export interface ProcessStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  country: string;
  duration: string;
  requirements: string[];
  tips: string[];
}
