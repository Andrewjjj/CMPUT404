const db = require("../database/database");
const WEB_HOST = process.env.WEB_HOST

module.exports.getPost = async(req, res, next) => {
    try {
        const { authorID, postID } = req.params;
        let data = await db.getPostByPostID(postID);

        let categories = await db.getPostCategories(postID);
        let categoryArr = categories.map(category => {
            return category.Category;
        })

        let authorInfo = {
            type: "author",
            id: `${WEB_HOST}/author/${authorID}`,
            displayName: data.Username,
            url: `${WEB_HOST}/author/${authorID}`,
            github: data.GithubURL,
            profileImage: data.ProfileImageURL,
        }

        let postInfo = {
            type: "post",
            title: data.Title,
            id: `${WEB_HOST}/author/${authorID}/posts/${data.PostID}`,
            source: data.Source,
            origin: data.Origin,
            description: data.Description,
            contentType: data.ContentType,
            content: data.Content,
            author: authorInfo,
            categories: categoryArr, 
            count: 0,
            comments: `${WEB_HOST}/author/${authorID}/posts/${data.PostID}/comments`,
            published: data.Published,
            visibility: data.Visibility,
            unlisted: data.Unlisted,
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

        authorInfo.type = "post";
        authorInfo.id = `${WEB_HOST}/author/${authorID}`

        let postsInfo = await Promise.all(posts.map(async (post) => {
            let categories = await db.getPostCategories(post.PostID);
            let categoryArr = categories.map(category => {
                return category.Category;
            })
            return {
                type: "post",
                title: post.Title,
                id: `${WEB_HOST}/author/${authorID}/posts/${post.PostID}`,
                source: post.Source,
                origin: post.Origin,
                description: post.Description,
                contentType: post.ContentType,
                content: post.Content,
                author: authorInfo,
                categories: categoryArr,
                count: 0,
                comments: `${WEB_HOST}/author/${authorID}/posts/${post.PostID}/comments`,
                published: post.Published,
                visibility: post.Visibility,
                unlisted: post.Unlisted,
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
        const { title, source, origin, description, 
            contentType, content, categories, published, 
            visibility, unlisted } = req.body;

        let postID = await db.createPost(authorID, title, source, origin, description, contentType, 
            content, published, visibility, unlisted);

        let categoryArr = categories.map(category => {
            return [postID, category]
        })

        await db.addPostCategories(categoryArr)

        res.status(200).send("Success")
    } catch(err) {
        next(err);
    }
}