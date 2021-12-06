
import axios from "axios"
import { useEffect, useState, useRef } from "react"
import { Button, Input } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
const CommentComponent = (props) => {

    useEffect(() => {
        console.log("SODIFJSDOIFJ!")
    }, [])
    return (
        <div className="row">
        <div className="col-3 text-primary">{props.comment.author.displayName}</div>
        <div className="col">{props.comment.comment}</div>
        </div>
    )
}


export const PostComponent = (props) => {

    const [comments, setComments] = useState([])
    const navigate = useNavigate()
    const fetchComments = async (url) => {
        const response = await axios.get(`${url}comments`, {
            headers: {
                "Authorization": `Basic ${props.token}`
            }
        })
        console.log("Comment Data: ", response.data)
        setComments(response.data)
    }

    const newCommentRef = useRef(null);

    useEffect(() => {
        console.log("Post", post)
        fetchComments(post.url)
    }, [])

    const likeClickHandler = async (postURL) => {
        
        try{
            await axios.post(`${postURL}inbox`, {
                type: "like",
            })
            alert("success")
        }
        catch(err){
            alert("Server responded with 500")
            console.log()
        }
    }

    const submitCommentHandler = async (postUrl) => {
        try{
            await axios.post(`${postUrl}comments`, {
                "type":"comment",
                "comment":newCommentRef.current.value,
                "contentType":"text/plain",
                "published": new Date(Date.now()).toString(),
            })
        }
        catch(err){
            alert("Server responded with 500")
        }
    }

    const post = props.post;


    return (
        <div className="w-50 mt-3 mx-auto border p-4 rounded-5 shadow-2">

            {/* Title Section */}
            <div className="row" style={{ textAlign: 'left' }}>
                <h5><b>{post.title}</b></h5>
                <Button variant="success" onClick={() => { navigate(`/Profile?authorID=${post.author.url}&token=${props.token}`) }}>{post.author.displayName}</Button>
                <h6 style={{ fontStyle: "italic", color: "rgb(255,122,0)" }}>{post.AuthorName} </h6>
            </div>

            {/* Content Section */}
            <div className="row rounded rounded-5 py-2 px-4">
                Description: {post.description}
            </div>
            {/* Content Section */}
            <div className="row rounded rounded-5 py-2 px-4">
                Content: {post.content}
            </div>
            {/* React Section */}
            <div className="row my-2">
                <div className="col" role="group">
                    <Button type="button" class="btn btn-dark" style={{ backgroundColor: "rgb(30,47,65)" }} data-mdb-color="dark"
                        onClick={() => {
                            likeClickHandler(post.source)
                        }}>
                        <i className="far fa-thumbs-up fa-1x"></i>+{post.count}
                    </Button>
                </div>
            </div>
            <hr className="my-2" />
            <h4>Comments: </h4>
            <div className="row">
                <div className="col-3"><b>Author</b></div>
                <div className="col"><b>Comment</b></div>
            </div>
            {comments.map(comment => (
                <>
                <CommentComponent comment={comment}/>
                </>
            ))}
            <div className="w-100 my-3">
            Enter Comment: <input type="text" className="w-100" ref={newCommentRef}></input>
            <Button type="button" class="btn btn-dark" data-mdb-color="dark"
                onClick={() => {
                    submitCommentHandler(post.url)
                }}>
            Submit Comment
            </Button>
            </div>
        </div>
    )
}