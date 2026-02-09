"use client";

import { useState } from "react";
import { Save, Plus, Edit2, Trash2, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import { getBlogPosts } from "@/lib/blog-data";
import { updateBlogData } from "../../actions";

export default function BlogAdminPage() {
  const initialPosts = getBlogPosts();
  const [posts, setPosts] = useState(initialPosts);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    const result = await updateBlogData(posts);
    setSaving(false);
    setMessage({
      type: result.success ? "success" : "error",
      text: result.message,
    });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleCreateNew = () => {
    const newPost = {
      slug: "",
      title: "",
      excerpt: "",
      image: "",
      category: "University Rankings",
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      readTime: "5 min read",
      author: "",
      authorImage: "",
      authorBio: "",
      content: "",
      featured: false,
    };
    setEditingPost(newPost);
  };

  const handleEdit = (post: any) => {
    setEditingPost({ ...post });
  };

  const handleDelete = (slug: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setPosts(posts.filter((p) => p.slug !== slug));
    }
  };

  const handleSavePost = () => {
    if (!editingPost.slug || !editingPost.title) {
      alert("Please fill in slug and title");
      return;
    }

    const existingIndex = posts.findIndex((p) => p.slug === editingPost.slug);
    if (existingIndex >= 0) {
      const newPosts = [...posts];
      newPosts[existingIndex] = editingPost;
      setPosts(newPosts);
    } else {
      setPosts([...posts, editingPost]);
    }
    setEditingPost(null);
  };

  const handleCancel = () => {
    setEditingPost(null);
  };

  if (editingPost) {
    return (
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {posts.find((p) => p.slug === editingPost.slug) ? "Edit Blog Post" : "Create New Post"}
              </h1>
              <p className="text-gray-600">Fill in all the fields below</p>
            </div>
          </div>
          <button
            onClick={handleSavePost}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Save className="w-5 h-5" />
            Save Post
          </button>
        </div>

        {/* Edit Form */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slug * (URL-friendly)</label>
                <input
                  type="text"
                  value={editingPost.slug}
                  onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="e.g., top-universities-2026"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={editingPost.category}
                  onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option>University Rankings</option>
                  <option>Visa Guide</option>
                  <option>Application Tips</option>
                  <option>Scholarships</option>
                  <option>Study Destinations</option>
                  <option>Career Advice</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="text"
                  value={editingPost.date}
                  onChange={(e) => setEditingPost({ ...editingPost, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="February 5, 2026"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Read Time</label>
                <input
                  type="text"
                  value={editingPost.readTime}
                  onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="5 min read"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image URL</label>
                <input
                  type="text"
                  value={editingPost.image}
                  onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                <textarea
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Brief summary of the post..."
                />
              </div>
              <div className="col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingPost.featured || false}
                    onChange={(e) => setEditingPost({ ...editingPost, featured: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured Post</span>
                </label>
              </div>
            </div>
          </div>

          {/* Author Info */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Author Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author Name</label>
                <input
                  type="text"
                  value={editingPost.author}
                  onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author Image URL</label>
                <input
                  type="text"
                  value={editingPost.authorImage}
                  onChange={(e) => setEditingPost({ ...editingPost, authorImage: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Author Bio</label>
                <textarea
                  value={editingPost.authorBio}
                  onChange={(e) => setEditingPost({ ...editingPost, authorBio: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Content (HTML)</h2>
            <p className="text-sm text-gray-600 mb-4">
              Write your content using HTML tags. Use &lt;h2&gt; for headings, &lt;p&gt; for paragraphs, &lt;ul&gt; and &lt;li&gt; for lists.
            </p>
            <textarea
              value={editingPost.content}
              onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
              rows={20}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono text-sm"
              placeholder="<p>Your content here...</p>"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Blog Posts</h1>
          <p className="text-gray-600">{posts.length} total posts</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            New Post
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors font-medium"
          >
            <Save className="w-5 h-5" />
            {saving ? "Saving..." : "Save All Changes"}
          </button>
        </div>
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

      {/* Posts List */}
      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post.slug} className="bg-white rounded-xl p-6 border border-gray-200 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-gray-900">{post.title}</h3>
                {post.featured && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded">{post.category}</span>
                <span>By {post.author}</span>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => handleEdit(post)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(post.slug)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
