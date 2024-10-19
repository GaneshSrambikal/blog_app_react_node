const { createBlog } = require('../../controllers/blogController');
const { protect } = require('../../middlewares/auth/authMiddleware');

const router = require('express').Router();

// Create a blog
//@desc     Create a blog
//@route    post /api/blogs/create-blog
// @access  Private / Protected
router.post('/create-blog', protect, createBlog);
// Read a blog by Id
// Update a blog
// Delete a blog
// search a blog
// like a blog
// comment on blog

module.exports = router;
