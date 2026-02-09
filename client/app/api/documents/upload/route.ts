import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from('documents')
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Create document record in database
    const { data: documentData, error: dbError } = await supabaseAdmin
      .from("documents")
      .insert([
        {
          user_id: userId,
          name: name || file.name,
          type: type,
          file_size: file.size,
          file_url: fileName,
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      // Try to delete uploaded file if DB insert fails
      await supabaseAdmin.storage.from('documents').remove([fileName]);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json(documentData);
  } catch (error: any) {
    console.error("Failed to upload document:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload document" },
      { status: 500 }
    );
  }
}
