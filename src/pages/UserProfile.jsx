import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import "../styles/UserProfile.css";
import { useAuth } from "../store/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const { user, isLoggedIn } = useAuth();
  const [userDetails, setUserDetails] = useState();
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file
  const [uploadStatus, setUploadStatus] = useState(""); // Status message for upload
  const [image, setImage] = useState(null);
  const [loading2, setLoading2] = useState(false);

  const { authorizationToken } = useAuth();

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
    setImage(e.target.files[0]);
  };

  // Handle file upload

  const handleFileUpload = async (e) => {
    e.preventDefault();

    setLoading2(true);

    const formData = new FormData();

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(`${baseURL}/api/doc/upload-dl`, {
        method: "POST",
        headers: {
          Authorization: authorizationToken,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Liscense uploaded successfully");
        toast.success("Liscense Uploaded successfully!");
        setLoading2(false);
        window.location.reload();
      } else {
        console.log("Backend error response:", result); // Debug backend error message
      }
    } catch (error) {
      console.error("Error in fetch:", error); // Debug fetch errors
    }
  };

  return (
    <>
      <Toaster />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <h2>User Profile</h2>
          </div>
          <div className="profile-info">
            <div className="profile-detail">
              <span className="label">Name:</span>
              <span className="value">
                {userDetails.name || "Not Available"}
              </span>
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
              <span className="label">Orders</span>
              <span className="value user-orders-btn">
                <Link to='/userOrders' className="user-orders-btn">My Orders</Link>
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
          {userDetails.dl ? null : (
            <div className="profile-actions">
              <label htmlFor="image" className="file-label">
                Upload Driver's License:
              </label>
              <input
                type="file"
                id="image"
                className="file-input"
                onChange={handleFileChange}
              />
              <button className="upload-btn" onClick={handleFileUpload}>
                {loading2 ? "Uploading..." : "Upload DL"}
              </button>
              {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
