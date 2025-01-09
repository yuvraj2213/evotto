import React, { useState, useEffect } from "react";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [altText, setAltText] = useState("");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]); // State to hold fetched images

  // Fetch images from the backend
  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:2213/api/images");
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      } else {
        console.error("Failed to fetch images.");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages(); // Fetch images on component mount
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAltTextChange = (e) => {
    setAltText(e.target.value);
  };

  const handleUpload = async () => {
    if (!image) {
      setMessage("Please select an image to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("altText", altText);

    try {
      const response = await fetch("http://localhost:2213/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Image uploaded successfully!");
        setAltText(""); // Reset alt text
        fetchImages(); // Refresh the image list
      } else {
        setMessage("Failed to upload image. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("Error uploading image. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Upload and View Images</h1>
      <div>
        <input type="file" onChange={handleFileChange} />
        <input
          type="text"
          placeholder="Enter alt text"
          value={altText}
          onChange={handleAltTextChange}
        />
        <button onClick={handleUpload}>Upload</button>
      </div>
      {message && <p>{message}</p>}

      <h2>Uploaded Images</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images.map((image) => (
          <div key={image._id} style={{ margin: "10px" }}>
            <img
              src={`${image.url}`}
              alt={image.altText}
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            {console.log(`image ka h ${image.url}`)}
            <p>{image.altText}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadImage;
