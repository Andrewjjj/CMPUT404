const express = require('express');
const router = express.Router();
const adminController = require("../controllers/admin")

router.get("/admin/nodes", adminController.getAllNodes);
router.post("/admin/nodes", adminController.addNode);
router.delete("/admin/nodes", adminController.removeAllNodes);
router.delete("/admin/nodes/:nodeID", adminController.removeNode);

module.exports = router;