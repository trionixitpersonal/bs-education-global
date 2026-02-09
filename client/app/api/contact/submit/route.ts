import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/client";
import { uploadFileToStorage } from "@/lib/supabase/storage";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const type = formData.get("type") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const consultationType = formData.get("consultationType") as string;
    const reviewType = formData.get("reviewType") as string;
    const documentType = formData.get("documentType") as string;
    const country = formData.get("country") as string;
    const additionalInfo = formData.get("additionalInfo") as string;
    
    // Get files if any
    const files = formData.getAll("files") as File[];
    
    console.log("=== Contact Form Submission ===");
    console.log("Type:", type);
    console.log("Files received:", files.length);
    files.forEach((file, i) => {
      console.log(`File ${i + 1}:`, file.name, `(${file.size} bytes)`);
    });

    // Validate required fields
    if (!type || !name || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert submission into database first (without file URLs)
    const { data, error } = await supabaseAdmin
      .from("contact_submissions")
      .insert([
        {
          type,
          name,
          email,
          phone,
          subject,
          message,
          preferred_date: date,
          preferred_time: time,
          consultation_type: consultationType,
          review_type: reviewType,
          document_type: documentType,
          destination_country: country,
          additional_info: additionalInfo || message,
          status: "new",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error saving contact submission:", error);
      
      // Check for common database errors
      let errorMessage = "Failed to submit form. Please try again.";
      
      if (error.message?.includes("schema cache") || error.message?.includes("column")) {
        errorMessage = "Database configuration error. Please contact support.";
      } else if (error.message?.includes("not found")) {
        errorMessage = "Service temporarily unavailable. Please try again later.";
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }

    // Upload files if any
    const fileUrls: Array<{ name: string; url: string; path: string; size: number }> = [];
    
    console.log("Starting file upload process...");
    if (files && files.length > 0) {
      console.log(`Processing ${files.length} files...`);
      for (const file of files) {
        console.log(`Processing file: ${file.name}, size: ${file.size}`);
        if (file && file.size > 0) {
          const uploadResult = await uploadFileToStorage(file, data.id, type);
          console.log("Upload result:", uploadResult);
          if (uploadResult) {
            fileUrls.push({
              name: file.name,
              url: uploadResult.url,
              path: uploadResult.path,
              size: file.size,
            });
          } else {
            console.error(`Failed to upload file: ${file.name}`);
          }
        }
      }

      // Update submission with file URLs
      console.log("File URLs to save:", fileUrls);
      if (fileUrls.length > 0) {
        const { error: updateError } = await supabaseAdmin
          .from("contact_submissions")
          .update({ file_urls: fileUrls })
          .eq("id", data.id);
        
        if (updateError) {
          console.error("Error updating file URLs:", updateError);
        } else {
          console.log("Successfully updated submission with file URLs");
        }
      } else {
        console.warn("No files were successfully uploaded");
      }
    } else {
      console.log("No files to upload");
    }

    // TODO: Send email notification
    // const emailSettings = await getEmailSettings();
    // if (emailSettings?.is_active) {
    //   await sendEmailNotification(data, emailSettings);
    // }

    return NextResponse.json(
      { 
        success: true, 
        message: "Your submission has been received successfully!",
        id: data.id 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Failed to submit contact form:", error);
    
    // Provide user-friendly error message
    let errorMessage = "Failed to submit form. Please try again.";
    
    if (error.message?.includes("schema cache") || error.message?.includes("column")) {
      errorMessage = "Database configuration error. Please contact support.";
    } else if (error.message?.includes("JSON")) {
      errorMessage = "Invalid form data. Please check your input.";
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
