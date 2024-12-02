import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';
import styles from './Blog.module.css';
import getLoggedUser from '../services/GetLoggedUser.js';

const Blog = () => {
  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]); 
  const [newComment, setNewComment] = useState(''); 
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState('');
  
  useEffect(() => {
    axios.get(`https://localhost:7149/api/Posts/${id}`)
      .then((response) => {
        setPost(response.data);
        setComments(response.data.comments)
      })
      .catch((error) => {
        console.error('Error fetching the post:', error);
      });
      const getUserId = async() =>{
        let loggedUser = await getLoggedUser();
        setUserId(loggedUser[0].value);
        let user = {
          userName: loggedUser[1].value,
          email: loggedUser[2].value
        }
        setUser(user);
      }
      getUserId();
      
      
  }, [id]);
    
  
  const handleCommentSubmit = (e) => {
    e.preventDefault();
  
    if (newComment.trim()) {
      axios.post(`https://localhost:7149/api/Comments/Comment`, {
        content: newComment, 
        userId: userId, 
        postId: id,     
      })
      .then((response) => {
        let commentData = {...response.data, user} 
        setComments([...comments, commentData]);
        console.log(comments)
        console.log(user)
        console.log(response.data)
        console.log(commentData);
        console.log(post);
        setNewComment(''); 
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
    <div className={styles.container}>
      
      <Navbar />
      <div className={styles.content}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.blogInfo}>
          <h4 className={styles.author}>Author: {user.userName}</h4>
          <h4 className={styles.date}>{post.createdAt.split('.')[0].replace('T', ' ')}</h4>
        </div>
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
    </div>
  );
};

export default Blog;
