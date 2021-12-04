import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useStoreState } from 'easy-peasy'
import axios from 'axios'

export const InboxScreen = (props) => {

    //const [posts, setPosts] = useState([]);
    const [inbox, setInbox] = useState([]);

    const restHost = useStoreState((state) => state.restHost)
    const author = useStoreState((state) => state.author)
    useEffect(() => {
        console.log(author)
        fetchInbox(author.id);
        
    }, [])

    /*const fetchPosts = async () => {
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
        let inboxUrl = "http://localhost:8080" + authorid + "/inbox";
        //let response = await axios.get(inboxUrl);

        //let responseJson = response.data;
        let responseJson = testJson;
        setInbox(testJson)
        // setPosts(parsePosts(testJson));
    }*/

    const fetchInbox = async (authorID) => {
        let fetchInboxUrl = `${restHost}/author/${authorID}/inbox`
        let response = await axios.get(fetchInboxUrl)
        console.log("inbox Data: ", response.data)
    }

    // const parsePosts = function(postsArray){

    //     var displayArray = []

    //     for(var i = 0;i < postsArray.length; i++){
    //         var postType = postsArray[i].type
    //         if (postType === "friendRequest") {
    //             displayArray[i] = friendRequest(postsArray[i], i)
    //         } else if (postType === "like") {
    //             displayArray[i] = likedPost(postsArray[i], i)
    //         } else if (postType === "comment") {
    //             displayArray[i] = commentedPost(postsArray[i], i)
    //         } else{
    //             throw "Error: Unrecognized item in inbox";
    //         }
    //     }

    //     if(displayArray.length == 0){
    //         return <h2>Your inbox is empty.</h2>
    //     }

    //     return displayArray
    // }


    const clearInbox = async function(authorId){
        let inboxUrl = `${restHost}/author/${authorId}/inbox`
        const deleteResponse = await axios.delete(inboxUrl);
        if(deleteResponse.status != 200 && deleteResponse.status < 400){
            throw "Inbox deletion failed";
        }
    }

    const acceptFriendRequest = async function(authorId, friendRequestId){
        let friendRequestUrl = `${restHost}/author/${authorId}/friend_request/${friendRequestId}`
        const putResponse = await axios.put(friendRequestUrl,{});
        if(putResponse.status >= 200 && putResponse.status < 400){
            throw "Friend request accept failed";
        }
    }

    const rejectFriendRequest = async function(authorId, friendRequestId){

        let friendRequestUrl = `${restHost}/author/${authorId}/friend_request/${friendRequestId}`
        const deleteResponse = await axios.delete(friendRequestUrl);
        if(deleteResponse.status != 200 && deleteResponse.status < 400){
            throw "Friend request rejection failed";
        }
    }

    const FriendRequest = (props) => {
        console.log("fr", props)

        const request = props.inbox
        const i = props.idx

        return  (
        <div className="shadow w-75 mb-5 mt-3 mx-auto border p-5 rounded rounded-5 z-depth-2 bg-white" key={"post"+i}>
            <a href={request.senderHost + "/author/" + request.senderID} >{request.senderName}</a> wants to be friends!
            <br></br><button className = "btn btn-primary" onClick = {() => {acceptFriendRequest(request.senderID, request.id)}}> Accept friend request </button> <button className="btn btn-danger" onClick = {() => {rejectFriendRequest(request.senderID, request.id)}}> Reject Friend Request</button>
        </div>
        )
    }

    const LikedPost = (props) => {
        console.log("liked", props)

        const like = props.inbox
        const i = props.idx

        //TODO: ADD A REAL LINK TO THE POST THAT WAS LIKED
        return  (
            <div className="shadow w-75 mb-5 mt-3 mx-auto border p-5 rounded rounded-5 z-depth-2 bg-white" key={"post"+i}>
                <a href={like.senderHost + "/author/" + like.senderID} >{like.senderName}</a> liked your post!
                <br></br>
                <button className = "btn btn-primary"> Goto liked post </button> <button className="btn btn-danger"> Dismiss </button>
            </div>
        )
    }

    const CommentedPost = (props) => {
        console.log("Comment", props)
        const comment = props.inbox
        const i = props.idx
        //TODO: ADD A REAL LINK TO THE COMMENT
        return  (
            <div className="shadow w-75 mb-5 mt-3 mx-auto border p-5 rounded rounded-5 z-depth-2 bg-white" key={"post"+i}>
                <a href={comment.senderHost + "/author/" + comment.senderID} >{comment.senderName}</a> commented '{comment.content}' on your post!
                <br></br>
                <button className = "btn btn-primary"> Goto commented post </button> <button className="btn btn-danger"> Dismiss </button>
            </div>
        )
    }

    const InboxComponent = (inbox, i) => {
        console.log("IBX", inbox)
        if (inbox.type === "friendRequest") {
            // displayArray[i] = friendRequest(postsArray[i], i)
            return <FriendRequest inbox={inbox} idx={i}/>
        } else if (inbox.type === "like") {
            // displayArray[i] = likedPost(postsArray[i], i)
            return <LikedPost inbox={inbox} idx={i}/>
        } else if (inbox.type === "comment") {
            return <CommentedPost inbox={inbox} idx={i}/>
        } else{
            console.log("Unrecognized:", inbox)
            return <></>
            // throw "Error: Unrecognized item in inbox";
        }
    }

    return (
        <>
            <div className="bg-grey">
            {inbox.map((content, i) => (
                <InboxComponent {...content} key={`InboxComponent_${i}`} />
            ))}
            </div>
            <Link to="/">
                <button className="btn btn-danger" href="/">Go Back to Main Menu</button> 
            </Link>
            <button className="btn btn-danger" onClick = {() => {clearInbox("123456789")}}>Clear Inbox</button>
        </>
    )
}