import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import "../styles/AdminSlideshow.css";
import toast, { Toaster } from "react-hot-toast";

const baseURL = process.env.REACT_APP_BASE_URL || "https://your-backend-url.com";

const AdminSlideshow = () => {
  const { authorizationToken } = useAuth();

  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    try {
      const response = await fetch(`${baseURL}/api/data/slideshow`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch slideshow images");
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching slideshow images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${baseURL}/api/admin/slideshow/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        toast.success("Image Deleted Successfully");
        fetchImages();
      }
    } catch (e) {
      console.error("Error deleting image:", e);
      toast.error("Failed to delete image");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("altText", "Slideshow Image");

    try {
      const response = await fetch(`${baseURL}/api/admin/slideshow/upload`, {
        method: "POST",
        headers: {
          Authorization: authorizationToken,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload image");
      const data = await response.json();
      toast.success("Image uploaded successfully");
      setSelectedFile(null);
      fetchImages();
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="admin-ss-block">
        {images.map((image, index) => (
          <div
            className="admin-table-container"
            key={image._id || `${image.url}-${index}`}
          >
            <div>
              <img
                className="admin-slideshow"
                src={image.url}
                alt={image.altText}
              />
            </div>
            <div>
              <button
                onClick={() => handleDelete(image._id)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#ff4d4d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-upload">
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          style={{ marginBottom: "10px" }}
          className="admin-upload-select"
        />
        <button
          className="admin-upload-img-btn"
          onClick={handleUpload}
          disabled={!selectedFile || loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </>
  );
};

export default AdminSlideshow;
