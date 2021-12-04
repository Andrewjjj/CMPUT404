const db = require("../database/database");
const axios = require('axios');

module.exports.getInbox = async (req, res, next) => {
    try {
        const { authorID } = req.params;

        let inboxList = await db.getInbox(authorID)

        let inboxResponseArr = []
        for(let inbox of inboxList){
            let response = await axios.get(inbox.id)
            inboxResponseArr.push(response.data)
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