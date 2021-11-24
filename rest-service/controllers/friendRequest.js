const db = require('../database/database')

exports.getAllFriendRequestByAuthor = async (req, res, next) => {
    const { authorID } = req.params
    try{
        let friendRequestList = await db.getAllFriendRequestFromID(authorID)
        friendRequestList = friendRequestList.map(friendRequest => {
            const host = friendRequest.host;
            return {
                ...friendRequest,
                id: `${host}/author/${friendRequest.id}`,
                url: `${host}/author/${friendRequest.id}`,
                type: "author",
            }
        })
        res.status(200).json(friendRequestList)
    }
    catch(err){
        next(err)
    }
}

exports.sendFriendRequest = async (req, res, next) => {
    const { authorID, requesterID } = req.params
    try {
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