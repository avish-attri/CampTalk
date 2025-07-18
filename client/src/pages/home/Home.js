import './Home.css'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios'

const Home = () => {
  useEffect(() => {
    document.title = 'Home | CampTalk';
  }, []);

  const [posts, setPosts] = useState();
  const url = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await axios.get(`${url}/getposts`);
        // Sort posts so newest is first (assuming _id is monotonic)
        const sorted = (response.data.responseData || []).slice().reverse();
        setPosts(sorted);
      } catch (error) {
        console.error(error);
      }
    };
    loadPosts();
  }, [url]);

  return (
    <div className='Home'>
      {
        posts?.map((post) => {
          return <Card key={post._id} post={post} />
        })
      }
    </div>
  )
}

export default Home;
