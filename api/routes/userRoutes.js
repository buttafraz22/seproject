const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/", userController.createUser);
router.get("/", userController.getUser);
router.put("/", userController.updateUser);
router.delete("/", userController.deleteUser);

router.get("/login", userController.login)

module.exports = router;
