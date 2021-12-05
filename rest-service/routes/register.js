const express = require('express');
const router = express.Router();
const registerController = require("../controllers/register")

router.get("/register", registerController.getRegistrationRequests);
router.post("/register", registerController.registerUser);

module.exports = router;