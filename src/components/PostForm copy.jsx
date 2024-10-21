import { useState } from 'react';
import styles from './PostForm.module.css';
import RichTextEditor from './RichTextEditor';

const NewPostForm = ({ onSubmit }) => {
  const [postText, setPostText] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fontWeight, setFontWeight] = useState('normal');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontColor, setFontColor] = useState('#000000');
  const [isItalic, setItalic] = useState('normal');
  const [underline, setUnderline] = useState('normal'); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const styledText = `
      <p >
        ${postText.trim()}
      </p>
    `;
    if (postText.trim() && title.trim()) {
      setLoading(true);  
      setError(null); 

      const postData = {
        title: title.trim(),
        content: styledText,
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
    const toggleBold = () => {
      const textarea = document.getElementById('tarea');
      const textareaText = document.getElementById("tarea").value
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = postText.slice(start, end);
      if(selectedText.length !== 0){
        const boldedText = "<strong>" + selectedText + "</strong>";
        console.log(selectedText);
        const temp = postText.replace(selectedText, boldedText);
        setPostText(postText.replace(selectedText, boldedText))
        //if()
        setFontWeight(fontWeight === 'normal' ? 'bold' : 'normal');
      }
      
    };

    const handleFontChange = (e) => {
      setFontFamily(e.target.value);
    };

    const handleColorChange = (e) => {
      setFontColor(e.target.value);
    };

    const toggleItalic = (e) => {
        setItalic(isItalic === 'normal' ? 'italic' : 'normal');
    }
    const toggleUnderline = (e) => {
      setUnderline(e.target.value);
    }
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
            contentEditable='true'
            id='tarea' 
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Write your post here..."
            style={{
              fontWeight: fontWeight,
              fontFamily: fontFamily,
              color: fontColor,
            }}
          />
          <div className={styles.toolbar}>
              <button type="button" onClick={toggleBold}>
                <strong>B</strong>
              </button>
              <button type="button" onClick={toggleItalic}>
                <em>I</em>
              </button>
              <button type="button" onClick={toggleUnderline}>
                <em>U</em>
              </button>
              <select onChange={handleFontChange} value={fontFamily}>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
              </select>
            <input type="color" onChange={handleColorChange} value={fontColor} />
          </div>
            
            <button className={styles.buttonSubmit} type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          {error && <p className={styles.error}>{error}</p>} {}
        </form>
      </div>
    </div>
  );
};

export default NewPostForm;
