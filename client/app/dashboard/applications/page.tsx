"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Filter, Eye, Trash2, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Application {
  id: string;
  university_name: string;
  program_name: string;
  status: "draft" | "submitted" | "under_review" | "accepted" | "rejected";
  submitted_at?: string;
  created_at: string;
}

interface University {
  id: string;
  name: string;
  country: string;
  city: string;
}

interface Program {
  id: string;
  name: string;
  level: string;
  university_id: string;
  duration?: string;
  tuition_fee?: string;
}

interface Intake {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showDialog, setShowDialog] = useState(false);
  
  // Dropdown data
  const [universities, setUniversities] = useState<University[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [intakes, setIntakes] = useState<Intake[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  
  const [formData, setFormData] = useState({
    university_id: "",
    program_id: "",
    program_level: "Undergraduate",
    intake_id: "",
  });

  useEffect(() => {
    fetchApplications();
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      // Fetch universities
      const universitiesRes = await fetch("/api/universities");
      if (universitiesRes.ok) {
        const universitiesData = await universitiesRes.json();
        setUniversities(universitiesData);
      }

      // Fetch programs
      const programsRes = await fetch("/api/programs");
      if (programsRes.ok) {
        const programsData = await programsRes.json();
        setPrograms(programsData);
      }

      // Fetch intakes
      const intakesRes = await fetch("/api/intakes");
      if (intakesRes.ok) {
        const intakesData = await intakesRes.json();
        setIntakes(intakesData);
      }
    } catch (error) {
      console.error("Failed to fetch dropdown data:", error);
    }
  };

  // Filter programs when university or level changes
  useEffect(() => {
    if (formData.university_id && formData.program_level) {
      const filtered = programs.filter(
        (p) => p.university_id === formData.university_id && p.level === formData.program_level
      );
      setFilteredPrograms(filtered);
      // Reset program selection if current selection is not in filtered list
      if (formData.program_id && !filtered.find(p => p.id === formData.program_id)) {
        setFormData(prev => ({ ...prev, program_id: "" }));
      }
    } else {
      setFilteredPrograms([]);
      setFormData(prev => ({ ...prev, program_id: "" }));
    }
  }, [formData.university_id, formData.program_level, programs]);

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/applications");
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

  const handleCreateApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get selected university and program names for display
    const selectedUniversity = universities.find(u => u.id === formData.university_id);
    const selectedProgram = programs.find(p => p.id === formData.program_id);
    const selectedIntake = intakes.find(i => i.id === formData.intake_id);
    
    if (!selectedUniversity || !selectedProgram) {
      alert("Please select university and program");
      return;
    }
    
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          university_id: formData.university_id,
          university_name: selectedUniversity.name,
          program_id: formData.program_id,
          program_name: selectedProgram.name,
          program_level: formData.program_level,
          intake_id: formData.intake_id,
          intake: selectedIntake?.name || "",
        }),
      });

      if (response.ok) {
        await fetchApplications();
        setShowDialog(false);
        setFormData({
          university_id: "",
          program_id: "",
          program_level: "Undergraduate",
          intake_id: "",
        });
      }
    } catch (error) {
      console.error("Failed to create application:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return;
    
    try {
      const response = await fetch(`/api/applications/${id}`, { method: "DELETE" });
      if (response.ok) {
await fetchApplications();
      }
    } catch (error) {
      console.error("Failed to delete application:", error);
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
    const matchesSearch = app.university_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.program_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Applications</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Track and manage your university applications</p>
        </div>
        <Button onClick={() => setShowDialog(true)} className="bg-blue-600 hover:bg-blue-700 w full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          New Application
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications..."
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

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <div className="max-w-sm mx-auto">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Plus className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications yet</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || filterStatus !== "all"
                ? "No applications match your filters."
                : "Start your journey by creating your first university application."}
            </p>
            {!searchQuery && filterStatus === "all" && (
              <Button onClick={() => setShowDialog(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Application
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    University & Program
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
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
                        <p className="font-medium text-gray-900">{app.university_name}</p>
                        <p className="text-sm text-gray-500">{app.program_name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {app.submitted_at
                        ? new Date(app.submitted_at).toLocaleDateString()
                        : "Not submitted"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.location.href = `/dashboard/applications/${app.id}`}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(app.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-gray-200">
            {filteredApplications.map((app) => (
              <div key={app.id} className="p-4 space-y-3">
                <div>
                  <p className="font-semibold text-gray-900">{app.university_name}</p>
                  <p className="text-sm text-gray-600 mt-1">{app.program_name}</p>
                </div>
                <div className="flex items-center justify-between">
                  {getStatusBadge(app.status)}
                  <span className="text-xs text-gray-500">
                    {app.submitted_at
                      ? new Date(app.submitted_at).toLocaleDateString()
                      : "Not submitted"}
                  </span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                    onClick={() => window.location.href = `/dashboard/applications/${app.id}`}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(app.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Application Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Create New Application</h2>
            <form onSubmit={handleCreateApplication} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  University Name *
                </label>
                <select
                  required
                  value={formData.university_id}
                  onChange={(e) => setFormData({ ...formData, university_id: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a university</option>
                  {universities.map((university) => (
                    <option key={university.id} value={university.id}>
                      {university.name} - {university.city}, {university.country}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Program Level *
                </label>
                <select
                  value={formData.program_level}
                  onChange={(e) => setFormData({ ...formData, program_level: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option>Undergraduate</option>
                  <option>Graduate</option>
                  <option>PhD</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Program Name *
                </label>
                <select
                  required
                  value={formData.program_id}
                  onChange={(e) => setFormData({ ...formData, program_id: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled={!formData.university_id}
                >
                  <option value="">
                    {!formData.university_id 
                      ? "Select university first" 
                      : filteredPrograms.length === 0 
                      ? "No programs available" 
                      : "Select a program"}
                  </option>
                  {filteredPrograms.map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.name} 
                      {program.duration && ` (${program.duration})`}
                      {program.tuition_fee && ` - ${program.tuition_fee}`}
                    </option>
                  ))}
                </select>
                {formData.university_id && filteredPrograms.length === 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    No programs available for selected university and level
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Intake
                </label>
                <select
                  value={formData.intake_id}
                  onChange={(e) => setFormData({ ...formData, intake_id: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an intake (optional)</option>
                  {intakes.map((intake) => (
                    <option key={intake.id} value={intake.id}>
                      {intake.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowDialog(false)}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                  Create Application
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
