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



        setPosts(testjson)
    }

    return (
        <>
            <div>
                This is an Inbox Screen!
            </div>
            <Link to="/">
                <button className="btn btn-danger" href="/">Go Back to Main Menu</button>
            </Link>
        </>
    )
}