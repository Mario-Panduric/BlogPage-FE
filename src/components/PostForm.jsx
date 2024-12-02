import { useState, useEffect } from 'react';
import styles from './PostForm.module.css';
import RichTextEditor from './RichTextEditor';
import getLoggedUser from '../services/GetLoggedUser.js'

const NewPostForm = ({ onSubmit }) => {
  const [postText, setPostText] = useState('');  
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState('');

  useEffect(() => {
    const getUser = async() =>{
      let user = await getLoggedUser();
      console.log(user[0].value);
      setUser(user[0].value);
    }
    getUser();
  } ,[])
   
  
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (postText.trim() && title.trim()) {
      setLoading(true);
      setError(null);
      const postData = {
        title: title.trim(),
        content: postText,  
        userID: user,
      };

      try {
        const response = await fetch('https://localhost:7149/api/Posts/Post', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          credentials: "include"
          },
          body: JSON.stringify(postData),
        });
        console.log(postData);
        if (!response.ok) {
          throw new Error('Error while sending request.');
        }

        const result = await response.json();
        onSubmit(postData);
        setPostText('');
        setTitle('');
      } catch (error) {
        setError('Error while sending request.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.div}>
        <form onSubmit={handleSubmit}onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <RichTextEditor onChange={setPostText} />
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.buttonSubmit} type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPostForm;
