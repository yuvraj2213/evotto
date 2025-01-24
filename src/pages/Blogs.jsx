import React from "react";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import Footer from "../components/Footer";
import BlogCardPage from "../components/BlogCardPage";

const Blogs = () => {
  return (
    <>
      <Navbar />  

      <BlogCardPage/>

      <section className="social-links">
        <SocialLinks />
      </section>

      <Footer />
      
    </>
  );
};

export default Blogs;
