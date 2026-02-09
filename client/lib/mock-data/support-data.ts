import { SupportOption, FAQ } from "./types";

/**
 * Mock data for support page
 * Simulates API response with realistic support information
 */
export async function getSupportOptions(): Promise<SupportOption[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    {
      id: "1",
      title: "Help Center",
      description:
        "Browse our comprehensive knowledge base with articles, guides, and answers to common questions.",
      icon: "help-circle",
      link: "/support/help-center",
      category: "Help",
    },
    {
      id: "2",
      title: "Contact Support",
      description:
        "Get in touch with our support team via email, phone, or live chat. We're here to help 24/7.",
      icon: "mail",
      link: "/support/contact",
      category: "Contact",
    },
    {
      id: "3",
      title: "Frequently Asked Questions",
      description:
        "Find quick answers to the most common questions about applications, visas, and scholarships.",
      icon: "message-circle",
      link: "/support/faqs",
      category: "FAQ",
    },
    {
      id: "4",
      title: "Book a Consultation Call",
      description:
        "Schedule a one-on-one consultation with our education advisors to discuss your study abroad plans.",
      icon: "calendar",
      link: "/support/book-consultation",
      category: "Booking",
    },
    {
      id: "5",
      title: "Application Review Service",
      description:
        "Get expert feedback on your application materials including SOP, CV, and recommendation letters.",
      icon: "file-check",
      link: "/support/application-review",
      category: "Help",
    },
    {
      id: "6",
      title: "Document Verification",
      description:
        "Verify your academic documents and get them certified for international university applications.",
      icon: "shield-check",
      link: "/support/document-verification",
      category: "Help",
    },
  ];
}

/**
 * Get FAQs data
 */
export async function getFAQs(): Promise<FAQ[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return [
    {
      id: "1",
      question: "How do I find universities that match my profile?",
      answer:
        "Use our university finder tool by entering your academic qualifications, preferred country, program of interest, and budget. Our system will match you with suitable universities based on your criteria.",
      category: "Universities",
    },
    {
      id: "2",
      question: "What documents do I need for university applications?",
      answer:
        "Typically, you'll need academic transcripts, diplomas, English proficiency test scores (IELTS/TOEFL), statement of purpose, letters of recommendation, CV/resume, and passport copy. Requirements vary by university and country.",
      category: "Applications",
    },
    {
      id: "3",
      question: "How long does the visa application process take?",
      answer:
        "Visa processing times vary by country: USA (2-8 weeks), UK (3-6 weeks), Canada (4-20 weeks), Australia (1-4 months), Germany (4-12 weeks). It's recommended to apply at least 3-4 months before your program starts.",
      category: "Visa",
    },
    {
      id: "4",
      question: "Can I work while studying abroad?",
      answer:
        "Most countries allow international students to work part-time (usually 20 hours per week during term time) with a valid student visa. Some countries like Canada allow full-time work during breaks. Check specific country regulations.",
      category: "Visa",
    },
    {
      id: "5",
      question: "How do I apply for scholarships?",
      answer:
        "Research scholarships that match your profile, prepare required documents (academic records, essays, recommendation letters), meet eligibility criteria, and submit applications before deadlines. Our platform helps you discover and track scholarship opportunities.",
      category: "Scholarships",
    },
    {
      id: "6",
      question: "What is the difference between IELTS and TOEFL?",
      answer:
        "IELTS is British English focused and accepted globally, while TOEFL is American English focused. IELTS uses a 9-band scale, TOEFL uses a 0-120 score. Both test reading, writing, listening, and speaking. Choose based on your target country and university requirements.",
      category: "Applications",
    },
    {
      id: "7",
      question: "Do I need health insurance to study abroad?",
      answer:
        "Yes, most countries require international students to have health insurance. Some countries like Australia require Overseas Student Health Cover (OSHC), while others may accept private insurance. Check your destination country's specific requirements.",
      category: "Visa",
    },
    {
      id: "8",
      question: "How much money do I need to show for visa applications?",
      answer:
        "Financial requirements vary: USA (varies by program), UK (£1,334/month for London), Canada (CAD $10,000+ per year), Australia (AUD $21,041 per year), Germany (€11,208 per year). You'll need bank statements showing sufficient funds.",
      category: "Visa",
    },
    {
      id: "9",
      question: "Can I bring my family with me on a student visa?",
      answer:
        "Many countries allow dependents (spouse and children) on student visas, but requirements vary. You'll typically need to show additional financial support and may need separate visa applications for family members.",
      category: "Visa",
    },
    {
      id: "10",
      question: "What happens if my visa is rejected?",
      answer:
        "If your visa is rejected, you'll receive a rejection letter with reasons. You can reapply after addressing the issues, appeal the decision (if applicable), or seek guidance from our visa experts to improve your application.",
      category: "Visa",
    },
  ];
}

/**
 * Get FAQs by category
 */
export async function getFAQsByCategory(category: string): Promise<FAQ[]> {
  const all = await getFAQs();
  return all.filter((f) => f.category === category);
}
