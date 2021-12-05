import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { PostFeed } from '../components/PostFeed';
import { Link } from 'react-router-dom'
import {Button, Input, Form} from 'react-bootstrap';
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'

export const MainScreen = () => {
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()

    const logOut = useStoreActions((state) => state.logOut)
    const authorInfo = useStoreState((state) => state.author)
    const restHost = useStoreState((state) => state.restHost)
    const st = useStoreState(s => s)

    useEffect(() => {
        console.log(`/Profile/${restHost}/author/${authorInfo.AuthorID}`)
        if(!authorInfo) navigate("/")
        // fetchPosts();
        console.log(st)

    }, [])

    const logOutHandler = () => {
        logOut()
        navigate("/")
    }

    /*const fetchPosts = async () => {
        try{
            let response = await axios.get(`${restHost}/author/${authorInfo.AuthorID}/posts`)
            console.log("response", response.data)
            // return;

            // let response = await axios.get("http://localhost:8080/post")
            let posts = response.data

            // // TODO: change this 
            // await Promise.all(posts.map(async post => {
            //     response = await axios.get(`http://localhost:8080/post/${post.PostID}/comment`)
            //     post.Comments = response.data;
            //     post.Tags = ["awesome", "good"]
            // }))

            setPosts(posts)
        }
        catch(err){
            console.log(err)
            alert(err)
        }
    }*/

    const createNewPostHandler = async (title, content, tags) => {
        console.log("Clicked?!")
        alert("Create New Post Clicked!")
        console.log(title)

        await axios.post(`http://localhost:8080/post/`, {
            title: title,
            content: content,
            tags: tags,
        }).then(res => {
            alert(res)
            setShowModal(false);
            //fetchPosts();
        })
    }

    
    return(
        <>
        <div className="background">
            <div id="mainscreen" className="text-center my-5" style={{backgroundColor: "rgb(21,32,43)", display: "flex", justifyContent: "center"}}>
                    {/* <Link to="/Friends"> */}
                    
                    <div style={{display: 'flex'}}>
                    {/* <div style={{display: 'flex', alignItems: "center", flexDirection: "column",  gap: "30px"}}> */}
                        <Button className="Buttons" onClick={() => {navigate(`/Profile?authorID=${restHost}/author/${authorInfo.AuthorID}`)}}>Go to Profile</Button>
                        <Button className="Buttons" onClick={() => {navigate("/Inbox")}}>Go to Inbox</Button>
                        <Button className="Buttons" onClick={() => {navigate("/Friends")}}>Go to Friends</Button>
                        {/* </Link> */}
                        {/* <Button className="Buttons" style={{backgroundColor: "rgb(255,122,0)"}} onClick={() => setShowModal(true)}>Create New Post</Button> */}
                        {/* <Link to="/Inbox"> */}
                        <Button className="Buttons" onClick={() => {navigate("/Posts")}}>Go to Posts</Button>

                    </div>
                    
                    <div style={{backgroundColor: "rgb(21,32,43)", marginTop: "0"}}>
                        {/*<PostFeed author={authorInfo}></PostFeed>*/}
                    </div>
                    
                    {/* <div style={{display: 'flex', alignItems: "center", flexDirection: "column",  gap: "30px"}}> */}
                    <div style={{display: 'flex'}}>
                        <Button className="Buttons" onClick={() => {navigate("/Posts/Others")}}>Go to Post Others</Button>
                        <Button className="Buttons" onClick={() => {navigate("/Author/Foreign")}}>Connect to Foreign Authors</Button>
                        <Button className="Buttons" onClick={() => {logOutHandler()}}>Logout</Button>
               
                    </div>
                    
                    {/* </Link>   */}
                   
                
            </div> 
            
                
        </div>
 
        
        </>
    )
}
