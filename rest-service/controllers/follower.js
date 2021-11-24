const db = require("../database/database");
const WEB_HOST = process.env.WEB_HOST
const axios = require("axios")

module.exports.getAllFollowers = async (req, res, next) => {
    try{
        const { authorID } = req.params;
        let followerIDArr = await db.getAllFollowersByAuthorUID(authorID)

        let followers = []
        for(let followerID of followerIDArr){
            let response = await axios.get(followerID)
            followers.push(response.data)
        }
        
        res.status(200).json({
            type: "followers",
            items: followers,
        })
    }
    catch(err) {
        next(err)
    }
}

module.exports.removeFollower = async (req, res, next) => {
    try{
        const { authorID, followerID } = req.params;
        await db.removeFollower(authorID, followerID)
        res.status(200).end()
    }
    catch(err){
        next(err)
    }
}

module.exports.addFollower = async (req, res, next) => {
    try{
        const { authorID, followerID } = req.params;
        await db.addFollower(authorID, followerID)
        res.status(200).end()
    }
    catch(err){
        next(err)
    }
}

module.exports.checkFollower = async (req, res, next) => {
    try{
        const { authorID, followerID } = req.params;
        const isFollowing = await db.checkFollower(authorID, followerID)
        res.status(200).json({
            isFollowing: isFollowing,
        })
    }
    catch(err){
        next(err)
    }
}