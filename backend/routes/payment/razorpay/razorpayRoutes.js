const {
  initialOrders,
  validateRazPayment,
} = require('../../../controllers/razorpayController');
const { protect } = require('../../../middlewares/auth/authMiddleware');
const router = require('express').Router();

router.post('/orders', protect, initialOrders);
router.post('/validate', protect, validateRazPayment);

module.exports = router;
