import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { CreatePostModal } from '../components/CreatePostModal';

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

    const reactionClickHandler = async (postID, reactionType) => {
        alert("Reaction Clicked!")
        fetchPosts();
    }
    
    return(
        <>
        <CreatePostModal isVisible={showModal} setVisible={setShowModal} submitPostHandler={createNewPostHandler}></CreatePostModal>
        <div className="text-center my-5">
            <button className="btn btn-primary btn-lg w-50" onClick={() => setShowModal(true)}>Create New Post</button>
            {posts.map((post, i) => 
            <div className="shadow w-50 mb-5 mt-3 mx-auto border p-5 rounded rounded-5 z-depth-2 bg-white" key={"post"+i}>
                {/* Title Section */}
                <div className="row">
                    <h5><b>{post.title}</b>: {post.username}</h5>
                </div>
                {/* Content Section */}
                <div className="row rounded rounded-5 py-2 px-4" style={{backgroundColor: "rgb(245, 245, 255)"}}>
                    {post.content}
                </div>
                {/* Tag Section */}
                <div className="row my-2">
                    <p className="text-grey">
                    Tags: 
                    {post.tags.map((tag, i) => 
                        <button key={"button"+i}
                            className="btn btn-sm btn-warning mx-2"
                            onClick={() => {
                                alert("Sorry! This hasn't been implemented yet")
                            }}
                        >{tag}</button>
                    )}
                    </p>
                </div>
                {/* React Section */}
                <div className="row my-2">
                    <div className="col mx-0">
                        <button className="btn btn-sm btn-primary mx-1"
                            onClick={() => {
                                reactionClickHandler(post.postID, "like")
                            }}>
                            <i className="far fa-thumbs-up fa-2x"></i>+{post.reaction.like}
                        </button>
                        <button className="btn btn-sm btn-danger mx-1"
                            onClick={() => {
                                reactionClickHandler(post.postID, "love")
                            }}>
                            <i className="far fa-heart fa-2x"></i>+{post.reaction.love}
                        </button>
                        <button className="btn btn-sm btn-secondary mx-1"
                            onClick={() => {
                                reactionClickHandler(post.postID, "rocket")
                            }}>
                            <i className="fas fa-rocket fa-2x"></i>+{post.reaction.rocket}
                        </button>
                    </div>
                </div>
                {/* Comment Section */}
                <div className="mt-5 mx-2">
                    Comments:
                    {post.comments.map((comment, i) => 
                        <div className="border shadow-sm" key={"comment_"+i}>
                            <div className="row my-2 px-5 text-start">
                                <div className="col-3 bg-grey">
                                    {comment.username}
                                </div>
                                <div className="col text-start">
                                    {comment.message}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="row px-5 py-2">
                        Comment: <input type="text" id={"comment_"+post.postID} className="form-control-sm" onInput={(e) => commentChangeHandler(post.postID, e.target.value)}></input>
                        <div className="col text-end">
                            <button className="btn" onClick={() => {
                                submitCommentHandler(post.postID, "dummy_username")
                            }}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
        </>
    )
}