"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

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
    <section className="w-full bg-muted py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center lg:mb-20">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl xl:text-6xl">
            Over 650 global partner universities
          </h2>
          <p className="mt-4 text-lg text-muted-foreground lg:text-xl">
            Trusted by leading institutions worldwide
          </p>
        </div>

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
                  <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                    {slideUniversities.map((university) => (
                      <div
                        key={university.id}
                        className="group flex h-36 items-center justify-center rounded-xl border-2 border-border bg-card p-6 shadow-sm transition-all hover:border-primary hover:shadow-lg sm:h-40 lg:h-44"
                      >
                        <div className="relative h-full w-full">
                          <Image
                            src={university.logo}
                            alt={university.name}
                            fill
                            className="object-contain transition-transform group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    ))}
                    {/* Fill empty slots to maintain grid layout */}
                    {slideUniversities.length < itemsPerSlide &&
                      Array.from({
                        length: itemsPerSlide - slideUniversities.length,
                      }).map((_, index) => (
                        <div
                          key={`empty-${index}`}
                          className="h-36 sm:h-40 lg:h-44"
                          aria-hidden="true"
                        />
                      ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}
