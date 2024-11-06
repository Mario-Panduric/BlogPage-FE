import './App.css';
import './pages/SignIn.jsx'
import React, { useState, useEffect } from 'react';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Home from './pages/Home.jsx' 
import { Route, Routes } from "react-router-dom";
import Blog from './pages/Blog.jsx';
import LogoutPage from './pages/LogoutPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthentication = async () => {
    try {
      const response = await fetch('https://localhost:7149/api/Users/verify', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        localStorage.setItem("auth", 'true')
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      localStorage.setItem("auth", 'false')
      console.error("Error during authentication check:", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <Routes>
      <Route path="/" element={ isAuthenticated ? <Home /> :<SignIn />} />
      <Route path="/signup" element={isAuthenticated ? <Home /> :<SignUp />} />
      <Route path="/home" element={<PrivateRoute isAuthenticated={isAuthenticated}><Home /></PrivateRoute>} />
      <Route path="/blog/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><Blog /></PrivateRoute>} />
      <Route path="/logout" element={<LogoutPage />} />
    </Routes>
  );
}

export default App;
