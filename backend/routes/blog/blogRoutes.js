const { createBlog, getBlogById } = require('../../controllers/blogController');
const { protect } = require('../../middlewares/auth/authMiddleware');

const router = require('express').Router();

// Create a blog
//@desc     Create a blog
//@route    post /api/blogs/create-blog
// @access  Private / Protected
router.post('/create-blog', protect, createBlog);

// Read a blog by Id
// Create a blog
//@desc     GEt a blog by Id
//@route    post /api/blogs/:id
// @access  Public
router.get('/:id', getBlogById);

// Update a blog
//@desc     Update a blog by Id
//@route    PUT /api/blogs/:id
// @access  Private / Protected
router.put('/:id');
// Delete a blog
// search a blog
// like a blog
// comment on blog

module.exports = router;
