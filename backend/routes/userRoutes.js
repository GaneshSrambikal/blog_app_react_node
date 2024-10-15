const {
  getAllUsers,
  getUserById,
  createUser,
} = require('../controllers/userController');
const { validateCreateUser } = require('../validators/userValidator');
const { validationResult } = require('express-validator');
const router = require('express').Router();

// @desc    Create a new user
// @route   POST /api/users
// @access  Public
router.post('/create', createUser);

// @desc    Get all users
// @route   GET /api/users
// @access  Public
router.get('/', getAllUsers);

//@desc     Get user by ID
//@route    GET /api/users/:id
// @access  Private
router.get('/:id', getUserById);

module.exports = router;
