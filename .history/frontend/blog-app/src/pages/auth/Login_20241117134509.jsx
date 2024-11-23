import React, { useState } from 'react';
const handleLogin = async (email, password) => {
  try {
    const response = await axiosInstance.post('/login', { email, password });

    // Assuming response contains a token or user data
    console.log('Login success:', response.data);
    // Handle successful login, e.g., store token in localStorage, navigate, etc.

  } catch (err) {
    // Handle API errors (e.g., invalid credentials, network issues)
    if (err.response) {
      // The request was made, and the server responded with an error status code
      console.error('Error Response:', err.response.data);
      setError(err.response.data.message || 'Login failed');
    } else if (err.request) {
      // The request was made but no response was received
      console.error('No Response:', err.request);
      setError('Server did not respond. Please try again later.');
    } else {
      // Something else triggered the error
      console.error('Error Message:', err.message);
      setError('An error occurred. Please try again later.');
    }
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
