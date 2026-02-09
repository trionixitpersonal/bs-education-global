import { supabaseAdmin } from "./client";

export async function uploadFileToStorage(
  file: File,
  submissionId: string,
  folderType: string
): Promise<{ url: string; path: string } | null> {
  try {
    console.log(`[Storage] Uploading file: ${file.name} (${file.size} bytes) to ${folderType}/${submissionId}`);
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${folderType}/${submissionId}/${fileName}`;

    console.log(`[Storage] File path: ${filePath}`);

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log(`[Storage] Buffer created, size: ${buffer.length} bytes`);

    const { data, error } = await supabaseAdmin.storage
      .from('contact-attachments')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error('[Storage] Error uploading file:', error);
      console.error('[Storage] Error details:', JSON.stringify(error, null, 2));
      return null;
    }

    console.log('[Storage] Upload successful:', data);

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('contact-attachments')
      .getPublicUrl(filePath);

    console.log('[Storage] Public URL:', publicUrl);

    return {
      url: publicUrl,
      path: filePath,
    };
  } catch (error) {
    console.error('[Storage] Error in uploadFileToStorage:', error);
    return null;
  }
}

export async function deleteFileFromStorage(filePath: string): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin.storage
      .from('contact-attachments')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting file:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteFileFromStorage:', error);
    return false;
  }
}
