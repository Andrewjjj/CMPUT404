const express = require('express');
const router = express.Router();
const postController = require("../controllers/post")
const multer = require('multer');
var upload = multer();

router.get("/author/:authorID/posts/:postID", postController.getPost);
router.post("/author/:authorID/posts/:postID", postController.updatePost);
router.delete("/author/:authorID/posts/:postID", postController.removePost);
router.put("/author/:authorID/posts/:postID", postController.createPost);

router.get("/author/:authorID/posts", postController.getAuthorPosts);
router.post("/author/:authorID/posts", upload.fields([{name: 'file', maxCount: 1}]),
    (req, res, next) => {
        // console.log("Files: ", req.files.file[0].buffer)
        if(req.files[0]){
            req.body.content = req.files.file[0].buffer
            console.log("REQ.BODY 1: " , req.body)
            next()
        }
        else{
            next()
        }
}, postController.createAuthorPost);

module.exports = router;