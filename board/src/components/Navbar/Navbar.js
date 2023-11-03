
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = ({ user, onLogout }) => {
  return (
    <div className="navbar">
      <div className="user-info">
        <FontAwesomeIcon icon="user" />
        <span>hi</span>
      </div>
      <button onClick={onLogout}>
        <FontAwesomeIcon icon="sign-out-alt" />
        Login
      </button>
    </div>
  );
};

export default Navbar;
