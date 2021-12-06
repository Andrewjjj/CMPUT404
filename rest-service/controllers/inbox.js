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
            // console.log(inbox)
            if (!inbox.id.startsWith("http")) {
                if (inbox.type == "friendRequest") {
                    inbox.id = `${WEB_HOST}/author/${inbox.id}`
                } else if (inbox.type == "like") {
                    inbox.id = `${WEB_HOST}/author/${inbox.id}`
                } else if (inbox.type == "comment") {
                    let commentObj = await db.getCommentByCommentID(inbox.id);
                    let comments = (await axios.get(`${WEB_HOST}/author/${authorID}/posts/${commentObj[0].PostID}/comments`)).data.comments;
                    let comment = comments.filter(c => c.id == inbox.id);
                    inboxResponseArr.push(comment[0]);
                    continue;
                } else if (inbox.type == "follow") {
                    inbox.id = `${WEB_HOST}/author/${inbox.id}`
                } else if (inbox.type == "post") {
                    inbox.id = `${WEB_HOST}/author/${authorID}/posts/${inbox.id}`
                }
            }
            let response = await axios.get(inbox.id)

            if (inbox.type == "friendRequest") {
                response.data.type = "friendRequest";
                response.data.targetID = authorID;
                inboxResponseArr.push(response.data);
            } else if (inbox.type == "like") {
                response.data.type = "like";
                inboxResponseArr.push(response.data);
            } else if (inbox.type == "follow") {
                response.data.type = "follow";
                inboxResponseArr.push(response.data);
            } else if (inbox.type == "post") {
                inboxResponseArr.push(response.data);
            }
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
        const { id, type, object } = req.body;

        if (type == "like") {
            let postID = object.split("/");
            postID = postID[postID.length-1];
            await db.addLikesOnPost(postID, id);
        }

        if (type != "post" && type != "comment" && type != "follow" && type != "friendRequest" && type != "like") {
            return res.status(400).send(`Bad Data - Unsupported Type: ${type}`)
        }

        await db.postInbox(authorID, type, id);

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