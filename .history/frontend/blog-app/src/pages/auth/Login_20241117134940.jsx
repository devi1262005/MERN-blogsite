import React, { useState } from 'react';
import PasswordInput from "../../components/input/PasswordInput";
import {useNavigate} from "react-router-dom";
import {validateEmail{}}
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    try {
      const response = await axiosInstance.post('/login', { email, password });

      // Assuming response contains a token or user data
      console.log('Login success:', response.data);

      // Handle successful login
      // Example: Store token and navigate
      localStorage.setItem('token', response.data.token);
      // Navigate to another page, e.g., dashboard
      // navigate('/dashboard');
    } catch (err) {
      // Handle API errors
      if (err.response) {
        console.error('Error Response:', err.response.data);
        setError(err.response.data.message || 'Login failed');
      } else if (err.request) {
        console.error('No Response:', err.request);
        setError('Server did not respond. Please try again later.');
      } else {
        console.error('Error Message:', err.message);
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <div className="overlay">
          <h1 className="title">Capture Your Journeys</h1>
          <p className="subtitle">
            Record your travel experiences and memories in your personal travel journal.
          </p>
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
