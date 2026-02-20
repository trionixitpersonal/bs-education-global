export type HelpCenterArticle = {
  slug: string;
  category: string;
  title: string;
  description: string;
  readTime: string;
  content: string[];
};

export const helpCenterArticles: HelpCenterArticle[] = [
  {
    slug: "choose-right-university",
    category: "Getting Started",
    title: "How to Choose the Right University",
    description:
      "A comprehensive guide to selecting universities that match your academic goals and career aspirations.",
    readTime: "5 min read",
    content: [
      "Start by clarifying your academic goals, preferred study destination, and budget range.",
      "Compare program outcomes, accreditation, and graduate employment rates to find the best fit.",
      "Review entry requirements early so you can plan tests, documents, and timelines.",
    ],
  },
  {
    slug: "application-requirements",
    category: "Applications",
    title: "Understanding Application Requirements",
    description:
      "Learn about common application requirements across different countries and universities.",
    readTime: "7 min read",
    content: [
      "Most universities require transcripts, proof of English proficiency, and a statement of purpose.",
      "Some programs ask for portfolios, work experience, or additional entrance exams.",
      "Always check program-specific requirements to avoid missing documents or deadlines.",
    ],
  },
  {
    slug: "scholarship-strategy",
    category: "Scholarships",
    title: "Finding and Applying for Scholarships",
    description:
      "Tips and strategies for discovering scholarship opportunities and creating winning applications.",
    readTime: "6 min read",
    content: [
      "Search early and apply widely to improve your chances.",
      "Tailor your essays to each scholarship and highlight measurable achievements.",
      "Collect references in advance so you can meet tight deadlines.",
    ],
  },
  {
    slug: "visa-application-guide",
    category: "Visa Process",
    title: "Step-by-Step Visa Application Guide",
    description:
      "Everything you need to know about applying for a student visa in your destination country.",
    readTime: "8 min read",
    content: [
      "Start by reviewing the official visa checklist for your destination country.",
      "Prepare financial evidence, enrollment confirmation, and health insurance details.",
      "Submit early to allow for processing time and potential document requests.",
    ],
  },
  {
    slug: "academic-document-prep",
    category: "Documentation",
    title: "Preparing Your Academic Documents",
    description:
      "How to gather, verify, and submit the required academic documents for your application.",
    readTime: "4 min read",
    content: [
      "Request official transcripts from your institution and verify they are sealed if required.",
      "Translate documents using certified translators where necessary.",
      "Keep digital backups and label files clearly for each application.",
    ],
  },
  {
    slug: "study-abroad-budgeting",
    category: "Financial Planning",
    title: "Budgeting for Study Abroad",
    description:
      "Create a realistic budget covering tuition, living expenses, and other costs.",
    readTime: "6 min read",
    content: [
      "Estimate tuition, accommodation, transport, and health insurance costs.",
      "Add a buffer for unexpected expenses such as visa changes or travel.",
      "Track monthly spending to stay on budget while studying abroad.",
    ],
  },
];
