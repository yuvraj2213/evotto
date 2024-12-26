import React, { useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import { Outlet } from 'react-router-dom';
import '../styles/Admin.css';
import Footer from '../components/Footer';

const Admin = () => {
    useEffect(() => {
        // Set the background color when the component mounts
        document.body.style.backgroundColor = 'lightblue';
        document.body.style.backgroundImage = 'none';
    
        // Cleanup by resetting the background when the component unmounts
        return () => {
          document.body.style.backgroundColor = '';
        };
      }, []);

    return (
        <>
            <div className="admin-layout">
                <AdminNavbar />
                <div className="admin-content">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Admin;
