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

    const commentChangeHandler = (postID, comment) => {
        setCommentInputField({
            ...commentInputField,
            [postID]: comment,
        })
        console.log(commentInputField)
    }

    const submitCommentHandler = async (postID, username) => {
        let comment = commentInputField[postID]
        console.log(comment)
        try{
            console.log(postID)
            console.log(username)
            await axios.post(`http://localhost:8080/service/post/${postID}/comment/`, {
                comment: comment,
                username: username,
            }).then(res => {
                alert(res)
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
        console.log(title)

        await axios.post(`http://localhost:8080/service/post/`, {
            title: title,
            content: content,
            tags: tags,
        }).then(res => {
            alert(res)
        })

        setShowModal(false);
        fetchPosts();
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
            {posts.map((post, i) => 
            <div className=" w-50 mt-3 mx-auto border p-4 rounded-5 z-depth-2 text-white"
            style={{backgroundColor: "rgb(30,47,65)"}} key={"post"+i}>
                {/* Title Section */}
                <div className="row" style={{textAlign: 'left'}}>
                    <h5><b>{post.Title}</b></h5>
                    <h6 style={{fontStyle: "italic",color: "rgb(255,122,0)"}}>{post.AuthorID} </h6>
                </div>
                {/* Content Section */}
                <div className="row rounded rounded-5 py-2 px-4" style={{backgroundColor: "rgb(30,47,65)"}}>
                    {post.Description}
                </div>
                
                {/* Comment Section */}
                <div className="mt-2 mx-2">
                    {post.Comments.map((comment, i) => 
                        <div key={"comment_"+i}>
                            <div className="column my-2 px-5 text-start">
                                <div className="col-3 bg-grey" style={{fontStyle: "italic",color: "rgb(255,122,0)"}}>
                                    {comment.AuthorID}
                                </div>
                                <div className="col text-start">
                                    {comment.Comment}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="row px-5 py-2">
                        Comment: <input type="text" id={"comment_"+post.PostID} className="form-control-sm" onInput={(e) => commentChangeHandler(post.PostID, e.target.value)}></input>
                        <div className="col text-end">
                            <button className="btn" onClick={() => {
                                submitCommentHandler(post.PostID, "dummy_username")
                            }}>Submit</button>
                        </div>
                    </div>
                    {/* Tag Section */}
                <div className="row my-1">
                    <p className="text-grey">
                    Tags: 
                    {post.Tags.map((tag, i) => 
                        <button key={"button"+i}
                            className="btn btn-sm btn-warning mx-1"
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
                                reactionClickHandler(post.PostID, "like")
                            }}>
                            <i className="far fa-thumbs-up fa-1x"></i>+{post.Likes}
                        </button>
                        <button className="btn btn-sm btn-danger mx-1"
                            onClick={() => {
                                reactionClickHandler(post.PostID, "love")
                            }}>
                            <i className="far fa-heart fa-1x"></i>+{post.Likes}
                        </button>
                        <button className="btn btn-sm btn-secondary mx-1"
                            onClick={() => {
                                reactionClickHandler(post.PostID, "rocket")
                            }}>
                            <i className="fas fa-rocket fa-1x"></i>+{post.Likes}
                        </button>
                    </div>
                </div>
                </div>
            </div>
            )}
        </div>
        </>
    )
}
