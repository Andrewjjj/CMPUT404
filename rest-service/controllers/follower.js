const db = require("../database/database");

module.exports.getAllFollowers = async (req, res, next) => {
    try{
        const { authorID } = req.params;
        let followerArr = await db.getAllFollowersByAuthorUID(authorID)
        followerArr.map(author => {
            const host = author.host;
            return {
                ...author,
                id: `${host}/author/${authorInfo.id}`,
                url: `${host}/author/${authorInfo.id}`,
                type: "author",
            }
        })
        res.status(200).json({
            type: "followers",
            items: followerArr,
        })
    }
    catch(err) {
        next(err)
    }
}

module.exports.removeFollower = async (req, res, next) => {
    try{
        const { authorID, followerID } = req.params;
        await db.removeFollower(followerID, authorID)
        res.status(200).end()
    }
    catch(err){
        next(err)
    }
}

module.exports.addFollower = async (req, res, next) => {
    try{
        const { authorID, followerID } = req.params;
        await db.addFollower(followerID, authorID)
        res.status(200).end()
    }
    catch(err){
        next(err)
    }
}

module.exports.checkFollower = async (req, res, next) => {
    try{
        const { authorID, followerID } = req.params;
        const isFollowing = await db.checkFollower(followerID, authorID)
        res.status(200).json({
            isFollowing: isFollowing,
        })
    }
    catch(err){
        next(err)
    }
}