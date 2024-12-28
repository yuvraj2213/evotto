import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AdminFeedbacks = () => {
  const { authorizationToken } = useAuth();

  const [feedback, setFeedback] = useState([]);

  const params=useParams()

  const getFeedbacks = async () => {
    const response = await fetch(`https://evotto-backend-yol8.onrender.com/api/admin/feedbacks`, {
      method: "GET",
      headers: {
        Authorization: authorizationToken,
      },
    });
    const data = await response.json();
    console.log(data);
    setFeedback(data);
  };

  const deleteFeedback=async(id)=>{
    console.log(id)
    const response=await fetch(`https://evotto-backend-yol8.onrender.com/api/admin/feedbacks/delete/${id}`,{
      method:"DELETE",
      headers:{
        Authorization:authorizationToken,
      },
    })

    console.log(response)

    if(response.ok){
      toast.success('Feedback Deleted Successfully')
      getFeedbacks()
    }
    else{
      toast.error('Feedback Not Deleted')
    }
  }

  useEffect(() => {
    getFeedbacks();
  }, []);

  return (
    <>
      <Toaster/>
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin Feedbacks Data</h1>
        </div>
        <div className="admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Feedback</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {feedback.map((curr, index) => {
                const createdAt = new Date(curr.createdAt);

                const day = createdAt.getDate();
                const month = createdAt.getMonth() + 1;  
                const year = createdAt.getFullYear();
                const hours = createdAt.getHours();
                const minutes = createdAt.getMinutes();
                const seconds = createdAt.getSeconds();
                return (
                  <tr key={index}>
                    <td>{curr.name}</td>
                    <td>{curr.email}</td>
                    <td>{curr.feedback}</td>
                    <td>{`${day}/${month}/${year}`}</td>
                    <td>{`${hours}:${minutes}:${seconds}`}</td>
                    <td>
                      <button
                        className="admin-del-btn"
                        onClick={() => deleteFeedback(curr._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AdminFeedbacks;
