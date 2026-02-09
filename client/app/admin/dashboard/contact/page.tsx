"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Mail, Phone, Calendar, FileCheck, ShieldCheck, 
  Eye, Trash2, CheckCircle, Clock, XCircle,
  Filter, RefreshCw, MessageSquare, Download, FileText
} from "lucide-react";

interface ContactSubmission {
  id: string;
  type: "contact" | "consultation" | "review" | "verification";
  status: "new" | "in_progress" | "completed" | "cancelled";
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  preferred_date?: string;
  preferred_time?: string;
  consultation_type?: string;
  review_type?: string;
  document_type?: string;
  destination_country?: string;
  additional_info?: string;
  admin_notes?: string;
  file_urls?: Array<{
    name: string;
    url: string;
    path: string;
    size: number;
  }>;
  created_at: string;
  updated_at: string;
}

export default function AdminContactPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  // Parse file info from additional_info text (for old submissions)
  const parseFilesFromText = (text: string): Array<{ name: string; size: string }> => {
    if (!text) return [];
    
    const fileMatch = text.match(/Uploaded Files: (.+)/);
    if (!fileMatch) return [];
    
    const filesText = fileMatch[1];
    const files = filesText.split(', ').map(fileStr => {
      const match = fileStr.match(/(.+?) \((.+?)\)/);
      if (match) {
        return { name: match[1], size: match[2] };
      }
      return null;
    }).filter(Boolean) as Array<{ name: string; size: string }>;
    
    return files;
  };

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/contact?type=${typeFilter}&status=${statusFilter}`, {
        cache: 'no-store'
      });
      const data = await response.json();
      setSubmissions(data || []);
      setFilteredSubmissions(data || []);
    } catch (error) {
      console.error("Failed to fetch submissions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    let result = [...submissions];

    if (typeFilter !== "all") {
      result = result.filter(s => s.type === typeFilter);
    }

    if (statusFilter !== "all") {
      result = result.filter(s => s.status === statusFilter);
    }

    setFilteredSubmissions(result);
  }, [typeFilter, statusFilter, submissions]);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await fetch(`/api/admin/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchSubmissions();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;

    try {
      await fetch(`/api/admin/contact/${id}`, { method: "DELETE" });
      fetchSubmissions();
    } catch (error) {
      console.error("Failed to delete submission:", error);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "contact": return Mail;
      case "consultation": return Calendar;
      case "review": return FileCheck;
      case "verification": return ShieldCheck;
      default: return MessageSquare;
    }
  };

  const getStatusBadge = (status: string) => {
    const config = {
      new: { color: "bg-blue-100 text-blue-800", icon: Clock, label: "New" },
      in_progress: { color: "bg-yellow-100 text-yellow-800", icon: Clock, label: "In Progress" },
      completed: { color: "bg-green-100 text-green-800", icon: CheckCircle, label: "Completed" },
      cancelled: { color: "bg-gray-100 text-gray-800", icon: XCircle, label: "Cancelled" },
    };
    const statusConfig = config[status as keyof typeof config] || config.new;
    const Icon = statusConfig.icon;

    return (
      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${statusConfig.color}`}>
        <Icon className="h-3 w-3" />
        {statusConfig.label}
      </span>
    );
  };

  const stats = {
    total: submissions.length,
    contact: submissions.filter(s => s.type === "contact").length,
    consultation: submissions.filter(s => s.type === "consultation").length,
    review: submissions.filter(s => s.type === "review").length,
    verification: submissions.filter(s => s.type === "verification").length,
    new: submissions.filter(s => s.status === "new").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Submissions</h1>
          <p className="text-sm text-gray-600 mt-1">Total: {stats.total} submissions ({stats.new} new)</p>
        </div>
        <Button onClick={fetchSubmissions} variant="outline" disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-5 w-5 text-blue-600" />
            <p className="text-sm font-medium text-gray-600">Contact</p>
          </div>
          <p className="text-2xl font-bold">{stats.contact}</p>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            <p className="text-sm font-medium text-gray-600">Consultation</p>
          </div>
          <p className="text-2xl font-bold">{stats.consultation}</p>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileCheck className="h-5 w-5 text-green-600" />
            <p className="text-sm font-medium text-gray-600">Review</p>
          </div>
          <p className="text-2xl font-bold">{stats.review}</p>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-5 w-5 text-orange-600" />
            <p className="text-sm font-medium text-gray-600">Verification</p>
          </div>
          <p className="text-2xl font-bold">{stats.verification}</p>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-red-600" />
            <p className="text-sm font-medium text-gray-600">New</p>
          </div>
          <p className="text-2xl font-bold">{stats.new}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-lg border bg-white p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="text-sm border border-gray-300 rounded px-3 py-1.5"
            >
              <option value="all">All Types</option>
              <option value="contact">Contact</option>
              <option value="consultation">Consultation</option>
              <option value="review">Review</option>
              <option value="verification">Verification</option>
            </select>
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm border border-gray-300 rounded px-3 py-1.5"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="rounded-lg border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Loading submissions...
                  </td>
                </tr>
              ) : filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No submissions found.
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((submission) => {
                  const TypeIcon = getTypeIcon(submission.type);
                  return (
                    <tr key={submission.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <TypeIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium capitalize">{submission.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{submission.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">{submission.email}</div>
                        {submission.phone && (
                          <div className="text-xs text-gray-500">{submission.phone}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={submission.status}
                          onChange={(e) => handleStatusUpdate(submission.id, e.target.value)}
                          className="text-xs border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="new">New</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(submission.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedSubmission(submission);
                              setShowDetailDialog(true);
                            }}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(submission.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Dialog */}
      {showDetailDialog && selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold capitalize">{selectedSubmission.type} Submission</h2>
              <button
                onClick={() => setShowDetailDialog(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-base">{selectedSubmission.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-base">{selectedSubmission.email}</p>
                </div>
                {selectedSubmission.phone && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-base">{selectedSubmission.phone}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  {getStatusBadge(selectedSubmission.status)}
                </div>
              </div>

              {selectedSubmission.subject && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Subject</p>
                  <p className="text-base">{selectedSubmission.subject}</p>
                </div>
              )}

              {selectedSubmission.message && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Message</p>
                  <p className="text-base whitespace-pre-wrap">{selectedSubmission.message}</p>
                </div>
              )}

              {selectedSubmission.consultation_type && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Consultation Type</p>
                  <p className="text-base capitalize">{selectedSubmission.consultation_type}</p>
                </div>
              )}

              {selectedSubmission.preferred_date && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Preferred Date</p>
                    <p className="text-base">{selectedSubmission.preferred_date}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Preferred Time</p>
                    <p className="text-base">{selectedSubmission.preferred_time}</p>
                  </div>
                </div>
              )}

              {selectedSubmission.review_type && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Review Type</p>
                  <p className="text-base">{selectedSubmission.review_type}</p>
                </div>
              )}

              {selectedSubmission.document_type && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Document Type</p>
                    <p className="text-base">{selectedSubmission.document_type}</p>
                  </div>
                  {selectedSubmission.destination_country && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Destination Country</p>
                      <p className="text-base">{selectedSubmission.destination_country}</p>
                    </div>
                  )}
                </div>
              )}

              {selectedSubmission.additional_info && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Additional Information</p>
                  <p className="text-base whitespace-pre-wrap">
                    {selectedSubmission.additional_info.replace(/\n\nUploaded Files:.+$/, '')}
                  </p>
                </div>
              )}

              {/* Display uploaded files (new format with download) */}
              {selectedSubmission.file_urls && selectedSubmission.file_urls.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-3">Uploaded Files</p>
                  <div className="space-y-2">
                    {selectedSubmission.file_urls.map((file, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <FileText className="h-5 w-5 text-blue-600 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        </div>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={file.name}
                          className="ml-3 inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 shrink-0"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Display file info from old format (text only, no download) */}
              {!selectedSubmission.file_urls && selectedSubmission.additional_info && parseFilesFromText(selectedSubmission.additional_info).length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-3">Uploaded Files (Old Submission)</p>
                  <div className="space-y-2">
                    {parseFilesFromText(selectedSubmission.additional_info).map((file, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-4 py-3"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <FileText className="h-5 w-5 text-amber-600 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size}</p>
                          </div>
                        </div>
                        <div className="ml-3 inline-flex items-center gap-2 rounded-md bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-800 shrink-0">
                          Not Available
                        </div>
                      </div>
                    ))}
                    <p className="text-xs text-amber-700 mt-2">
                      ⚠️ Files from old submissions are not stored. Only file names were saved.
                    </p>
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-gray-500">Submission Date</p>
                <p className="text-base">{new Date(selectedSubmission.created_at).toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={() => setShowDetailDialog(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
