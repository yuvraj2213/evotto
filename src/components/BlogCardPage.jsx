import React, { useEffect, useState } from "react";
import "../styles/BlogCardPage.css";
import { useNavigate } from "react-router-dom";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const BlogCardPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${baseURL}/api/data/getAllBlogs`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching cars data:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleBlogClick = (blog) => {
    navigate("/blog-detail", { state: { blog } });
  };

  return (
    <>
      <h2 className="blog-heading">Blogs</h2>
      <div className="blog-card-main">
        {console.log(blogs)}
        {blogs?.map((curr, index) => (
          <div className="blog-card" onClick={() => handleBlogClick(curr)}>
            <img src={curr.url} alt="Blog Image" />
            <p className="blog-card-date">{curr.createdAt.slice(0, 10)}</p>
            <p className="blog-card-title">{curr.title}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogCardPage;
