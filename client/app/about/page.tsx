import Image from "next/image";
import { Users, Award, Globe, Heart, Target, Lightbulb, Shield, TrendingUp, Coffee, GraduationCap, DollarSign } from "lucide-react";
import aboutData from "@/lib/about-data.json";

const iconMap: Record<string, any> = {
  Users, Award, Globe, Heart, Target, Lightbulb, Shield, TrendingUp, Coffee, GraduationCap, DollarSign
};

export default function AboutPage() {
  const { hero, stats, mission, values, services, team } = aboutData;

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

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 border-b">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat: any, index: number) => {
              const Icon = iconMap[stat.icon];
              return (
                <div key={index} className="text-center space-y-3">
                  <Icon className="w-10 h-10 mx-auto text-blue-600" />
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {mission.title}
              </h2>
              {mission.description.split('\n\n').map((paragraph: string, index: number) => (
                <p key={index} className="text-lg text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                fill
                alt="Students collaborating"
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value: any, index: number) => {
              const Icon = iconMap[value.icon];
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <Icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              What We Offer
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive support throughout your educational journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service: any, index: number) => (
              <div key={index} className="bg-white border border-gray-200 p-8 rounded-xl hover:border-blue-600 hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Meet Our Leadership Team
            </h2>
            <p className="text-lg text-gray-600">
              Experienced professionals dedicated to your success
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    fill
                    alt={member.name}
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-medium">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="max: any, index: numbermx-auto text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-blue-100">
              Join thousands of successful students who trusted us with their educational dreams
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/find-universities"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Find Your University
              </a>
              <a
                href="/support"
                className="px-8 py-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors border border-white/20"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
