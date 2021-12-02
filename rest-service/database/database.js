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
    `SELECT Username as displayName, GithubURL as github, AuthorID as id, ProfileImageURL as profileImage
    FROM author`)
    .then(([row]) => { 
        return row
    })
}

async function getAllAuthorsPaginated(limit, offset) {
    return await promisePool.execute(
    `SELECT Username as displayName, GithubURL as github, AuthorID as id, ProfileImageURL as profileImage
    FROM author
    LIMIT ? OFFSET ?
    `, [limit, offset])
    .then(([row]) => { 
        return row
    })
}

async function getAuthorByAuthorID(authorID) {
    return await promisePool.execute(
    `SELECT Username as displayName, GithubURL as github, AuthorID as id, ProfileImageURL as profileImage
    FROM author
    WHERE AuthorID = (?)`, [authorID])
    .then(([row]) => { 
        return row
    })
}

async function createAuthor(username, password, githubUrl, profileImageURL){
    return await promisePool.execute(`
    INSERT INTO 
    author (AuthorID, Username, Password, GithubURL, ProfileImageURL)
    VALUES (?, ?, ?, ?, ?)`, 
    [generateNewId(), username, password, githubUrl, profileImageURL])
    .then(([result]) => {
        return result.insertId
    })
}

async function updateAuthor(authorID, displayName, githubLink, profileImageURL){
    return await promisePool.execute(`
    UPDATE author
    SET Username = ?, GithubURL = ?, ProfileImageURL = ?
    WHERE AuthorID = ?`, 
    [displayName, githubLink, profileImageURL, authorID])
}


// Follower
async function getAllFollowersByAuthorUID(authorID){
    return await promisePool.execute(`
    SELECT FollowerID
    FROM follow
    LEFT JOIN author
    ON follow.TargetID = author.AuthorID
    WHERE AuthorID = ?`, [authorID])
    .then(([res]) => {
        return res.map(res => res.FollowerID)
    })
}

async function removeFollower(authorID, followerID){
    return await promisePool.execute(`
    DELETE FROM follow
    WHERE TargetID = ? AND FollowerID = ?`,
    [authorID, followerID])
}

async function addFollower(authorID, followerID){
    return await promisePool.execute(`
    INSERT INTO follow (TargetID, FollowerID)
    VALUE (?, ?)`,
    [authorID, followerID])
    .then(([res]) => {
        return res.insertId
    })
}

async function checkFollower(authorID, followerID){
    return await promisePool.execute(`
    SELECT * FROM follow
    WHERE TargetID = ? AND FollowerID = ?`,
    [authorID, followerID])
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
    SELECT Username as displayName, GithubURL as github, AuthorID as id, ProfileImageURL as profileImage
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
    SELECT CommentID as id, comment.Content as comment, comment.ContentType as contentType, PublishedTime as published, comment.AuthorID
    FROM comment
    LEFT JOIN post
    ON post.PostID = comment.PostID
    WHERE comment.PostID = ?`,
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
async function getLikesOnPost(postID){
    return await promisePool.execute(`
    SELECT * FROM post_like
    LEFT JOIN post
    ON post_like.PostID = post.PostID
    WHERE post.PostID = ?`,
    [postID])
    .then(([res]) => {
        return res;
    })
}
async function getLikesOnComment(commentID){
    return await promisePool.execute(`
    SELECT * FROM comment_like
    LEFT JOIN comment
    ON comment_like.CommentID = post.CommentID
    WHERE comment.CommentID = ?`,
    [commentID])
    .then(([res]) => {
        return res;
    })
}

async function addAuthorLikes(authorID, targetID){
    return await promisePool.execute(`
    INSERT INTO author_like (AuthorID, TargetID)
    VALUES (?, ?)`,
    [authorID, targetID])
}

async function getAuthorLikes(authorID){
    return await promisePool.execute(`
    SELECT * FROM author_likes
    WHERE AuthorID = `,
    [authorID])
    .then(([res]) => {
        return res;
    })
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

async function updatePost(postID, title, source, origin, description, contentType, content, published, visibility, unlisted) {
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

async function createPostWithPostID(postID, authorID, title, source, origin, description, contentType, content, published, visibility, unlisted) {
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

async function createPost(authorID, title, source, origin, description, contentType, content, published, visibility, unlisted) {
    let postID = generateNewId();
    
    return await promisePool.execute(`
    INSERT INTO post
    (PostID, AuthorID, Title, Source, Origin, Description, ContentType, Content, Published, Visibility, Unlisted)
    VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [postID, authorID, title, source, origin, description, contentType, content, published, visibility, unlisted])
    .then(([res]) => {
        return postID;
    })
}

// Post Categories

async function getPostCategories(postID) {
    return await promisePool.execute(`
    SELECT Category FROM post_category
    WHERE PostID = ?`,
    [postID])
    .then(([res]) => {
        return res;
    })
}

async function addPostCategories(categories) {
    return await promisePool.query(`
    INSERT INTO post_category
    (PostID, Category)
    VALUES ?`,
    [categories])
}

async function removePostCategories(postID) {
    return await promisePool.execute(`
    DELETE FROM post_category
    WHERE PostID = ?`,
    [postID])
}

// Inbox
async function getInbox(authorID) {
    return await promisePool.execute(`
    SELECT * FROM inbox
    WHERE AuthorID = ?`,
    [authorID])
    .then(([res]) => {
        return res;
    })
}

async function postInbox(authorID, type, id) {
    return await promisePool.execute(`
    INSERT INTO inbox (InboxID, AuthorID, Type, ID)
    VALUES (?, ?, ?, ?)`,
    [generateNewId(), authorID, type, id])
    .then(([res]) => {
        return res.insertId
    })
}

async function removeInbox(authorID) {
    return await promisePool.execute(`
    DELETE FROM inbox
    WHERE AuthorID = ?`,
    [authorID])
}

// login
async function loginAuthor(username, password) {
    return await promisePool.execute(`
    SELECT * FROM author
    WHERE Username = ? AND Password = ?`,
    [username, password])
    .then(([row]) => {
        return row;
    })
}

async function loginAdmin(username, password) {
    return await promisePool.execute(`
    SELECT * FROM admin
    WHERE Username = ? AND Password = ?`,
    [username, password])
    .then(([row]) => {
        return row;
    })
}

// admin
async function getAllNodes() {
    return await promisePool.execute(`
    SELECT * FROM node`)
    .then(([row]) => {
        return row;
    })
}

async function addNode(host) {
    return await promisePool.execute(`
    INSERT INTO node
    (Host) VALUES (?)`,
    [host])
    .then(([res]) => {
        return res.insertId;
    })
}

async function removeAllNodes() {
    return await promisePool.execute(`
    DELETE FROM node`)
}

async function removeNode(nodeID) {
    return await promisePool.execute(`
    DELETE FROM node
    WHERE NodeID = ?`,
    [nodeID])
}

module.exports.getAllAuthors = getAllAuthors;
module.exports.getAllAuthorsPaginated = getAllAuthorsPaginated;
module.exports.getAuthorByAuthorID = getAuthorByAuthorID;
module.exports.createAuthor = createAuthor;
module.exports.updateAuthor = updateAuthor;

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

module.exports.getLikesOnPost = getLikesOnPost;
module.exports.getLikesOnComment = getLikesOnComment;
module.exports.addAuthorLikes = addAuthorLikes;
module.exports.getAuthorLikes = getAuthorLikes;

module.exports.getPostByPostID = getPostByPostID;
module.exports.updatePost = updatePost,
module.exports.removePost = removePost;
module.exports.createPostWithPostID = createPostWithPostID;
module.exports.getAllAuthorPosts = getAllAuthorPosts;
module.exports.createPost = createPost;

module.exports.getPostCategories = getPostCategories;
module.exports.addPostCategories = addPostCategories;
module.exports.removePostCategories = removePostCategories;

module.exports.getInbox = getInbox;
module.exports.postInbox = postInbox;
module.exports.removeInbox = removeInbox;

module.exports.loginAuthor = loginAuthor;
module.exports.loginAdmin = loginAdmin;

module.exports.getAllNodes = getAllNodes;
module.exports.addNode = addNode;
module.exports.removeAllNodes = removeAllNodes;
module.exports.removeNode = removeNode;
