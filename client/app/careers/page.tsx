import Image from "next/image";
import { Briefcase, GraduationCap, Users, Heart, Coffee, TrendingUp, MapPin, Clock, DollarSign } from "lucide-react";
import careersData from "@/lib/careers-data.json";

const iconMap: Record<string, any> = {
  Heart, GraduationCap, Coffee, TrendingUp, Users, DollarSign, Briefcase, MapPin, Clock
};

export default function CareersPage() {
  const { hero, benefits, positions } = careersData;

  const whyJoinUs = [
    {
      title: "Impact-Driven",
      description: "Every day, you'll help change students' lives by making education accessible"
    },
    {
      title: "Innovation",
      description: "We encourage creative thinking and new approaches to solving challenges"
    },
    {
      title: "Collaboration",
      description: "Work with talented professionals who are passionate about education"
    },
    {
      title: "Growth Mindset",
      description: "Continuous learning and development are at the core of our culture"
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl font-bold lg:text-6xl">
              {hero.title}
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 font-light">
              {hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Why Work With Us?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At BS Education Global, you'll be part of a dynamic team that's making a real 
                difference in students' lives. We've helped over 13,000 students achieve their 
                dreams of studying abroad, and we're looking for passionate individuals to join 
                our growing team.
              </p>
              <div className="space-y-4">
                {whyJoinUs.map((value, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                fill
                alt="Team collaboration"
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Comprehensive Benefits Package
            </h2>
            <p className="text-lg text-gray-600">
              We invest in our team's well-being and professional growth
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit: any, index: number) => {
              const Icon = iconMap[benefit.icon];
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <Icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Open Positions
            </h2>
            <p className="text-lg text-gray-600">
              Join our team and help shape the future of education
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {positions.map((position: any, index: number) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-blue-600 transition-colors">
                <div className="space-y-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          {position.department}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {position.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {position.type}
                        </div>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap">
                      Apply Now
                    </button>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {position.description}
                  </p>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Requirements:</h4>
                    <ul className="space-y-2">
                      {position.requirements.map((req: string, reqIndex: number) => (
                        <li key={reqIndex} className="flex gap-3 text-gray-600">
                          <span className="text-blue-600 font-bold">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-12 text-center text-white space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Don't See Your Perfect Role?
            </h2>
            <p className="text-xl text-blue-100">
              We're always looking for talented individuals. Send us your CV and we'll keep 
              you in mind for future opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:careers@bsedu.com"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Send Your CV
              </a>
              <a
                href="mailto:careers@bsedu.com"
                className="px-8 py-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors border border-white/20"
              >
                Contact HR Team
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
