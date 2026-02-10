import { notFound } from "next/navigation";
import { MapPin, Award, GraduationCap, DollarSign, Globe, Mail, Phone, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getUniversity(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/universities/${id}`,
      { cache: 'no-store' }
    );
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching university:", error);
    return null;
  }
}

async function getUniversityPrograms(universityId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/programs`,
      { cache: 'no-store' }
    );
    
    if (!response.ok) {
      return [];
    }
    
    const allPrograms = await response.json();
    return allPrograms.filter((program: any) => program.university_id === universityId);
  } catch (error) {
    console.error("Error fetching programs:", error);
    return [];
  }
}

export default async function UniversityDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const university = await getUniversity(id);
  
  if (!university) {
    notFound();
  }

  const programs = await getUniversityPrograms(id);

  return (
    <main className="w-full overflow-x-hidden bg-background pt-24 lg:pt-28">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-primary/10 to-background py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link 
              href="/find-universities"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              ← Back to Universities
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold text-primary">
                  #{university.ranking || 'N/A'}
                </span>
              </div>
              
              <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
                {university.name}
              </h1>
              
              <div className="mb-6 flex items-center gap-2 text-lg text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span>{university.city}, {university.country}</span>
              </div>

              <p className="text-lg leading-relaxed text-muted-foreground">
                {university.description}
              </p>
            </div>

            {/* Quick Info Card */}
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">Quick Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Tuition Range</p>
                    <p className="font-medium">{university?.tuition || university?.tuition_range || "Contact for details"}</p>
                  </div>
                </div>

                {university.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Website</p>
                      <a 
                        href={university.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                )}

                {university.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a 
                        href={`mailto:${university.email}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {university.email}
                      </a>
                    </div>
                  </div>
                )}

                {university.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{university.phone}</p>
                    </div>
                  </div>
                )}

                {university.founded && (
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Founded</p>
                      <p className="font-medium">{university.founded}</p>
                    </div>
                  </div>
                )}

                {university.total_students && (
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Students</p>
                      <p className="font-medium">{university.total_students?.toLocaleString()}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <Button asChild className="w-full">
                  <Link href="/support">Contact Admissions</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      {programs.length > 0 && (
        <section className="w-full py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Available Programs</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {programs.map((program: any) => (
                <div 
                  key={program.id}
                  className="rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {program.level}
                  </div>
                  
                  <h3 className="mb-2 text-xl font-semibold">{program.name}</h3>
                  
                  {program.description && (
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
                      {program.description}
                    </p>
                  )}

                  <div className="space-y-2 text-sm">
                    {program.duration && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{program.duration}</span>
                      </div>
                    )}
                    
                    {program.tuition_fees && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tuition:</span>
                        <span className="font-medium">{program.tuition_fees}</span>
                      </div>
                    )}

                    {program.intake && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Intake:</span>
                        <span className="font-medium">{program.intake}</span>
                      </div>
                    )}
                  </div>

                  {program.requirements && (
                    <div className="mt-4 border-t border-border pt-4">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Requirements:</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {program.requirements}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Additional Information */}
      {university.additional_info && (
        <section className="w-full bg-muted/30 py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-3xl font-bold">Additional Information</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground">{university.additional_info}</p>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="w-full bg-primary py-12 text-primary-foreground lg:py-16">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold">Ready to Apply?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
            Get personalized guidance on your application to {university.name}. 
            Our experts are here to help you every step of the way.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="/application-process">Application Process</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/support">Get Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
