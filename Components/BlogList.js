// Components/BlogList.js
"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import Navbar from "./Navbar";
import { useRouter } from "next/navigation";

function BlogList() {
  const [data, setData] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState("date"); // date, title, author
  const [sortOrder, setSortOrder] = useState("desc"); // asc, desc
  const router = useRouter();

  useEffect(() => {
    const blogs = JSON.parse(localStorage.getItem("myData") || "[]");
    setData(blogs);
  }, []);

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      const updatedData = data.filter((item) => item.id !== id);
      localStorage.setItem("myData", JSON.stringify(updatedData));
      setData(updatedData);
    }
  };

  // Get unique categories and tags
  const categories = [
    ...new Set(data.flatMap((item) => item.categories || [])),
  ];
  const allTags = [...new Set(data.flatMap((item) => item.tags || []))];

  // Filter and sort data
  let filteredData = [...data];

  // Search filter
  if (searchQuery.trim() !== "") {
    filteredData = filteredData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Category filter
  if (selectedCategory) {
    filteredData = filteredData.filter((item) =>
      item.categories?.includes(selectedCategory)
    );
  }

  // Tags filter
  if (selectedTags.length > 0) {
    filteredData = filteredData.filter((item) =>
      selectedTags.every((tag) => item.tags?.includes(tag))
    );
  }

  // Sort
  filteredData.sort((a, b) => {
    let compareA = a[sortBy];
    let compareB = b[sortBy];

    if (sortBy === "date") {
      compareA = new Date(compareA);
      compareB = new Date(compareB);
    }

    if (sortOrder === "asc") {
      return compareA > compareB ? 1 : -1;
    } else {
      return compareA < compareB ? 1 : -1;
    }
  });

  return (
    <div>
      <Navbar />
      <div className="container bg-light" style={{ marginTop: "5rem" }}>
        <div className="row">
          {filteredData.map((item) => (
            <div key={item.id} className="col-md-4">
              <div className="card mb-3">
                <img src={item.imageUrl} className="card-img-top" alt="Blog" />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">
                    {expandedId === item.id
                      ? item.description
                      : `${item.description.substring(0, 50)}...`}
                  </p>
                  <div className="d-flex justify-content-between align-items-center row">
                    <div>
                      <p className="m-0 small col">
                        {"posted by "}
                        {item.author}
                      </p>
                      <small className="text-muted">{item.date}</small>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Link
                      href={`/blog/${item.id}`}
                      className="btn btn-primary me-2"
                    >
                      Read more
                    </Link>
                    <Link
                      href={`/edit/${item.id}`}
                      className="btn btn-warning me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
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

export default BlogList;
