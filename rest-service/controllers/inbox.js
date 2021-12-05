const db = require("../database/database");
const axios = require('axios');
const WEB_HOST = process.env.WEB_HOST

module.exports.getInbox = async (req, res, next) => {
    try {
        const { authorID } = req.params;

        let inboxList = await db.getInbox(authorID)
        console.log(inboxList)

        let inboxResponseArr = []
        for(let inbox of inboxList){
            if (inbox.type == "friendRequest") {
                inbox.id = `${WEB_HOST}/author/${authorID}/friend_request`
            } else if (inbox.type == "like") {
                inbox.id = `${WEB_HOST}/author/${authorID}/likes`
            } else if (inbox.type == "comment") {
                inbox.id = `${WEB_HOST}/author/${authorID}/comments`
            }

            let response = await axios.get(inbox.id)
            response.data.map(data => {
                inboxResponseArr.push(data);
            })
        }

        res.status(200).json({
            type: "inbox",
            author: authorID,
            items: inboxResponseArr,
        })
    }  catch(err) {
        next(err)
    }
} 

module.exports.postInbox = async (req, res, next) => {
    try {
        const { authorID } = req.params;
        const { id, type } = req.body;

        if (type == "post") {
            await db.postInbox(authorID, "post", id);
        } else if (type == "follow") {
            await db.postInbox(authorID, "follow", id);
        } else if (type == "like") {
            await db.postInbox(authorID, "like", id);
        } else {
            return res.status(400).send(`Bad Data - Unsupported Type: ${type}`)
        }
        return res.status(200).send("success")
        
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