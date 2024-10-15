const {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
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

// @desc    Get all users
// @route   GET /api/users
// @access  Public
router.get('/', protect, getAllUsers);

//@desc     Get user by ID
//@route    GET /api/users/:id
// @access  Private
router.get('/:id', protect, getUserById);

module.exports = router;
