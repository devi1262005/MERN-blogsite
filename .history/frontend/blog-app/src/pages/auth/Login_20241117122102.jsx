import React from 'react';

const Login = () => {
  return (
    <div className="container">
      <div className="left-section">
        <div className="overlay">
          <h1 className="title">Capture Your Journeys</h1>
          <p className="subtitle">Record your travel experiences and memories in your personal travel journal.</p>
        </div>
      </div>
      <div className="right-section">
        <h2 className="login-title">Login</h2>
        <form className="form">
          <input type="email" placeholder="Email" className="input" />
          <div className="password-container">
            <input type="password" placeholder="Password" className="input" />
            <button type="button" className="toggle-button">👁</button>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="or-text">Or</p>
        <button className="create-account-button">Create Account</button>
      </div>
    </div>
  );
};

export default Login;
