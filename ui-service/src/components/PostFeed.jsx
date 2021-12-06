import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { CreatePostModal } from '../components/CreatePostModal';
import { Button } from 'react-bootstrap'
import { WithContext as ReactTags } from 'react-tag-input';
import { useStoreActions, useStoreState } from 'easy-peasy'
import { CommentSection } from './CommentSection';
import { ReactionSection } from './ReactionSection';
import { EditSection } from './EditSection';
import { DisplaySection } from './DisplaySection';
import { UpperEditSection } from './UpperEditSection';

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
    const [commentMarkdownField, setCommentMarkdownField] = useState({});
    const [editBodyField, setEditBodyField] = useState({});
    const [editTitleField, setEditTitleField] = useState({});
    const [editPost, setEditPost] = useState({});
    const authorInfo = useStoreState((state) => state.author)
    const restHost = useStoreState((state) => state.restHost)
    const [editingPostID, setEditingPostID] = useState("")


    const [showModal, setShowModal] = useState(false)
    useEffect(() => {
        fetchPosts();
    }, [])

    const fetchPosts = async () => {
        try{
            let response = await axios.get(`${restHost}/author/${authorInfo.id}/posts`)
            let posts = response.data
            setPosts(posts);
            fetchComments(posts);
            fetchLikes(posts);
        }
        catch(err){
            console.log(err)
        }
    }

    const fetchLikes = async (posts) => {
        let newLikes = []
        console.log("PostS: ", posts)
        for(var i = 0; i < posts.length; i++){
            try{
                let likesResponse = await axios.get(`${posts[i].id}/likes`)
                newLikes[i] = likesResponse.data;
            }
            catch(err){
                console.log(err)
            }
        }
        setLikes(newLikes)
        console.log(newLikes)
    }

    const fetchComments = async (posts) => {
        let newComments = []
        
        for(var i = 0; i < posts.length; i++){
            try{
                let commentsResponse = await axios.get(`${posts[i].id}/comments`)
                newComments[i] = commentsResponse.data;
            }
            catch(err){
                console.log(err)
            }
        }
        console.log("Post Comments", newComments)
        setComments(newComments)
    }

    const commentChangeHandler = (postID, comment) => {
        setCommentInputField({
            ...commentInputField,
            [postID]: comment,
        })
        console.log(commentInputField)
    }

    const commentMarkdownHandler = (postID, value) => {
        setCommentMarkdownField({
            ...commentMarkdownField,
            [postID]: value,
        })
        console.log(commentMarkdownField)
    } 

    const editTitleHandler = (postID, edit) => {
        setEditTitleField({
            ...editTitleField,
            [postID]: edit,
        })
        console.log(editTitleField)
    }

    const editBodyHandler = (postID, edit) => {
        setEditBodyField({
            ...editBodyField,
            [postID]: edit,
        })
        console.log(editBodyField)
    }

    const sharePostHandler = async (post) => {

        let friendsResponse = await axios.get(`${restHost}/author/${authorInfo.id}/friends`);
        let friends = friendsResponse.data;
        console.log("friends", friends)

        await Promise.all(friends.map(async friend => {
            try{
                await axios.post(`${friend.id}/inbox`, post).then(() => {
                    console.log(`Successfully shared with ${friend.displayName}`)
                })
            }
            catch(err){
                console.log(err)
                alert(`Share error: ${err}`)
            }
        }))
    }

    const editPostHandler = (post) => {
        if(editingPostID != post.id){
            setEditingPostID(post.id)
        } else{
            setEditingPostID("")
        }
        
    }

    const submitEditHandler = async (post) => {
        
        let newPost = post
        let newBody = editBodyField[post.id]
        let newTitle = editTitleField[post.id]

        newPost.content = newBody
        newPost.title = newTitle

        try{
            let response = await axios.post(post.id, newPost)
            setEditingPostID("")
            fetchPosts();

        }
        catch(err){
            console.log(err)
        }
    }

    const deletePostHandler = async (post) => {
        try{
            let response = await axios.delete(post.id, post).then(res => {
                alert("Successful deletion")
        })
            fetchPosts();

        }
        catch(err){
            console.log(err)
        }
    }

    const submitCommentHandler = async (postID) => {
        console.log(postID)
        let newComment = commentInputField[postID];
        let currentDate = new Date();
        let url = `${postID}/comments`
        let useMarkdown = commentMarkdownField[postID];
        let contentType = "text/plain"
        if(useMarkdown === true){
            contentType = "text/markdown"
        }
        currentDate = currentDate.toString();
        console.log(newComment)
        try{
            await axios.post(url, {
                type: "comment",
                comment: {
                    publishedTime: currentDate, 
                    authorID: authorInfo.id,
                    content: commentInputField[postID],
                    contentType: contentType, 
                }
            }).then(res => {
                alert("success")
            })
        }
        catch(err){
            console.log(err)
        }
        fetchPosts();
    }

    const reactionClickHandler = async (postID, authorID) => {
        let url = `${authorID}/inbox`
        try {
            await axios.post(url,{
                type: "like",
                object: postID,
                id: authorInfo.id
            })
            .then(res => {
                alert("success")
                fetchPosts();
            })
        } catch(err) {
            console.log(err)
        }
    }

    const createNewPostHandler = () => {

    }

    return (
        <div style={{backgroundColor: "rgb(21,32,43)"}} id={PostFeed}>
            <CreatePostModal isVisible={showModal} setVisible={setShowModal} refresh={fetchPosts} submitPostHandler={createNewPostHandler} ></CreatePostModal>


            <div style={{display: "flex", justifyContent: "center", flexDirection: 'column'}}>
                <Button className="CreativeButton" onClick={() => setShowModal(true)}>Create New Post</Button>
            </div>
            

            {posts.map((post, i) => 
            <div className=" w-50 mt-3 mx-auto border p-4 rounded-5 z-depth-2 text-white"
            style={{backgroundColor: "rgb(30,47,65)"}} key={"post"+i}>
                {/* Title Section */}
                {post.id ===editingPostID ? 
                    <UpperEditSection post={post} bodyHandler={editBodyHandler} titleHandler={editTitleHandler}></UpperEditSection>
                :
                    <DisplaySection post={post} ></DisplaySection>
                }
                {/* Edit Section */}
                <EditSection post={post} editingPostID={editingPostID} editHandler = {editPostHandler} submitHandler = {submitEditHandler} deleteHandler = {deletePostHandler}></EditSection>
                {/* React Section */}
                <ReactionSection post={post} likes={likes[i]} clickHandler={reactionClickHandler} shareHandler={sharePostHandler}></ReactionSection>
                {/* Comment Section */}
                <CommentSection post={post} comments={comments[i]} submitHandler={submitCommentHandler} changeHandler={commentChangeHandler} checkHandler={commentMarkdownHandler}></CommentSection>
            </div>
            )}
        </div>
     );
}