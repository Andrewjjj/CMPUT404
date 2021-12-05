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
    
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]); 
    const [commentInputField, setCommentInputField] = useState({});
    const [editBodyField, setEditBodyField] = useState({});
    const [editTitleField, setEditTitleField] = useState({});
    const authorInfo = useStoreState((state) => state.author)
    const restHost = useStoreState((state) => state.restHost)
    //const feedAuthor = props.author;
    const [editingPostID, setEditingPostID] = useState("")

    useEffect(() => {
        fetchPosts();
    }, [])

    const fetchPosts = async () => {
        try{
            let response = await axios.get(`${restHost}/author/${authorInfo.id}/posts`)
            // let response = await axios.get("http://localhost:8080/post")
            let posts = response.data
            console.log("Posts: ", posts)

            setPosts(posts);
            fetchComments(posts);
            fetchLikes(posts);
        }
        catch(err){
            console.log(err)
            alert(`Post error: ${err}`)
        }
    }

    const fetchLikes = async (posts) => {
        let newLikes = []
        
        for(var i = 0; i < posts.length; i++){
            try{
                let likesResponse = await axios.get(`${posts[i].id}/likes`)
                newLikes[i] = likesResponse.data;
            }
            catch(err){
                console.log(err)
                alert(`Likes error: ${err} with url ${posts[i].id}/likes`)
            }
        }
        console.log("Post Likes", newLikes)
        //alert(toString(comments))
        setLikes(newLikes)
        //setLikes([[1, 2],[1]])
    }

    const fetchComments = async (posts) => {
        console.log(posts)
        let newComments = []
        
        for(var i = 0; i < posts.length; i++){
            try{
                let commentsResponse = await axios.get(`${posts[i].id}/comments`)
                newComments[i] = commentsResponse.data;
            }
            catch(err){
                console.log(err)
                alert(`Comment error: ${err}`)
            }
        }
        console.log("Post Comments", newComments)
        //alert(toString(comments))
        setComments(newComments)
    }

    const commentChangeHandler = (postID, comment) => {
        console.log(postID, comment)
        setCommentInputField({
            ...commentInputField,
            [postID]: comment,
        })
        console.log(commentInputField)
    }

    const editTitleHandler = (postID, edit) => {
        console.log(postID, edit)
        setEditTitleField({
            ...editTitleField,
            [postID]: edit,
        })
        console.log(editTitleField)
    }

    const editBodyHandler = (postID, edit) => {
        console.log(postID, edit)
        setEditBodyField({
            ...editBodyField,
            [postID]: edit,
        })
        console.log(editBodyField)
    }

    const sharePostHandler = async (post) => {

        //TODO: CHECK THAT THE USER IS ALLOWED TO SHARE THIS POST
        let success = true;
        let friends = await axios.get(`${restHost}/author/${authorInfo.AuthorID}/followers`);
        for(var i = 0; i < friends.length; i++){
            try{
                axios.post(`${friends[i].id}/inbox`, post).then(res => {
                    console.log(`Successfully shared with ${friends[i].name}`)
                })
            }
            catch(err){
                success = false
                console.log(err)
                alert(`Share error: ${err}`)
            }
        }
        if(friends.length < 1){
            success = false
        }
        if(success == true){
            alert('Shared successfully')
        }
    }

    const editPostHandler = (post) => {
        if(`${restHost}/author/${authorInfo.AuthorID}`!= post.author.id && false){
            alert('You are not authorized to edit this post')
            return 0
        }
        if(editingPostID != post.id){
            setEditingPostID(post.id)
        } else{
            setEditingPostID("")
        }
        
    }

    const submitEditHandler = async (post) => {
        if(`${restHost}/author/${authorInfo.AuthorID}`!= post.author.id && false){
            alert('You are not authorized to edit this post')
            return 0
        }
        
        let newPost = post
        let newBody = editBodyField[post.id]
        let newTitle = editTitleField[post.id]

        newPost.content = newBody
        newPost.title = newTitle
        //TODO: GET THE TITLE/CONTENT/TAGS FROM THE THINGY

        try{
            let response = await axios.post(post.url, newPost)
        }
        catch(err){
            console.log(err)
            alert(`Editing error: ${err}`)
        }
        setEditingPostID("")
        //fetchPosts()
    }

    const deletePostHandler = async (post) => {
        if(`${restHost}/author/${authorInfo.AuthorID}` != post.author.id && false){
            alert(`You are not authorized to delete this post:
                    Your id: ${restHost}/author/${authorInfo.AuthorID}
                    Required id: ${post.author.id}`)
            return 0
        }
        try{
            let response = await axios.delete(post.url, post).then(res => {
                alert("Successful deletion")
            })
        }
        catch(err){
            console.log(err)
            alert(`Deletion error: ${err}`)
        }
    }

    const submitCommentHandler = async (postID) => {
        console.log(postID)
        let newComment = commentInputField[postID];
        let currentDate = new Date();
        let url = `${postID}/comments`
        currentDate = currentDate.toString();
        console.log(newComment)
        try{
            await axios.post(url, {
                type: "comment",
                comment: {
                    publishedTime: currentDate, //TODO: ADD MORE FIELDS
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

    const reactionClickHandler = async (postID, authorID) => {
        let url = `${authorID}/inbox`
        try {
            await axios.post(url,{
                type: "like",
                senderName: authorInfo.displayName,
                object: postID,
                author: authorInfo
            })
            .then(res => {
                alert("success")
            })
        } catch(err) {
            console.log(err)
            alert(err)
            //alert(url)
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
                    {post.id === editingPostID ? 
                        <input type="text" id={"edit_title_"+post.id} className="form-control-sm" onInput={(e) => editTitleHandler(post.id, e.target.value)}></input>
                    :
                        <h5><b>{post.title}</b></h5>
                    }
                    <h6 style={{fontStyle: "italic",color: "rgb(255,122,0)"}}>{post.author["displayName"]} </h6>
                </div>
                {/* Content Section */}
                <div className="row rounded rounded-5 py-2 px-4" style={{backgroundColor: "rgb(30,47,65)"}}>
                    {post.id === editingPostID ?
                         <input type="text" id={"edit_body_"+post.id} className="form-control-sm" onInput={(e) => editBodyHandler(post.id, e.target.value)}></input>
                        
                        : post.content}
                </div>
                {/* React Section */}
                <div className="row my-2">
                  <div class="btn-group-sm shadow-0 col" role="group">
                        {post.visibility !== "FRIENDS" || likes[i] === undefined ? "" : "Likes: " + likes[i].length }
                         <button type="button" class="btn btn-dark shadow-0" style={{backgroundColor: "rgb(30,47,65)"}}data-mdb-color="dark"
                            onClick={() => {
                                reactionClickHandler(post.id, post.author.id)
                            }}>
                            <i className="far fa-thumbs-up fa-1x"></i>+{post.Likes}
                        </button>
                        <button className="btn" onClick={() => {
                                sharePostHandler(post)
                        }}>Share</button>
                    </div>
                </div>
                {/* Tag Section */}
                <div className="row my-1">
                        <p className="text-grey">
                        Tags: 
                        {post.categories.map((tag, i) => 
                            <span> {tag}</span>
                        )}
                        </p>
                    </div>
                {/* Edit Section */}
                { post.author.id === authorInfo.AuthorID ? "" :
                    <div className="row my-2">
                    <div class="btn-group-sm shadow-0 col" role="group">
                        {/*TODO: REMOVE THE EDIT BUTTON FOR PRIVATE POSTS
                        ANOTHER TODO: INVERT THE IF STATEMENT ONCE OUT OF TESTING */}
                        {post.id === editingPostID ?
                            <button className="btn" onClick={() => {
                                editPostHandler(post)
                            }}>Stop editing</button>:
                            <button className="btn" onClick={() => {
                                editPostHandler(post)
                            }}>Edit</button>}
                        {post.id === editingPostID ? 
                        <button className="btn" onClick={() => {
                            submitEditHandler(post)
                        }}>Submit edit</button>:
                        <button className="btn" onClick={() => {
                            deletePostHandler(post)
                        }}>Delete</button>}
                        </div>
                    </div>
                }
                {/* Comment Section */}
                <div className="mt-2 mx-2">
                    {
                        comments[i] === undefined ? "" : comments[i].comments.map((comment, j) => 
                            <div key={"comment_"+j}>
                                <div className="column my-2 px-5 text-start">
                                    <div className="col-3 bg-grey" style={{fontStyle: "italic",color: "rgb(255,122,0)"}}>
                                        {comment.author.displayName}
                                    </div>
                                    <div className="col text-start">
                                        {comment.comment}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div className="row px-5 py-2">
                        Comment: <input type="text" id={"comment_"+post.id} className="form-control-sm" onInput={(e) => commentChangeHandler(post.id, e.target.value)}></input>
                        <div className="col text-end">
                            <button className="btn" onClick={() => {
                                submitCommentHandler(post.id)
                            }}>Submit</button>
                        </div>
                    </div>
                    
                </div>
            </div>
            )}
        </div>
     );
}