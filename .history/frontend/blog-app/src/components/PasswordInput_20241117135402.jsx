import React, { useState } from 'react';

const PasswordInput = ({ value, onChange, placeholder = 'Password', className = '' }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className={`password-input-container ${className}`}>
      <input
        type={isPasswordVisible ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="password-input"
        required
      />
      <button
        type="button"
        className="toggle-password-visibility"
        onClick={togglePasswordVisibility}
      >
        {isPasswordVisible ? 'Hide' : 'Show'}
      </button>
    </div>
  );
};

export default PasswordInput;
