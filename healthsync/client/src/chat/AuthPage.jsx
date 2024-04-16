import React from 'react';
import PropTypes from 'prop-types';
import '../style/Chat.css';
import Navbar1 from '../components/Navbar1';
import axios from 'axios';

const AuthPage = (props) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value; // Assuming the input has a name attribute "username"

    axios.post(
      'http://localhost:8000/authenticate',
      { username }
    )
    .then((r) => {
      console.log("Authenticated user data:", r.data); // Log for debugging

      // Call onAuth with fixed secret "Himanichat1@" and user data
      props.onAuth({ ...r.data, secret: "Himanichat1@", username: username });
    })
    .catch((e) => {
      console.error("Authentication error:", e.response ? e.response.data : 'No response data');
    });
  };

  return (
    <div>
       <div><Navbar1 /></div>
    <div className="background">
      <form onSubmit={onSubmit} className="form-card">
        <div className="form-title">Welcome 👋</div>
        <div className="form-subtitle">Set a username to get started</div>
        <div className="auth">
          <div className="auth-label">Username</div>
          <input className="auth-input" name="username" />
          <button className="auth-button" type="submit">
            Enter
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

AuthPage.propTypes = {
  onAuth: PropTypes.func.isRequired
};

export default AuthPage;
