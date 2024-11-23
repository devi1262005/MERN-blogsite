import React from 'react';

const Login = () => {
  return (
    <div style={styles.container}>
      {/* Left section with image and text */}
      <div style={styles.leftSection}>
        <div style={styles.overlay}>
          <h1 style={styles.title}>Capture Your Journeys</h1>
          <p style={styles.subtitle}>
            Record your travel experiences and memories in your personal travel journal.
          </p>
        </div>
      </div>

      {/* Right section with login form */}
      <div style={styles.rightSection}>
        <h2 style={styles.loginTitle}>Login</h2>
        <form style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
          />
          <div style={styles.passwordContainer}>
            <input
              type="password"
              placeholder="Password"
              style={styles.input}
            />
            <button
              type="button"
              style={styles.toggleButton}
            >
              👁️
            </button>
          </div>
          <button type="submit" style={styles.loginButton}>
            LOGIN
          </button>
        </form>
        <p style={styles.orText}>Or</p>
        <button style={styles.createAccountButton}>
          CREATE ACCOUNT
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#e9fcfc',
  },
  leftSection: {
    flex: 1,
    backgroundImage: 'url("https://via.placeholder.com/500x500.png")', // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    bottom: '20%',
    left: '10%',
    color: '#fff',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: '10px',
    fontSize: '1rem',
  },
  rightSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  loginTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  passwordContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  toggleButton: {
    position: 'absolute',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  loginButton: {
    padding: '10px',
    backgroundColor: '#00a1b3',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  orText: {
    margin: '1rem 0',
    color: '#888',
  },
  createAccountButton: {
    padding: '10px',
    backgroundColor: '#e3f5f5',
    color: '#00a1b3',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Login;
