// pages/edit/[id].js
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../Components/Navbar";

const EditBlog = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    // Get the ID from the URL
    const id = window.location.pathname.split("/").pop();
    if (id) {
      const blogs = JSON.parse(localStorage.getItem("myData") || "[]");
      const blog = blogs.find((blog) => blog.id === parseInt(id));
      if (blog) {
        setFormData(blog);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // Get the ID from the URL
    const id = window.location.pathname.split("/").pop();

    try {
      // Get current blogs from localStorage
      const blogs = JSON.parse(localStorage.getItem("myData") || "[]");

      // Find the index of the blog to update
      const blogIndex = blogs.findIndex((blog) => blog.id === parseInt(id));

      if (blogIndex !== -1) {
        // Update the blog while preserving the id and date
        const updatedBlog = {
          ...formData,
          id: parseInt(id),
          date: blogs[blogIndex].date, // Preserve the original date
        };

        // Update the blogs array
        blogs[blogIndex] = updatedBlog;

        // Save back to localStorage
        localStorage.setItem("myData", JSON.stringify(blogs));

        // Redirect to home page
        router.push("/");
      } else {
        console.error("Blog not found");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container bg-light" style={{ marginTop: "5rem" }}>
        <h2 className="mb-4">Edit Blog</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
