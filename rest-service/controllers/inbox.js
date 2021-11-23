const db = require("../database/database");

module.exports.getInbox = async (req, res, next) => {
    try {
        const { authorID } = req.params;

        let inbox = await db.getInbox(authorID)

        res.status(200).json({
            type: "inbox",
            author: authorID,
            items: inbox,
        })
    }  catch(err) {
        next(err)
    }
} 

module.exports.postInbox = async (req, res, next) => {
    try {
        const { authorID } = req.params;
        const { inbox } = req.body;

        if (inbox.type == "post") {
            await db.postInboxPost(authorID, "post", inbox.id);
        } else if (inbox.type == "follow") {
            await db.postInboxFollow(authorID, "follow", inbox.id);
        } else if (inbox.like == "like") {
            await db.postInboxLike(authorID, "like", inbox.id);
        }
        
        res.status(200).send("success")
    }  catch(err) {
        next(err)
    }
} 

module.exports.removeInbox = async (req, res, next) => {
    try {
        const { authorID } = req.params;

        await db.removeInbox(authorID);

        res.status(200).send("Success");
    }  catch(err) {
        next(err)
    }
} 