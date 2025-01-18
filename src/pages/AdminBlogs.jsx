import React, { useState } from "react";
import { useAuth } from "../store/auth";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const AdminBlogs = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const { authorizationToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setMessage("Title and content are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image); 
    }

    try {

      const response = await fetch(`${baseURL}/api/admin/addBlog`, {
        method: "POST",
        headers: {
          Authorization: authorizationToken, 
        },
        body: formData, 
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message || "Blog added successfully");
        setTitle("");
        setContent("");
        setImage(null);
      } else {
        console.log("Backend error response:", result); // Debug backend error message
        setMessage(result.message || "Error adding blog");
      }
    } catch (error) {
      console.error("Error in fetch:", error); // Debug fetch errors
      setMessage("An error occurred while adding the blog");
    }
  };

  return (
    <div className="admin-blogs">
      <h2>Add New Blog</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter blog content"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {image && (
            <p className="selected-image">
              Selected image: <strong>{image.name}</strong>
            </p>
          )}
        </div>

        <button type="submit" className="submit-button">
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default AdminBlogs;
