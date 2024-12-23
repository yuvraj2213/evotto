import React, { useState } from "react";
import "../styles/Login.css";
import { Link } from "react-router-dom";

const Login = ({check, setCheck}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="signup-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="signup-form">

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="user-check">
          <button onClick={()=>setCheck(!check)}>
            New here?
          </button>
        </div>
        <button type="submit" className="signup-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
