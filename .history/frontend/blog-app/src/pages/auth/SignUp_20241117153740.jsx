import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router for navigation
import axiosInstance from '../../utils/axiosInstance'; // Import axios instance

const SignUp = () => {
  const [fullName, setFullName] = useState(''); // State for full name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to navigate between routes

  const handleFullNameChange = (e) => setFullName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh
    setError(''); // Reset error message
    try {
      const response = await axiosInstance.post('/create_account', { fullName, email, password });

      // Handle successful sign-up
      console.log('Sign-Up success:', response.data);
      localStorage.setItem('token', response.data.token); // Store the token in local storage

      // Redirect to login after sign-up
      navigate('/login'); // Use navigate to go to the login page
    } catch (err) {
      // Handle errors
      if (err.response) {
        console.error('Error Response:', err.response.data);
        setError(err.response.data.message || 'Sign-Up failed. Please try again.');
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
          <h1 className="title">Join Us</h1>
          <p className="subtitle">Create an account to get started.</p>
        </div>
      </div>
      <div className="right-section">
        <h2 className="signup-title">Sign Up</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="input"
            value={fullName}
            onChange={handleFullNameChange}
            required
          />
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
          <button type="submit" className="signup-button">
            Create Account
          </button>
        </form>
        {error && <p style={{ color: 'red', fontSize: '14px', marginTop: '10px' }}>{error}</p>}

        <p className="or-text">Or</p>
        <button className="login-button" onClick={() => navigate('/login')}>
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default SignUp;
