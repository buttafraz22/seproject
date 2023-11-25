const express = require('express')
const router = express.Router()
const controller = require('../controller/billController');
const {validateToken, requireRoles} = require('../utils/accessMiddleware')


router.use(validateToken)
router.post('/', requireRoles(["user"]), controller.PayBill);

module.exports = router