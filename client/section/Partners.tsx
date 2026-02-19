"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion, useScroll, useTransform } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface UniversityPartner {
  id: number;
  name: string;
  logo: string;
}

interface PartnersProps {
  universities?: UniversityPartner[];
}

const defaultUniversities: UniversityPartner[] = [
  { id: 1, name: "University of Bologna", logo: "/logos/university.jpeg" },
  {
    id: 2,
    name: "American University",
    logo: "/logos/university.jpeg",
  },
  { id: 3, name: "Audencia", logo: "/logos/university.jpeg" },
  { id: 4, name: "Cardiff University", logo: "/logos/university.jpeg" },
  { id: 5, name: "Chalmers", logo: "/logos/university.jpeg" },
  {
    id: 6,
    name: "Charles Darwin University",
    logo: "/logos/university.jpeg",
  },
  { id: 7, name: "Dalhousie University", logo: "/logos/university.jpeg" },
  { id: 8, name: "Deakin University", logo: "/logos/university.jpeg" },
  { id: 9, name: "University of Dundee", logo: "/logos/university.jpeg" },
  { id: 10, name: "EDHEC Business School", logo: "/logos/university.jpeg" },
  {
    id: 11,
    name: "Eindhoven University of Technology",
    logo: "/logos/university.jpeg",
  },
  {
    id: 12,
    name: "Erasmus University Rotterdam",
    logo: "/logos/university.jpeg",
  },
];

export default function Partners({
  universities = defaultUniversities,
}: PartnersProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [itemsPerSlide, setItemsPerSlide] = useState(12);
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Calculate items per slide based on viewport
  useEffect(() => {
    const calculateItemsPerSlide = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth >= 1024) {
          setItemsPerSlide(12); // 4 columns × 3 rows
        } else if (window.innerWidth >= 768) {
          setItemsPerSlide(9); // 3 columns × 3 rows
        } else {
          setItemsPerSlide(6); // 2 columns × 3 rows
        }
      }
    };

    calculateItemsPerSlide();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", calculateItemsPerSlide);
      return () => window.removeEventListener("resize", calculateItemsPerSlide);
    }
  }, []);

  // Split universities into slides
  const slides = [];
  for (let i = 0; i < universities.length; i += itemsPerSlide) {
    slides.push(universities.slice(i, i + itemsPerSlide));
  }

  // Ensure we have at least one slide
  if (slides.length === 0 && universities.length > 0) {
    slides.push(universities);
  }

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-gray-50 py-48 lg:py-64">
      <motion.div style={{ y, opacity }} className="container relative mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-32 text-center lg:mb-40"
        >
          <h2 className="text-4xl font-light leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Partner Universities
          </h2>
          <p className="mt-8 text-xl text-gray-600 font-light">
            650+ global institutions
          </p>
        </motion.div>

        {/* Logo Grid Carousel */}
        {slides.length > 0 && (
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={
                !isHovered
                  ? {
                      delay: 5000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                  : false
              }
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
              }}
              className="partners-swiper"
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 1,
                },
                1024: {
                  slidesPerView: 1,
                },
              }}
            >
              {slides.map((slideUniversities, slideIndex) => (
                <SwiperSlide key={slideIndex}>
                  <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
                    {slideUniversities.map((university) => (
                      <motion.div
                        key={university.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="relative flex h-40 items-center justify-center overflow-hidden bg-white p-8 transition-all hover:bg-gray-50 sm:h-44 lg:h-48"
                      >
                        <div className="relative h-full w-full">
                          <Image
                            src={university.logo}
                            alt={university.name}
                            fill
                            className="object-contain grayscale hover:grayscale-0 transition-all duration-500"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            loading="lazy"
                          />
                        </div>
                      </motion.div>
                    ))}
                    {/* Fill empty slots to maintain grid layout */}
                    {slideUniversities.length < itemsPerSlide &&
                      Array.from({
                        length: itemsPerSlide - slideUniversities.length,
                      }).map((_, index) => (
                        <div
                          key={`empty-${index}`}
                          className="h-40 sm:h-44 lg:h-48"
                          aria-hidden="true"
                        />
                      ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </motion.div>
    </section>
  );
}
