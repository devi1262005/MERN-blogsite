import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter a valid email and password.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format.');
      return;
    }
    setError('');

    // Placeholder for login API integration
    console.log('Integrate login API here.');
  };

  return (
    <div className="page-container">
      <div className="card">
        <div className="right-section">
          <div className="overlay">
            <h1 className="title">Capture Your Journeys</h1>
            <p className="subtitle">Record your travel experiences and memories in your personal travel journal.</p>
          </div>
        </div>
        <div className="left-section">
          <h2 className="login-title">Login</h2>
          <form className="form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="password-container">
              <input
                type="password"
                placeholder="Password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
          {error && <p className="error-text">{error}</p>}
          <p className="or-text">Or</p>
          <button className="create-account-button">Create Account</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
