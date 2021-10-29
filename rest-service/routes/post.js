const express = require('express');
const router = express.Router();
const postController = require("../controllers/post")

router.get("/", postController.getAllPosts);
router.post("/", postController.createPost);

router.get("/:postID/comment", postController.getAllComments);
router.post("/:postID/comment", postController.createComment);

module.exports = router;