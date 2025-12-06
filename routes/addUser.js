const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// GET Requests
router.get("/user/add.html", userController.user_add_get);
// POST Requests
router.post("/user/add.html", userController.user_post);

module.exports = router;
