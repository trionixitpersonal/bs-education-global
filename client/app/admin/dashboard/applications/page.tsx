"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Eye, Trash2, Clock, CheckCircle, XCircle, User, Mail, Calendar } from "lucide-react";
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
  document_count?: number;
  profiles?: {
    full_name: string;
    email: string;
  };
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/admin/applications");
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId: string, newStatus: string) => {
    try {
      console.log("Updating status to:", newStatus, "for application:", applicationId);
      
      const response = await fetch(`/api/admin/applications/${applicationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log("Status updated successfully:", data);
        // Refresh the applications list
        await fetchApplications();
      } else {
        console.error("Failed to update status:", data);
        alert(`Failed to update status: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status");
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      draft: { color: "bg-gray-100 text-gray-700", icon: Clock },
      submitted: { color: "bg-blue-100 text-blue-700", icon: Clock },
      under_review: { color: "bg-yellow-100 text-yellow-700", icon: Clock },
      accepted: { color: "bg-green-100 text-green-700", icon: CheckCircle },
      rejected: { color: "bg-red-100 text-red-700", icon: XCircle },
    };

    const badge = badges[status as keyof typeof badges] || badges.draft;
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        <Icon className="h-3 w-3" />
        {status.replace("_", " ").toUpperCase()}
      </span>
    );
  };

  const filteredApplications = applications.filter((app) => {
    const studentName = app.profiles?.full_name?.toLowerCase() || "";
    const studentEmail = app.profiles?.email?.toLowerCase() || "";
    const universityName = app.university_name?.toLowerCase() || "";
    const programName = app.program_name?.toLowerCase() || "";
    
    const matchesSearch = 
      studentName.includes(searchQuery.toLowerCase()) ||
      studentEmail.includes(searchQuery.toLowerCase()) ||
      universityName.includes(searchQuery.toLowerCase()) ||
      programName.includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || app.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Applications</h1>
          <p className="text-gray-600 mt-1">View and manage all student university applications</p>
        </div>
        <div className="text-sm text-gray-600">
          Total Applications: <span className="font-semibold">{applications.length}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by student name, email, university, or program..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="submitted">Submitted</option>
            <option value="under_review">Under Review</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      {filteredApplications.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <div className="max-w-sm mx-auto">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-600">
              {searchQuery || filterStatus !== "all"
                ? "No applications match your filters."
                : "No student applications yet."}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    University & Program
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Intake
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documents
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <p className="font-medium text-gray-900">
                            {app.profiles?.full_name || "N/A"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <p className="text-sm text-gray-500">
                            {app.profiles?.email || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{app.university_name}</p>
                        <p className="text-sm text-gray-500">
                          {app.program_name} ({app.program_level})
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {app.intake || "Not specified"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {app.document_count !== undefined && app.document_count > 0 ? (
                          <>
                            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                              {app.document_count} {app.document_count === 1 ? 'Doc' : 'Docs'}
                            </div>
                          </>
                        ) : (
                          <span className="text-sm text-gray-400">No docs</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(app.status)}
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusUpdate(app.id, e.target.value)}
                          className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="draft">Draft</option>
                          <option value="submitted">Submitted</option>
                          <option value="under_review">Under Review</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.location.href = `/admin/dashboard/applications/${app.id}`}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      {applications.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-600">Draft</p>
            <p className="text-2xl font-bold text-gray-700">
              {applications.filter(a => a.status === 'draft').length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-blue-600">Submitted</p>
            <p className="text-2xl font-bold text-blue-700">
              {applications.filter(a => a.status === 'submitted').length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-yellow-600">Under Review</p>
            <p className="text-2xl font-bold text-yellow-700">
              {applications.filter(a => a.status === 'under_review').length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-green-600">Accepted</p>
            <p className="text-2xl font-bold text-green-700">
              {applications.filter(a => a.status === 'accepted').length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
