const db = require("../database/database");
const axios = require('axios');
const WEB_HOST = process.env.WEB_HOST

module.exports.getInbox = async (req, res, next) => {
    try {
        const { authorID } = req.params;

        let inboxList = await db.getInbox(authorID)
        // console.log(inboxList)

        let inboxResponseArr = []
        for(let inbox of inboxList){
            let response = await axios.get(inbox.id)
            // console.log(response.data)

            if (inbox.type == "friendRequest") {
                response.data.map(data => {
                    inboxResponseArr.push(data);
                })
            } else if (inbox.type == "like") {

            } else if (inbox.type == "comment") {
                response.data.comments.map(data => {
                    inboxResponseArr.push(data);
                })
            } else if (inbox.type == "follow") {
                response.data.items.map(data => {
                    data.type = "follow";
                    inboxResponseArr.push(data);
                })
            } else if (inbox.type == "post") {
                inboxResponseArr.push(response.data);
            }
        }

        // console.log(inboxResponseArr)

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