"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../Components/Navbar";

const EditBlog = () => {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (id) {
      const blogs = JSON.parse(localStorage.getItem("myData") || "[]");
      const blog = blogs.find((blog) => blog.id === parseInt(id));
      if (blog) {
        setFormData(blog);
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogs = JSON.parse(localStorage.getItem("myData") || "[]");
    const updatedBlogs = blogs.map((blog) =>
      blog.id === parseInt(id) ? { ...formData, id: parseInt(id) } : blog
    );
    localStorage.setItem("myData", JSON.stringify(updatedBlogs));
    router.push(`/blog/${id}`);
  };

  return (
    <div>
      <Navbar />
      <div className="container bg-light" style={{ marginTop: "5rem" }}>
        <h2 className="mb-4">Edit Blog</h2>
        <form onSubmit={handleSubmit}>
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
