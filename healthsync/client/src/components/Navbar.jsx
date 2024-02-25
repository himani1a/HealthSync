import React from 'react';
import { Link } from 'react-router-dom';


export default function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light navigation-wrap">
                <div className="container py-2">
                    <Link className="navbar-brand"><img decoding="async" src='../src/assets/mian.png' alt="Logo" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto nav_ul d-flex justify-content-center align-items-center">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Blog</Link>
                            </li>
                            <div className="mx-3">
                                <Link to="/username">
                                    <button type="button" className="btn1 mx-2">Login</button>
                                </Link>
                                <Link to="/signup">
                                    <button type="button" className="btn2 mx-2">Sign Up</button>
                                </Link>
                            </div>
                        </ul>
                    </div>
                    {/* end */}
                </div>
            </nav>
        </>
    );
    }
