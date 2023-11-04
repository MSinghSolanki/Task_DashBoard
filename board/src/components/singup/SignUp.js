import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
const navigate = useNavigate();

const navigateToHome = ()=>{
  navigate("/")
}
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/user/register', {
        name,
        email,
        password,
      });
      console.log(name,email,password)
      const { user, token } = response.data;
      // Get existing tokens from local storage or create an empty array if none exist
      const existingTokens = JSON.parse(localStorage.getItem('tokens')) || [];
      // Add the new token to the array
      existingTokens.push(token);
      // Store the updated array of tokens in local storage
      localStorage.setItem('tokens', JSON.stringify(existingTokens));
      // Show success message
      toast.success('Registration Successful', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Clear the form fields
      setName('');
      setEmail('');
      setPassword('');
      // Do something with the user data if needed
      console.log('Registered user:', user);
      navigateToHome();
    } catch (error) {
      // Show error message
      toast.error('Email Already in use', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create an account</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
