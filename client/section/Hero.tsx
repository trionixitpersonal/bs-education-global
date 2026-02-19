"use client";

import { CircleCheck } from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

import FinduniversityForm from "@/components/ui/FinduniversityForm";

const backgroundImages = [
  {
    src: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80",
    alt: "Students graduating with diplomas"
  },
  {
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80",
    alt: "Students collaborating in classroom"
  },
  {
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920&q=80",
    alt: "Students studying with laptops"
  },
  {
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1920&q=80",
    alt: "University lecture hall"
  }
];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden min-h-screen flex items-center">
      {/* Background Image Slider with Parallax */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0 bg-black"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="absolute inset-0"
          >
            <Image
              src={backgroundImages[currentSlide].src}
              fill
              alt={backgroundImages[currentSlide].alt}
              className="object-cover blur-[2px]"
              priority
              unoptimized
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <motion.div 
          style={{ y, opacity }}
          className="flex flex-col items-center gap-16 py-16 md:flex-row md:items-center md:justify-between md:gap-20 lg:gap-24 lg:py-24 min-h-screen"
        >
          {/* Text Content - Left Side */}
          <div className="flex flex-1 flex-col gap-12 text-center md:text-left max-w-2xl">
            <div className="space-y-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl tracking-tight"
              >
                Connect with your dream{" "}
                <span className="font-bold text-blue-600">
                  Australian university
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-xl leading-relaxed text-white/90 font-light"
              >
                Your pathway to world-class education starts here.
              </motion.p>
            </div>
            <motion.ul 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col gap-5"
            >
              <li className="flex items-start gap-4">
                <CircleCheck className="h-5 w-5 flex-shrink-0 text-blue-600 mt-1" strokeWidth={1.5} />
                <p className="text-lg leading-relaxed text-white/90 font-light">
                  Personalized admission support
                </p>
              </li>
              <li className="flex items-start gap-4">
                <CircleCheck className="h-5 w-5 flex-shrink-0 text-blue-600 mt-1" strokeWidth={1.5} />
                <p className="text-lg leading-relaxed text-white/90 font-light">
                  Academic details in just a few clicks
                </p>
              </li>
            </motion.ul>
          </div>
          
          {/* Find University Form - Right Side */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="w-full flex-1 max-w-2xl"
          >
            <FinduniversityForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
