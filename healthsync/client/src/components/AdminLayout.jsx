import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Collapse } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

import '../style/AdminLayout.css';

function AdminLayout() {
    const { navigate } = useNavigate();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navItemStyle = {
        color: '#e6c20e',
        borderBottom: '1px solid #e6c20e',
        paddingBottom: '0.5rem',
    };

    const location = useLocation();
    const isMainAdminPage = location.pathname === '/admin';

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    function userLogout() {
        localStorage.removeItem('token');
        navigate('/')
      }
      

    return (
        <div className="d-flex flex-column flex-lg-row" style={{ height: '100vh' }}>
            <div className={`sidebar collapse d-lg-block ${isSidebarOpen ? '' : 'd-none d-lg-block'}`} style={{ backgroundColor: '#495E57' }}>
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <a href="/admin" className="d-flex align-items-center mb-md-0 text-decoration-none">
                            <span className="fs-4" style={{ color: '#e6c20e' }}>ADMIN PANEL</span>
                        </a>
                        <button className="d-lg-none btn btn-primary" type="button" onClick={toggleSidebar}>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link nav-link-custom" to="/admin/dashboard" style={navItemStyle}>
                            <span className="me-2">🏠</span>
                            <b>Dashboard</b>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link nav-link-custom" to="/admin/users" style={navItemStyle}>
                            <span className="me-2">👤</span>
                            <b>Users</b>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link nav-link-custom" to="/admin/settings" style={navItemStyle}>
                            <span className="me-2">⚙️</span>
                            <b>Settings</b>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link nav-link-custom" to="/admin/transactions" style={navItemStyle}>
                            <span className="me-2">🧾</span>
                            <b>Transactions</b>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink Link onClick={userLogout} className="nav-link nav-link-custom" style={navItemStyle} to="/">
                            <span className="me-2">🧾</span>
                            <b>Logout</b>
                        </NavLink>
                    </li>
                    </ul>
                </div>
            </div>
            <div className="flex-grow-1 p-3">
                {/* Conditionally render the welcome card */}
                {isMainAdminPage && (
                    <div className="card text-black bg-white mb-3 no-hover-effect">
                        <div className="card-header"><h3><b>Welcome to the Admin Panel!</b></h3></div>
                        <div className="card-body">
                            <h5 className="card-title"><u>Admin Responsibilities</u></h5>
                            <p className="card-text">
                                Here you can manage all aspects of the application.
                                <br />Use the navigation links to access different sections.
                            </p>
                        </div>
                    </div>
                )}

                <Outlet />
            </div>
        </div>
    );
}

export default AdminLayout;
