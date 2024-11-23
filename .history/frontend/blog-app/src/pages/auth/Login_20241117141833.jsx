import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router for navigation
import axiosInstance from '../../utils/axiosInstance'; // Import axios instance

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to navigate between routes

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh
    setError(''); // Reset error message
    try {
      const response = await axiosInstance.post('/login', { email, password });

      // Handle successful login
      console.log('Login success:', response.data);
      localStorage.setItem('token', response.data.token); // Store the token in local storage
      navigate('/home'); //Redirect to Home page
    } catch (err) {
      // Handle errors
      if (err.response) {
        console.error('Error Response:', err.response.data);
        setError(err.response.data.message || 'Login failed. Please try again.');
      } else if (err.request) {
        console.error('No Response:', err.request);
        setError('Server did not respond. Please try again later.');
      } else {
        console.error('Error Message:', err.message);
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <div className="overlay">
          <h1 className="title">Welcome Back</h1>
          <p className="subtitle">Sign in to access your dashboard.</p>
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
            required
          />
          <div className="password-container">
            <input
              type="password"
              placeholder="Password"
              className="input"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        {error && <p style={{ color: 'red', fontSize: '14px', marginTop: '10px' }}>{error}</p>}

        <p className="or-text">Or</p>
        <button className="create-account-button">Create Account</button>
      </div>
    </div>
  );
};

export default Login;
