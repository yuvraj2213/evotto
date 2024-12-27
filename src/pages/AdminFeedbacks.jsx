import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AdminFeedbacks = () => {
  const { authorizationToken } = useAuth();

  const [feedback, setFeedback] = useState([]);

  const params=useParams()

  const getFeedbacks = async () => {
    const response = await fetch(`http://localhost:2213/api/admin/feedbacks`, {
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
    const response=await fetch(`http://localhost:2213/api/admin/feedbacks/delete/${id}`,{
      method:"DELETE",
      headers:{
        Authorization:authorizationToken,
      },
    })

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
              </tr>
            </thead>
            <tbody>
              {feedback.map((curr, index) => {
                return (
                  <tr key={index}>
                    <td>{curr.name}</td>
                    <td>{curr.email}</td>
                    <td>{curr.feedback}</td>
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
