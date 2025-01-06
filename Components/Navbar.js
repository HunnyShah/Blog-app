// Components/Navbar.js
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
    setSearchQuery("");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top ${
        isScrolled ? "bg-dark shadow" : "bg-transparent"
      } navbar-dark transition-all duration-300`}
    >
      <div className="container">
        {/* Logo */}
        <Link
          className="navbar-brand d-flex align-items-center gap-2 fw-bold"
          href="/"
        >
          <span className="bi bi-book-half fs-4"></span>
          Mega Blogs
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-controls="navbarNav"
          aria-expanded={isNavOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Items */}
        <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}>
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link
                href="/"
                className={`nav-link px-3 ${
                  pathname === "/" ? "active fw-bold" : ""
                }`}
                onClick={() => setIsNavOpen(false)}
              >
                <i className="bi bi-house-door me-1"></i>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/blog/create"
                className={`nav-link px-3 ${
                  pathname === "/blog/create" ? "active fw-bold" : ""
                }`}
                onClick={() => setIsNavOpen(false)}
              >
                <i className="bi bi-plus-circle me-1"></i>
                Create Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/categories"
                className={`nav-link px-3 ${
                  pathname === "/categories" ? "active fw-bold" : ""
                }`}
                onClick={() => setIsNavOpen(false)}
              >
                <i className="bi bi-grid me-1"></i>
                Categories
              </Link>
            </li>
          </ul>

          {/* Search Form */}
          <form className="d-flex" onSubmit={handleSearch}>
            <div className="input-group">
              <input
                type="search"
                className="form-control form-control-sm bg-light"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-outline-light btn-sm" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>

          {/* Create Blog Button (visible on larger screens) */}
          <Link
            href="/blog/create"
            className="btn btn-primary btn-sm ms-3 d-none d-lg-block"
          >
            <i className="bi bi-plus-lg me-1"></i>
            New Blog
          </Link>
        </div>
      </div>

      {/* Mobile Search (visible when menu is open) */}
      <div className={`container pb-3 ${isNavOpen ? "d-lg-none" : "d-none"}`}>
        <form onSubmit={handleSearch}>
          <div className="input-group">
            <input
              type="search"
              className="form-control form-control-sm bg-light"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-light btn-sm" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
