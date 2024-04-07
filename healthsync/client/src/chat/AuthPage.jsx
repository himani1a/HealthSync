import React from 'react';
import PropTypes from 'prop-types';
import '../style/Chat.css';
import axios from 'axios';

const AuthPage = (props) => {
  const onSubmit = (e) => {
    e.preventDefault();
    // Use `new FormData()` and `FormData.get()` if the form gets more complex
    const username = e.target.elements.username.value; // Assuming the input has a name attribute "username"
    axios.post(
      'http://localhost:8000/authenticate',
      { username }
    )
    .then((r) => {
      console.log("Authenticated user data:", r.data); // Add for debugging

      // Whether logged in or newly created, call onAuth to proceed
      props.onAuth({ ...r.data, secret: username , username: username }); // Over-ride or set secret
    })
    .catch((e) => {
      // Handle and display error messages properly
      console.error("Authentication error:", e.response.data);
    });
  };

  return (
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
  );
};

AuthPage.propTypes = {
  onAuth: PropTypes.func.isRequired
};

export default AuthPage;
