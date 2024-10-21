import './App.css';
import './pages/SignIn.jsx'
import React, { useState } from 'react';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Home from './pages/Home.jsx' 
import { Route, Routes } from "react-router-dom";
import Blog from './pages/Blog.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import LogoutPage from './pages/LogoutPage.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Routes>
      <Route path="/" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<ProtectedRoute isAuthenticated={isAuthenticated}> <Home isAuthenticated={isAuthenticated}/></ProtectedRoute>} />
      <Route path="/blog/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Blog /></ProtectedRoute>}/>
      <Route path="/logout" element={<ProtectedRoute setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} ><LogoutPage setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
