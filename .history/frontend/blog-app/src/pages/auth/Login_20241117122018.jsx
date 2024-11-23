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
