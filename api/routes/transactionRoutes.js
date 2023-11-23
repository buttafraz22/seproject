const express = require("express");
const controller = require("../controller/transactionController");
const router = express.Router();
const middleware = require('../utils/accessMiddleware');

router.use(middleware.validateToken);

// Apply the requireRoles middleware to specific routes
router.post('/', middleware.requireRoles(['user']), controller.makeTransaction);

module.exports = router;