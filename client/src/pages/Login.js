import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const url = process.env.REACT_APP_SERVER_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/user/login`, { username, password });
      if (response.data.success) {
        localStorage.setItem('df_username', username); // Only store username for session
        setError('');
        navigate('/');
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="login-error">{error}</div>}
        <button type="submit">Login</button>
        <div className="login-signup-link">
          New user? <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login; 