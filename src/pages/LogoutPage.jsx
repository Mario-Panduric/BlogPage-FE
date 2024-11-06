import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx'

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    fetch('https://localhost:7149/api/Users/Logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(response => {if(response.status === 204){
      navigate('/');
      window.location.reload(); 
    }})
    
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