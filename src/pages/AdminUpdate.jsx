import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import toast, { Toaster } from "react-hot-toast";
const baseURL = process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const AdminUpdate = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
      });

      const params=useParams();

      const {authorizationToken}=useAuth()

  const getUserData = async () => {
    try {
      const response = await fetch(`${baseURL}/api/admin/users/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data=await response.json();
      setFormData(data)
      console.log('user data;',data);
    } catch (e) {
      console.log(e);
    }
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
        const response=await fetch(`${baseURL}/api/admin/users/update/${params.id}`,{
            method:'PATCH',
            headers:{
                "Content-Type":"application/json",
                Authorization:authorizationToken,
            },
            body:JSON.stringify(formData)

        })
        console.log(response)

        if(response.ok){
            toast.success('Updated Successfully')
        }
        else{
            toast.error('Update Failed')
        }

    }catch(e){
        console.log(e)
    }
  };

  useEffect(()=>{
    getUserData()
  },[])

  return (
    <>
    <Toaster/>
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333" }}>
        Update User Details
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <label style={{ display: "flex", flexDirection: "column" }}>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            required
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column" }}>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            required
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column" }}>
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            required
          />
        </label>
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Update
        </button>
      </form>
    </div>
    </>
  );
};

export default AdminUpdate;
