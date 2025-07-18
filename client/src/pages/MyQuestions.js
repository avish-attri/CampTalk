import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './home/Card';
import { useNavigate } from 'react-router-dom';

const MyQuestions = () => {
  const [myQuestions, setMyQuestions] = useState([]);
  const url = process.env.REACT_APP_SERVER_URL;
  const username = localStorage.getItem('df_username');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'My Questions | CampTalk';
    fetchMyQuestions();
    // eslint-disable-next-line
  }, [username, fetchMyQuestions]);

  const fetchMyQuestions = async () => {
    try {
      const response = await axios.get(`${url}/getposts`);
      const all = response.data.responseData || [];
      setMyQuestions(all.filter(q => q.author === username));
    } catch (error) {
      setMyQuestions([]);
    }
  };

  const handleDelete = async (postID) => {
    try {
      await axios.delete(`${url}/deletepost`, { data: { postID } });
      setMyQuestions(myQuestions.filter(q => q._id !== postID));
    } catch (error) {

    }
  };

  return (
    <div className="Home">
      {myQuestions.length === 0 ? (
        <div style={{textAlign: 'center', width: '100%'}}>No questions asked yet.</div>
      ) : (
        myQuestions.map((post) => (
          <div key={post._id} style={{ position: 'relative', paddingTop: '2.5em' }}>
            <Card post={post} hideAnswerBtn />
            <div style={{ display: 'flex', gap: '0.5em', position: 'absolute', top: 10, right: 10 }}>
              <button className="myq-edit-btn" onClick={e => { e.stopPropagation(); navigate(`/updatepost/${post._id}`); }}>Edit</button>
              <button className="myq-delete-btn" onClick={e => { e.stopPropagation(); handleDelete(post._id); }}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyQuestions; 