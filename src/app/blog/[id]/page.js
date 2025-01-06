// app/blog/[id]/page.js
"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../../../Components/Navbar";
import SocialShare from "../../../../Components/SocialShare";
import Comments from "../../../../Components/Comments";
import {
  calculateReadTime,
  formatDate,
} from "../../../../Components/utils/blogHelpers";

const BlogDetails = ({ params }) => {
  const [blogDetail, setBlogDetail] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Unwrap params using React.use()
  const { id } = React.use(params);

  useEffect(() => {
    const blogs = JSON.parse(localStorage.getItem("myData") || "[]");
    const selectedBlog = blogs.find((blog) => blog.id === parseInt(id));
    setBlogDetail(selectedBlog);

    // Load likes and bookmark state
    const storedLikes = localStorage.getItem(`likes_${id}`) || 0;
    const storedBookmark = localStorage.getItem(`bookmark_${id}`) === "true";
    setLikes(parseInt(storedLikes));
    setIsBookmarked(storedBookmark);
  }, [id]);

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`likes_${id}`, newLikes.toString());
  };

  const handleBookmark = () => {
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    localStorage.setItem(`bookmark_${id}`, newBookmarkState.toString());
  };

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

  const readTime = calculateReadTime(blogDetail.description);

  return (
    <div>
      <Navbar />
      <div className="container bg-light" style={{ marginTop: "5rem" }}>
        {/* Rest of your JSX remains the same */}
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
            {/* Meta information */}
            <div className="mb-3 text-muted">
              <small>
                {formatDate(blogDetail.date)} • {readTime} min read
              </small>
            </div>

            <h1 className="card-title">{blogDetail.title}</h1>

            <div className="d-flex align-items-center mb-3">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  blogDetail.author
                )}`}
                alt={blogDetail.author}
                className="rounded-circle me-2"
                width="40"
                height="40"
              />
              <div>
                <h6 className="mb-0">{blogDetail.author}</h6>
                <small className="text-muted">Author</small>
              </div>
            </div>

            {/* Content */}
            <div className="my-4">
              <p className="card-text">{blogDetail.description}</p>
            </div>

            {/* Social Share */}
            <SocialShare
              title={blogDetail.title}
              url={typeof window !== "undefined" ? window.location.href : ""}
            />

            {/* Interaction Buttons */}
            <div className="d-flex gap-2 my-3">
              <button className="btn btn-outline-danger" onClick={handleLike}>
                ❤️ {likes} Likes
              </button>
              <button
                className={`btn ${
                  isBookmarked ? "btn-warning" : "btn-outline-warning"
                }`}
                onClick={handleBookmark}
              >
                {isBookmarked ? "🔖 Bookmarked" : "🔖 Bookmark"}
              </button>
            </div>

            {/* Comments Section */}
            <Comments blogId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
