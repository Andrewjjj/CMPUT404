const db = require('../database/database')
const WEB_HOST = process.env.WEB_HOST
const axios = require('axios');

exports.getAllFriendRequestByAuthor = async (req, res, next) => {
    const { authorID } = req.params
    try{
        console.log(authorID)
        let friendRequestList = await db.getAllFriendRequestFromID(authorID)
        console.log(friendRequestList)
        let authorInfo = (await db.getAuthorByAuthorID(authorID))[0]
        friendRequestList = friendRequestList.map(friendRequest => {
            return {
                ...friendRequest,
                id: `${WEB_HOST}/author/${friendRequest.id}`,
                url: `${WEB_HOST}/author/${friendRequest.id}`,
                type: "author",
            }
        })
        let data = []
        for(let friendRequest of friendRequestList){
            let newObj = {
                type: "friendRequest",
                summary: `${friendRequest.displayName} wants to be friends with ${authorInfo.displayName}`,
                actor: friendRequest,
                object: authorInfo
            }
            data.push(newObj)
        }
        console.log(data)
        res.status(200).json(data)
    }
    catch(err){
        next(err)
    }
}

// TODO:
exports.getFriendByFriendID = async (req, res, next) => {
    const { authorID, friendID } = req.params;
    try {
        let friendRequest = await axios.get(friendID);
        friendRequest.type = "friendRequest";

        res.status(200).json(data);
    } catch(err) {
        next(err)
    }
}

exports.checkIfRequested = async (req, res, next) => {
    const { authorID, requesterID } = req.params
    try{
        let friendRequestList = await db.getAllFriendRequestFromID(authorID, requesterID)
        res.status(200).json({ isRequested: friendRequestList.length != 0})
    }
    catch(err){
        next(err)
    }
}

exports.sendFriendRequest = async (req, res, next) => {
    const { authorID, requesterID } = req.params
    try {
        console.log(authorID, requesterID)
        await db.sendFriendRequest(authorID, requesterID)
        res.status(200).end()
    }
    catch(err){
        next(err)
    }
}

exports.approveFriendRequest = async (req, res, next) => {
    const { authorID, requesterID } = req.params
    try {
        await db.approveFriendRequest(authorID, requesterID)
        res.status(200).end()
    }
    catch(err){
        next(err)
    }
}

exports.rejectFriendRequest = async (req, res, next) => {
    const { authorID, requesterID } = req.params
    try {
        await db.rejectFriendRequest(authorID, requesterID)
        res.status(200).end()
    }
    catch(err){
        next(err)
    }
}