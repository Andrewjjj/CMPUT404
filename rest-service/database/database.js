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
    INSERT INTO comment (CommentID, PostID, AuthorID, Content, ContentType, PublichsedTime)
    VALUES (?, ?, ?, ?, ?, ?)`, 
    [generateNewId(), postID, authorID, content, contentType, publishedTime])
    .then(([res]) => {
        return res
    })
}

// Likes
async function sendLikeToPost(authorID, postID){
    
}

// =============== TODO: Remake below

async function getAllComments(postID) {
    return await promisePool.query('SELECT * FROM public."Comment" WHERE "PostID" = $1;', [postID])
        .then(res => { return res.rows })
        .catch(e => console.log(e));
}

async function createComment(postID, authorID, comment) {
    return await promisePool.query(
            `INSERT INTO public."Comment"
        ("PostID", "AuthorID", "Comment", "ContentType", "Published")
        VALUES ($1, $2, $3, $4, $5)
        `, [postID, authorID, comment, "text/plain", "2021-10-29"]
        )
        .then(res => { return res })
        .catch(e => console.log(e))
}

async function getAllPosts() {
    return await promisePool.query('SELECT * FROM public."Post";')
        .then(res => { return res.rows })
        .catch(e => console.log(e));
}

async function createPost(title, content, authorID) {
    return await promisePool.query(
            `INSERT INTO public."Post" 
        ("Title", "Description", "ContentType", "AuthorID", "Published", "Visibility", "Unlisted")
        VALUES ($1, $2, $3, $4, $5, $6, $7);
        `, [title, content, "text/plain", authorID, "2021-10-29", "PUBLIC", "0"])
        .then(res => { return res })
        .catch(e => console.log(e))
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

module.exports.getAllComments = getAllComments;
module.exports.createComment = createComment;

module.exports.getAllPosts = getAllPosts;
module.exports.createPost = createPost;