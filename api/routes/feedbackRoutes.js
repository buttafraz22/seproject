const express = require('express');
const router = express.Router()
const controller = require('../controller/feedbackController')

router.post('/', controller.makeFeedback);
router.get('/', controller.getFeedbacks);

module.exports = router;