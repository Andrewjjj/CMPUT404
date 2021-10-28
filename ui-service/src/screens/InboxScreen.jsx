import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

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

        setPosts(parsePosts(testjson))
    }

    const parsePosts = function(postsArray){

        var displayArray = []
        var buttonArray= []

        for(var i = 0;i < postsArray.length; i++){
            var postType = postsArray[i].type
            if (postType === "friendRequest") {
                //TODO: ADD BUTTONS TO ACCEPT/DENY THE FRIEND REQUEST HERE
                //TODO: HAVE THE BUTTONS THAT ACCEPT/DENY DELETE THE REQUEST
                displayArray[i] = " would like to be your friend!"
                buttonArray[i] = ["","Accept Friend Request"]
            } else if (postType === "like") {
                //TODO: ADD  link to the post that was liked
                displayArray[i] = " liked your post!"
                buttonArray[i] = ["","See liked post"]
            } else if (postType === "comment") {
                //TODO: ADD  link to the post that was COMMENTED ON
                displayArray[i] = " commented '" + postsArray[i].content + "'!"
                buttonArray[i] = ["","See commented post"]
            } else{
                //TODO: Throw a proper error here
            }
        }

        return displayArray.map((post, i) => 
            
            <div className="shadow w-75 mb-5 mt-3 mx-auto border p-5 rounded rounded-5 z-depth-2 bg-white" key={"post"+i}>
                <a href={postsArray[i].senderHost + "/author/" + postsArray[i].senderID} >{postsArray[i].senderName}</a> {post}
                <br></br><button className = "btn btn-primary"> {buttonArray[i][1]} </button> <button className="btn btn-danger"> Dismiss> </button>
            </div>
            
        )
    }

    return (
        <>
            <div>
                This is an Inbox Screen! {posts}
            </div>
            <Link to="/">
                <button className="btn btn-danger" href="/">Go Back to Main Menu</button>
            </Link>
        </>
    )
}