import HeroSection from "@/section/Hero";
import Partners from "@/section/Partners";
import FeatureShowCase from "@/section/FeatureShowCase";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <HeroSection />
      <FeatureShowCase />
      <Partners />
    </main>
  );
}
