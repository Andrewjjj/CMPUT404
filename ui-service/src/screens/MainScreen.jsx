import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { CreatePostModal } from '../components/CreatePostModal';
import { PostFeed } from '../components/PostFeed';
import { Link } from 'react-router-dom'

export const MainScreen = () => {
    const [posts, setPosts] = useState([]);
    const [commentInputField, setCommentInputField] = useState({});
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        fetchPosts();
    }, [])

    const fetchPosts = async () => {
        try{
            let response = await axios.get("http://localhost:8080/service/author")
            let data = response.data
            console.log(data)
            console.log("fetching posts")
            
            setPosts(data)
        }
        catch(err){
            console.log(err)
            alert(err)
        }
    }

    const commentChangeHandler = (postID, comment) => {
        setCommentInputField({
            ...commentInputField,
            [postID]: comment,
        })
        console.log(commentInputField)
    }

    const submitCommentHandler = async (postID, username) => {
        let message = commentInputField[postID]
        try{
            await axios.post(`https://localhost:8080/post/${postID}/comment`, {
                message: message,
                username: username,
            })
        }
        catch(err){
            console.log(err)
            alert(err)
        }
        fetchPosts();
    }

    const createNewPostHandler = async (title, content, tags) => {
        console.log("Clicked?!")
        alert("Create New Post Clicked!")
        setShowModal(false);
        fetchPosts();
    }

    
    return(
        <>
        <Link to="/Friend">
            <button className="btn btn-md btn-secondary">Go to Friend</button>
        </Link>
        <Link to="/Post">
            <button className="btn btn-md btn-secondary" href="/Post">Go to Post</button>
        </Link>

        <Link to="/Inbox">
            <button className="btn btn-md btn-secondary" href="/Inbox">Go to Inbox</button>
        </Link>


        <CreatePostModal isVisible={showModal} setVisible={setShowModal} submitPostHandler={createNewPostHandler}></CreatePostModal>
        <div className="text-center my-5" style={{backgroundColor: "rgb(21,32,43)"}}>
            <button className="btn btn-primary btn-lg w-50" style={{backgroundColor: "rgb(255,122,0)"}} onClick={() => setShowModal(true)}>Create New Post</button>
            <PostFeed></PostFeed>
        </div>
        </>
    )
}