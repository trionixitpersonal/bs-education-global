"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, X, Loader2, Check } from "lucide-react";

interface User {
  id: string;
  email: string;
  full_name?: string;
  role: string;
  created_at: string;
  is_approved?: boolean;
}

interface UserFormData {
  email: string;
  full_name: string;
  role: string;
  password: string;
}

export default function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [filterTab, setFilterTab] = useState<"all" | "pending" | "approved">("all");
  const [formData, setFormData] = useState<UserFormData>({
    email: "",
    full_name: "",
    role: "user",
    password: "",
  });

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      // Ensure is_approved field exists (default to true for admins/super_admins)
      const processedData = ((data || []) as User[]).map((user) => ({
        ...user,
        is_approved: user.is_approved !== undefined ? user.is_approved : user.role !== 'user'
      }));
      setUsers(processedData);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getFilteredUsers = () => {
    if (filterTab === "pending") {
      return users.filter(u => u.role === "user" && !u.is_approved);
    }
    if (filterTab === "approved") {
      return users.filter(u => u.is_approved !== false);
    }
    return users;
  };

  const pendingCount = users.filter(u => u.role === "user" && !u.is_approved).length;

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        email: user.email,
        full_name: user.full_name || "",
        role: user.role,
        password: "",
      });
    } else {
      setEditingUser(null);
      setFormData({
        email: "",
        full_name: "",
        role: "user",
        password: "",
      });
    }
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setEditingUser(null);
    setFormData({
      email: "",
      full_name: "",
      role: "user",
      password: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = editingUser ? `/api/users/${editingUser.id}` : "/api/users";
      const method = editingUser ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchUsers();
        handleCloseDialog();
      } else {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        alert(`Failed to save user: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Failed to save user:", error);
      alert("Failed to save user");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (response.ok) {
        await fetchUsers();
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user");
    }
  };

  const handleApprove = async (id: string) => {
    setProcessingId(id);
    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: id, approved: true }),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorData = { error: "Failed to approve user" };
        if (contentType?.includes("application/json")) {
          errorData = await response.json();
        }
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }
      
      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        throw new Error("Invalid response from server");
      }
      
      await fetchUsers();
    } catch (error: unknown) {
      console.error("Error approving user:", error);
      alert(`Failed to approve user: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    setProcessingId(id);
    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: id, approved: false }),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorData = { error: "Failed to reject user" };
        if (contentType?.includes("application/json")) {
          errorData = await response.json();
        }
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }
      
      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        throw new Error("Invalid response from server");
      }
      
      await fetchUsers();
    } catch (error: unknown) {
      console.error("Error rejecting user:", error);
      alert(`Failed to reject user: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setProcessingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const filteredUsers = getFilteredUsers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
        <Button onClick={() => handleOpenDialog()} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-8">
          <button
            onClick={() => setFilterTab("all")}
            className={`px-1 py-4 font-medium border-b-2 transition-colors ${
              filterTab === "all"
                ? "border-blue-600 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            All Users
          </button>
          <button
            onClick={() => setFilterTab("pending")}
            className={`px-1 py-4 font-medium border-b-2 transition-colors ${
              filterTab === "pending"
                ? "border-blue-600 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Pending Approval
            {pendingCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-500 text-white text-xs font-semibold">
                {pendingCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setFilterTab("approved")}
            className={`px-1 py-4 font-medium border-b-2 transition-colors ${
              filterTab === "approved"
                ? "border-blue-600 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Approved Users
          </button>
        </div>
      </div>

      <div className="rounded-lg border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    {filterTab === "pending" && "No pending approvals"}
                    {filterTab === "approved" && "No approved users"}
                    {filterTab === "all" && "No users found. Click \"Add User\" to create one."}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="font-medium text-gray-900">{user.email}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                      {user.full_name || '-'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        user.role === 'super_admin' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.role === 'admin' || user.role === 'super_admin' ? (
                        <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                          ✓ Approved
                        </span>
                      ) : user.is_approved ? (
                        <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                          ✓ Approved
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800">
                          ⏳ Pending
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {user.role === 'user' && !user.is_approved && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleApprove(user.id)}
                              disabled={processingId === user.id}
                              className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                            >
                              {processingId === user.id ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <Check className="h-3 w-3" />
                              )}
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleReject(user.id)}
                              disabled={processingId === user.id}
                              className="flex items-center gap-1"
                            >
                              {processingId === user.id ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                "Deny"
                              )}
                            </Button>
                          </>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDialog(user)}
                          className="flex items-center gap-1"
                        >
                          <Pencil className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(user.id)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {editingUser ? "Edit User" : "Add User"}
              </h2>
              <button
                onClick={handleCloseDialog}
                className="rounded-lg p-1 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="user@example.com"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Password {!editingUser && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required={!editingUser}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder={editingUser ? "Leave blank to keep current password" : "Enter password"}
                  minLength={6}
                />
                {editingUser && (
                  <p className="mt-1 text-xs text-gray-500">
                    Leave blank to keep the current password
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseDialog}
                  className="flex-1"
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    editingUser ? "Update User" : "Create User"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
