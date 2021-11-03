const db = require("../database/database");

module.exports.getAuthors = async(req, res, next) => {
    console.log("Get Author Page")
    try {
        let authors = await db.getAllAuthors();
        return res.status(200).json(authors);
    } catch (err) {
        return res.status(500).send(err);
    }
}

exports.getAuthorByAuthorID = async (req, res, next) => {
    let authorID = req.params.authorID;
    try {
        let author = await db.getAuthorByAuthorID(authorID);
        return res.status(200).json(author);
    } catch (err) {
        return res.status(500).send(err);
    }
}

exports.postUpdateAuthorProfile = (req, res, next) => {
    let authorID = req.params.authorID;
    res.status(200).send("success");
}