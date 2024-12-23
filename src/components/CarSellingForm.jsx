import React, { useState } from "react";
import "../styles/CarSellingForm.css"; 

function CarSellingForm() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    whatsappNumber: "",
    carName: "",
    condition: "",
    conditionDesc:"",
    carPhotos: null,
    sellingPrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, carPhotos: e.target.files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="form-container">
      <h2>Car Selling Form</h2>
      <form onSubmit={handleSubmit} className="car-selling-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="whatsappNumber">WhatsApp Number</label>
          <input
            type="tel"
            id="whatsappNumber"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="carName">Car Name</label>
          <input
            type="text"
            id="carName"
            name="carName"
            value={formData.carName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="condition">Condition of Car</label>
          <select
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
          >
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
            <option value="Damaged">Damaged</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="condition-desc">Describe Car's Current Condition</label>
          <textarea
            id="conditionDesc"
            name="conditionDesc"
            value={formData.conditionDesc}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="carPhotos">Car Photos</label>
          <input
            type="file"
            id="carPhotos"
            name="carPhotos"
            onChange={handleFileChange}
            multiple
            accept="image/*"
          />
        </div>

        <div className="form-group">
          <label htmlFor="sellingPrice">Selling Price</label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default CarSellingForm;
