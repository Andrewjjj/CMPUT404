const db = require("../database/database");

module.exports.getPost = async(req, res, next) => {
    try {
        const { authorID, postID } = req.params;
        let post = await db.getPostByPostID(postID);

        let authorInfo = {
            type: "author",
            id: `${post.Host}/author/${authorID}`,
            host: post.Host,
            displayName: post.Username,
            url: `${post.Host}/author/${authorID}`,
            github: post.GithubURL,
            profileImage: post.ProfileImageURL,
        }

        let postInfo = {
            type: "post",
            title: post.Title,
            id: `${post.Host}/author/${authorID}/posts/${post.PostID}`,
            source: post.Source,
            origin: post.Origin,
            description: post.Description,
            contentType: post.ContentType,
            content: post.Content,
            author: authorInfo,
            categories: [], // TODO: 
            count: 0, // TODO: comment count
            comments: `${post.Host}/author/${authorID}/posts/${post.PostID}/comments`,
            published: post.Published,
            visibility: post.Visibility,
            unlisted: post.Unlisted,
        }

        res.status(200).json(postInfo)
    } catch (err) {
        next(err);
    }
}

module.exports.updatePost = async (req, res, next) => {
    try {
        const { authorID, postID } = req.params;
        const { title, source, origin, description, 
            contentType, content, categories, published, 
            visibility, unlisted } = req.body;
        
        await db.updatePost(postID, title, source, origin, description, contentType, content, categories, published, visibility, unlisted)
        res.status(200).send("Success")
    } catch(err) {
        next(err);
    }
}

module.exports.removePost = async (req, res, next) => {
    try {
        const { authorID, postID } = req.params;
        await db.removePost(postID);
        res.status(200).end()
    } catch(err) {
        next(err);
    }
}

module.exports.createPost = async (req, res, next) => {
    try {
        const { authorID, postID } = req.params;
        const { title, source, origin, description, 
            contentType, content, categories, published, 
            visibility, unlisted } = req.body;

        await db.createPostWithPostID(postID, authorID, title, source, origin, description, contentType, 
            content, categories, published, visibility, unlisted);

        res.status(200).send("Success")
    } catch(err) {
        next(err);
    }
}

module.exports.getAuthorPosts = async (req, res, next) => {
    try {
        const { authorID } = req.params;
        
        let posts = await db.getAllAuthorPosts(authorID);
        let authorInfo = await db.getAuthorByAuthorID(authorID)
        authorInfo = authorInfo[0]

        authorInfo.type = "post";
        authorInfo.id = `${authorInfo.host}/author/${authorID}`

        let postsInfo = posts.map(post => {
            return {
                type: "post",
                title: post.Title,
                id: `${post.Host}/author/${authorID}/posts/${post.PostID}`,
                source: post.Source,
                origin: post.Origin,
                description: post.Description,
                contentType: post.ContentType,
                content: post.Content,
                author: authorInfo,
                categories: [], // TODO: 
                count: 0, // TODO: comment count
                comments: `${post.Host}/author/${authorID}/posts/${post.PostID}/comments`,
                published: post.Published,
                visibility: post.Visibility,
                unlisted: post.Unlisted,
            }
        })

        res.status(200).json(postsInfo);
    } catch(err) {
        next(err);
    }
}

module.exports.createAuthorPost = async (req, res, next) => {
    try {
        const { authorID } = req.params;
        const { title, source, origin, description, 
            contentType, content, categories, published, 
            visibility, unlisted } = req.body;

        await db.createPost(authorID, title, source, origin, description, contentType, 
            content, categories, published, visibility, unlisted);

        res.status(200).send("Success")
    } catch(err) {
        next(err);
    }
}