import React, {useState, useEffect} from 'react'
import { useStoreState } from 'easy-peasy'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export const InboxScreen = (props) => {

    const [inbox, setInbox] = useState({});

    const restHost = useStoreState((state) => state.restHost)
    const author = useStoreState((state) => state.author)

    const navigate = useNavigate();

    const fetchInbox = async (authorID) => {
        try {
            let fetchInboxUrl = `${restHost}/author/${authorID}/inbox`
            console.log("url ", restHost)
            console.log(author)
            let response = await axios.get(fetchInboxUrl)
            console.log("RESPONSE" ,response.data)
            setInbox(response.data);
            console.log("INBOX: " ,inbox)
        } catch(err) {
            console.log(err)
            alert(err)
        }
    }

    useEffect(() => {
        fetchInbox(author.id);
    }, [])


    const clearInbox = async function(authorId){
        try {
            let inboxUrl = `${restHost}/author/${authorId}/inbox`
            const deleteResponse = await axios.delete(inboxUrl);
            if(deleteResponse.status != 200 && deleteResponse.status < 400){
                throw "Inbox deletion failed";
            }
            fetchInbox(author.id);
        } catch(err) {
            alert(err)
        }
    }

    const acceptFriendRequest = async function(authorId, friendRequestId){
        try {
            let tempArr = friendRequestId.split("/");
            friendRequestId = tempArr[tempArr.length-1];
            tempArr = authorId.split("/");
            authorId = tempArr[tempArr.length-1];
            let friendRequestUrl = `${restHost}/author/${authorId}/friend_request/${friendRequestId}`
            const putResponse = await axios.put(friendRequestUrl,{});
            
            alert("Success");
            fetchInbox(author.id);
        } catch(err) {
            console.log(err)
        }
    }

    const rejectFriendRequest = async function(authorId, friendRequestId){
        try {
            let tempArr = friendRequestId.split("/");
            friendRequestId = tempArr[tempArr.length-1];
            tempArr = authorId.split("/");
            authorId = tempArr[tempArr.length-1];
            let friendRequestUrl = `${restHost}/author/${authorId}/friend_request/${friendRequestId}`
            const deleteResponse = await axios.delete(friendRequestUrl);
            
            alert("Success");
            fetchInbox(author.id);
        } catch(err) {
            console.log(err)
        }
    }

    const FriendRequest = (props) => {
        console.log("fr", props)

        const request = props.inbox
        const i = props.idx

        return  (
        <div id="colortheme" className="shadow w-75 mb-5 mt-3 mx-auto border p-5 rounded rounded-5 z-depth-2" key={"post"+i}>
            <button className='btn btn-light' onClick={() => { navigate(`/Profile?authorID=${request.id}`) }} rel="noreferrer noopener" target="_blank">{request.displayName}</button> wants to be friends!
            <br></br>
            <button className = "btn btn-primary" onClick={() => {acceptFriendRequest(request.targetID, request.id)}}> Accept friend request </button> <button className="btn btn-danger" onClick = {() => {rejectFriendRequest(request.targetID, request.id)}}> Reject Friend Request</button>
        </div>
        )
    }

    const LikedPost = (props) => {

        const like = props.inbox
        const i = props.idx

        return  (
            
            <div id="colortheme" className="shadow w-75 mb-5 mt-3 mx-auto border p-5 rounded rounded-5 z-depth-2" key={"post"+i}>
                <button className='btn btn-light' onClick={() => { navigate(`/Profile?authorID=${like.id}`) }} rel="noreferrer noopener" target="_blank">{like.displayName}</button> liked your post!
                <br></br>
            </div>
            
           
        )
    }

    const CommentedPost = (props) => {
        const comment = props.inbox
        const i = props.idx
        return  (
            <div id="colortheme" className="shadow w-75 mb-5 mt-3 mx-auto border p-5 rounded rounded-5 z-depth-2" key={"post"+i}>
                <button className='btn btn-light' onClick={() => { navigate(`/Profile?authorID=${comment.author.id}`) }} rel="noreferrer noopener" target="_blank">{comment.author.displayName}</button> commented <h4>'{comment.comment}'</h4> on your post!
                <br></br>
            </div>
        )
    }

    const Follows = (props) => {
        const follow = props.inbox;
        const i = props.idx;

        return (
            <div id="colortheme" className="shadow w-75 mb-5 mt-3 mx-auto border p-5 rounded rounded-5 z-depth-2" key={"post"+i}>
                <button className='btn btn-light' onClick={() => { navigate(`/Profile?authorID=${follow.id}`) }} rel="noreferrer noopener" target="_blank">{follow.displayName}</button> has followed you!
                <br></br>
            </div>        
        )
    }

    const Post = (props) => {
        const post = props.inbox;
        const i = props.idx;

        return (
            <div id="colortheme" className="shadow w-75 mb-5 mt-3 mx-auto border p-5 rounded rounded-5 z-depth-2" key={"post"+i}>
                <h3> There is a post of your interest </h3>
                {/* Title Section */}
                <div className="row" style={{textAlign: 'left'}}>
                    <h5><b>{post.title}</b></h5>
                    <h6 style={{fontStyle: "italic",color: "rgb(255,122,0)"}}>{post.authorID} </h6>
                </div>
                {/* Content Section */}
                <div className="row rounded rounded-5 py-2 px-4" style={{backgroundColor: "rgb(30,47,65)"}}>
                    {post.content}
                </div>
            </div>        
        )
    }

    const InboxComponent = (inbox, i) => {
        if (inbox.type === "friendRequest") {
            return <FriendRequest inbox={inbox} idx={i}/>
        } else if (inbox.type === "like") {
            return <LikedPost inbox={inbox} idx={i}/>
        } else if (inbox.type === "comment") {
            return <CommentedPost inbox={inbox} idx={i}/>
        } else if (inbox.type === "follow") {
            return <Follows inbox={inbox} idx={i}/>
        } else if (inbox.type === "post") {
            return <Post inbox={inbox} idx={i}/>
        } else {
            console.log("Unrecognized:", inbox)
            return <></>
        }
    }

    return (
        <>
            <body className="background">
                <div id="colortheme" className="bg-grey">
                {inbox.items && inbox.items.map((content, i) => (
                    <InboxComponent {...content} key={`InboxComponent_${i}`} />
                ))}
                </div>
                <Button className="CreativeButton" onClick = {() => {clearInbox(author.id)}}>Clear Inbox</Button>
            </body>
           
        </>
    )
}