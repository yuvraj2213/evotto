import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import "../styles/AdminSlideshow.css";
import toast, { Toaster } from "react-hot-toast";

const AdminSlideshow = () => {
  const { authorizationToken } = useAuth();

  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // State to manage selected file

  // Fetch images for slideshow
  const fetchImages = async () => {
    try {
      const response = await fetch("https://evotto-backend.onrender.com/api/data/slideshow", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch slideshow images");
      }
      const data = await response.json();
      if (data) {
        setImages(data);
      } else {
        console.error("No images found in API response");
      }
    } catch (error) {
      console.error("Error fetching slideshow images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle image deletion
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://evotto-backend-yol8.onrender.com/api/admin/slideshow/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        toast.success("Image Deleted Successfully");
        fetchImages(); // Refresh the image list after deletion
      }

      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  // Handle file selection change
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Set selected file
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("altText", "Slideshow Image"); // Optionally include altText

    try {
      const response = await fetch(
        "https://evotto-backend-yol8.onrender.com/api/admin/slideshow/upload",
        {
          method: "POST",
          headers: {
            Authorization: authorizationToken,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to upload image");
      const data = await response.json();
      toast.success("Image uploaded successfully");
      setSelectedFile(null); // Clear selected file after successful upload
      fetchImages(); // Refresh the image list
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    }
  };

  return (
    <>
      <Toaster />
      <div className="admin-ss-block">
        {images.map((image, index) => (
          <div
            className="admin-table-container"
            key={image.id || `${image.url}-${index}`} // Fallback to a combination of properties
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
          disabled={!selectedFile}
        >
          Upload
        </button>
      </div>
    </>
  );
};

export default AdminSlideshow;
