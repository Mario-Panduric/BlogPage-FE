import { useState } from 'react';
import styles from './PostForm.module.css';
import RichTextEditor from './RichTextEditor';

const NewPostForm = ({ onSubmit }) => {
  const [postText, setPostText] = useState('');  // Sadržaj editora
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
        content: postText,  // Sadržaj iz RichText editora
        userID: localStorage.getItem('id'),
      };

      try {
        const response = await fetch('https://localhost:7149/api/Posts/Post', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(postData),
        });

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
        <form onSubmit={handleSubmit}onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}>
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
