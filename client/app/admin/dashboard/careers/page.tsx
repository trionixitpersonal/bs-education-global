"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2, AlertCircle, CheckCircle } from "lucide-react";
import { getCareersData, updateCareersData } from "../../actions";

export default function CareersAdminPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function loadData() {
      const careersData = await getCareersData();
      setData(careersData);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    const result = await updateCareersData(data);
    setSaving(false);
    setMessage({
      type: result.success ? "success" : "error",
      text: result.message,
    });
    setTimeout(() => setMessage(null), 5000);
  };

  const addPosition = () => {
    setData({
      ...data,
      positions: [
        ...data.positions,
        {
          title: "",
          department: "",
          location: "",
          type: "",
          description: "",
          requirements: [""],
        },
      ],
    });
  };

  const removePosition = (index: number) => {
    setData({
      ...data,
      positions: data.positions.filter((_: any, i: number) => i !== index),
    });
  };

  const updatePosition = (index: number, field: string, value: any) => {
    const newPositions = [...data.positions];
    newPositions[index] = { ...newPositions[index], [field]: value };
    setData({ ...data, positions: newPositions });
  };

  const addRequirement = (posIndex: number) => {
    const newPositions = [...data.positions];
    newPositions[posIndex].requirements.push("");
    setData({ ...data, positions: newPositions });
  };

  const updateRequirement = (posIndex: number, reqIndex: number, value: string) => {
    const newPositions = [...data.positions];
    newPositions[posIndex].requirements[reqIndex] = value;
    setData({ ...data, positions: newPositions });
  };

  const removeRequirement = (posIndex: number, reqIndex: number) => {
    const newPositions = [...data.positions];
    newPositions[posIndex].requirements = newPositions[posIndex].requirements.filter(
      (_: any, i: number) => i !== reqIndex
    );
    setData({ ...data, positions: newPositions });
  };

  const updateBenefit = (index: number, field: string, value: string) => {
    const newBenefits = [...data.benefits];
    newBenefits[index] = { ...newBenefits[index], [field]: value };
    setData({ ...data, benefits: newBenefits });
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Careers Page</h1>
          <p className="text-gray-600">Manage job postings and benefits</p>
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

      {/* Benefits Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Benefits</h2>
        <div className="space-y-4">
          {data.benefits.map((benefit: any, index: number) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={benefit.title}
                    onChange={(e) => updateBenefit(index, "title", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icon Name</label>
                  <input
                    type="text"
                    value={benefit.icon}
                    onChange={(e) => updateBenefit(index, "icon", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="e.g., Heart, GraduationCap"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={benefit.description}
                  onChange={(e) => updateBenefit(index, "description", e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Open Positions Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Open Positions</h2>
          <button
            onClick={addPosition}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Position
          </button>
        </div>
        <div className="space-y-6">
          {data.positions.map((position: any, posIndex: number) => (
            <div key={posIndex} className="p-6 bg-gray-50 rounded-lg relative border border-gray-200">
              <button
                onClick={() => removePosition(posIndex)}
                className="absolute top-4 right-4 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <div className="space-y-4 pr-12">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                    <input
                      type="text"
                      value={position.title}
                      onChange={(e) => updatePosition(posIndex, "title", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <input
                      type="text"
                      value={position.department}
                      onChange={(e) => updatePosition(posIndex, "department", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={position.location}
                      onChange={(e) => updatePosition(posIndex, "location", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <input
                      type="text"
                      value={position.type}
                      onChange={(e) => updatePosition(posIndex, "type", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="e.g., Full-time, Part-time, Contract"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={position.description}
                      onChange={(e) => updatePosition(posIndex, "description", e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Requirements</label>
                    <button
                      onClick={() => addRequirement(posIndex)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      + Add Requirement
                    </button>
                  </div>
                  <div className="space-y-2">
                    {position.requirements.map((req: string, reqIndex: number) => (
                      <div key={reqIndex} className="flex gap-2">
                        <input
                          type="text"
                          value={req}
                          onChange={(e) => updateRequirement(posIndex, reqIndex, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          placeholder="Requirement description"
                        />
                        <button
                          onClick={() => removeRequirement(posIndex, reqIndex)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
