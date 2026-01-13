import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Optional: for redirection

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '', // This is being used as the 'email'
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.username,
          password: credentials.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login Successful!");
        // Store user info in localStorage or context
        localStorage.setItem('userEmail', data.user);
        // navigate('/dashboard'); // Redirect to your home page
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="crime-container">
      <h1 className="crime-title">Login</h1>
      <section className="report-section">
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              type="email" // Changed to email for better validation
              id="username"
              name="username"
              placeholder="email"
              value={credentials.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn-submit">Login</button>
        </form>
      </section>
    </div>
  );
};

export default Login;