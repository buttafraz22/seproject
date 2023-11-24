const express = require('express')
const router = express.Router()
const middleware = require('../controller/billController');
const {validateToken, requireRoles} = require('../utils/accessMiddleware')


router.use(validateToken)
router.post('/', requireRoles(["user"]), middleware.PayBill);

module.exports = router