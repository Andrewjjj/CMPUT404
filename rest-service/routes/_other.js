const express = require('express');
const router = express.Router();

router.get("/authtest", (req, res, next) => {
    const authHeader = req.get("Authorization")
    console.log("authHeader:", authHeader)
    if (!authHeader) return res.status(401).send("Not Authenticated")
    let idToken;
    try {
        idToken = authHeader.split(" ")[1]
    } catch (err) {
        return res.status(401).send("Not Authenticated")
    }
    // let actualToken = idToken.split(" ")[1]
    console.log(idToken)
    let decodedToken = Buffer.from(idToken, 'base64').toString()
    // let authString = decodedToken.split(" ")[1]
    // console.log(decoded)
    let username = decodedToken.split(":")[0]
    let password = decodedToken.split(":")[1]
    if(username == "team09" && password == "cmput404"){
        next()
    }
    else{
        return res.status(400).send("Invalid Credentials")
    }
}, (req, res, next) => {
    res.status(200).send("OK")
});

module.exports = router;