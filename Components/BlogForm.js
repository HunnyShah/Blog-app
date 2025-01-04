// components/BlogForm.js
"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";

// Dynamic import of ReactQuill for rich text editing
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const BlogForm = ({ isEditing = false, blogData = null }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    description: "",
    imageUrl: "",
    categories: [],
    tags: [],
  });
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newCategory, setNewCategory] = useState("");

  // Available categories
  const availableCategories = [
    "Technology",
    "Lifestyle",
    "Travel",
    "Food",
    "Business",
    "Health",
  ];

  useEffect(() => {
    if (isEditing && blogData) {
      setFormData(blogData);
      setContent(blogData.description);
      setPreviewUrl(blogData.imageUrl);
    }
  }, [isEditing, blogData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setFormData((prev) => ({
          ...prev,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleCategoryChange = (category) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogs = JSON.parse(localStorage.getItem("myData") || "[]");

    const newBlog = {
      ...formData,
      description: content,
      id: isEditing ? blogData.id : Date.now(),
      date: isEditing ? blogData.date : new Date().toLocaleDateString(),
    };

    if (isEditing) {
      const updatedBlogs = blogs.map((blog) =>
        blog.id === blogData.id ? newBlog : blog
      );
      localStorage.setItem("myData", JSON.stringify(updatedBlogs));
    } else {
      localStorage.setItem("myData", JSON.stringify([...blogs, newBlog]));
    }

    router.push("/");
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Author"
          value={formData.author}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, author: e.target.value }))
          }
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Content</label>
        <ReactQuill
          value={content}
          onChange={setContent}
          modules={quillModules}
          className="h-64"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Image</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleImageChange}
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="mt-2"
            style={{ maxWidth: "200px" }}
          />
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Categories</label>
        <div className="d-flex flex-wrap gap-2">
          {availableCategories.map((category) => (
            <div key={category} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={category}
                checked={formData.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <label className="form-check-label" htmlFor={category}>
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Tags</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAddTag}
          >
            Add Tag
          </button>
        </div>
        <div className="mt-2 d-flex flex-wrap gap-2">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="badge bg-primary"
              style={{ cursor: "pointer" }}
              onClick={() => handleRemoveTag(tag)}
            >
              {tag} ×
            </span>
          ))}
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        {isEditing ? "Update" : "Create"} Blog
      </button>
    </form>
  );
};

export default BlogForm;
