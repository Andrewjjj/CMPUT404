const express = require('express');
const router = express.Router();
const authorController = require("../controllers/author")

router.post("/login/author", authorController.loginAuthor);
router.post("/login/admin", authorController.loginAdmin);

router.get("/authors/", authorController.getAllAuthors);
router.get("/author/:authorID/", authorController.getAuthorByAuthorID);
router.post("/author/:authorID/", authorController.postUpdateAuthorProfile);

// Need work
router.post("/author/:authorID/", authorController.postUpdateAuthorProfile);
module.exports = router;