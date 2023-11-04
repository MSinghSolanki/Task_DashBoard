import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import {Routes, Route, useNavigate, Link} from 'react-router-dom';

export const LoginForm = () => {

const navigate = useNavigate();



const navigateHome = () => {
  navigate('/');
};

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Perform the login request and receive the response
      const response = await axios.post(
        'http://localhost:3001/user/login',
        {
          email,
          password,
        }
      );
  
      const { user, token } = response.data;
      
      // Store the token in local storage
      localStorage.setItem('tokens', token);

      // Show success message
      console.log('Logged in user:', user);
      navigateHome();
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Login into your account</h2>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <Link to="/signup">Or Create An Account</Link>
      <button type="submit">Login</button>
    </form>
  );
};
