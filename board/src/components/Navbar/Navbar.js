import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';
import './Navbar.css';

export const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const [auth,setAuth]=useState(false)
  const user = localStorage.getItem('tokens');
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem('tokens');
    navigate('/login');
  };
  useEffect(() => {
    
    axios.get('http://localhost:3002/api/user/getUser', { 
    })
    .then(response => {
      if(response.data.status ==="success"){
        setAuth(true)
        setUserData(response.data.name);
      }
    })
  
  }, []);

  return (
    <div>
          <nav className="navbar">
          <div className="links">
            {user && auth ? (
              <>
                <Link className="button-54" to="/sell">
                  {userData}
                </Link>
                <button className="button-54" onClick={onLogout}>
                  Logout
                </button>
              </>
            ) : (
              <Link className="button-54" to="/login">
                Login
              </Link>
            )}
          </div>
        </nav>
    </div>
  );
};
  
    
 
