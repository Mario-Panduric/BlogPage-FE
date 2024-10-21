import React, { useState } from 'react'
import styles from './Navbar.module.css';
import PostForm from './PostForm';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const handleAddNewPost = () => {
    setShowForm(!showForm); 
  };

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
    return (
      <>
        <ul className={styles.ul}>
          <li className={styles.li}><a className={styles.a} onClick={handleHome}>Home</a></li>
          <li className={styles.li}><a className={styles.a} onClick={handleAddNewPost}  >Add new post</a></li>
          <li className={styles.li}><a className={styles.a} onClick={handleLogout} >Log out</a></li>
        </ul>
        {showForm && <PostForm onSubmit={handleFormSubmit} />}
      </>
  );
};

export default Navbar;