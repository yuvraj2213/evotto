import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import { useAuth } from "../store/auth";
import "../styles/AdminUsers.css";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const baseURL = process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const AdminUsers = () => {
  const { authorizationToken } = useAuth();

  const [users, setUsers] = useState([]);

  const getAllUsersData = async () => {
    try {
      const response = await fetch(`${baseURL}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();

      setUsers(data);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser=async(id)=>{
    console.log(id)

    const response = await fetch(`${baseURL}/api/admin/users/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: authorizationToken,
      },
    });

    if(response.ok){
      toast.success('User Deleted Successfully')
      getAllUsersData();
    }

    const data=await response.json();
    console.log(data);
  }

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <>
    <Toaster/>
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin Users Data</h1>
        </div>
        <div className="admin-users">
          <table>
            <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
            </thead>
            <tbody>
              {users.map((curr, index) => {
                return <tr key={index}>
                  <td>{curr.name}</td>
                  <td>{curr.email}</td>
                  <td>{curr.phone}</td>
                  <td className="admin-edit-users-btn"><Link to={`/admin/users/${curr._id}/edit`}>Edit</Link></td>
                  <td>
                    <button className="admin-del-btn" onClick={()=>deleteUser(curr._id)}>Delete</button>
                  </td>
                </tr>;
              })}
              </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AdminUsers;
