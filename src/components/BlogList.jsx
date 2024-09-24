import React from 'react';
import styles from './BlogList.module.css'; // Pretpostavimo da koristiš CSS module

const BlogList = ({ blogs, handleBlogClick }) => {
  return (
    <div className={styles.container}>
      <h1>Blog Posts</h1>
      <div className={styles.blogList}>
        {blogs.map((blog) => (
          <div key={blog.id} className={styles.blogBox} onClick={() => handleBlogClick(blog.id)}>
            <h2>{blog.title}</h2> {/* Prikaz samo naslova */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;