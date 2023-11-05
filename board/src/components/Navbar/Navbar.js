import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';
import './Navbar.css';

export const Navbar = () => {

  const user = localStorage.getItem('tokens');
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem('tokens');
    navigate('/login');
  };

  const userName = localStorage.getItem("userName")

  return (
    <div>
      <nav className="navbar">
        <div className="links">
          {user && (
            <>
              <Link className="button-54" to="/sell">
                {userName}
              </Link>
            </>
          )}
        </div>
        {user ? (
          <button className="button-54" onClick={onLogout}>
            Logout
          </button>
        ) : (
          <Link className="button-54" to="/login">
            Login
          </Link>
        )}
      </nav>
    </div>
  );
};
