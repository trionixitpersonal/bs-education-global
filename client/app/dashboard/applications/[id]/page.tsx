"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Building2, BookOpen, Calendar, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Application {
  id: string;
  university_name: string;
  program_name: string;
  program_level: string;
  intake: string;
  status: "draft" | "submitted" | "under_review" | "accepted" | "rejected";
  submitted_at?: string;
  created_at: string;
  updated_at: string;
}

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [application, setApplication] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApplication();
  }, []);

  const fetchApplication = async () => {
    try {
      const response = await fetch(`/api/applications/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setApplication(data);
      } else {
        alert("Application not found");
        router.push("/dashboard/applications");
      }
    } catch (error) {
      console.error("Failed to fetch application:", error);
      alert("Failed to load application");
    } finally {
      setIsLoading(false);
    }
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/applications")}
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
          {getStatusBadge(application.status)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div>
                <label className="text-sm font-medium text-gray-500">Status Description</label>
                <p className="text-gray-600 text-sm">
                  {application.status === "draft" && "Your application is in draft mode. Complete and submit it to proceed."}
                  {application.status === "submitted" && "Your application has been submitted and is awaiting review."}
                  {application.status === "under_review" && "Your application is currently under review by the university."}
                  {application.status === "accepted" && "Congratulations! Your application has been accepted."}
                  {application.status === "rejected" && "Your application was not successful this time."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
