import React, { useEffect, useState } from "react";
import "../styles/UserProfile.css";
import { useAuth } from "../store/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const { user, isLoggedIn } = useAuth();
  const [userDetails, setUserDetails] = useState();
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file
  const [uploadStatus, setUploadStatus] = useState(""); // Status message for upload

  useEffect(() => {
    if (user && user.userData) {
      setUserDetails(user.userData);
    }
  }, [user]);

  useEffect(() => {
    if (userDetails) {
      console.log("Updated user details:", userDetails);
    }
  }, [userDetails]);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <p>Loading..</p>
        </div>
        <Footer />
      </>
    );
  }

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("license", selectedFile);
    formData.append("user", JSON.stringify(user)); // Attach user object to the request

    try {
      const response = await fetch("http://localhost:2213/api/data/upload-dl", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`, 
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();

      setUserDetails((prev) => ({
        ...prev,
        dl: data.url,
      }));

      setUploadStatus("File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("File upload failed. Please try again.");
    }
  };

  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-card">
        <div className="profile-header">
          <h2>User Profile</h2>
        </div>
        <div className="profile-info">
          <div className="profile-detail">
            <span className="label">Name:</span>
            <span className="value">{userDetails.name || "Not Available"}</span>
          </div>
          <div className="profile-detail">
            <span className="label">Email:</span>
            <span className="value">
              {userDetails.email || "Not Available"}
            </span>
          </div>
          <div className="profile-detail">
            <span className="label">Phone:</span>
            <span className="value">
              {userDetails.phone || "Not Available"}
            </span>
          </div>
          <div className="profile-detail">
            <span className="label">Driver's License:</span>
            <span className="value">
              {userDetails.dl ? (
                <a
                  href={userDetails.dl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View DL
                </a>
              ) : (
                "Not Uploaded"
              )}
            </span>
          </div>
        </div>
        <div className="profile-actions">
          <label htmlFor="dl-upload" className="file-label">
            Upload Driver's License:
          </label>
          <input
            type="file"
            id="dl-upload"
            className="file-input"
            onChange={handleFileChange}
          />
          <button className="upload-btn" onClick={handleFileUpload}>
            Upload DL
          </button>
          {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
