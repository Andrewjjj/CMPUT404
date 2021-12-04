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

            // TODO: change this 
            // await Promise.all(posts.map(async post => {
            //     response = await axios.get(`http://localhost:8080/post/${post.PostID}/comment`)
            //     post.Comments = response.data;
            //     response = await axios.get(`http://localhost:8080/author/${post.AuthorID}`)
            //     post.AuthorName = await response.data[0].Name;
            //     post.Tags = ["awesome", "good"]
            // }))

            setPosts(posts)
        }
        catch(err){
            console.log(err)
            alert(err)
        }
    }

    const commentChangeHandler = (postID, comment) => {
        setCommentInputField({
            ...commentInputField,
            [postID]: comment,
        })
        console.log(commentInputField)
    }

    const submitCommentHandler = async (postID) => {
        let comment = commentInputField[postID];
        let currentDate = new Date();
        currentDate = currentDate.toString();
        console.log(comment)
        try{
            console.log(postID);
            await axios.post(`${postID}/comments`, {
                type: "comment",
                author:{
                    type: "author",
                    id: `${authorInfo.AuthorID}`,
                    url:`${authorInfo.AuthorID}`,
                    host: `${restHost}`,
                    github: "awoo",
                    profileImage:"awoo"
                },
                comment: comment,
                contentType: "text/plain", //TODO: ALLOW TEXT/MARKDOWN
                id: "1234",
                published: currentDate
            }).then(res => {
                alert("success")
            })
        }
        catch(err){
            console.log(err)
            alert(err)
            //alert(postID)
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
            alert(err)
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
                    {/*post.comments.map((comment, i) => 
                        <div key={"comment_"+i}>
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
                        Comment: <input type="text" id={"comment_"+post.PostID} className="form-control-sm" onInput={(e) => commentChangeHandler(post.PostID, e.target.value)}></input>
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