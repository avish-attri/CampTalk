import React from 'react';
import './Card.css';
import { useNavigate } from 'react-router-dom';

const Card = ({ post, hideAnswerBtn }) => {
  const navigate = useNavigate();
  const answers = post?.answers || [];

  return (
    <div className="card">
      <div className="card__content" style={{ cursor: 'default' }}>
        <p className="card__question">{post?.question}</p>
        {post?.author && <p className="card__author">Asked by: {post.author}</p>}
        {answers.length > 0 && (
          <div className="card__answers">
            <span>Answers:</span>
            <div className="card__answers-bubbles">
              {answers.map((ans, idx) => {
                if (typeof ans === 'string') {
                  return (
                    <span key={idx} className="card__answer-bubble">
                      {ans}
                      <span className="card__answer-author">Answered by: Unknown</span>
                    </span>
                  );
                } else {
                  return (
                    <span key={idx} className="card__answer-bubble">
                      {ans.text}
                      <span className="card__answer-author">Answered by: {ans.author}</span>
                    </span>
                  );
                }
              })}
            </div>
          </div>
        )}
      </div>
      {!hideAnswerBtn && (
        <button className="card__answer-btn" onClick={() => navigate(`/answer/${post?._id}`)}>
          Answer
        </button>
      )}
    </div>
  );
};

export default Card;