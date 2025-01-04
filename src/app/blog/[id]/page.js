// app/blog/[id]/page.js
"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../../../Components/Navbar";

const BlogDetails = ({ params }) => {
  const [blogDetail, setBlogDetail] = useState(null);

  useEffect(() => {
    const blogs = JSON.parse(localStorage.getItem("myData") || "[]");
    const selectedBlog = blogs.find((blog) => blog.id === parseInt(params.id));
    setBlogDetail(selectedBlog);
  }, [params.id]);

  if (!blogDetail) {
    return (
      <div>
        <Navbar />
        <div className="container mt-5 pt-5">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container bg-light" style={{ marginTop: "5rem" }}>
        <div className="card mt-5">
          <img
            src={blogDetail.imageUrl}
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              objectFit: "cover",
            }}
            className="card-img-top"
            alt={blogDetail.title}
          />
          <div className="card-body">
            <h1 className="card-title">{blogDetail.title}</h1>
            <div className="text-muted mb-3">
              <small>
                Posted by {blogDetail.author} on {blogDetail.date}
              </small>
            </div>
            <p className="card-text">{blogDetail.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
