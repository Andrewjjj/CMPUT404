const express = require('express');
const router = express.Router();
const postController = require("../controllers/post")

router.get("/author/:authorID/posts/:postID", postController.getPost);
router.post("/author/:authorID/posts/:postID", postController.updatePost);
router.delete("/author/:authorID/posts/:postID", postController.removePost);
router.put("/author/:authorID/posts/:postID", postController.createPost);

router.get("/author/:authorID/posts", postController.getAuthorPosts);
router.post("/author/:authorID/posts", postController.createAuthorPost);

module.exports = router;