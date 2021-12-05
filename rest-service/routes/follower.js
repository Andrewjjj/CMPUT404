const express = require('express');
const router = express.Router();
const followController = require("../controllers/follower")

router.get("/author/:authorID/followers", followController.getAllFollowers);

router.get("/author/:authorID/followers/:followerID", followController.checkFollower);
router.delete("/author/:authorID/followers/:followerID", followController.removeFollower);
router.put("/author/:authorID/followers/:followerID", followController.addFollower);


module.exports = router;