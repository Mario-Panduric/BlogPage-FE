import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx'

const LogoutPage = ({ setIsAuthenticated, isAuthenticated}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.clear();
    navigate('/'); 
  };

  return (
    <div>
      <Navbar/>
      <h1>Are you sure you want to log out?</h1>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default LogoutPage;