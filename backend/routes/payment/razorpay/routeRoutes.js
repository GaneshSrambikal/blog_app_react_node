const {
  initialOrders,
  validateRazPayment,
} = require('../../../controllers/razorpayController');

const router = require('express').Router();

router.post('/payment/razorpay/orders', initialOrders);
router.post('/payment/razorpay/validate', validateRazPayment);
