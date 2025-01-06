// app/blog/create/page.js
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../../Components/Navbar";

export default function CreateBlog() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    imageUrl: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate form
      if (!formData.title || !formData.description || !formData.author) {
        throw new Error("Please fill in all required fields");
      }

      // Get existing blogs
      const existingBlogs = JSON.parse(localStorage.getItem("myData") || "[]");

      // Create new blog object
      const newBlog = {
        ...formData,
        id: Date.now(),
        date: new Date().toISOString(),
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      };

      // Save to localStorage
      localStorage.setItem(
        "myData",
        JSON.stringify([...existingBlogs, newBlog])
      );

      // Redirect to home page
      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold mb-6">Create New Blog</h1>

            {error && (
              <div className="alert alert-danger mb-4" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label">Title *</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter blog title"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Author *</label>
                <input
                  type="text"
                  name="author"
                  className="form-control"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Enter author name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  className="form-control"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                />
                <small className="text-muted">
                  Provide a URL for your blog's cover image
                </small>
              </div>

              <div className="mb-4">
                <label className="form-label">Tags</label>
                <input
                  type="text"
                  name="tags"
                  className="form-control"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Enter tags (comma-separated)"
                />
                <small className="text-muted">
                  Separate tags with commas (e.g., technology, programming, web)
                </small>
              </div>

              <div className="mb-4">
                <label className="form-label">Content *</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="8"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write your blog content here..."
                  required
                ></textarea>
              </div>

              <div className="d-flex gap-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Publishing...
                    </>
                  ) : (
                    "Publish Blog"
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => router.push("/")}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
