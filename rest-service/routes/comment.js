const express = require('express');
const router = express.Router();
const commentController = require("../controllers/comment")

router.get("/author/:authorID/post/:postID/comments", commentController.getAllComments);
router.post("/author/:authorID/post/:postID/comments", commentController.addComments);

module.exports = router;