import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Button, Input, Form} from 'react-bootstrap';

import { CreatePostModal } from '../components/CreatePostModal';
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

export const PostOutsourceScreen = (props) => {

    const authorInfo = useStoreState((state) => state.author)

    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false)

    const [hostURL, setHostURL] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const fetchPosts = async () => {
        try{
            let token = btoa(`${username}:${password}`)
            let response = await axios.get(`${hostURL}`, {
                headers: {
                    "Authorization": `Basic ${token}`
                }
            })
            console.log("response", response.data)
            let posts = response.data.items
            setPosts(posts)
        }
        catch(err){
            console.log(err)
            alert(err)
        }
    }

    useEffect(() => {
        if(!authorInfo) navigate("/")
        // fetchPosts()
    }, [])

    const createNewPostHandler = () => {

    }


    const likeClickHandler = (postID) => {

    }

    return (
        <body className="background">
            <div style={{backgroundColor: "rgb(21, 32, 43)"}} id="colortheme">
                <CreatePostModal isVisible={showModal} setVisible={setShowModal} submitPostHandler={createNewPostHandler}></CreatePostModal>
                <div className="my-2">
                    Find Posts from other servers
                </div>
                <div>
                    Enter their post URL:
                </div>
                <div className="mx-5">
                    URL: <input type="text" className="w-100" value={hostURL} onInput={(e) => {setHostURL(e.currentTarget.value)}} />
                    Username: <input type="text" className="w-100" value={username} onInput={(e) => {setUsername(e.currentTarget.value)}} />
                    Password: <input type="text" className="w-100" value={password} onInput={(e) => {setPassword(e.currentTarget.value)}} />
                </div>
                <div className="text-center">
                    <Button onClick={() => {fetchPosts()}}>Fetch Posts</Button>
                </div>
                <div>
                    {posts.map((post, i) => (
                        <div className=" w-50 mt-3 mx-auto border p-4 rounded-5 z-depth-2 text-white"
                        style={{backgroundColor: "rgb(30,47,65)"}} key={"post"+i}>
                            {/* Title Section */}
                            <div className="row" style={{textAlign: 'left'}}>
                                <h5><b>{post.title}</b></h5>
                                <button onClick={() => {}}>{post.author.displayName}</button>
                                <h6 style={{fontStyle: "italic",color: "rgb(255,122,0)"}}>{post.AuthorName} </h6>
                            </div>
                            <div>

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
                            
                        </div>
                    ))}
                </div>
            </div>
        </body>
        
    )
}