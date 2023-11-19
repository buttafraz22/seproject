const express = require("express");
const controller = require("../controller/accountController");
const router = express.Router();
const middleware = require('../utils/accessMiddleware');

router.use(middleware.validateToken);

// Apply the requireRoles middleware to specific routes
router.post('/', middleware.requireRoles(['admin']), controller.createAccount);
router.get('/', middleware.requireRoles(['admin']), controller.getAllAccounts);
router.get('/:id', middleware.requireRoles(['admin', 'user']), controller.getOneAccount);

router.post('/update', middleware.requireRoles(['admin']), controller.updateAccount);





module.exports = router;