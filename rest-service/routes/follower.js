const express = require('express');
const router = express.Router();
const followController = require("../controllers/follower")

router.get("/author/:authorID/followers", followController.getAllFollowers);

router.delete("/author/:authorID/followers/:followerID", followController.removeFollower);
router.put("/author/:authorID/followers/:followerID", followController.addFollower);
router.get("/author/:authorID/followers/:followerID", followController.checkFollower);


module.exports = router;