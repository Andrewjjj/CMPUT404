const express = require('express');
const router = express.Router();
const authorController = require("../controllers/author")

router.get("/authors", authorController.getAllAuthors);
router.get("/author/:authorID/", authorController.getAuthorByAuthorID);

// Need work
router.post("/author/:authorID/", authorController.postUpdateAuthorProfile);
module.exports = router;