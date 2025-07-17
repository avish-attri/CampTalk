import './SinglePost.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const SinglePost = () => {
    useEffect(() => {
        document.title = 'Post Details | CampTalk';
    }, []);

    const [post, setPost] = useState({});
    const { postID } = useParams();
    const navigate = useNavigate();
    const url = process.env.REACT_APP_SERVER_URL

    const loadPosts = async () => {
        try {
            const response = await axios.get(`${url}/getsinglepost?postID=${postID}`);
            setPost(response?.data?.responseData);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadPosts();
        // eslint-disable-next-line
    }, [])

    const deletePost = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`${url}/deletepost`, {
                data: {
                    postID
                }
            });
            if (response?.data?.responseData) {
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='Single-Post'>
            <h1 className='topic'>{post?.topic}</h1>
            <h2 className='question'>{post?.question}</h2>
            <p className='answer'>{post?.answer}</p>
            <div className='btns'>
                <button onClick={deletePost} className='btn btn-delete'>Delete</button>
                <button onClick={() => navigate(`/updatepost/${postID}`)} className='btn btn-update'>Update</button>
            </div>
        </div>
    )
}

export default SinglePost
