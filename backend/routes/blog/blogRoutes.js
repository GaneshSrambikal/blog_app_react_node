const {
  createBlog,
  getBlogById,
  updateBlogById,
  deleteBlogById,
  likeBlogById,
  commentOnBlog,
} = require('../../controllers/blogController');
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
//@desc     Update a blog by Id .Only the author can update his/hers blogs
//@route    PUT /api/blogs/:id
// @access  Private / Protected
router.put('/:id', protect, updateBlogById);

// Delete a blog
//@desc     delete a blog by Id .Only the author can delete his/hers blogs
//@route    DELETE /api/blogs/:id
// @access  Private / Protected
router.delete('/:id', protect, deleteBlogById);

// search a blog

// like a blog
//@desc     Like a blog by Blog Id
//@route    POST /api/blogs/:id/like
// @access  Private / Protected
router.post('/:id/like', protect, likeBlogById);

// comment on blog
//@desc     comment a blog by Blog Id
//@route    POST /api/blogs/:id/comment
// @access  Private / Protected
router.post('/:id/comment', protect, commentOnBlog);

module.exports = router;
