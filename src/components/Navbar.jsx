import React, { useState, useEffect } from 'react'
import styles from './Navbar.module.css';
import PostForm from './PostForm';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import getLoggedUser from '../services/GetLoggedUser';

const Navbar = () => {
  const [user, setUser] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const handleAddNewPost = () => {
    setShowForm(!showForm); 
  };

  const fetchUser = async() => {
    let loggedUser = await getLoggedUser();
    setUser(loggedUser[1].value);
    console.log(loggedUser[1].value);
  }
  fetchUser();
  const handleLogout = () => {
    navigate('/logout');
  };

  const handleHome = () => {
    if(showForm){
      setShowForm(false)
    }
    navigate('/home')
  };
  
  const handleFormSubmit = (postText) => {
    console.log('New post:', postText); 
    setShowForm(false); 
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  }

  const submitSearch = (title) => {
    navigate(`/blogs/${title}`);
  }
    return (
      <UserContext.UserProvider>
        <nav className={styles.nav}>
          <h3>Welcome {user} </h3>
          <input placeholder='Search' type='search' className={styles.input} value={searchValue} onChange={handleSearch}></input>
          <button className={styles.button} onClick={()=> submitSearch(searchValue)}>Search</button>
          <ul className={styles.ul}>
            <li className={styles.li}><a className={styles.a} onClick={handleHome}>Home</a></li>
            <li className={styles.li}><a className={styles.a} onClick={handleAddNewPost}  >Add new post</a></li>
            <li className={styles.li}><a className={styles.a} onClick={handleLogout} >Log out</a></li>
          </ul>
          
          
        </nav>
        {showForm && <PostForm onSubmit={handleFormSubmit} />}
      </UserContext.UserProvider>
  );
};

export default Navbar;