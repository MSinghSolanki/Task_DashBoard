
import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const LoginForm = () => {


  const BASE_URL = process.env.REACT_APP_BASE_URL||"";
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
  
      const response = await axios.post(
       "http://localhost:3002/api/user/login",
        {
          email,
          password,
        }
      );
  
      const { user_data, token } = response.data.data;
     
      // Store the token in local storage
      localStorage.setItem('tokens', token);

      // Show success message
      console.log('Logged in user:', user_data);
      navigateHome();
    } catch (error) {
      // Show error message
      toast.error('Incorrect Email or Password User', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error('Login error:', error);
    }
  };
  

  return (
    <div>
    <ToastContainer />
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Login into your account</h2>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e=>setValues}
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
    </div>
  );
};
