"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Building2, BookOpen, Calendar, Clock, CheckCircle, XCircle, Loader2, User, FileText, Download, Eye, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Application {
  id: string;
  user_id: string;
  university_name: string;
  program_name: string;
  program_level: string;
  intake: string;
  status: "draft" | "submitted" | "under_review" | "accepted" | "rejected";
  submitted_at?: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    full_name: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
  };
}

interface Document {
  id: string;
  name: string;
  type: string;
  file_size: number;
  uploaded_at: string;
  file_url: string;
}

export default function AdminApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [application, setApplication] = useState<Application | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    fetchApplication();
  }, []);

  const fetchApplication = async () => {
    try {
      const response = await fetch(`/api/admin/applications/${params.id}/detail`);
      if (response.ok) {
        const data = await response.json();
        setApplication(data);
        // Fetch documents for this user
        if (data.user_id) {
          fetchDocuments(data.user_id);
        }
      } else {
        alert("Application not found");
        router.push("/admin/dashboard/applications");
      }
    } catch (error) {
      console.error("Failed to fetch application:", error);
      alert("Failed to load application");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDocuments = async (userId: string) => {
    try {
      console.log("Fetching documents for user:", userId);
      const response = await fetch(`/api/admin/documents/${userId}`);
      console.log("Documents fetch response status:", response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Documents fetched:", data.length, "documents");
        setDocuments(data);
      } else {
        const error = await response.json();
        console.error("Failed to fetch documents:", error);
      }
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/applications/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        await fetchApplication();
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status");
    }
  };

  const handleDownloadSingle = async (documentId: string, fileName: string) => {
    if (!application) return;
    
    setIsDownloading(true);
    try {
      const response = await fetch('/api/admin/documents/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentIds: [documentId], userId: application.user_id })
      });

      if (!response.ok) throw new Error('Download failed');

      const data = await response.json();
      if (data.signedUrl) {
        window.open(data.signedUrl, '_blank');
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download document');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadBulk = async () => {
    if (!application || selectedDocs.length === 0) {
      alert('Please select documents to download');
      return;
    }
    
    setIsDownloading(true);
    try {
      const response = await fetch('/api/admin/documents/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentIds: selectedDocs, userId: application.user_id })
      });

      if (!response.ok) throw new Error('Download failed');

      const contentType = response.headers.get('content-type');
      
      if (contentType?.includes('application/zip')) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${application.profiles?.full_name || 'student'}_documents.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        const data = await response.json();
        if (data.signedUrl) {
          window.open(data.signedUrl, '_blank');
        }
      }
      
      setSelectedDocs([]);
    } catch (error) {
      console.error('Bulk download error:', error);
      alert('Failed to download documents');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadAll = async () => {
    if (!application || documents.length === 0) {
      alert('No documents available');
      return;
    }
    
    const allDocIds = documents.map(doc => doc.id);
    setIsDownloading(true);
    try {
      const response = await fetch('/api/admin/documents/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentIds: allDocIds, userId: application.user_id })
      });

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${application.profiles?.full_name || 'student'}_all_documents.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download all error:', error);
      alert('Failed to download all documents');
    } finally {
      setIsDownloading(false);
    }
  };

  const toggleDocSelection = (docId: string) => {
    setSelectedDocs(prev => 
      prev.includes(docId) ? prev.filter(id => id !== docId) : [...prev, docId]
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      draft: { color: "bg-gray-100 text-gray-700 border-gray-300", icon: Clock, label: "Draft" },
      submitted: { color: "bg-blue-100 text-blue-700 border-blue-300", icon: Clock, label: "Submitted" },
      under_review: { color: "bg-yellow-100 text-yellow-700 border-yellow-300", icon: Clock, label: "Under Review" },
      accepted: { color: "bg-green-100 text-green-700 border-green-300", icon: CheckCircle, label: "Accepted" },
      rejected: { color: "bg-red-100 text-red-700 border-red-300", icon: XCircle, label: "Rejected" },
    };

    const badge = badges[status as keyof typeof badges] || badges.draft;
    const Icon = badge.icon;

    return (
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${badge.color}`}>
        <Icon className="h-5 w-5" />
        <span className="font-medium">{badge.label}</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!application) {
    return null;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => router.push("/admin/dashboard/applications")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Applications
        </Button>
      </div>

      {/* Application Details Card */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Application Details</h1>
            <p className="text-gray-600">Application ID: {application.id.slice(0, 8)}...</p>
          </div>
          <div className="flex items-center gap-3">
            {getStatusBadge(application.status)}
            <select
              value={application.status}
              onChange={(e) => handleStatusUpdate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student Information */}
          <div className="space-y-4 md:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Student Information
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Full Name</label>
                <p className="text-gray-900 font-medium">{application.profiles?.full_name || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900">{application.profiles?.email || "N/A"}</p>
              </div>
              {application.profiles?.phone && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-gray-900">{application.profiles.phone}</p>
                </div>
              )}
              {application.profiles?.city && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <p className="text-gray-900">
                    {application.profiles.city}, {application.profiles.country}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* University Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              University Information
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">University Name</label>
                <p className="text-gray-900 font-medium">{application.university_name}</p>
              </div>
            </div>
          </div>

          {/* Program Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Program Information
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Program Name</label>
                <p className="text-gray-900 font-medium">{application.program_name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Program Level</label>
                <p className="text-gray-900">{application.program_level}</p>
              </div>
            </div>
          </div>

          {/* Intake & Timeline */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Intake & Timeline
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Intake Period</label>
                <p className="text-gray-900">{application.intake || "Not specified"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Application Created</label>
                <p className="text-gray-900">{new Date(application.created_at).toLocaleString()}</p>
              </div>
              {application.submitted_at && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Submitted On</label>
                  <p className="text-gray-900">{new Date(application.submitted_at).toLocaleString()}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-500">Last Updated</label>
                <p className="text-gray-900">{new Date(application.updated_at).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Status Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Application Status
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Current Status</label>
                <p className="text-gray-900 font-medium capitalize">
                  {application.status.replace("_", " ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              Student Documents
            </h2>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {documents.length} {documents.length === 1 ? 'Document' : 'Documents'}
            </span>
          </div>
          <div className="flex gap-2">
            {selectedDocs.length > 0 && (
              <Button
                onClick={handleDownloadBulk}
                disabled={isDownloading}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Selected ({selectedDocs.length})
              </Button>
            )}
            {documents.length > 0 && (
              <Button
                onClick={handleDownloadAll}
                disabled={isDownloading}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Package className="h-4 w-4" />
                Download All
              </Button>
            )}
          </div>
        </div>

        {documents.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No documents uploaded yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedDocs.length === documents.length && documents.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDocs(documents.map(d => d.id));
                        } else {
                          setSelectedDocs([]);
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uploaded</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedDocs.includes(doc.id)}
                        onChange={() => toggleDocSelection(doc.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 capitalize">{doc.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{formatFileSize(doc.file_size)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {new Date(doc.uploaded_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadSingle(doc.id, doc.name)}
                        disabled={isDownloading}
                        className="flex items-center gap-1"
                      >
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
