import { useEffect, useState } from 'react'
import { Profile } from '../components/Profile';
import { Feed } from '../components/Feed'
import { useStoreState } from 'easy-peasy'
import { useParams, useSearchParams } from 'react-router-dom'
import {Button, Input, Form} from 'react-bootstrap';

import axios from 'axios'

export const AdminProfileScreen = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const ProfileAuthorID = searchParams.get('authorID')
    const Token = searchParams.get('token')

    const [posts, setPosts] = useState([]) 
    const [author, setAuthor] = useState({})

    const restHost = useStoreState((state) => state.restHost)

    const fetchAuthor = async () => {
        let response = await axios.get(ProfileAuthorID, {
            headers: {
                "Authorization": `Basic ${Token}`
            }
        })
        console.log("AUthor Data:", response.data)
        setAuthor(response.data)
        fetchPosts()
    }

    useEffect(() => {
        console.log("ProfileAuthorID", ProfileAuthorID)
        fetchAuthor()
    }, [])

 


    const openInNewTab = (url) => {
        console.log(url)
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    
    return (
        <div>
            <div className="row mx-5">
                {Object.keys(author).length != 0 ? (
                <>
                    <div className="containerProfile col-4 mx-4">
                        <div>
                            <div className='headerProfile'>
                                <h1>Profile</h1>
                            </div> 
                            <div className='author'>
                                <div className ='profileDiv'>
                                    <img className= 'profileImage' src= {author["profileImage"]} alt=""></img>
                                    <br></br>
                                    <h4>{author["displayName"]}</h4>
                                    <br></br>
                                    <p>{author["type"]}</p>
                                    <Button className='profileDivButton my-2' onClick={() => {openInNewTab(author.github)}} rel="noreferrer noopener" target="_blank"> Visit Github </Button>
                                </div> 
                            </div>
                        </div>  
                    </div>
                    <div className="PostList col my-5">
                    {posts.map((post) => (
                        <div style={{textAlign: 'left', color: "white", padding:"20px",margin:"10px", backgroundColor:"#1E2F41", borderRadius:"10px"}}>
                            <h4><b>{post.title}</b></h4>
                            <h5 style={{fontStyle: "italic",color: "rgb(255,122,0)"}}>{post.author.displayName} </h5>
                            <br></br>
                            <div>
                                {post.description}
                            </div>
                        </div>
                    ))}
                    </div>
                </>
                ) : <></>}
            </div>
        </div>
    )
}

export default AdminProfileScreen;
