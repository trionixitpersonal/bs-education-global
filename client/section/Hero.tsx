import { CircleCheck } from "lucide-react";
import Image from "next/image";

import FinduniversityForm from "@/components/ui/FinduniversityForm";

export default function HeroSection() {
  return (
    <section className="w-full bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 py-16 md:flex-row md:gap-16 md:py-20 lg:gap-20 lg:py-28">
          {/* Text Content */}
          <div className="flex flex-1 flex-col gap-8 text-center md:text-left">
            <div className="space-y-6">
              <h1 className="scroll-m-20 text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl lg:leading-[1.1]">
                Connect with your dream{" "}
                <span className="text-accent">
                  Australian university
                </span>{" "}
                today
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-2xl">
                Your pathway to world-class education starts here. Get expert
                guidance and personalized support for your academic journey.
              </p>
            </div>
            <ul className="flex flex-col gap-5 sm:gap-6">
              <li className="flex items-start gap-4">
                <CircleCheck className="mt-0.5 h-7 w-7 flex-shrink-0 text-accent" />
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
                  Get personalised <strong className="font-semibold text-primary-foreground">admission support</strong> for the
                  top universities.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <CircleCheck className="mt-0.5 h-7 w-7 flex-shrink-0 text-accent" />
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
                  Get academic details from universities in just a{" "}
                  <strong className="font-semibold text-primary-foreground">few clicks</strong>.
                </p>
              </li>
            </ul>
            <div className="mt-4">
              <FinduniversityForm />
            </div>
          </div>
          {/* Image Section */}
          <div className="flex flex-1 items-center justify-center">
            <div className="relative w-full max-w-lg lg:max-w-xl">
              <Image
                src={"/banner/hero_banner.png"}
                width={800}
                height={800}
                alt="A boy exploring world"
                className="h-auto w-full rounded-xl object-contain shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
