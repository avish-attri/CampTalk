import React, { useEffect, useState } from 'react';
import './CreatePost.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CreatePost = () => {
  useEffect(() => {
    document.title = 'Create Post | CampTalk';
  }, []);

  const [question, setQuestion] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const { postID } = useParams();
  const url = process.env.REACT_APP_SERVER_URL;
  const username = localStorage.getItem('df_username');

  const loadPosts = async () => {
    try {
      const response = await axios.get(`${url}/getsinglepost?postID=${postID}`);
      const post = response?.data?.responseData;
      if (post) {
        setQuestion(post?.question);
      }
      console.log(post);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (postID) {
      loadPosts();
    }
    // eslint-disable-next-line
  }, [postID])

  const submitDetails = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      if (!postID) {
        const response = await axios.post(`${url}/createpost`, {
          question,
          author: username
        });
        if (response?.data?.responseData) {
          setQuestion("");
          navigate('/');
        }
      } else {
        const response = await axios.put(`${url}/updatepost`, {
          postID,
          question,
          author: username
        });
        if (response?.data?.responseData) {
          setQuestion("");
          navigate('/my-questions'); // Redirect to My Questions after update
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('An error occurred. Please try again.');
      }
      console.error(error);
    }
  }

  return (
    <div className="create-post-bg">
      <div className="create-post">
        <h1 className="create-post__title">Ask a New Question</h1>
        {errorMsg && <div style={{color: '#b91c1c', background: '#fdecea', border: '1px solid #f5c2c7', borderRadius: '6px', padding: '0.75em 1em', marginBottom: '1.2em', fontWeight: 500}}>{errorMsg}</div>}
        <form className="create-post__form">
          <div className="create-post__field">
            <label htmlFor="question" className="create-post__label">Question:</label>
            <textarea
              id="question"
              className="create-post__textarea"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
          <button onClick={submitDetails} type="submit" className="create-post__submit">{postID ? 'Update Question' : 'Create Question'}</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;