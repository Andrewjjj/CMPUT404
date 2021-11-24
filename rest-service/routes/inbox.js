const express = require('express');
const router = express.Router();
const inboxController = require('../controllers/inbox');

router.get("/author/:authorID/inbox", inboxController.getInbox);
router.post("/author/:authorID/inbox", inboxController.postInbox);
router.delete("/author/:authorID/inbox", inboxController.removeInbox);

module.exports = router;