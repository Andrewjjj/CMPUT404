const express = require('express');
const router = express.Router();
const followController = require("../controllers/follower")

router.get("/author/:authorID/follwers", followController.getAllFollowers);

router.delete("/author/:authorID/follwers/:followerID", followController.removeFollower);
router.put("/author/:authorID/follwers/:followerID", followController.addFollower);
router.get("/author/:authorID/follwers/:followerID", followController.checkFollower);


module.exports = router;