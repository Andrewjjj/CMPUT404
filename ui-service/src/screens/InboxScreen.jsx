import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export const InboxScreen = (props) => {

    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        fetchPosts();
    }, [])

    const fetchPosts = async () => {
        let testJson = [
            {
                "type": "friendRequest",
                "id": "agdfgdfgdfghj",
                "senderName": "October Snake",
                "senderID": "somegobbeldygookhere",
                "recipent": "Madeline Noodle",
                "senderHost": "inserturlhere",
                "date": "2021-10-09T13:07:04+00:00"
            },

            {
                "type": "like",
                "id": "agdfgdfgdfghj",
                "senderName": "October Snake",
                "senderID": "somegobbeldygookhere",
                "recipent": "Madeline Noodle",
                "senderHost": "inserturlhere",
                "postURL": "insertpostIDhere",
                "date": "2021-10-09T13:07:04+00:00"
            },

            {
                "type": "comment",
                "id": "agdfgdfgdfghj",
                "senderName": "Jill Yukon",
                "senderID": "somegobbeldygookhere",
                "recipient": "Madeleine Noodle",
                "senderHost": "inserturlhere",
                "postURL": "insertpostIDhere",
                "date": "2021-10-09T13:07:04+00:00",
                "contentType": "text/plain",
                "content": "Nice cat! But it could be better...."
            }

            
        ]

        let authorid = "123456789";
        let inboxUrl = "http://localhost:8080/" + authorid + "/inbox";
        //let response = await axios.get(inboxUrl);

        //let responseJson = response.data;
        let responseJson = testJson;

        setPosts(parsePosts(testJson));
    }

    const parsePosts = function(postsArray){

        var displayArray = []

        for(var i = 0;i < postsArray.length; i++){
            var postType = postsArray[i].type
            if (postType === "friendRequest") {
                displayArray[i] = friendRequest(postsArray[i], i)
            } else if (postType === "like") {
                displayArray[i] = likedPost(postsArray[i], i)
            } else if (postType === "comment") {
                displayArray[i] = commentedPost(postsArray[i], i)
            } else{
                throw "Error: Unrecognized item in inbox";
            }
        }

        if(displayArray.length == 0){
            return <h2>Your inbox is empty.</h2>
        }

        return displayArray
    }

    const clearInbox = async function(authorId){
        let server = "http://localhost:8080/" //TODO: CHECK IF THIS WORKS

        let inboxUrl = server + "/author/" + authorId + "/inbox"
        const deleteResponse = await axios.delete(inboxUrl);
        if(deleteResponse.status != 200 && deleteResponse.status < 400){
            throw "Inbox deletion failed";
        }
    }

    const acceptFriendRequest = async function(authorId, friendRequestId){
        let server = "http://localhost:8080/" //TODO: CHECK IF THIS WORKS
        
        let friendRequestUrl = server + "/author/" + authorId + "/friend_request/" + friendRequestId
        const putResponse = await axios.put(friendRequestUrl,{});
        if(putResponse.status >= 200 && putResponse.status < 400){
            throw "Friend request accept failed";
        }
    }

    const rejectFriendRequest = async function(authorId, friendRequestId){
        let server = "http://localhost:8080/" //TODO: CHECK IF THIS WORKS
        
        let friendRequestUrl = server + "/author/" + authorId + "/friend_request/" + friendRequestId
        const deleteResponse = await axios.delete(friendRequestUrl);
        if(deleteResponse.status != 200 && deleteResponse.status < 400){
            throw "Friend request rejection failed";
        }
    }

    const friendRequest = function(request, i){

        return  <div className="shadow w-75 mb-5 mt-3 mx-auto border p-5 rounded rounded-5 z-depth-2 bg-white" key={"post"+i}>
                    <a href={request.senderHost + "/author/" + request.senderID} >{request.senderName}</a> wants to be friends!
                    <br></br><button className = "btn btn-primary" onClick = {acceptFriendRequest(request.senderID, request.id)}> Accept friend request </button> <button className="btn btn-danger" onClick = {rejectFriendRequest(request.senderID, request.id)}> Reject Friend Request</button>
                </div>
    }

    const likedPost = function(like, i){
        //TODO: ADD A REAL LINK TO THE POST THAT WAS LIKED
        return  <div className="shadow w-75 mb-5 mt-3 mx-auto border p-5 rounded rounded-5 z-depth-2 bg-white" key={"post"+i}>
                    <a href={like.senderHost + "/author/" + like.senderID} >{like.senderName}</a> liked your post!
                    <br></br><button className = "btn btn-primary"> Goto liked post </button> <button className="btn btn-danger"> Dismiss </button>
                </div>
    }

    const commentedPost = function(comment, i){
        //TODO: ADD A REAL LINK TO THE COMMENT
        return  <div className="shadow w-75 mb-5 mt-3 mx-auto border p-5 rounded rounded-5 z-depth-2 bg-white" key={"post"+i}>
                    <a href={comment.senderHost + "/author/" + comment.senderID} >{comment.senderName}</a> commented '{comment.content}' on your post!
                     <br></br><button className = "btn btn-primary"> Goto commented post </button> <button className="btn btn-danger"> Dismiss </button>
                </div>
    }

    return (
        <>
            <div className="bg-grey">
                {posts}
            </div>
            <Link to="/">
                <button className="btn btn-danger" href="/">Go Back to Main Menu</button> 
            </Link>
            <button className="btn btn-danger" onClick = {clearInbox("123456789")}>Clear Inbox</button>
        </>
    )
}