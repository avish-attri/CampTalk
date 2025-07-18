import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Answer.css';

const Answer = () => {
  const { postID } = useParams();
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');
  const [author, setAuthor] = useState('');
  const [answer, setAnswer] = useState('');
  const [isOwnQuestion, setIsOwnQuestion] = useState(false);
  const url = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
  const username = localStorage.getItem('df_username');

  useEffect(() => {
    document.title = 'Answer | CampTalk';
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`${url}/getsinglepost?postID=${postID}`);
        const responseData = response?.data?.responseData;
        if (responseData && responseData.question && typeof responseData.question === 'string' && responseData.question.trim() !== '') {
          setQuestion(responseData.question);
          setError('');
        } else {
          setQuestion('');
          setError('Question not found.');
        }
        setAuthor(responseData?.author || '');
        setIsOwnQuestion(responseData?.author === username);
      } catch (error) {
        setQuestion('');
        setError('Question not found.');
      }
    };
    fetchQuestion();

  }, [postID, username]);

  const submitAnswer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/addanswer`, {
        postID,
        answer,
        author: username
      });
      if (response?.data?.success) {
        setAnswer('');
        navigate('/');
      }
    } catch (error) {
      alert('Failed to submit answer.');
    }
  };

  return (
    <div className="answer-page">
      <h2 className="answer-page__question">{error ? error : question}</h2>
      {isOwnQuestion ? (
        <div className="answer-page__warning">You cannot answer your own question.</div>
      ) : (
        <form className="answer-page__form" onSubmit={submitAnswer}>
          <textarea
            className="answer-page__textarea"
            placeholder="Type your answer here..."
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            required
          />
          <button className="answer-page__submit" type="submit">Submit Answer</button>
        </form>
      )}
    </div>
  );
};

export default Answer; 