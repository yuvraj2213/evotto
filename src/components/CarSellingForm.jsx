import React, { useState } from "react";
import "../styles/CarSellingForm.css";

const baseURL = process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

function CarSellingForm() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    whatsappNumber: "",
    carName: "",
    condition: "",
    conditionDesc: "",
    sellingPrice: "",
  });

  const [carPhotos, setCarPhotos] = useState([]); // Store selected files
  const [previewImages, setPreviewImages] = useState([]); // Store preview URLs
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle text input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file selection & preview
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Generate preview URLs
    const previewURLs = files.map((file) => URL.createObjectURL(file));

    setCarPhotos(files); // Store actual files
    setPreviewImages(previewURLs); // Store preview URLs for display
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Prepare FormData
    const data = new FormData();

    // Append text fields
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // Append images
    if (carPhotos.length > 0) {
      carPhotos.forEach((file) => {
        data.append("carPhotos", file);
      });
    }

    try {
      const response = await fetch(`${baseURL}/api/cars/sell`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Form submitted successfully!");
        setFormData({
          name: "",
          address: "",
          phoneNumber: "",
          whatsappNumber: "",
          carName: "",
          condition: "",
          conditionDesc: "",
          sellingPrice: "",
        });
        setCarPhotos([]); // Reset files
        setPreviewImages([]); // Reset previews
      } else {
        alert(result.message || "Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting the form. Check the console for details.");
    }

    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2>Car Selling Form</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="car-selling-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea id="address" name="address" value={formData.address} onChange={handleChange} required></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="whatsappNumber">WhatsApp Number</label>
          <input type="tel" id="whatsappNumber" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="carName">Car Name</label>
          <input type="text" id="carName" name="carName" value={formData.carName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="condition">Condition of Car</label>
          <select id="condition" name="condition" value={formData.condition} onChange={handleChange} required>
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
            <option value="Damaged">Damaged</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="conditionDesc">Describe Car's Current Condition</label>
          <textarea id="conditionDesc" name="conditionDesc" value={formData.conditionDesc} onChange={handleChange} required></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="carPhotos">Car Photos</label>
          <input type="file" id="carPhotos" name="carPhotos" multiple accept="image/*" onChange={handleFileChange} />
          
          {/* Image Previews */}
          <div className="image-preview-container">
            {previewImages.map((src, index) => (
              <img key={index} src={src} alt={`Preview ${index + 1}`} className="image-preview" />
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="sellingPrice">Selling Price</label>
          <input type="number" id="sellingPrice" name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default CarSellingForm;
