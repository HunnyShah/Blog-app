// Components/BlogList.js
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { formatDate, calculateReadTime } from "./utils/blogHelpers";
import Navbar from "./Navbar";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = () => {
      const storedBlogs = JSON.parse(localStorage.getItem("myData") || "[]");
      setBlogs(storedBlogs);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const searchMatch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterBy === "all") return searchMatch;
    return searchMatch && (blog.tags?.includes(filterBy) || false);
  });

  const uniqueTags = [...new Set(blogs.flatMap((blog) => blog.tags || []))];

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Our Blog
          </h1>
          <p className="text-xl mb-8">
            Discover stories, thinking and expertise
          </p>
          <Link href="/blog/create" className="btn btn-light btn-lg px-5">
            Write a Blog
          </Link>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="w-full md:w-1/2">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className={`btn ${
                filterBy === "all" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setFilterBy("all")}
            >
              All
            </button>
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                className={`btn ${
                  filterBy === tag ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setFilterBy(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <Link
                href={`/blog/${blog.id}`}
                key={blog.id}
                className="card h-100 shadow-sm hover:shadow-lg transition-all duration-300 text-decoration-none"
              >
                <div className="position-relative">
                  <img
                    src={blog.imageUrl}
                    className="card-img-top"
                    alt={blog.title}
                    style={{ height: "200px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x200?text=Blog+Image";
                    }}
                  />
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="position-absolute top-2 right-2">
                      <span className="badge bg-primary">{blog.tags[0]}</span>
                    </div>
                  )}
                </div>
                <div className="card-body">
                  <h5 className="card-title h4 mb-2">{blog.title}</h5>
                  <p className="card-text text-muted mb-4">
                    {blog.description.substring(0, 120)}...
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          blog.author
                        )}&background=random`}
                        alt={blog.author}
                        className="rounded-circle me-2"
                        width="32"
                        height="32"
                      />
                      <div>
                        <small className="text-muted d-block">
                          {blog.author}
                        </small>
                        <small className="text-muted">
                          {formatDate(blog.date)}
                        </small>
                      </div>
                    </div>
                    <small className="text-muted">
                      {calculateReadTime(blog.description)} min read
                    </small>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="mb-4">No blogs found</h3>
            {searchTerm ? (
              <p>Try adjusting your search terms</p>
            ) : (
              <>
                <p>Be the first to create a blog!</p>
                <Link href="/blog/create" className="btn btn-primary mt-3">
                  Create Blog
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default BlogList;
