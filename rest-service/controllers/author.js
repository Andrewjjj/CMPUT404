const db = require("../database/database");
const WEB_HOST = process.env.WEB_HOST

module.exports.getAllAuthors = async (req, res, next) => {
        
    try{
        const { page, size } = req.query
        let authors = await db.getAllAuthors()
        authors = authors.map(authorInfo => {
            const host = authorInfo.host;
            return {
                ...authorInfo,
                id: `${host}/author/${authorInfo.id}`,
                url: `${host}/author/${authorInfo.id}`,
                type: "author",
            }
        })

        res.status(200).json({
            type: "authors",
            items: authors
        })
    }
    catch(err) {
        next(err)
    }
}

exports.getAuthorByAuthorID = async (req, res, next) => {
    
    try{
        const { authorID } = req.params;
        let authorInfo = (await db.getAuthorByAuthorID(authorID))[0]
        res.status(200).json({
            ...authorInfo,
            id: `${host}/author/${authorInfo.id}`,
            url: `${host}/author/${authorInfo.id}`,
            type: "author",
        })
    }
    catch(err) {
        next(err)
    }
}

exports.postUpdateAuthorProfile = (req, res, next) => {
    
    try{
        const { authorID } = req.params;
        const { githubURL, profileImageURL, username } = req.body
        // TODO: Update
        res.status(200).send("success")
    }
    catch(err) {
        next(err)
    }
}
