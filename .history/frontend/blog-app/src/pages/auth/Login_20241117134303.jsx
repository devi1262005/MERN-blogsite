import React, { useState } from 'react';

const Login = () => {
  // State hooks for email, password, and form error handling
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form data (basic validation)
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      // Placeholder for API login request
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Assuming response contains a token or user data
        const data = await response.json();
        console.log('Login success:', data);
        // Handle successful login, e.g., store token in localStorage, navigate, etc.
      } else {
        // Handle API errors (e.g., invalid credentials)
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (err) {
      // Handle network or other unexpected errors
      setError('An error occurred. Please try again later.');
    }
  };

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
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={handleEmailChange}
          />
          <div className="password-container">
            <input
              type="password"
              placeholder="Password"
              className="input"
              value={password}
              onChange={handlePasswordChange}
            />
            
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        {error && <p style={{ color: 'red', fontSize: '14px', marginTop: '10px' }}>{error}</p>}

        <p className="or-text">Or</p>
        <button className="create-account-button">Create Account</button>
      </div>
    </div>
  );
};

export default Login;
