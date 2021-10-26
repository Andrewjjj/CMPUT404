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
                "sender": "October Snake",
                "recipent": "Madeline Noodle",
                "senderHost": "inserturlhere",
                "date": "2021-10-09T13:07:04+00:00"
            },

            {
                "type": "like",
                "sender": "October Snake",
                "recipent": "Madeline Noodle",
                "senderHost": "inserturlhere",
                "postID": "insertpostIDhere",
                "date": "2021-10-09T13:07:04+00:00"
            },

            {
                "type": "comment",
                "sender": "Jill Yukon",
                "recipient": "Madeleine Noodle",
                "senderHost": "inserturlhere",
                "date": "2021-10-09T13:07:04+00:00",
                "contentType": "text/plain",
                "content": "Nice cat! But it could be better...."
            }

            
        ]

        setPosts(parsePosts(testjson))
    }

    const parsePosts = function(postsArray){

        var displayArray = []

        for(var i = 0;i < postsArray.length; i++){
            var postType = postsArray[i].type
            if (postType === "friendRequest") {
                //TODO: ADD BUTTONS TO ACCEPT/DENY THE FRIEND REQUEST HERE
                //TODO: HAVE THE BUTTONS THAT ACCEPT/DENY DELETE THE REQUEST
                displayArray[i] = postsArray[i].sender + " would like to be your friend!"
            } else if (postType === "like") {
                //TODO: ADD  link to the post that was liked
                displayArray[i] = postsArray[i].sender + " liked your post!"
            } else if (postType === "comment") {
                //TODO: ADD  link to the post that was COMMENTED ON
                displayArray[i] = postsArray[i].sender + " said '" + postsArray[i].content + "'"
            } else{
                //TODO: Throw a proper error here
            }
        }

        return displayArray
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