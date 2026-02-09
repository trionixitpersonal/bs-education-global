import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studyLevel, subject, location, session, email } = body;

    // Save the search query to database for admin tracking
    const { error: saveError } = await supabase
      .from("university_search_queries")
      .insert({
        study_level: studyLevel,
        subject,
        location,
        session,
        user_email: email || null,
      });

    if (saveError) {
      console.error("Error saving search query:", saveError);
    }

    // If subject is specified, filter universities by programs
    let universityIds: string[] = [];
    if (subject) {
      // Build program query
      let programQuery = supabase
        .from("programs")
        .select("university_id")
        .ilike("name", `%${subject}%`);
      
      // Filter by study level if provided
      if (studyLevel) {
        programQuery = programQuery.eq("level", studyLevel);
      }
      
      const { data: programs } = await programQuery;
      
      if (programs && programs.length > 0) {
        universityIds = [...new Set(programs.map(p => p.university_id).filter(Boolean))];
      }
    }

    // Search universities based on criteria
    let query = supabase
      .from("universities")
      .select("*")
      .order("ranking", { ascending: true });

    // Filter by location/country
    if (location && location !== "other") {
      query = query.eq("country", location);
    }

    // Filter by universities that have matching programs (only if we found some)
    if (subject && universityIds.length > 0) {
      query = query.in("id", universityIds);
    } else if (subject && universityIds.length === 0) {
      // If subject was specified but no programs found, return empty results
      return NextResponse.json({
        universities: [],
        matchCount: 0,
        searchCriteria: { studyLevel, subject, location, session },
      });
    }

    const { data: universities, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ universities: [], matchCount: 0 });
    }

    return NextResponse.json({
      universities: universities || [],
      matchCount: universities?.length || 0,
      searchCriteria: { studyLevel, subject, location, session },
    });
  } catch (error) {
    console.error("Error processing search:", error);
    return NextResponse.json({ universities: [], matchCount: 0 });
  }
}
