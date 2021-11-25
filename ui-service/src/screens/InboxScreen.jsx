import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export const InboxScreen = (props) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, [])

    const fetchPosts = async () => {
        let testjson = [
            {
                "type": "friendRequest",
                "senderName": "October Snake",
                "senderID": "somegobbeldygookhere",
                "recipent": "Madeline Noodle",
                "senderHost": "inserturlhere",
                "date": "2021-10-09T13:07:04+00:00"
            },

            {
                "type": "like",
                "senderName": "October Snake",
                "senderID": "somegobbeldygookhere",
                "recipent": "Madeline Noodle",
                "senderHost": "inserturlhere",
                "postURL": "insertpostIDhere",
                "date": "2021-10-09T13:07:04+00:00"
            },

            {
                "type": "comment",
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

        let authorid = "longsnake";
        let inboxUrl = "http://localhost:8080/" + authorid + "/inbox";
        let response = await axios.get(inboxUrl);

        let responseJson = response.data;

        setPosts(parsePosts(responseJson));
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
                //TODO: Throw a proper error here
            }
        }

        return displayArray
    }

    const friendRequest = function(request, i){

        return  <div className="shadow w-75 mb-5 mt-3 mx-auto border p-5 rounded rounded-5 z-depth-2 bg-white" key={"post"+i}>
                    <a href={request.senderHost + "/author/" + request.senderID} >{request.senderName}</a> wants to be friends!
                    <br></br><button className = "btn btn-primary"> Accept friend request </button> <button className="btn btn-danger"> Dismiss </button>
                </div>
    }

    const likedPost = function(like, i){

        return  <div className="shadow w-75 mb-5 mt-3 mx-auto border p-5 rounded rounded-5 z-depth-2 bg-white" key={"post"+i}>
                    <a href={like.senderHost + "/author/" + like.senderID} >{like.senderName}</a> liked your post!
                    <br></br><button className = "btn btn-primary"> Goto liked post </button> <button className="btn btn-danger"> Dismiss </button>
                </div>
    }

    const commentedPost = function(comment, i){

        return  <div className="shadow w-75 mb-5 mt-3 mx-auto border p-5 rounded rounded-5 z-depth-2 bg-white" key={"post"+i}>
                    <a href={comment.senderHost + "/author/" + comment.senderID} >{comment.senderName}</a> commented '{comment.content}' on your post!
                     <br></br><button className = "btn btn-primary"> Goto commented post </button> <button className="btn btn-danger"> Dismiss </button>
                </div>
    }

    //TODO: ADD A SPECIAL SCREEN FOR IF THERE ARE NO POSTS IN THE
    return (
        <>
            <div className="bg-grey">
                {posts}
            </div>
            <Link to="/">
                <button className="btn btn-danger" href="/">Go Back to Main Menu</button>
            </Link>
        </>
    )
}