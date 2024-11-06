import Navbar from '../components/Navbar.jsx'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BlogList from '../components/BlogList.jsx';


function Home(){
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        
        axios.get('https://localhost:7149/api/Posts', {
            withCredentials: true},
        ) 
        .then((response) => {
            setBlogs(response.data); 
        })
        .catch((error) => {
            console.error('Error fetching blogs:', error);
        });
    }, []);
    const handleBlogClick = (id) => {
        navigate(`/blog/${id}`); 
      };
      console.log()
    return (
        <div>
            <Navbar />
            <BlogList blogs={blogs} handleBlogClick={handleBlogClick} />
        </div>
    )
}

export default Home;