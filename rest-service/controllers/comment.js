const db = require("../database/database");
const WEB_HOST = process.env.WEB_HOST

module.exports.getAllComments = async (req, res, next) => {
    try{
        const { authorID, postID } = req.params;
        const { page, size } = req.query
        let comments = await db.getAllCommentsByPostID(postID)

        let authorList = {}
        await Promise.all(comments.map(async comment => {
            const authorID = comment.AuthorID
            let author = await db.getAuthorByAuthorID(authorID);
            let authorInfo = {
                type: "author",
                id: `${WEB_HOST}/author/${authorID}`,
                url: `${WEB_HOST}/author/${authorID}`,
                host: WEB_HOST,
                displayName: author[0].displayName,
                github: author[0].github,
                profileImage: author[0].profileImage,
            }
            authorList[authorID] = authorInfo
        }))

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
            id: `${WEB_HOST}/author/${authorID}/post/${postID}/comments`,
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
        const { type, comment } = req.body;
        if(type != "comment") {
            console.log(`Wrong Type. Received: ${type}`)
            return res.status(400).send("Bad Request")
        }
        const { content, contentType, publishedTime } = comment;
        await db.addCommentsToPost(postID, authorID, content, contentType, publishedTime)
        res.status(200).end()
    }
    catch(err){
        next(err)
    }
}