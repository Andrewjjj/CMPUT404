const express = require('express');
const router = express.Router();
const authorController = require("../controllers/author")

router.get("/", authorController.getAuthors);
router.get("/:authorID/", authorController.getAuthorByAuthorID);
router.post("/:authorID/", authorController.postUpdateAuthorProfile);

module.exports = router;