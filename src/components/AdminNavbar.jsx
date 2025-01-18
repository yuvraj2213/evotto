import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/AdminNavbar.css'

const AdminNavbar = () => {
  return (
    <>
        <div className="admin-navbar">
            <ul>
                <li className='heading'>Admin Panel</li>
                <li>
                    <NavLink to="/admin">Admin Home</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/users">Users</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/feedbacks">Feedbacks</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/slideshow">Slideshow</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/rentalLocations">Rental Locations</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/rentalVehicles">Rental Vehicles</NavLink>
                </li>
                <li>
                    <NavLink to="/admin/blogs">Blogs</NavLink>
                </li>
            </ul>
        </div>
    </>

  )
}

export default AdminNavbar
