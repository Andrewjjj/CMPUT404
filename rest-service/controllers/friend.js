const db = require('../database/database')
const WEB_HOST = process.env.WEB_HOST

exports.getAllFriendsByAuthor = async (req, res, next) => {
    const { authorID } = req.params
    try{
        let friendsList = await db.getAllFriendsFromID(authorID)
        friendsList = friendsList.map(friend => {
            return {
                ...friend,
                id: `${WEB_HOST}/author/${friend.id}`,
                url: `${WEB_HOST}/author/${friend.id}`,
                type: "author",
            }
        })
        console.log(friendsList)
        res.status(200).json(friendsList)
    }
    catch(err){
        next(err)
    }
}

// exports.sendFriend = async (req, res, next) => {
//     const { authorID, requesterID } = req.params
//     try {
//         await db.sendFriendRequest(authorID, requesterID)
//         res.status(200).end()
//     }
//     catch(err){
//         next(err)
//     }
// }

// exports.approveFriendRequest = async (req, res, next) => {
//     const { authorID, requesterID } = req.params
//     try {
//         await db.approveFriendRequest(authorID, requesterID)
//         res.status(200).end()
//     }
//     catch(err){
//         next(err)
//     }
// }

// exports.rejectFriendRequest = async (req, res, next) => {
//     const { authorID, requesterID } = req.params
//     try {
//         await db.rejectFriendRequest(authorID, requesterID)
//         res.status(200).end()
//     }
//     catch(err){
//         next(err)
//     }
// }