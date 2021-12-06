import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Form } from 'react-bootstrap';

import { CreatePostModal } from '../components/CreatePostModal';
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import { PostComponent } from '../components/PostComponent';

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
        try {
            let token = btoa(`${username}:${password}`)
            let response = await axios.get(`${hostURL}`, {
                headers: {
                    "Authorization": `Basic ${token}`
                }
            })
            console.log("response", response.data)
            let posts = response.data
            setPosts(posts)
        }
        catch (err) {
            console.log(err)
            alert(err)
        }
    }
    const fetchSinglePost = async () => {
        try {
            let token = btoa(`${username}:${password}`)
            let response = await axios.get(`${hostURL}`, {
                headers: {
                    "Authorization": `Basic ${token}`
                }
            })
            // if(!response.data.items)
            // console.log("response", response.data)
            let posts = [response.data]
            setPosts(posts)
        }
        catch (err) {
            console.log(err)
            alert(err)
        }
    }

    useEffect(() => {
        if (!authorInfo) navigate("/")
        // fetchPosts()
    }, [])

    const createNewPostHandler = () => {

    }


    const likeClickHandler = (postID) => {

    }



    return (
        <>
        <div className="w-50 mx-auto my-5 border shadow-2 p-3">
            <div className="p-3">
                <CreatePostModal isVisible={showModal} setVisible={setShowModal} submitPostHandler={createNewPostHandler}></CreatePostModal>
                <div className="my-2">
                    Find Posts from other servers
                </div>
                <div>
                    Enter their post URL:
                </div>
                <div className="mx-5">
                    URL: <input type="text" className="w-100" value={hostURL} onInput={(e) => { setHostURL(e.currentTarget.value) }} />
                    Username: <input type="text" className="w-100" value={username} onInput={(e) => { setUsername(e.currentTarget.value) }} />
                    Password: <input type="text" className="w-100" value={password} onInput={(e) => { setPassword(e.currentTarget.value) }} />
                </div>
                <div className="row mx-5">
                    <div className="col">
                        <div className="text-center">
                            <Button className="w-100 m-2" onClick={() => { fetchPosts() }}>Fetch All Posts</Button>
                        </div>
                    </div>
                    <div className="col">
                        <div className="text-center">
                            <Button className="w-100 m-2" onClick={() => { fetchSinglePost() }}>Fetch Single Post</Button>
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </div>
        {posts.map((post, i) => (
            <PostComponent post={post} token={btoa(`${username}:${password}`)}/>
        ))}
        </>

    )
}