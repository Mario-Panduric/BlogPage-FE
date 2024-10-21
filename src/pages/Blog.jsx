import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';
import styles from './Blog.module.css';


const Blog = () => {
  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]); 
  const [newComment, setNewComment] = useState(''); 

  
  useEffect(() => {
    axios.get(`https://localhost:7149/api/Posts/${id}`)
      .then((response) => {
        setPost(response.data);
        setComments(response.data.comments)
      })
      .catch((error) => {
        console.error('Error fetching the post:', error);
      });

  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    if (newComment.trim()) {
      axios.post(`https://localhost:7149/api/Comments/Comment`, {
        content: newComment, 
        userId: localStorage.getItem('id'), 
        postId: id,     
      })
      .then((response) => {
        setComments([comments + response.data]);
        setNewComment('');
        window.location.reload(); 
      })
      .catch((error) => {
        console.error('Error posting the comment:', error);
      });
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }
    

  return (
    <div>
      <Navbar />
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.paragraph} dangerouslySetInnerHTML={{ __html: post.content }} />

      <div className={styles.commentsSection}>
        <h2 className={styles.commentsTitle}>Comments</h2>
        
        <form className={styles.commentForm} onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your comment..."
            className={styles.commentInput}
          />
          <button type="submit" className={styles.commentButton}>Submit</button>
        </form>

        <div className={styles.commentsList}>
          {comments.map((comment, index) => (
            <div key={index} className={styles.commentBox}>
              <p><strong>{comments[index].user.userName}:</strong> {comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
