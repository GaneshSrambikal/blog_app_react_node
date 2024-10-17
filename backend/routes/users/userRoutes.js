const {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  deleteProfile,
  logoutUser,
  forgotPassword,
  resetPassword,
  changePassword,
} = require('../../controllers/userController');
const { protect } = require('../../middlewares/auth/authMiddleware');

const router = require('express').Router();

// @desc    Register a New User
// @route   POST /api/users/register
// @access  Public
router.post('/register', registerUser);

// @desc    login User
// @route   POST /api/users/login
// @access  Public
router.post('/login', loginUser);

// @desc    login User
// @route   POST /api/users/login
router.post('/logout', logoutUser);

// @desc    Get all users
// @route   GET /api/users
// @access  Public
router.get('/', protect, getAllUsers);

// Profile management

//@desc     Get user Profile
//@route    GET /api/users/profile
// @access  Private / Protected
router.get('/profile', protect, getProfile);

//@desc     update user Profile
//@route    PUT /api/users/profile
// @access  Private / Protected
router.put('/profile', protect, updateProfile);

//@desc     delete user Profile
//@route    delete /api/users/profile
// @access  Private / Protected
router.delete('/profile', protect, deleteProfile);

// Password Management

//@desc     Send Forgot Password reset link to email with token
//@route    post /api/users/forgot-password
// @access  Public
router.post('/forgot-password', forgotPassword);

//@desc     Reset password with token and password
//@route    post /api/users/reset-password/:token
// @access  Private / Protected
router.post('/reset-password/:token', resetPassword);

//@desc     change password
//@route    post /api/users/change-password
// @access  Private / Protected
router.post('/change-password', protect, changePassword);

module.exports = router;
