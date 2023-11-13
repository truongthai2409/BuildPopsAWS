const express = require('express');
const router = express.Router();
const paymentRouter = require('../controllers/PaymentController');

router.get('/payments/success', paymentRouter.success);

router.get('/payments/error', paymentRouter.error);

module.exports = router;