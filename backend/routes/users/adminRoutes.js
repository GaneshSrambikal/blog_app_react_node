const {
  adminLogin,
} = require('../../controllers/adminController');
const { admin } = require('../../middlewares/auth/adminMiddleware');
const { protect } = require('../../middlewares/auth/authMiddleware');

const router = require('express').Router();

// @desc    Login Admin
// @route   POST /api/admin/login
// @access  public
router.post('/login', adminLogin);

// @desc    Create a new Admin
// @route   POST /api/admin/register
// @access  Private /protected
// router.post('/register', protect, admin, createAdminUser);

// @desc    Create a existing user as Admin. This can only be done by a SUPER ADMIN
// @route   PUT /api/admin/register
// @access  Private /protected
// router.put('/register', protect, admin, createAdminUser);

module.exports = router;
