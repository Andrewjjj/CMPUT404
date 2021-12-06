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

    // const [foreignPosts, setForeignPosts] = useState([]);
    // const [foreignComments, setForeignComments] = useState([]);
    // const [foreignLikes, setForeignLikes] = useState([]); 

    // const [hostURL, setHostURL] = useState("")
    // const [username, setUsername] = useState("")
    // const [password, setPassword] = useState("")

    const [commentInputField, setCommentInputField] = useState({});
    const [commentMarkdownField, setCommentMarkdownField] = useState({});
    const [editBodyField, setEditBodyField] = useState({});
    const [editTitleField, setEditTitleField] = useState({});
    const [editPost, setEditPost] = useState({});
    //const feedAuthor = useState(props.author);
    const authorInfo = useStoreState((state) => state.author)
    const restHost = useStoreState((state) => state.restHost)
    //const feedAuthor = props.author;
    const [editingPostID, setEditingPostID] = useState("")


    const [showModal, setShowModal] = useState(false)
    useEffect(() => {
        fetchPosts();
    }, [])

    const fetchPosts = async () => {
        try{
            // console.lo
            let response = await axios.get(`${restHost}/author/${authorInfo.id}/posts`)
            // let response = await axios.get("http://localhost:8080/post")
            let posts = response.data
            // console.log("Posts: ", posts)
            // posts = await posts.map(async post => {
            //     if(post.contentType != "image/png;base64" || post.contentType != "image/png;base64") return post;
            //     // await axios.get("")
            // })
            // console.log("POST", posts)
            setPosts(posts);
            fetchComments(posts);
            fetchLikes(posts);
        }
        catch(err){
            console.log(err)
            // alert(`Post error: ${err}`)
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
                // alert(`Likes error: ${err} with url ${posts[i].id}/likes`)
            }
        }
        // console.log("Post Likes", newLikes)
        //alert(toString(comments))
        setLikes(newLikes)
        //setLikes([[1, 2],[1]])
    }

    const fetchComments = async (posts) => {
        // console.log(posts)
        let newComments = []
        
        for(var i = 0; i < posts.length; i++){
            try{
                let commentsResponse = await axios.get(`${posts[i].id}/comments`)
                newComments[i] = commentsResponse.data;
            }
            catch(err){
                console.log(err)
                // alert(`Comment error: ${err}`)
            }
        }
        console.log("Post Comments", newComments)
        //alert(toString(comments))
        setComments(newComments)
    }

    const commentChangeHandler = (postID, comment) => {
        // console.log(postID, comment)
        setCommentInputField({
            ...commentInputField,
            [postID]: comment,
        })
        console.log(commentInputField)
    }

    const commentMarkdownHandler = (postID, value) => {
        //console.log(postID, value)
        setCommentMarkdownField({
            ...commentMarkdownField,
            [postID]: value,
        })
        console.log(commentMarkdownField)
    } 

    const editTitleHandler = (postID, edit) => {
        // console.log(postID, edit)
        setEditTitleField({
            ...editTitleField,
            [postID]: edit,
        })
        console.log(editTitleField)
    }

    const editBodyHandler = (postID, edit) => {
        // console.log(postID, edit)
        setEditBodyField({
            ...editBodyField,
            [postID]: edit,
        })
        console.log(editBodyField)
    }

    const sharePostHandler = async (post) => {

        //TODO: CHECK THAT THE USER IS ALLOWED TO SHARE THIS POST
        let success = true;
        let friendsResponse = await axios.get(`${restHost}/author/${authorInfo.id}/followers`);
        let friends = friendsResponse.data.items
        for(var i = 0; i < friends.length; i++){
            try{
                axios.post(`${friends[i].id}/inbox`, post).then(res => {
                    console.log(`Successfully shared with ${friends[i].name}`)
                })
            }
            catch(err){
                success = false
                console.log(err)
                // alert(`Share error: ${err}`)
            }
        }
        if(friends.length < 1){
            success = false
        }
        if(success == true){
            //alert('Shared successfully')
        }
    }

    const editPostHandler = (post) => {
        if(`${restHost}/author/${authorInfo.id}`!= post.author.id && false){
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
        if(`${restHost}/author/${authorInfo.id}`!= post.author.id && false){
            alert('You are not authorized to edit this post')
            return 0
        }
        
        let newPost = post
        let newBody = editBodyField[post.id]
        let newTitle = editTitleField[post.id]

        newPost.content = newBody
        newPost.title = newTitle
        // console.log(newPost)
        // return;
        //TODO: GET THE TITLE/CONTENT/TAGS FROM THE THINGY

        try{
            let response = await axios.post(post.id, newPost)
            setEditingPostID("")
            fetchPosts();

        }
        catch(err){
            console.log(err)
            // alert(`Editing error: ${err}`)
        }
        //fetchPosts()
    }

    const deletePostHandler = async (post) => {
        if(`${restHost}/author/${authorInfo.id}` != post.author.id && false){
            alert(`You are not authorized to delete this post:
                    Your id: ${restHost}/author/${authorInfo.id}
                    Required id: ${post.author.id}`)
            return 0
        }
        try{
            let response = await axios.delete(post.id, post).then(res => {
                alert("Successful deletion")
            })
            fetchPosts();

        }
        catch(err){
            console.log(err)
            // alert(`Deletion error: ${err}`)
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
                    publishedTime: currentDate, //TODO: ADD MORE FIELDS
                    authorID: authorInfo.id,
                    content: commentInputField[postID],
                    contentType: contentType, //TODO: ALLOW TEXT/MARKDOWN
                }
                // id: "1234",
                //published: currentDate
            }).then(res => {
                alert("success")
            })
        }
        catch(err){
            console.log(err)
            // alert(err)
            //alert(newComment)
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
            // alert("Like Error:" + err)
            //alert(url)
        }
    }


    const createNewPostHandler = () => {

    }

    // const PostContentComponent = ({contentType, content}) => {
    //     // const [previewImg, setPreviewImg] = useState(null) 
    
    //     // useEffect(() => {
    //     // }, [])
    //     console.log(contentType)
    //     switch (contentType){
    //         case "text/plain":
    //             return (
    //                 <>
    //                 {content}
    //                 </>
    //             )
    //         case "text/markdown":
    //             return (
    //                 <>
    //                 {content}
    //                 </>
    //             )
    //         case "application/base64":
    //             return (
    //                 <>
    //                 {content}
    //                 </>
    //             )
    //         case "image/jpeg;base64":
    //             // setPreviewImg(`data:image/jpeg;base64,${content}`)

    //             console.log("Content!!",content)
    //             // URL.createObjectURL(blob)
    //             // axios.
    //             if(!content) return <></>
    //             return (
    //                 <>
    //                 <img src={`data:image/jpeg;base64,${content}`} />
    //                 </>
    //             )
    //         case "image/png;base64":
    //             // setPreviewImg(`data:image/png;base64,${content}`)

    //             console.log("Content!!",content)
    //             // console.log(new Buffer.from(content).toString("base64"))
    //             // console.log(new Buffer.from(content.data).toString("base64"))
    //             if(!content) return <></>
    //             return (
    //                 <>
    //                 <img src={`data:image/png;base64,${content}`} />
    //                 </>
    //             )
    //         default:
    //             return <>????</>
    //     }
    // }   

    // const fetchForeignPosts = async () => {
    //     try{
    //         let token = btoa(`${username}:${password}`)
    //         let response = await axios.get(`${hostURL}`, {
    //             headers: {
    //                 "Authorization": `Basic ${token}`
    //             }
    //         })
    //         console.log("response", response.data)
    //         let posts = response.data.items
    //         setForeignPosts(posts)
    //         fetchComments(posts);
    //         fetchLikes(posts);

    //     }
    //     catch(err){
    //         console.log(err)
    //         alert(err)
    //     }
    // }


    // const fetchForeignLikes = async (posts) => {
    //     let newLikes = []
    //     console.log("PostS: ", posts)
    //     for(var i = 0; i < posts.length; i++){
    //         try{
    //             let likesResponse = await axios.get(`${posts[i].id}/likes`)
    //             newLikes[i] = likesResponse.data;
    //         }
    //         catch(err){
    //             console.log(err)
    //             // alert(`Likes error: ${err} with url ${posts[i].id}/likes`)
    //         }
    //     }
    //     // console.log("Post Likes", newLikes)
    //     //alert(toString(comments))
    //     setForeignLikes(newLikes)
    //     //setLikes([[1, 2],[1]])
    // }

    // const fetchForeignComments = async (posts) => {
    //     // console.log(posts)
    //     let newComments = []
        
    //     for(var i = 0; i < posts.length; i++){
    //         try{
    //             let commentsResponse = await axios.get(`${posts[i].id}/comments`)
    //             newComments[i] = commentsResponse.data;
    //         }
    //         catch(err){
    //             console.log(err)
    //             // alert(`Comment error: ${err}`)
    //         }
    //     }
    //     console.log("Post Comments", newComments)
    //     //alert(toString(comments))
    //     setForeignComments(newComments)
    // }


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