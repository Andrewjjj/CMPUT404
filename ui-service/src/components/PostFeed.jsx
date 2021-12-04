import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { WithContext as ReactTags } from 'react-tag-input';
import { useStoreActions, useStoreState } from 'easy-peasy'

import { Link } from 'react-router-dom'
import axios from 'axios'

Modal.setAppElement('#root');

const customStyles = {
    content: {
        width: '60%',
        marginLeft: "auto",
        marginRight: "auto",
    },
};


export const PostFeed = (props) => {
    
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [tags, setTags] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentInputField, setCommentInputField] = useState({});
    const authorInfo = useStoreState((state) => state.author)
    const restHost = useStoreState((state) => state.restHost)

    useEffect(() => {
        fetchPosts();
    }, [])

    const fetchPosts = async () => {
        try{
            let response = await axios.get(`${restHost}/author/${authorInfo.AuthorID}/posts`)
            // let response = await axios.get("http://localhost:8080/post")
            let posts = response.data
            console.log("Posts: ", posts)
            // TODO: change this 
            // await Promise.all(posts.map(async post => {
            //     response = await axios.get(`http://localhost:8080/post/${post.PostID}/comment`)
            //     post.Comments = response.data;
            //     response = await axios.get(`http://localhost:8080/author/${post.AuthorID}`)
            //     post.AuthorName = await response.data[0].Name;
            //     post.Tags = ["awesome", "good"]
            // }))

            setPosts(posts)
            fetchComments(posts)
        }
        catch(err){
            console.log(err)
            alert(`Post error: ${err}`)
        }
    }

    const fetchComments = async (posts) => {
        let comments = []
        console.log("Post COMemnts", posts)
        for(var i = 0; i < posts.length; i++){
            try{
                let commentsResponse = await axios.get(`${posts[i].id}/comments`)
                comments[i] = commentsResponse.data;
            }
            catch(err){
                console.log(err)
                alert(`Comment error: ${err}`)
            }
        }
        setComments(comments)
    }

    const commentChangeHandler = (postID, comment) => {
        console.log(postID, comment)
        setCommentInputField({
            ...commentInputField,
            [postID]: comment,
        })
        console.log(commentInputField)
    }

    const submitCommentHandler = async (postID) => {
        console.log(postID)
        let newComment = "awoo";
        let currentDate = new Date();
        let url = `${postID}/comments`
        currentDate = currentDate.toString();
        console.log(newComment)
        try{
            await axios.post(url, {
                type: "comment",
                comment: {
                    publishedTime: currentDate,
                    authorID: authorInfo.id,
                    content: commentInputField[postID],
                    contentType: "text/plain", //TODO: ALLOW TEXT/MARKDOWN
                }
                // id: "1234",
                //published: currentDate
            }).then(res => {
                alert("success")
            })
        }
        catch(err){
            console.log(err)
            alert(err)
            //alert(newComment)
        }
        fetchPosts();
    }

    const reactionClickHandler = async (postID, reactionType) => {
        try {
            await axios.post(`${restHost}/${authorInfo.AuthorID}/inbox`)
            .then(res => {
                alert("success")
            })
        } catch(err) {
            console.log(err)
            //alert(err)
            alert()
        }
        fetchPosts();
    }

    return (
        <div id={PostFeed}>
            {posts.map((post, i) => 
            <div className=" w-50 mt-3 mx-auto border p-4 rounded-5 z-depth-2 text-white"
            style={{backgroundColor: "rgb(30,47,65)"}} key={"post"+i}>
                {/* Title Section */}
                <div className="row" style={{textAlign: 'left'}}>
                    <h5><b>{post.title}</b></h5>
                    <h6 style={{fontStyle: "italic",color: "rgb(255,122,0)"}}>{post.author["displayName"]} </h6>
                </div>
                {/* Content Section */}
                <div className="row rounded rounded-5 py-2 px-4" style={{backgroundColor: "rgb(30,47,65)"}}>
                    {post.content}
                </div>
                {/* React Section */}
                <div className="row my-2">
                  <div class="btn-group-sm shadow-0 col" role="group">
                         <button type="button" class="btn btn-dark shadow-0" style={{backgroundColor: "rgb(30,47,65)"}}data-mdb-color="dark"
                            onClick={() => {
                                reactionClickHandler(post.id, "like")
                            }}>
                            <i className="far fa-thumbs-up fa-1x"></i>+{post.Likes}
                        </button>
                        <button type="button" class="btn btn-dark shadow-0" style={{backgroundColor: "rgb(30,47,65)"}}data-mdb-color="dark"
                            onClick={() => {
                                reactionClickHandler(post.id, "love")
                            }}>
                            <i className="far fa-heart fa-1x"></i>+{post.Likes}
                        </button>
                        <button type="button" class="btn btn-dark shadow-0" style={{backgroundColor: "rgb(30,47,65)"}}data-mdb-color="dark"
                            onClick={() => {
                                reactionClickHandler(post.id, "rocket")
                            }}>
                            <i className="fas fa-rocket fa-1x"></i>+{post.Likes}
                        </button>
                    </div>
                </div>
                {/* Comment Section */}
                <div className="mt-2 mx-2">
                    {/*comments[i].map((comment, j) => 
                        <div key={"comment_"+j}>
                            <div className="column my-2 px-5 text-start">
                                <div className="col-3 bg-grey" style={{fontStyle: "italic",color: "rgb(255,122,0)"}}>
                                    {comment.AuthorID}
                                </div>
                                <div className="col text-start">
                                    {comment.Comment}
                                </div>
                            </div>
                        </div>
                    )*/}
                    <div className="row px-5 py-2">
                        Comment: <input type="text" id={"comment_"+post.id} className="form-control-sm" onInput={(e) => commentChangeHandler(post.id, e.target.value)}></input>
                        <div className="col text-end">
                            <button className="btn" onClick={() => {
                                submitCommentHandler(post.id)
                            }}>Submit</button>
                        </div>
                    </div>
                    {/* Tag Section */}
                    <div className="row my-1">
                        <p className="text-grey">
                        Tags: 
                        {post.categories.map((tag, i) => 
                            <button key={"button"+i}
                                className="btn btn-sm btn-warning mx-1"
                                onClick={() => {
                                    alert("Sorry! This hasn't been implemented yet")
                                }}
                            >{tag}</button>
                        )}
                        </p>
                    </div>
                </div>
            </div>
            )}
        </div>
     );
}