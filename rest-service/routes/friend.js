const express = require('express');
const router = express.Router();
const friendController = require("../controllers/friend")

router.get("/author/:authorID/friends", friendController.getAllFriendsByAuthor);

module.exports = router;