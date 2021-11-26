import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CreatePostModal } from '../components/CreatePostModal';
import { useStoreActions, useStoreState } from 'easy-peasy'

import axios from 'axios'

export const PostScreen = (props) => {

    const authorInfo = useStoreState((state) => state.author)

    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        fetchPosts()
    }, [])

    const createNewPostHandler = () => {

    }

    const fetchPosts = async () => {
        try{
            let response = await axios.get(`http://localhost:8080/author/${authorInfo.AuthorID}/posts`)
            console.log("response", response.data)
            let posts = response.data
            setPosts(posts)
        }
        catch(err){
            console.log(err)
            alert(err)
        }
    }

    const likeClickHandler = (postID) => {

    }

    return (
        <>
            <CreatePostModal isVisible={showModal} setVisible={setShowModal} submitPostHandler={createNewPostHandler}></CreatePostModal>

            <div>
                This is a Post Screen!
            </div>
            <div>
                {posts.map((post, i) => {
                    <div className=" w-50 mt-3 mx-auto border p-4 rounded-5 z-depth-2 text-white"
                    style={{backgroundColor: "rgb(30,47,65)"}} key={"post"+i}>
                        {/* Title Section */}
                        <div className="row" style={{textAlign: 'left'}}>
                            <h5><b>{post.title}</b></h5>
                            <h6 style={{fontStyle: "italic",color: "rgb(255,122,0)"}}>{post.AuthorName} </h6>
                        </div>
                        {/* Content Section */}
                        <div className="row rounded rounded-5 py-2 px-4" style={{backgroundColor: "rgb(30,47,65)"}}>
                            {post.content}
                        </div>
                        {/* React Section */}
                        <div className="row my-2">
                            <div class="btn-group-sm shadow-0 col" role="group">
                                <button type="button" class="btn btn-dark shadow-0" style={{backgroundColor: "rgb(30,47,65)"}}data-mdb-color="dark"
                                    onClick={() => {
                                        likeClickHandler(post.PostID)
                                    }}>
                                    <i className="far fa-thumbs-up fa-1x"></i>+{post.Likes}
                                </button>
                            </div>
                        </div>
                        {/* Comment Section */}
                        
                    </div>
                })}
            </div>
            <Link to="/Home">
                <button className="btn btn-danger" href="/">Go Back to Main Menu</button>
            </Link>
        </>
    )
}