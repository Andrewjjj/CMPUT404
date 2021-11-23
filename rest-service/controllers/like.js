const axios = require("axios");
const db = require("../database/database");
const WEB_HOST = process.env.WEB_HOST

exports.getLikesOnPost = async (req, res, next) => {
    try{
        const { authorID, postID } = req.params;
        const obj = `${WEB_HOST}/author/${authorID}/post/${postID}`;
        let likesArr = await db.getLikesOnPost(postID)
        let likeResponseArr = []
        for(let like of likesArr){
            let authorID = like.AuthorID
            let response = await axios.get(authorID)
            let authorData = response.data
            likeResponseArr.push({
                "@context": "https://www.w3.org/ns/activitystreams",
                summary: `${authorData.displayName} Likes your post`,
                type: "Like",
                author: authorData,
                object: obj,
            })
        }
        res.status(200).json(likeResponseArr)
    }
    catch(err){
        next(err)
    }
}

exports.getLikesOnComment = async (req, res, next) => {
    try{
        const { authorID, postID, commentID } = req.params;
        const obj = `${WEB_HOST}/author/${authorID}/post/${postID}/comment/${commentID}`;
        let likesArr = await db.getLikesOnComment(commentID)
        let likeResponseArr = []
        for(let like of likesArr){
            let authorID = like.AuthorID
            let response = await axios.get(authorID)
            let authorData = response.data
            likeResponseArr.push({
                "@context": "https://www.w3.org/ns/activitystreams",
                summary: `${authorData.displayName} Likes your comment`,
                type: "Like",
                author: authorData,
                object: obj,
            })
        }
        res.status(200).json(likeResponseArr)
    }
    catch(err){
        next(err)
    }
}

exports.getAuthorLikes = (req, res, next) => {
    try{
        const { authorID } = req.params;
        let authorLikesArr = await db.getAuthorLikes(authorID)
        let responseArr = []
        for(let authorLike of authorLikesArr){
            let response = await axios.get(authorLike.TargetID)
            
        }
        res.status(501).send("Not Yet Implemented")
    }
    catch(err){
        next(err)
    }
}