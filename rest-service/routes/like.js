const express = require('express');
const router = express.Router();
const likeController = require("../controllers/like")

router.post("/author/:authorID/post/:postID/likes", likeController.getLikesOnPost)
router.post("/author/:authorID/post/:postID/comments/:commentID/likes", likeController.getLikesOnComment)

module.exports = router;