const {
  initialOrders,
  validateRazPayment,
} = require('../../../controllers/razorpayController');

const router = require('express').Router();

router.post('/orders', initialOrders);
router.post('/validate', validateRazPayment);

module.exports = router;
