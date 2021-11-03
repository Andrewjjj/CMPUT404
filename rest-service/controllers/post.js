const db = require("../database/database");

module.exports.getAllPosts = async(req, res, next) => {
    // console.log("get posts");
    try {
        let posts = await db.getAllPosts();
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(500).send(err);
    }
}

// TODO: Add Author
module.exports.createPost = async(req, res, next) => {
    // console.log("create post");
    let title = req.body.title;
    let content = req.body.content;
    let tags = req.body.tags;
    let authorID = "b3b71bd4-e8d4-4ac5-a682-1fb0b97fe7c9" // TODO: Put this is param later
    try {
        await db.createPost(title, content, authorID);
        return res.status(200).send("success");
    } catch (err) {
        return res.status(500).send(err);
    }
}

module.exports.likePost = async (req, res) => {
    let postID = req.params.postID;
    try {
        await db.likePost(postID);
        return res.status(200).send("success");
    } catch(err) {
        return res.status(500).send(err);
    }
}

module.exports.getAllComments = async(req, res, next) => {
    let postID = req.params.postID;
    // console.log("get comments");
    try {
        let comments = await db.getAllComments(postID);
        return res.status(200).json(comments);
    } catch (err) {
        return res.status(500).send(err);
    }
}

module.exports.createComment = async(req, res, next) => {
    // console.log("create comment")
    let comment = req.body.comment;
    let postID = req.params.postID;
    let authorID = "b3b71bd4-e8d4-4ac5-a682-1fb0b97fe7c9" // TODO
    try {
        await db.createComment(postID, authorID, comment);
        return res.status(200).send("success");
    } catch (err) {
        return res.status(500).send(err)
    }
}