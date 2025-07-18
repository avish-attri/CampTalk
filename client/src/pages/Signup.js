import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const url = process.env.REACT_APP_SERVER_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/user/register`, { username, password });
      if (response.data.success) {
        setError('');
        navigate('/login');
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Choose a password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="login-error">{error}</div>}
        <button type="submit">Sign Up</button>
        <div className="login-signup-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup; 