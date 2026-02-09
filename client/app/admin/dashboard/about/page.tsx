"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2, AlertCircle, CheckCircle } from "lucide-react";
import { getAboutData, updateAboutData } from "../../actions";

export default function AboutAdminPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function loadData() {
      const aboutData = await getAboutData();
      setData(aboutData);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    const result = await updateAboutData(data);
    setSaving(false);
    setMessage({
      type: result.success ? "success" : "error",
      text: result.message,
    });
    setTimeout(() => setMessage(null), 5000);
  };

  const addTeamMember = () => {
    setData({
      ...data,
      team: [
        ...data.team,
        { name: "", role: "", image: "", bio: "" },
      ],
    });
  };

  const removeTeamMember = (index: number) => {
    setData({
      ...data,
      team: data.team.filter((_: any, i: number) => i !== index),
    });
  };

  const updateTeamMember = (index: number, field: string, value: string) => {
    const newTeam = [...data.team];
    newTeam[index] = { ...newTeam[index], [field]: value };
    setData({ ...data, team: newTeam });
  };

  const updateValue = (index: number, field: string, value: string) => {
    const newValues = [...data.values];
    newValues[index] = { ...newValues[index], [field]: value };
    setData({ ...data, values: newValues });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit About Us Page</h1>
          <p className="text-gray-600">Update company information and team details</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
        >
          <Save className="w-5 h-5" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Hero Section</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={data.hero.title}
              onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
            <input
              type="text"
              value={data.hero.subtitle}
              onChange={(e) => setData({ ...data, hero: { ...data.hero, subtitle: e.target.value } })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Mission Section</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={data.mission.title}
              onChange={(e) => setData({ ...data, mission: { ...data.mission, title: e.target.value } })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={data.mission.description}
              onChange={(e) => setData({ ...data, mission: { ...data.mission, description: e.target.value } })}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Core Values</h2>
        <div className="space-y-4">
          {data.values.map((value: any, index: number) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={value.title}
                    onChange={(e) => updateValue(index, "title", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icon Name</label>
                  <input
                    type="text"
                    value={value.icon}
                    onChange={(e) => updateValue(index, "icon", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="e.g., Target, Shield, Heart"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={value.description}
                  onChange={(e) => updateValue(index, "description", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Team Members</h2>
          <button
            onClick={addTeamMember}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Member
          </button>
        </div>
        <div className="space-y-4">
          {data.team.map((member: any, index: number) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg relative">
              <button
                onClick={() => removeTeamMember(index)}
                className="absolute top-4 right-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="grid grid-cols-2 gap-4 pr-12">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => updateTeamMember(index, "name", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <input
                    type="text"
                    value={member.role}
                    onChange={(e) => updateTeamMember(index, "role", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={member.image}
                    onChange={(e) => updateTeamMember(index, "image", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="https://..."
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={member.bio}
                    onChange={(e) => updateTeamMember(index, "bio", e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
