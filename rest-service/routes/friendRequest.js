const express = require('express');
const router = express.Router();
const friendRequestController = require("../controllers/friendRequest")

router.get("/author/:authorID/friend_request", friendRequestController.getAllFriendRequestByAuthor);

router.put("/author/:authorID/friend_request/:requesterID", friendRequestController.approveFriendRequest);
router.post("/author/:authorID/friend_request/:requesterID", friendRequestController.sendFriendRequest);
router.delete("/author/:authorID/friend_request/:requesterID", friendRequestController.rejectFriendRequest);

module.exports = router;