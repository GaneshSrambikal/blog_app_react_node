const {
  initialOrders,
  validateRazPayment,
} = require('../../../controllers/razorpayController');
const { protect } = require('../../../middlewares/auth/authMiddleware');
const router = require('express').Router();

// initial order
//@desc     Initial order 
//@route   POST /payment/razorpay/orders
// @access  Private
router.post('/orders', protect, initialOrders);

// validate the payment
//@desc     Validates the payment 
//@route   POST /payment/razorpay/validate
// @access  Private
router.post('/validate', protect, validateRazPayment);

module.exports = router;
