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
  followUser,
  unFollowUser,
  listFollowers,
  listFollowing,
  uploadAvatar,
  generateAvatar,
  getUsersProfile,
  getUserCurrentAvatar,
  updateCredits,
  updateRewards,
  redeemCredits,
} = require('../../controllers/userController');
const { protect } = require('../../middlewares/auth/authMiddleware');
const { upload } = require('../../middlewares/uploadMiddleware');
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
// router.get('/', protect, getAllUsers);

// Profile management

//@desc     Get user Profile
//@route    GET /api/users/profile
// @access  Private / Protected
router.get('/profile', protect, getProfile);

//@desc     Get users Profile by Id
//@route    GET /api/users/profile/:id
// @access  Private / Protected
router.get('/profile/:id', protect, getUsersProfile);

//@desc     update user Profile
//@route    PUT /api/users/profile
// @access  Private / Protected
router.put('/profile', protect, updateProfile);

//@desc     delete user Profile
//@route    delete /api/users/profile
// @access  Private / Protected
router.delete('/profile', protect, deleteProfile);

//@desc     Get user Avatar
//@route    GET /api/users/user/get-avatar-url
// @access  Private / Protected
router.get('/user/:id/get-avatar-url', protect, getUserCurrentAvatar);

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

// User Interactions

//@desc     Follow another user
//@route    post /api/users/:id/follow
// @access  Private / Protected
router.post('/:id/follow', protect, followUser);

//@desc     Unfollow another user
//@route    post /api/users/:id/unfollow
// @access  Private / Protected
router.post('/:id/unfollow', protect, unFollowUser);

//@desc     list users followers
//@route    get /api/users/:id/followers
// @access  Private / Protected
router.get('/:id/followers', protect, listFollowers);

//@desc     list users following
//@route    get /api/users/:id/following
// @access  Private / Protected
router.get('/:id/following', protect, listFollowing);

// Upload Files

//@desc     Upload User Avatar
//@route    post /api/users/upload-avatar
// @access  Private / Protected
router.post('/upload-avatar', protect, upload.single('image'), uploadAvatar);

// @desc     Generate Random Avatar
// @route    get /api/users/generate-avatar
// @access  Private / Protected
router.get('/generate-avatar', protect, generateAvatar);

router.post('/update-credits', protect, updateCredits);

router.post('/update-rewards', protect, updateRewards);

router.post('/redeem-credits', protect, redeemCredits);
module.exports = router;
