const db = require("../database/database");
const WEB_HOST = process.env.WEB_HOST

module.exports.getAllComments = async (req, res, next) => {
    try{
        const { authorID, postID } = req.params;
        const { page, size } = req.query
        let comments = await db.getAllCommentsByPostID(postID)

        let authorList = {}
        comments.forEach(comment => {
            const authorID = comment.authorID
            // GET AUTHOR LIST HERE
            let authorInfo = {
                type: "author",
                id: "TBA...",
                url: "TBA..."
            }
            authorList.authorID = authorInfo
        })

        comments = comments.map(comment => {
            return {
                ...comment,
                type: "comment",
                author: authorList[comment.AuthorID]
            }
        })

        res.status(200).json({
            type: "comments",
            page: page,
            size: size,
            post: `${WEB_HOST}/author/${authorID}/post/${postID}`,
            comments: comments
        })
    }
    catch(err){
        next(err)
    }
}

exports.addComments = async (req, res, next) => {
    try{
        const { authorID, postID } = req.params;
        // await db.
    }
    catch(err){
        next(err)
    }
}