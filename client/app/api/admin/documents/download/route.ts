import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabaseAdmin } from "@/lib/supabase/client";
import JSZip from "jszip";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as any).role;
    
    // Only admins can download documents
    if (!['admin', 'super_admin'].includes(userRole)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { documentIds, userId } = body;

    if (!documentIds || documentIds.length === 0) {
      return NextResponse.json({ error: "No documents specified" }, { status: 400 });
    }

    // Fetch document records
    const { data: documents, error: dbError } = await supabaseAdmin
      .from("documents")
      .select("*")
      .in("id", documentIds)
      .eq("user_id", userId);

    if (dbError || !documents || documents.length === 0) {
      return NextResponse.json({ error: "Documents not found" }, { status: 404 });
    }

    // If single document, return direct download URL
    if (documents.length === 1) {
      const doc = documents[0];
      if (!doc.file_url || doc.file_url === "placeholder-url") {
        return NextResponse.json({ error: "File not available" }, { status: 404 });
      }

      const { data, error } = await supabaseAdmin.storage
        .from('documents')
        .createSignedUrl(doc.file_url, 60);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ 
        type: 'single',
        signedUrl: data.signedUrl,
        fileName: doc.name 
      });
    }

    // Multiple documents - create zip file
    const zip = new JSZip();
    
    for (const doc of documents) {
      if (doc.file_url && doc.file_url !== "placeholder-url") {
        try {
          const { data: fileData, error: downloadError } = await supabaseAdmin.storage
            .from('documents')
            .download(doc.file_url);

          if (!downloadError && fileData) {
            const buffer = await fileData.arrayBuffer();
            zip.file(doc.name, buffer);
          }
        } catch (err) {
          console.error(`Error downloading ${doc.name}:`, err);
        }
      }
    }

    // Generate zip file
    const zipBlob = await zip.generateAsync({ type: "nodebuffer" });
    
    return new NextResponse(zipBlob, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="documents.zip"'
      }
    });
  } catch (error: any) {
    console.error("Failed to download documents:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
