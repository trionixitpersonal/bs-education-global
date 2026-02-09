import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabaseAdmin } from "@/lib/supabase/client";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const userId = (session.user as any).id;

    // First, get the document to find the file URL
    const { data: document } = await supabaseAdmin
      .from("documents")
      .select("file_url")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    // Delete from storage if file exists
    if (document?.file_url && document.file_url !== "placeholder-url") {
      const { error: storageError } = await supabaseAdmin.storage
        .from('documents')
        .remove([document.file_url]);
      
      if (storageError) {
        console.error("Error deleting file from storage:", storageError);
      }
    }

    // Delete from database
    const { error } = await supabaseAdmin
      .from("documents")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      console.error("Error deleting document:", error);
      return NextResponse.json(
        { error: error.message || "Failed to delete document" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to delete document:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete document" },
      { status: 500 }
    );
  }
}
