"use client";

import { Button } from "@/components/ui/button";
import { X, Calendar, MapPin, GraduationCap, DollarSign, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Scholarship {
  id: string;
  title: string;
  description: string;
  amount: string;
  deadline: string;
  eligibility: string[];
  country: string;
  university: string;
  level: string;
  category: string;
  application_link?: string;
}

interface ScholarshipDetailsDialogProps {
  scholarship: Scholarship;
  onClose: () => void;
}

export function ScholarshipDetailsDialog({ scholarship, onClose }: ScholarshipDetailsDialogProps) {
  const isDeadlineSoon =
    new Date(scholarship.deadline) <
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b bg-white p-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{scholarship.title}</h2>
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {scholarship.category}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-4 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Amount */}
          <div className="rounded-lg bg-primary/5 p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-gray-600">Scholarship Amount</p>
                <p className="text-2xl font-bold text-gray-900">{scholarship.amount}</p>
              </div>
            </div>
          </div>

          {/* Key Information */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg border p-4">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600">Country</p>
                <p className="text-base font-semibold text-gray-900">{scholarship.country}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border p-4">
              <GraduationCap className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600">Study Level</p>
                <p className="text-base font-semibold text-gray-900">{scholarship.level}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border p-4">
              <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600">Application Deadline</p>
                <p className={`text-base font-semibold ${isDeadlineSoon ? 'text-red-600' : 'text-gray-900'}`}>
                  {new Date(scholarship.deadline).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                {isDeadlineSoon && (
                  <p className="text-xs text-red-600 mt-1">Deadline approaching soon!</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border p-4">
              <GraduationCap className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600">University</p>
                <p className="text-base font-semibold text-gray-900">{scholarship.university}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-gray-900">Description</h3>
            <p className="text-gray-700 leading-relaxed">{scholarship.description}</p>
          </div>

          {/* Eligibility Requirements */}
          {scholarship.eligibility && scholarship.eligibility.length > 0 && (
            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Eligibility Requirements</h3>
              <ul className="space-y-2">
                {scholarship.eligibility.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t bg-white p-6">
          <div className="flex gap-3">
            {scholarship.application_link && (
              <Button asChild className="flex-1">
                <Link href={scholarship.application_link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Apply Now
                </Link>
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
