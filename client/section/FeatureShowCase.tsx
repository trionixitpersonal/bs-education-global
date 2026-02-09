"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Feature {
  name: string;
  description: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
}

interface FeatureShowCaseProps {
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  {
    name: "Discover Your Ideal Academic Program",
    description:
      "Our intelligent course-matching platform analyzes thousands of programs worldwide, leveraging your unique academic preferences and career goals to identify the perfect educational path for your future.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Find Your Program",
    ctaLink: "/find-universities",
  },
  {
    name: "Compare Universities Using Comprehensive QS Rankings",
    description:
      "Evaluate institutions through customizable filters by geographic region or academic discipline, assessing critical performance indicators including academic reputation, graduate employability outcomes, and institutional sustainability commitments.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80",
    ctaText: "View QS Rankings",
    ctaLink: "/qs-rankings",
  },
  {
    name: "Expert Guidance Throughout Your Application Journey",
    description:
      "Our experienced QS advisors have successfully facilitated over 13,000 university applications, providing personalized support from initial consultation through final enrollment in your chosen program.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Start Your Application",
    ctaLink: "/application-process",
  },
  {
    name: "Connect Directly with University Representatives",
    description:
      "Engage with admissions staff and faculty members face-to-face at our international education events, enabling you to build meaningful connections and refine your university shortlist with confidence.",
    image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Get Support",
    ctaLink: "/support",
  },
  {
    name: "Comprehensive Study Destination Resources",
    description:
      "Access detailed insights into student life at leading universities across the world's most vibrant cities, complemented by practical guidance on visa applications, accommodation searches, and cultural integration.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Explore Destinations",
    ctaLink: "/study-destinations",
  },
  {
    name: "Explore Scholarship and Funding Opportunities",
    description:
      "Discover how to access over US$111 million in available funding through QS scholarships and partner financial aid programs designed to support your educational aspirations.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Browse Scholarships",
    ctaLink: "/scholarships",
  },
];

export default function FeatureShowCase({
  features = defaultFeatures,
}: FeatureShowCaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  if (!features || features.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white py-48 lg:py-64">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div ref={containerRef} className="relative">
          <div className="space-y-48 lg:space-y-64">
            {features.map((feature, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={index} data-feature-section className="relative">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-32"
                  >
                    {/* Image Column - Background Style */}
                    <div
                      className={`flex items-center justify-center ${
                        isEven ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="relative w-full h-[400px] lg:h-[500px]"
                      >
                        <div className="relative w-full h-full overflow-hidden rounded-lg">
                          <Image
                            src={feature.image}
                            alt={feature.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Content Column */}
                    <div
                      className={`flex items-center ${
                        isEven ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full space-y-8 max-w-xl"
                      >
                        <div className="space-y-6">
                          <div className="text-sm font-light tracking-widest text-gray-400 uppercase">
                            Step {index + 1}
                          </div>
                          <h3 className="text-3xl font-light leading-tight text-gray-900 lg:text-4xl">
                            {feature.name}
                          </h3>
                          <p className="text-lg leading-relaxed text-gray-600 font-light">
                            {feature.description}
                          </p>
                          {feature.ctaText && feature.ctaLink && (
                            <Link
                              href={feature.ctaLink}
                              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 group"
                            >
                              {feature.ctaText}
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
