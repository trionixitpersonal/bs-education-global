import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";

const interviewPreparationData = [
  {
    category: "General Preparation",
    title: "Essential Interview Tips",
    icon: "💡",
    common_questions: [
      "Why do you want to study in [country]?",
      "Why did you choose this university?",
      "What are your career goals?",
      "How will you finance your education?",
      "Do you plan to return to your home country after graduation?",
      "What will you do if your visa is rejected?",
    ],
    dos: [
      "Dress professionally and appropriately",
      "Arrive 15-30 minutes early",
      "Bring all required documents organized in a folder",
      "Be honest and consistent in your answers",
      "Maintain eye contact and speak clearly",
      "Show enthusiasm about your studies",
      "Demonstrate strong ties to your home country",
      "Prepare specific examples and details",
    ],
    donts: [
      "Don't memorize answers - sound natural",
      "Don't provide inconsistent information",
      "Don't mention immigration or work as primary goal",
      "Don't be vague about your plans",
      "Don't argue with the visa officer",
      "Don't bring unnecessary items",
      "Don't show nervousness or lack of confidence",
      "Don't give one-word answers",
    ],
    preparation_tips: [
      "Research the university and program thoroughly",
      "Practice answering common questions with friends or family",
      "Prepare a clear study plan and career roadmap",
      "Review all application documents before interview",
      "Know exact costs and funding sources",
      "Understand visa requirements and regulations",
      "Prepare questions to ask if given the opportunity",
      "Record yourself practicing to improve delivery",
    ],
    sample_answers: [
      "I chose this university because of its excellent reputation in [field], state-of-the-art facilities, and strong industry connections. The program curriculum aligns perfectly with my career goals of becoming a [profession].",
      "I plan to return home after graduation because my family business needs someone with international expertise in [field]. Additionally, the skills I gain will be highly valuable in my country's growing [industry] sector.",
    ],
  },
  {
    category: "Financial Questions",
    title: "Funding and Finance Preparation",
    icon: "💰",
    common_questions: [
      "How will you pay for your tuition?",
      "Who is sponsoring your education?",
      "What is your sponsor's annual income?",
      "Do you have any scholarships?",
      "How will you cover living expenses?",
      "What are your plans if you run out of money?",
    ],
    dos: [
      "Know exact amounts for tuition and living costs",
      "Bring bank statements and financial documents",
      "Understand your sponsor's financial situation",
      "Mention scholarships or financial aid clearly",
      "Show evidence of liquid funds",
      "Explain any loans or payment plans",
      "Demonstrate financial stability",
    ],
    donts: [
      "Don't be vague about funding sources",
      "Don't exaggerate your financial capacity",
      "Don't rely solely on future income plans",
      "Don't show insufficient funds",
      "Don't forget to include living expenses",
      "Don't present unverified financial documents",
    ],
    preparation_tips: [
      "Calculate total costs (tuition + living + travel + insurance)",
      "Organize financial documents chronologically",
      "Prepare explanation for any large deposits",
      "Know currency conversion rates",
      "Understand sponsor's occupation and income source",
      "Have backup funding options ready to explain",
    ],
    sample_answers: [
      "My total expenses will be approximately $50,000 per year including tuition and living costs. My father, who owns a successful business with annual revenue of $200,000, will sponsor my education. We have already deposited $60,000 in my account for the first year, as shown in these bank statements.",
      "I have been awarded a $15,000 annual scholarship from the university, which covers 50% of tuition. The remaining amount will be covered by my family's savings, which total $80,000 as documented in our bank statements from the past 6 months.",
    ],
  },
  {
    category: "Academic Background",
    title: "Educational History Questions",
    icon: "📚",
    common_questions: [
      "Why did you choose this field of study?",
      "What was your previous academic background?",
      "Why do you have gaps in your education?",
      "How does this program relate to your previous studies?",
      "What are your academic strengths?",
      "Why didn't you choose a university in your home country?",
    ],
    dos: [
      "Explain clear progression in your academic path",
      "Connect previous studies to chosen program",
      "Demonstrate genuine interest in the field",
      "Address any gaps honestly",
      "Highlight relevant achievements",
      "Show how program fits career goals",
    ],
    donts: [
      "Don't bad-mouth previous institutions",
      "Don't give illogical reasons for field change",
      "Don't ignore academic weaknesses",
      "Don't claim false achievements",
      "Don't show uncertainty about your choice",
    ],
    preparation_tips: [
      "Review your academic transcripts",
      "Prepare explanations for low grades or gaps",
      "Research the program curriculum thoroughly",
      "Connect past experiences to future goals",
      "Identify specific courses or faculty that interest you",
    ],
    sample_answers: [
      "I completed my Bachelor's in Computer Science where I developed strong programming skills. During my final year project on AI applications, I realized my passion for machine learning. This Master's program offers advanced courses in deep learning and neural networks, which will help me achieve my goal of working in AI research.",
    ],
  },
  {
    category: "Post-Study Plans",
    title: "Future Goals and Intentions",
    icon: "🎯",
    common_questions: [
      "What are your plans after graduation?",
      "Why will you return to your home country?",
      "Do you have any relatives in [destination country]?",
      "What job opportunities exist for you back home?",
      "Have you applied for permanent residence?",
      "Do you plan to work in [destination country]?",
    ],
    dos: [
      "Emphasize strong ties to home country",
      "Mention family, property, or business connections",
      "Explain specific career opportunities at home",
      "Show how degree benefits home country career",
      "Be honest about temporary work plans (OPT/PGWP)",
      "Demonstrate intention to return",
    ],
    donts: [
      "Don't express desire to immigrate",
      "Don't be vague about return plans",
      "Don't ignore family ties at home",
      "Don't focus only on staying abroad",
      "Don't contradict previous statements",
    ],
    preparation_tips: [
      "Research job market in home country",
      "Identify specific companies or roles",
      "Prepare examples of family/property ties",
      "Understand temporary work permit options",
      "Plan realistic timeline for return",
    ],
    sample_answers: [
      "After graduation, I plan to return to my home country where the [industry] sector is rapidly growing. My family owns a business in this field, and they need someone with international expertise. The skills and knowledge I gain will help me expand our business and contribute to the industry's development back home.",
    ],
  },
  {
    category: "Cultural Adaptation",
    title: "Living Abroad Preparation",
    icon: "🌍",
    common_questions: [
      "How will you adapt to a different culture?",
      "Have you traveled abroad before?",
      "Do you have friends or family in [destination country]?",
      "How will you handle homesickness?",
      "What do you know about [destination country/city]?",
      "Are you prepared for the weather/climate?",
    ],
    dos: [
      "Show research about destination culture",
      "Demonstrate adaptability with examples",
      "Express enthusiasm about cultural experience",
      "Mention any previous travel experience",
      "Show awareness of challenges",
      "Explain support systems (university, friends)",
    ],
    donts: [
      "Don't appear unprepared for challenges",
      "Don't show dependency on others abroad",
      "Don't ignore cultural differences",
      "Don't seem unwilling to adapt",
    ],
    preparation_tips: [
      "Research destination city and culture",
      "Learn about university support services",
      "Connect with current students online",
      "Understand visa work restrictions",
      "Prepare for climate and lifestyle differences",
    ],
    sample_answers: [
      "I've researched extensively about life in [city] and I'm excited about experiencing a new culture. I've joined online forums with current international students and learned about university support services. My previous experience studying in [another city] taught me how to adapt quickly to new environments and build a support network.",
    ],
  },
];

export async function POST() {
  try {
    console.log("Starting interview preparation seeding...");

    // Delete all existing interview preparation
    const { error: deleteError } = await supabaseAdmin
      .from("interview_preparation")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    if (deleteError) {
      console.error("Error deleting existing interview preparation:", deleteError);
      throw deleteError;
    }

    // Insert new interview preparation
    const { data, error: insertError } = await supabaseAdmin
      .from("interview_preparation")
      .insert(interviewPreparationData)
      .select();

    if (insertError) {
      console.error("Error inserting interview preparation:", insertError);
      throw insertError;
    }

    console.log(`Successfully inserted ${data?.length || 0} interview preparation guides`);

    return NextResponse.json({
      success: true,
      message: `Successfully inserted ${data?.length || 0} interview preparation guides`,
      count: data?.length || 0,
    });
  } catch (error) {
    console.error("Interview preparation seeding failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed interview preparation" },
      { status: 500 }
    );
  }
}
