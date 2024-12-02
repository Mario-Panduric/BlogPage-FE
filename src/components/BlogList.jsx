import React from 'react';
import styles from './BlogList.module.css'; 

const BlogList = ({ blogs, handleBlogClick }) => {
  return (
    <div className={styles.container}>
      <h1>Blogs</h1>
      <div className={styles.blogList}>
        {blogs.map((blog) => (
          <div key={blog.id} className={styles.blogBox} onClick={() => handleBlogClick(blog.id)}>
            <h2>{blog.title}</h2> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;