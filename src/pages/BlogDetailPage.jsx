import React from "react";
import "../styles/BlogDetailPage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SocialLinks from "../components/SocialLinks";
import Achievement from "../components/Achievement";
import { useLocation } from "react-router-dom";

const BlogDetailPage = () => {
  const location = useLocation();
  const blog = location.state?.blog;
  return (
    <>
      <Navbar />
      <div className="blog-detail-main">
        <img src={blog.url} alt="Blog Image" className="blog-detail-image" />
        <h2>{blog.title}</h2>
        <div className="blog-detail-content">
          <p>{blog.content}</p>{" "}
        </div>
      </div>
      <section className="social-links">
        <SocialLinks />
      </section>
      <Footer />
    </>
  );
};

export default BlogDetailPage;
