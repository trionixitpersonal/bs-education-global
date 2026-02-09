"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Save, Mail } from "lucide-react";

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState({
    siteName: "BS Education",
    siteEmail: "contact@bsedu.com.au",
    supportEmail: "support@bsedu.com.au",
    phoneNumber: "+61 XXX XXX XXX",
    address: "Melbourne, Australia",
    enableRegistration: true,
    enableNotifications: true,
    maintenanceMode: false,
  });

  const [emailSettings, setEmailSettings] = useState({
    smtp_host: "",
    smtp_port: "587",
    smtp_user: "",
    smtp_password: "",
    from_email: "",
    to_email: "",
    is_active: true,
  });

  const [isLoadingEmail, setIsLoadingEmail] = useState(true);
  const [emailMessage, setEmailMessage] = useState("");

  useEffect(() => {
    fetchEmailSettings();
  }, []);

  const fetchEmailSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings/email");
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setEmailSettings(data);
        }
      }
    } catch (error) {
      console.error("Failed to fetch email settings:", error);
    } finally {
      setIsLoadingEmail(false);
    }
  };

  const handleSave = async () => {
    // TODO: Implement settings save
    console.log("Saving settings:", settings);
    alert("Settings saved successfully!");
  };

  const handleEmailSettingsSave = async () => {
    try {
      const response = await fetch("/api/admin/settings/email", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailSettings),
      });

      if (response.ok) {
        setEmailMessage("Email settings saved successfully!");
        setTimeout(() => setEmailMessage(""), 3000);
      } else {
        setEmailMessage("Failed to save email settings.");
      }
    } catch (error) {
      console.error("Failed to save email settings:", error);
      setEmailMessage("Error saving email settings.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="space-y-6">
        {/* Site Information */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Site Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Email</label>
              <input
                type="email"
                value={settings.siteEmail}
                onChange={(e) => setSettings({ ...settings, siteEmail: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Support Email</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={settings.phoneNumber}
                onChange={(e) => setSettings({ ...settings, phoneNumber: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Features</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-900">User Registration</label>
                <p className="text-sm text-gray-500">Allow new users to register</p>
              </div>
              <input
                type="checkbox"
                checked={settings.enableRegistration}
                onChange={(e) => setSettings({ ...settings, enableRegistration: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-900">Email Notifications</label>
                <p className="text-sm text-gray-500">Send email notifications to users</p>
              </div>
              <input
                type="checkbox"
                checked={settings.enableNotifications}
                onChange={(e) => setSettings({ ...settings, enableNotifications: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-900">Maintenance Mode</label>
                <p className="text-sm text-gray-500">Show maintenance page to visitors</p>
              </div>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Email/SMTP Settings */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Email Settings (SMTP)</h2>
            </div>
            <Button onClick={handleEmailSettingsSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Email Settings
            </Button>
          </div>

          {emailMessage && (
            <div className={`mb-4 rounded-lg p-3 ${
              emailMessage.includes("success") 
                ? "bg-green-100 text-green-800" 
                : "bg-red-100 text-red-800"
            }`}>
              {emailMessage}
            </div>
          )}

          {isLoadingEmail ? (
            <p className="text-gray-500">Loading email settings...</p>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">SMTP Host</label>
                  <input
                    type="text"
                    value={emailSettings.smtp_host}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtp_host: e.target.value })}
                    placeholder="smtp.gmail.com"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">SMTP Port</label>
                  <input
                    type="number"
                    value={emailSettings.smtp_port}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtp_port: e.target.value })}
                    placeholder="587"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">SMTP Username</label>
                  <input
                    type="text"
                    value={emailSettings.smtp_user}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtp_user: e.target.value })}
                    placeholder="your-email@gmail.com"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">SMTP Password</label>
                  <input
                    type="password"
                    value={emailSettings.smtp_password}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtp_password: e.target.value })}
                    placeholder="••••••••••••"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">From Email</label>
                  <input
                    type="email"
                    value={emailSettings.from_email}
                    onChange={(e) => setEmailSettings({ ...emailSettings, from_email: e.target.value })}
                    placeholder="noreply@bsedu.com.au"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">To Email (Receive submissions)</label>
                  <input
                    type="email"
                    value={emailSettings.to_email}
                    onChange={(e) => setEmailSettings({ ...emailSettings, to_email: e.target.value })}
                    placeholder="admin@bsedu.com.au"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between border-t pt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900">Enable Email Notifications</label>
                  <p className="text-sm text-gray-500">Send emails when users submit forms</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailSettings.is_active}
                  onChange={(e) => setEmailSettings({ ...emailSettings, is_active: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="rounded-lg bg-blue-50 p-4 mt-4">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">Setup Instructions:</h3>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>For Gmail: Use App Password instead of regular password</li>
                  <li>Enable "Less secure app access" or create App-specific password</li>
                  <li>Common ports: 587 (TLS), 465 (SSL), 25 (not recommended)</li>
                  <li>Test the configuration by submitting a support form</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
