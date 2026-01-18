"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";

interface Feature {
  name: string;
  description: string;
  image: string;
}

interface FeatureShowCaseProps {
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  {
    name: "Discover Your Ideal Academic Program",
    description:
      "Our intelligent course-matching platform analyzes thousands of programs worldwide, leveraging your unique academic preferences and career goals to identify the perfect educational path for your future.",
    image: "/features/step_1.png",
  },
  {
    name: "Compare Universities Using Comprehensive QS Rankings",
    description:
      "Evaluate institutions through customizable filters by geographic region or academic discipline, assessing critical performance indicators including academic reputation, graduate employability outcomes, and institutional sustainability commitments.",
    image: "/features/step_2.png",
  },
  {
    name: "Expert Guidance Throughout Your Application Journey",
    description:
      "Our experienced QS advisors have successfully facilitated over 13,000 university applications, providing personalized support from initial consultation through final enrollment in your chosen program.",
    image: "/features/step_3.png",
  },
  {
    name: "Connect Directly with University Representatives",
    description:
      "Engage with admissions staff and faculty members face-to-face at our international education events, enabling you to build meaningful connections and refine your university shortlist with confidence.",
    image: "/features/step_4.png",
  },
  {
    name: "Comprehensive Study Destination Resources",
    description:
      "Access detailed insights into student life at leading universities across the world's most vibrant cities, complemented by practical guidance on visa applications, accommodation searches, and cultural integration.",
    image: "/features/step_5.png",
  },
  {
    name: "Explore Scholarship and Funding Opportunities",
    description:
      "Discover how to access over US$111 million in available funding through QS scholarships and partner financial aid programs designed to support your educational aspirations.",
    image: "/features/step_6.png",
  },
];

export default function FeatureShowCase({
  features = defaultFeatures,
}: FeatureShowCaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Calculate progress indicator position based on scroll
  const progressPosition = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 1024);
      }
    };
    checkMobile();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const sections = containerRef.current.querySelectorAll(
        "[data-feature-section]"
      );
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  if (!features || features.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-background py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={containerRef} className="relative">
          {/* Sticky Progress Bar - Desktop Only */}
          {!isMobile && (
            <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-full -translate-x-1/2 lg:block">
              <div className="sticky top-1/2 flex h-screen -translate-y-1/2 items-center justify-center">
                <div className="relative h-[85vh] w-1.5">
                  {/* Background Track - Full Height */}
                  <div className="absolute top-0 left-0 h-full w-full bg-muted/60 rounded-full" />
                  {/* Progress Fill - Highlighted Bar */}
                  <motion.div
                    className="absolute top-0 left-0 h-full w-full origin-top bg-primary rounded-full shadow-lg"
                    style={{
                      scaleY: scrollYProgress,
                    }}
                  />
                  {/* Progress Indicator Circle - Highlighted */}
                  <motion.div
                    className="absolute left-1/2 z-20 h-9 w-9 -translate-x-1/2 rounded-full border-4 border-background bg-primary shadow-2xl ring-4 ring-primary/30"
                    style={{ top: progressPosition }}
                    animate={{
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Section Nodes */}
                  {features.map((_, index) => {
                    const nodePosition = `${
                      (index / (features.length - 1)) * 100
                    }%`;
                    const isNodeActive = activeIndex >= index;
                    return (
                      <motion.div
                        key={index}
                        className={`absolute left-1/2 z-10 h-6 w-6 -translate-x-1/2 rounded-full border-2 border-background shadow-lg transition-all ${
                          isNodeActive ? "bg-primary" : "bg-muted"
                        }`}
                        style={{ top: nodePosition }}
                        animate={{
                          scale: isNodeActive ? 1.4 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-32 lg:space-y-40">
            {features.map((feature, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={index} data-feature-section className="relative">
                  <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16">
                    {/* Illustration Column */}
                    <div
                      className={`flex items-center justify-center ${
                        isEven ? "lg:order-1" : "lg:order-3"
                      }`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative w-full max-w-md"
                      >
                        <div className="relative aspect-square w-full">
                          <Image
                            src={feature.image}
                            alt={feature.name}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Progress Bar Column - Desktop Only (Spacer for alignment) */}
                    {!isMobile && (
                      <div className="hidden lg:block lg:order-2" />
                    )}

                    {/* Content Card Column */}
                    <div
                      className={`flex items-center ${
                        isEven ? "lg:order-3" : "lg:order-1"
                      }`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="w-full rounded-2xl bg-muted p-10 shadow-md transition-all hover:shadow-xl lg:p-12"
                      >
                        <h3 className="mb-6 text-2xl font-bold leading-tight text-foreground lg:text-3xl xl:text-4xl">
                          {feature.name}
                        </h3>
                        <p className="mb-8 text-base leading-relaxed text-muted-foreground lg:text-lg xl:text-xl">
                          {feature.description}
                        </p>
                        <button className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg lg:text-lg">
                          <span>Learn More</span>
                          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
