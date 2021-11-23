const mysql = require('mysql2')
const { v4: uuidv4 } = require('uuid');
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
}

const promisePool = mysql.createPool(dbConfig).promise()

const generateNewId = () => {
    return uuidv4().replaceAll("-", "")
}
// Author
async function getAllAuthors() {
    return await promisePool.execute(
    `SELECT Username as displayName, GithubURL as github, Host as host, AuthorID as id, ProfileImageURL as profileImage
    FROM author`)
    .then(([row]) => { 
        return row
    })
}

async function getAuthorByAuthorID(authorID) {
    return await promisePool.execute(
    `SELECT Username as displayName, GithubURL as github, Host as host, AuthorID as id, ProfileImageURL as profileImage
    FROM author
    WHERE AuthorID = (?)`, [authorID])
    .then(([row]) => { 
        return row
    })
}

async function createAuthor(username, password, host, githubUrl, profileImageURL){
    return await promisePool.execute(`
    INSERT INTO 
    author (AuthorID, Username, Password, Host, GithubURL, ProfileImageURL)
    VALUES (?, ?, ?, ?, ?)`, 
    [generateNewId(), username, password, host, githubUrl, profileImageURL])
    .then(([result]) => {
        return result.insertId
    })
}


// Follower
async function getAllFollowersByAuthorUID(authorID){
    return await promisePool.execute(`
    SELECT * FROM follow
    LEFT JOIN author
    ON follow.TargetID = author.AuthorID
    WHERE AuthorID = ?`, [authorID])
    .then(([res]) => {
        return res.map(res => delete res.password)
    })
}

async function removeFollower(followerID, authorID){
    return await promisePool.execute(`
    DELETE FROM follow
    WHERE FollowerID = ? AND TargetID = ?`,
    [followerID, authorID])
}

async function addFollower(followerID, authorID){
    return await promisePool.execute(`
    INSERT INTO follow (FollowerID, AuthorID)
    VALUE (?, ?)`,
    [followerID, authorID])
    .then(([res]) => {
        return res.insertId
    })
}

async function checkFollower(followerID, authorID){
    return await promisePool.execute(`
    SELECT * FROM follow
    WHERE FollowerID = ? AND AuthorID = ?`,
    [followerID, authorID])
    .then(([res]) => {
        return res.length == 1
    })
}


// Friend Request
async function sendFriendRequest(targetID, requesterID){
    return await promisePool.execute(`
    INSERT INTO friend_request (TargetID, RequesterID)
    VALUES (?, ?)`, 
    [targetID, requesterID])
    .then(([res]) => {
        return res.insertId
    })
}

async function approveFriendRequest(targetID, requesterID){
    try{
        const connection = await promisePool.getConnection()
        
        await connection.beginTransaction()
        connection.query(`
        DELETE FROM friend_request
        WHERE RequesterID = ? AND TargetID = ?
        `, [requesterID, targetID])
        
        await promisePool.query(`
        INSERT INTO friend (TargetID, FriendID)
        VALUES (?, ?)`, 
        [targetID, requesterID])
        
        await connection.commit()
        return;
    }
    catch(err){
        throw err;
    }
}

async function rejectFriendRequest(targetID, requesterID){
    return await promisePool.execute(`
    DELETE FROM friend_request
    WHERE RequesterID = ? AND TargetID = ?`, 
    [requesterID, targetID])
}

async function getAllFriendRequestFromID(targetID){
    return await promisePool.execute(`
    SELECT Username as displayName, GithubURL as github, Host as host, AuthorID as id, ProfileImageURL as profileImage
    FROM friend_request
    LEFT JOIN author
    ON friend_request.targetID = author.AuthorID
    WHERE friend_request.targetID = ?`,
    [targetID])
    .then(([res]) => {
        return res;
    })
}


// Comments
async function getAllCommentsByPostID(postID){
    return await promisePool.execute(`
    SELECT CommentID as id, Content as comment, ContentType as contentType, PublishedTime as published, AuthorID
    FROM post
    LEFT JOIN comment
    ON post.PostID = comment.PostID
    WHERE PostID = ?`,
    [postID])
    .then(([res]) => {
        return res
    })
}

async function addCommentsToPost(postID, authorID, content, contentType, publishedTime){
    return await promisePool.execute(`
    INSERT INTO comment (CommentID, PostID, AuthorID, Content, ContentType, PublishedTime)
    VALUES (?, ?, ?, ?, ?, ?)`, 
    [generateNewId(), postID, authorID, content, contentType, publishedTime])
    .then(([res]) => {
        return res
    })
}

// Likes
async function sendLikeToPost(authorID, postID){
    
}

// Posts
async function getPostByPostID(postID) {
    return await promisePool.execute(`
    SELECT * FROM post
    LEFT JOIN author
    ON post.AuthorID = author.AuthorID
    WHERE PostID = ?`,
    [postID])
    .then(([res]) => {
        return res[0]
    })
}

async function updatePost(postID, title, source, origin, description, contentType, content, categories, published, visibility, unlisted) {
    return await promisePool.execute(`
    UPDATE post
    SET Title = ?, Source = ?, Origin = ?, Description = ?, ContentType = ?, Content = ?,
    Published = ?, Visibility = ?, Unlisted = ?
    WHERE PostID = ?`,
    [title, source, origin, description, contentType, content, published, visibility, unlisted, postID])
    .then(([res]) => {
        return res
    })
}

async function removePost(postID) {
    return await promisePool.execute(`
    DELETE FROM post
    WHERE PostID = ?`,
    [postID])
}

async function createPostWithPostID(postID, authorID, title, source, origin, description, contentType, content, categories, published, visibility, unlisted) {
    return await promisePool.execute(`
    INSERT INTO post
    (PostID, AuthorID, Title, Source, Origin, Description, ContentType, Content, Published, Visibility, Unlisted)
    VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [postID, authorID, title, source, origin, description, contentType, content, published, visibility, unlisted])
    .then(([res]) => {
        return res
    })
}

async function getAllAuthorPosts(authorID) {
    return await promisePool.execute(`
    SELECT * FROM post
    WHERE AuthorID = ?`,
    [authorID])
    .then(([res]) => {
        return res
    })
}

async function createPost(authorID, title, source, origin, description, contentType, content, categories, published, visibility, unlisted) {
    return await promisePool.execute(`
    INSERT INTO post
    (PostID, AuthorID, Title, Source, Origin, Description, ContentType, Content, Published, Visibility, Unlisted)
    VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [generateNewId(), authorID, title, source, origin, description, contentType, content, published, visibility, unlisted])
    .then(([res]) => {
        return res
    })
}

// Inbox
async function getInbox(authorID) {
    return await promisePool.execute(`
    SELECT * FROM inbox
    WHERE AuthorID = ?`,
    [authorID])
}

async function postInboxPost(authorID) {

}

async function postInboxFollow(authorID) {

}

async function postInboxLike(authorID) {

}

async function removeInbox(authorID) {

}

module.exports.getAllAuthors = getAllAuthors;
module.exports.getAuthorByAuthorID = getAuthorByAuthorID;
module.exports.createAuthor = createAuthor;

module.exports.getAllFollowersByAuthorUID = getAllFollowersByAuthorUID;
module.exports.removeFollower = removeFollower;
module.exports.addFollower = addFollower;
module.exports.checkFollower = checkFollower;

module.exports.sendFriendRequest = sendFriendRequest;
module.exports.approveFriendRequest = approveFriendRequest;
module.exports.rejectFriendRequest = rejectFriendRequest;
module.exports.getAllFriendRequestFromID = getAllFriendRequestFromID;

module.exports.getAllCommentsByPostID = getAllCommentsByPostID;
module.exports.addCommentsToPost = addCommentsToPost;

module.exports.getPostByPostID = getPostByPostID;
module.exports.updatePost = updatePost,
module.exports.removePost = removePost;
module.exports.createPostWithPostID = createPostWithPostID;
module.exports.getAllAuthorPosts = getAllAuthorPosts;
module.exports.createPost = createPost;

module.exports.getInbox = getInbox;
module.exports.postInboxPost = postInboxPost;
module.exports.postInboxFollow = postInboxFollow;
module.exports.postInboxLike = postInboxLike;
module.exports.removeInbox = removeInbox;