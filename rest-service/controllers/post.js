const db = require("../database/database");
const WEB_HOST = process.env.WEB_HOST

module.exports.getPost = async(req, res, next) => {
    try {
        const { authorID, postID } = req.params;
        let postInfo = await db.getPostByPostID(postID);
        let authorInfo = await db.getAuthorByAuthorID(authorID);
        authorInfo = authorInfo[0]

        authorInfo.type = "author";
        authorInfo.id = `${WEB_HOST}/author/${authorID}`

        let categories = await db.getPostCategories(postID);
        let categoryArr = categories.map(category => {
            return category.category;
        })

        let post = {
            ...postInfo,
            type: "post",
            id: `${WEB_HOST}/author/${authorID}/posts/${postInfo.id}`,
            categories: categoryArr,
            count: 0,
            comments: `${WEB_HOST}/author/${authorID}/posts/${postInfo.id}/comments`,
        }

        res.status(200).json(post)
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

        let categoryArr = categories.map(category => {
            return [postID, category];
        })
        
        await db.updatePost(postID, title, source, origin, description, contentType, content, published, visibility, unlisted)
        await db.removePostCategories(postID)
        await db.addPostCategories(categoryArr)
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
        console.log(req.body)
        let categoryArr = categories.map(category => {
            return [postID, category]
        })

        await db.createPostWithPostID(postID, authorID, title, source, origin, description, contentType, 
            content, published, visibility, unlisted);
        await db.addPostCategories(categoryArr);

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

        authorInfo.type = "author";
        authorInfo.id = `${WEB_HOST}/author/${authorID}`

        let postsInfo = await Promise.all(posts.map(async (post) => {
            let categories = await db.getPostCategories(post.id);
            let categoryArr = categories.map(category => {
                return category.category;
            })
            return {
                type: "post",
                title: post.title,
                id: `${WEB_HOST}/author/${authorID}/posts/${post.id}`,
                source: post.source,
                origin: post.origin,
                description: post.description,
                contentType: post.contentType,
                content: post.content,
                author: authorInfo,
                categories: categoryArr,
                count: 0,
                comments: `${WEB_HOST}/author/${authorID}/posts/${post.id}/comments`,
                published: post.published,
                visibility: post.visibility,
                unlisted: post.unlisted,
            }
        }))

        res.status(200).json(postsInfo);
    } catch(err) {
        next(err);
    }
}

module.exports.createAuthorPost = async (req, res, next) => {
    try {
        const { authorID } = req.params;
        console.log(req.file, req.files)
        console.log(authorID)
        console.log(req.body)
        const { title, source, origin, description, 
            contentType, content, categories, published, 
            visibility, unlisted, blob } = req.body;
        console.log(title, source, origin, description, 
            contentType, content, categories, published, 
            visibility, unlisted)
        switch(contentType) {
            case "text/plain":
                break;
            case "text/markdown":
                break;
            case "application/base64":
                break;
            case "image/jpeg;base64":
                content = await db.createImage("JPEG", blob)
                break;
            case "image/png;base64":
                content = await db.createImage("PNG", blob)
                break;
        }

        let postID = await db.createPost(authorID, title, source, origin, description, contentType, 
            content, published, visibility, unlisted);

        let categoryArr = categories.map(category => {
            return [postID, category.text]
        })

        await db.addPostCategories(categoryArr)

        res.status(200).send("Success")
    } catch(err) {
        next(err);
    }
}