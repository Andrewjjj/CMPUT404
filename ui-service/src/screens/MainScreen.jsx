import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { CreatePostModal } from '../components/CreatePostModal';
import { PostFeed } from '../components/PostFeed';
import { Link } from 'react-router-dom'

export const MainScreen = () => {
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        fetchPosts();
    }, [])

    const fetchPosts = async () => {
        try{
            let response = await axios.get("http://localhost:8080/service/post")
            let posts = response.data

            // TODO: change this 
            await Promise.all(posts.map(async post => {
                response = await axios.get(`http://localhost:8080/service/post/${post.PostID}/comment`)
                post.Comments = response.data;
                post.Tags = ["awesome", "good"]
            }))

            setPosts(posts)
        }
        catch(err){
            console.log(err)
            alert(err)
        }
    }

    const createNewPostHandler = async (title, content, tags) => {
        console.log("Clicked?!")
        alert("Create New Post Clicked!")
        console.log(title)

        await axios.post(`http://localhost:8080/service/post/`, {
            title: title,
            content: content,
            tags: tags,
        }).then(res => {
            alert(res)
            setShowModal(false);
            fetchPosts();
        })
    }

    
    return(
        <>
        <Link to="/Friends">
            <button className="btn btn-md btn-secondary" href="/Friends">Go to Friends</button>
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
