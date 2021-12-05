const express = require('express');
const router = express.Router();
const registerController = require("../controllers/register")

router.get("/register", registerController.getRegistrationRequests);
router.post("/register", registerController.registerUser);

router.post("/register/:RegisterID", registerController.approveRegisterUser);
router.delete("/register/:RegisterID", registerController.rejectRegisterUser);

module.exports = router;