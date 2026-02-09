"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, Calendar, Loader2, Save } from "lucide-react";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    date_of_birth: "",
  });

  // Fetch complete profile data from database
  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.email) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/profile");
        if (response.ok) {
          const profile = await response.json();
          setFormData({
            full_name: profile.full_name || "",
            email: profile.email || "",
            phone: profile.phone || "",
            address: profile.address || "",
            city: profile.city || "",
            country: profile.country || "",
            date_of_birth: profile.date_of_birth || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [session]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Refetch profile to confirm data was saved
        const refreshResponse = await fetch("/api/profile");
        if (refreshResponse.ok) {
          const updatedProfile = await refreshResponse.json();
          setFormData({
            full_name: updatedProfile.full_name || "",
            email: updatedProfile.email || "",
            phone: updatedProfile.phone || "",
            address: updatedProfile.address || "",
            city: updatedProfile.city || "",
            country: updatedProfile.country || "",
            date_of_birth: updatedProfile.date_of_birth || "",
          });
        }
        
        setIsEditing(false);
        // Update session if name changed
        if (formData.full_name !== session?.user?.name) {
          await update();
        }
        // Show success message
        alert("Profile updated successfully!");
      } else {
        console.error("Failed to update profile:", data);
        alert(`Failed to update profile: ${data.error || "Unknown error"}\n${data.details || ""}`);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile: Network error");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 sm:p-6 md:p-8 text-white">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-white text-blue-600 text-2xl sm:text-3xl font-bold">
            {session?.user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{session?.user?.name || "User"}</h1>
            <p className="text-blue-100 mt-1 text-sm sm:text-base break-all">{session?.user?.email}</p>
            <div className="mt-3 flex items-center justify-center sm:justify-start gap-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm">Student</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">Profile Information</h2>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full sm:w-auto">
              Edit Profile
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                disabled={isSaving}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal Information
            </h3>
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.full_name || "Not provided"}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <p className="text-gray-900">{formData.email}</p>
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="+1 234 567 8900"
                  />
                ) : (
                  <p className="text-gray-900">{formData.phone || "Not provided"}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">
                    {formData.date_of_birth
                      ? new Date(formData.date_of_birth).toLocaleDateString()
                      : "Not provided"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="border-t pt-4 sm:pt-6">
            <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Address Information
            </h3>
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="123 Main Street"
                  />
                ) : (
                  <p className="text-gray-900">{formData.address || "Not provided"}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="New York"
                  />
                ) : (
                  <p className="text-gray-900">{formData.city || "Not provided"}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="United States"
                  />
                ) : (
                  <p className="text-gray-900">{formData.country || "Not provided"}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Account Settings</h2>
        <div className="space-y-3 sm:space-y-4">
          <Button variant="outline" className="w-full justify-start text-sm sm:text-base">
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start text-sm sm:text-base text-red-600 hover:text-red-700 hover:border-red-300">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
