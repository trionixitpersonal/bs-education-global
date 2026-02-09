"use client";

import { useState, useEffect } from "react";
import { Upload, FileText, Trash2, Download, Eye, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

interface Document {
  id: string;
  name: string;
  type: "passport" | "transcript" | "resume" | "letter" | "certificate" | "other";
  file_url: string;
  file_size: number;
  uploaded_at: string;
}

export default function DocumentsPage() {
  const { data: session } = useSession();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "other",
    file: null as File | null,
  });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch("/api/documents");
      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
      }
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) {
      alert("Please select a file to upload");
      return;
    }

    if (!session?.user) {
      alert("You must be logged in to upload files");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      setUploadProgress(30);

      // Create FormData for file upload
      const uploadFormData = new FormData();
      uploadFormData.append("file", formData.file);
      uploadFormData.append("name", formData.name || formData.file.name);
      uploadFormData.append("type", formData.type);

      setUploadProgress(50);

      // Upload via API endpoint
      const response = await fetch("/api/documents/upload", {
        method: "POST",
        body: uploadFormData,
      });

      setUploadProgress(80);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to upload document");
      }

      setUploadProgress(100);
      await fetchDocuments();
      setShowUploadDialog(false);
      setFormData({ name: "", type: "other", file: null });
      alert("Document uploaded successfully!");
    } catch (error: any) {
      console.error("Failed to upload document:", error);
      alert(`Failed to upload document: ${error.message}`);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id: string, fileUrl: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return;

    try {
      // Delete via API (handles both storage and database)
      const response = await fetch(`/api/documents/${id}`, { method: "DELETE" });
      if (response.ok) {
        await fetchDocuments();
        alert("Document deleted successfully!");
      } else {
        throw new Error("Failed to delete document");
      }
    } catch (error) {
      console.error("Failed to delete document:", error);
      alert("Failed to delete document. Please try again.");
    }
  };

  const handleView = async (documentId: string, fileName: string) => {
    try {
      const response = await fetch(`/api/documents/${documentId}/view`);
      if (!response.ok) {
        throw new Error("Failed to get document URL");
      }
      
      const data = await response.json();
      if (data.signedUrl) {
        window.open(data.signedUrl, '_blank');
      }
    } catch (error) {
      console.error("Error viewing document:", error);
      alert("Failed to view document. Please try again.");
    }
  };

  const handleDownload = async (documentId: string, fileName: string) => {
    try {
      const response = await fetch(`/api/documents/${documentId}/view`);
      if (!response.ok) {
        throw new Error("Failed to get document URL");
      }
      
      const data = await response.json();
      if (data.signedUrl) {
        // Fetch the file from the signed URL
        const fileResponse = await fetch(data.signedUrl);
        const blob = await fileResponse.blob();
        
        // Create download link
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error downloading document:", error);
      alert("Failed to download document. Please try again.");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getDocumentIcon = (type: string) => {
    return FileText;
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Documents</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage and organize your application documents</p>
        </div>
        <Button onClick={() => setShowUploadDialog(true)} className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Info Banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-800">
          <strong>✓ Storage Active:</strong> Files are securely stored in Supabase Storage. You can view and download them anytime.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : filteredDocuments.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 rounded-full p-4">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchQuery ? "No Documents Found" : "No Documents Yet"}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchQuery
              ? "No documents match your search."
              : "Upload your documents to keep them organized and easily accessible."}
          </p>
          {!searchQuery && (
            <Button onClick={() => setShowUploadDialog(true)} className="bg-blue-600 hover:bg-blue-700">
              <Upload className="h-4 w-4 mr-2" />
              Upload Your First Document
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((doc) => {
            const Icon = getDocumentIcon(doc.type);
            return (
              <div key={doc.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                    {doc.type.toUpperCase()}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 truncate">{doc.name}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {formatFileSize(doc.file_size)} • {new Date(doc.uploaded_at).toLocaleDateString()}
                </p>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleView(doc.id, doc.name)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(doc.id, doc.name)}
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(doc.id, doc.file_url)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Dialog */}
      {showUploadDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Upload Document</h2>
            <form onSubmit={handleUpload} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Document Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="passport">Passport</option>
                  <option value="transcript">Transcript</option>
                  <option value="resume">Resume/CV</option>
                  <option value="letter">Letter of Recommendation</option>
                  <option value="certificate">Certificate</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Document Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Optional - will use file name if empty"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  File *
                </label>
                <input
                  type="file"
                  required
                  onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supported: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                </p>
                {isUploading && uploadProgress > 0 && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Uploading... {uploadProgress}%</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowUploadDialog(false)}
                  disabled={isUploading}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto" disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
