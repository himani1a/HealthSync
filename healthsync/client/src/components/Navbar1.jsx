import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light navigation-wrap" style={{ backgroundColor: 'white' }}>
                <div className="container py-0">
                    <Link to="/" className="navbar-brand">
                        <img decoding="async" src='../src/assets/healthsync.png' alt="Logo" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto nav_ul d-flex justify-content-center align-items-center">
                            <li className="nav-item">
                                <Link className="nav-link" to="/sidebar">User Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/About">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/bloglist">Blog</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/chat">Chat</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/tracker">Tracker</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/logout">Logout</Link>
                            </li>
                        </ul>
                        <Link to="/sidebar">
                            <img src='../src/assets/avatar.jpg' alt="User" className="user-photo" style={{ width: '40px', borderRadius: '50%' }} />
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}
