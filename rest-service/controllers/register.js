const db = require("../database/database");
const WEB_HOST = process.env.WEB_HOST

exports.getRegistrationRequests = async (req, res, next) => {
    try{
        const registrationRequests = await db.getAllRegistrationRequests()
        console.log(registrationRequests)
        return res.status(200).json(registrationRequests)
    }
    catch(err){
        next(err)
    }
}

exports.registerUser = async (req, res, next) => {
    try{
        const {username, password, githubUrl, profileImageUrl} = req.body;
        if(!username || !password || !githubUrl || !profileImageUrl) return res.status(400).send("Missing Fields")
        await db.registerRequest(username, password, githubUrl, profileImageUrl)
        res.status(200).send("success")
    }
    catch(err){
        next(err)
    }
}