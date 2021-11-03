// https://node-postgres.com/features/connecting
const { Pool } = require('pg');
const dbConfig = {
    connectionString: process.env.DATABASE_URL,
    user: 'nrozqrvpqoreyp',
    host: 'ec2-34-200-161-87.compute-1.amazonaws.com',
    database: 'dfosv90khf06nq',
    password: '2de59efd0f5b32672f3665f2c9da45737d13427c733e80e979fb7b310b76c9cc',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
}

const pool = new Pool(dbConfig);

async function getAllAuthors() {
    return await pool.query('SELECT * FROM public."Author";')
        .then(res => { return res.rows })
        .catch(e => console.log(e));
}

async function getAuthorByAuthorID(authorID) {
    return await pool.query('SELECT * FROM public."Author" WHERE "AuthorID" = $1;', [authorID])
        .then(res => {return res.rows})
        .catch(e => console.log(e0));
}

async function getAllComments(postID) {
    return await pool.query('SELECT * FROM public."Comment" WHERE "PostID" = $1;', [postID])
        .then(res => { return res.rows })
        .catch(e => console.log(e));
}

async function createComment(postID, authorID, comment) {
    return await pool.query(
            `INSERT INTO public."Comment"
        ("PostID", "AuthorID", "Comment", "ContentType", "Published")
        VALUES ($1, $2, $3, $4, $5)
        `, [postID, authorID, comment, "text/plain", "2021-10-29"]
        )
        .then(res => { return res })
        .catch(e => console.log(e))
}

async function getAllPosts() {
    return await pool.query('SELECT * FROM public."Post";')
        .then(res => { return res.rows })
        .catch(e => console.log(e));
}

async function createPost(title, content, authorID) {
    return await pool.query(
            `INSERT INTO public."Post" 
        ("Title", "Description", "ContentType", "AuthorID", "Published", "Visibility", "Unlisted")
        VALUES ($1, $2, $3, $4, $5, $6, $7);
        `, [title, content, "text/plain", authorID, "2021-10-29", "PUBLIC", "0"])
        .then(res => { return res })
        .catch(e => console.log(e))
}

module.exports.getAllAuthors = getAllAuthors;
module.exports.getAuthorByAuthorID = getAuthorByAuthorID;

module.exports.getAllComments = getAllComments;
module.exports.createComment = createComment;

module.exports.getAllPosts = getAllPosts;
module.exports.createPost = createPost;