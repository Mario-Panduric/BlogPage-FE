import { useState } from 'react';
import styles from './PostForm.module.css';

const NewPostForm = ({ onSubmit }) => {
  const [postText, setPostText] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (postText.trim() && title.trim()) {
      setLoading(true);  
      setError(null); 

      const postData = {
        title: title.trim(),
        content: postText.trim(),
        userID: localStorage.getItem('id')
      };

      try {
        console.log(postData)
        const response = await fetch('https://localhost:7149/api/Posts/Post', {  
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(
           postData
          ),  
        });

        if (!response.ok) {
          throw new Error('Nešto nije u redu sa slanjem posta'); 
        }

        const result = await response.json(); 
        console.log('Post uspešno poslan:', result);

       
        onSubmit(postData);

       
        setPostText('');
        setTitle('');
      } catch (error) {
          console.error('Greška pri slanju posta:', error);
          setError('Greška pri slanju posta. Pokušajte ponovo.');
      } finally {
          setLoading(false); 
      }
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.div}>
        <form onSubmit={handleSubmit}>
          <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea 
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Write your post here..."
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          {error && <p className={styles.error}>{error}</p>} {}
        </form>
      </div>
    </div>
  );
};

export default NewPostForm;
