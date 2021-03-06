import { useEffect, useState } from 'react'
import { Profile } from '../components/Profile';
import { Feed } from '../components/Feed'
import { useStoreState } from 'easy-peasy'
import { useParams, useSearchParams } from 'react-router-dom'
import {Button, Input, Form} from 'react-bootstrap';

import axios from 'axios'

export const ProfilePage = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const ProfileAuthorID = searchParams.get('authorID')
    const Token = searchParams.get('token')

    const [posts, setPosts] = useState([]) 
    const [author, setAuthor] = useState({})
    const [isSelf, setIsSelf] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false)
    const [isFriend, setIsFriend] = useState(false)
    const [isRequested, setIsRequested] = useState(false)

    const authorInfo = useStoreState((state) => state.author)
    const restHost = useStoreState((state) => state.restHost)

    const fetchPosts = async () => {
        try{
            let response = await axios.get(`${ProfileAuthorID}/posts`, {
                headers: {
                    "Authorization": `Basic ${Token}`
                }
            })
            if(Array.isArray(response.data)) {
                setPosts(response.data)
            } 
            else{
                console.log(response.data)
                alert("Wrong Format Receieved")
            }
        }
        catch(err){
            console.log(err)
            alert(err)
        }

    }

    const fetchAuthor = async () => {
        console.log("Info Author ID: ", ProfileAuthorID, authorInfo.id)
        let response = await axios.get(ProfileAuthorID, {
            headers: {
                "Authorization": `Basic ${Token}`
            }
        })
        console.log("AUthor Data:", response.data)
        setAuthor(response.data)
        fetchPosts()
    }

    const fetchFollowing = async () => {
        try{
            let response = await axios.get(`${ProfileAuthorID}/followers/${authorInfo.id}`, {
                headers: {
                    "Authorization": `Basic ${Token}`
                }
            })
            setIsFollowing(response.data.isFollowing)
        }
        catch(err){
            console.log(err)
        }
    }

    const fetchFriend = async () => {
        try{
            let response = await axios.get(`${ProfileAuthorID}/friends`, {
                headers: {
                    "Authorization": `Basic ${Token}`
                }
            })
            let friendIdArr = response.data.map(friend => friend.id)
            console.log(friendIdArr, `${restHost}/author/${authorInfo.id}`)
            if(friendIdArr.includes(`${restHost}/author/${authorInfo.id}`)){
                setIsFriend(true)
            }
            else setIsFriend(false)
        }
        catch(err){
            console.log(err)
        }
    }

    const fetchRequest = async () => {
        try{
            console.log("Info Author ID: ", ProfileAuthorID, authorInfo.id)
            let response = await axios.get(`${ProfileAuthorID}/friend_request/${authorInfo.id}`, {
                headers: {
                    "Authorization": `Basic ${Token}`
                }
            })
            console.log(response.data)
            setIsRequested(response.data.isRequested)
        }
        catch(err){
            console.log(err)
        }
    }

    

    useEffect(() => {
        console.log("ProfileAuthorID", ProfileAuthorID)
        fetchAuthor()
        fetchFollowing()
        fetchFriend()
        fetchRequest()
        if(ProfileAuthorID == `${restHost}/author/${authorInfo.id}`) setIsSelf(true);
    }, [])

    const clickFollowHandler = async () => {
        try{
            await axios.put(`${ProfileAuthorID}/followers/${authorInfo.id}`, {
                headers: {
                    "Authorization": `Basic ${Token}`
                }
            })
            await axios.post(`${ProfileAuthorID}/inbox`, {
                id: authorInfo.id,
                type: "follow",
            })
            alert("Following Successful!")
            fetchFollowing()
        }
        catch(err){
            console.log(err)
            alert(err)
        }
    }

    const clickUnfollowHandler = async () => {
        try{
            await axios.delete(`${ProfileAuthorID}/followers/${authorInfo.id}`, {
                headers: {
                    "Authorization": `Basic ${Token}`
                }
            })
            alert("Un-follow Successful!")
            fetchFollowing()
        }
        catch(err){
            console.log(err)
            alert(err)
        }
    }

    const requestFriendHandler = async () => {
        try{
            await axios.post(`${ProfileAuthorID}/friend_request/${authorInfo.id}`, {
                headers: {
                    "Authorization": `Basic ${Token}`
                }
            })
            await axios.post(`${ProfileAuthorID}/inbox`, {
                id: authorInfo.id,
                type: "friendRequest",
            })
            alert("Request Sent Successfully!")
            fetchRequest()
        }
        catch(err){
            console.log(err)
            alert(err)

        }
    } 
    const cancelRequestHandler = async () => {
        try{
            await axios.delete(`${ProfileAuthorID}/friend_request/${authorInfo.id}`, {
                headers: {
                    "Authorization": `Basic ${Token}`
                }
            })
            alert("Request Deleted Successfully!")
            fetchRequest()
        }
        catch(err){
            console.log(err)
            alert(err)
        }
    } 


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
                                    {isSelf ? <></> : (
                                        <>
                                        {isFollowing ? (
                                            <Button className='profileDivButton my-2' onClick={() => clickUnfollowHandler()} rel="noreferrer noopener" target="_blank">Unfollow</Button> 
                                        ) : (
                                            <Button className='profileDivButton my-2' onClick={() => clickFollowHandler()} rel="noreferrer noopener" target="_blank">Follow</Button> 
                                        )}
                                        {isFriend ? (
                                            <Button className='profileDivButton my-2 disabled' rel="noreferrer noopener" target="_blank">Already Friends!</Button> 
                                            ) : (
                                                <>
                                                {isRequested ? (
                                                    <Button className='profileDivButton my-2' onClick={() => cancelRequestHandler()} rel="noreferrer noopener" target="_blank">Cancel Request</Button> 
                                                    ):(
                                                    <Button className='profileDivButton my-2' onClick={() => requestFriendHandler()} rel="noreferrer noopener" target="_blank">Request Friend</Button> 
                                                )}
                                                </>
                                            )}
                                        </>
                                    )}
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

export default ProfilePage;
