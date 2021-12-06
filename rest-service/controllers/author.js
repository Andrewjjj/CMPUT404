const db = require("../database/database");
const WEB_HOST = process.env.WEB_HOST

module.exports.loginAuthor = async (req, res, next) => {
    try {
        console.log("HERE")
        const {username, password } = req.body;
        if (username == null || password == null) return res.status(400).send("Invalid Login Credentials")
        
        let loginInfo = await db.loginAuthor(username, password);
        console.log(loginInfo)
        if (loginInfo.length < 1) return res.status(400).send("No user exists")
        
        return res.status(200).json(loginInfo[0]);
    } catch(err) {
        console.log(err)
        next(err)
    }
}

module.exports.loginAdmin = async (req, res, next) => {
    try {
        const {username, password } = req.body;
        if (username == null || password == null) return res.status(400).send("Invalid Login Credentials")
        
        let loginInfo = await db.loginAdmin(username, password);
        if (loginInfo.length < 1) return res.status(400).send("No user exists")

        return res.status(200).json(loginInfo[0]);
    } catch(err) {
        next(err)
    }
}

module.exports.getAllAuthors = async (req, res, next) => {
    
    try{
        const { page, size } = req.query
        let authors;
        if(!page || !size) {
            // return res.status(400).send("Page or Size query not passed in")
            authors = await db.getAllAuthors()
        }
        else{
            authors = await db.getAllAuthorsPaginated(size, page-1)
        }
        
        authors = authors.map(authorInfo => {
            return {
                ...authorInfo,
                id: `${WEB_HOST}/author/${authorInfo.id}`,
                url: `${WEB_HOST}/author/${authorInfo.id}`,
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
            id: `${WEB_HOST}/author/${authorInfo.id}`,
            url: `${WEB_HOST}/author/${authorInfo.id}`,
            type: "author",
        })
    }
    catch(err) {
        next(err)
    }
}

exports.postUpdateAuthorProfile = async (req, res, next) => {
    
    try{
        const { authorID } = req.params;
        const { github, profileImage, displayName } = req.body;
        if(!github || !profileImage || !displayName ) return res.status(400).send("Bad Data");

        // TODO: Update
        await db.updateAuthor(authorID, displayName, github, profileImage)
        res.status(200).send("success")
    }
    catch(err) {
        next(err)
    }
}
