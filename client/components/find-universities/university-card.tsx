import { University } from "@/lib/mock-data/types";
import { Button } from "@/components/ui/button";
import { MapPin, Award, GraduationCap, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";

interface UniversityCardProps {
  university: University;
}

// Default university images by country
const getUniversityImage = (country: string) => {
  const images: { [key: string]: string } = {
    "Australia": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    "United Kingdom": "https://images.unsplash.com/photo-1520637836993-a071674ec67b?auto=format&fit=crop&w=800&q=80",
    "United States": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
    "Canada": "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80",
    "Germany": "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800&q=80",
    "default": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"
  };
  return images[country] || images.default;
};

export function UniversityCard({ university }: UniversityCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600">
        <img
          src={getUniversityImage(university.country)}
          alt={university.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Ranking Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 shadow-lg">
          <Award className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-bold text-gray-900">#{university.ranking}</span>
        </div>

        {/* Country Badge */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 shadow-lg">
          <MapPin className="h-3.5 w-3.5 text-blue-600" />
          <span className="text-xs font-medium text-gray-900">{university.city}, {university.country}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-6">
        {/* University Name */}
        <h3 className="mb-3 text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {university.name}
        </h3>

        {/* Description */}
        <p className="mb-4 text-sm text-gray-600 line-clamp-2 flex-grow">
          {university.description}
        </p>

        {/* Tuition */}
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
          <DollarSign className="h-4 w-4 text-green-600" />
          <span className="text-xs text-gray-600">Tuition:</span>
          <span className="text-sm font-semibold text-gray-900">{// @ts-ignore
university.tuition || university?.tuition_range || "Contact for details"}</span>
        </div>

        {/* Programs */}
        {university.programs && university.programs.length > 0 && (
          <div className="mb-4">
            <div className="mb-2 flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-semibold text-gray-700">Popular Programs</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {university.programs.slice(0, 2).map((program, idx) => (
                <span
                  key={idx}
                  className="inline-block rounded-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 border border-blue-100"
                >
                  {program}
                </span>
              ))}
              {university.programs.length > 2 && (
                <span className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 border border-gray-200">
                  +{university.programs.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <Button asChild className="mt-auto w-full group/btn bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          <Link href={`/find-universities/${university.id}`} className="flex items-center justify-center gap-2">
            View Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}