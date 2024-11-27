const {
  createBlog,
  getBlogById,
  updateBlogById,
  deleteBlogById,
  likeBlogById,
  commentOnBlog,
  deleteCommentOnBlog,
  searchBlogByTitle,
  getAllBlogs,
  getCommentByBlogId,
  searchBlogByCategory,
  searchBlogs,
  generateBlogContent,
} = require('../../controllers/blogController');
const { protect } = require('../../middlewares/auth/authMiddleware');
const {
  upload,
  uploadToCloudinary,
} = require('../../middlewares/uploadMiddleware');
const router = require('express').Router();

// Get all blogs
//@desc     Get all blog
//@route    get /api/blogs
// @access  Public
router.get('/', getAllBlogs);

// Create a blog
//@desc     Create a blog
//@route    post /api/blogs/create-blog
// @access  Private / Protected
router.post('/create-blog', protect, createBlog);

// Upload a blogs Hero Image
//@desc     Upload a blogs hero image
//@route    post /api/blogs/upload-hero_image
// @access  Private / Protected
// router.post('/upload-hero_image', protect, upload.single('image'), createBlog);

// Read a blog by Id
// Create a blog
//@desc     GEt a blog by Id
//@route    post /api/blogs/:id
// @access  Public
router.get('/blog/:id', getBlogById);

// Update a blog
//@desc     Update a blog by Id .Only the author can update his/hers blogs
//@route    PUT /api/blogs/:id
// @access  Private / Protected
router.put('/blog/:id', protect, upload.single('heroImage'), updateBlogById);

// Delete a blog
//@desc     delete a blog by Id .Only the author can delete his/hers blogs
//@route    DELETE /api/blogs/:id
// @access  Private / Protected
router.delete('/blog/:id', protect, deleteBlogById);

// like a blog
//@desc     Like a blog by Blog Id
//@route    POST /api/blogs/:id/like
// @access  Private / Protected
router.post('/:id/like', protect, likeBlogById);

// comment on blog
//@desc     comment a blog by Blog Id
//@route    POST /api/blogs/:id/comment
// @access  Private / Protected
router.get('/:id/comment', protect, getCommentByBlogId);

// comment on blog
//@desc     comment a blog by Blog Id
//@route    POST /api/blogs/:id/comment
// @access  Private / Protected
router.post('/:id/comment', protect, commentOnBlog);

// delete a comment on blog
//@desc     delete comment a blog by comment Id
//@route    POST /api/blogs/delete/:id/comment
// @access  Private / Protected
router.delete('/:blogId/comment/:commentId', protect, deleteCommentOnBlog);

// search a blog
//@desc     Search a blog by Title
//@route    GET /api/blogs/search
// @access  Public
router.get('/search', searchBlogByTitle);

// search a blog
//@desc     Search a blog by Title
//@route    GET /api/blogs/search
// @access  Public
router.get('/searchblog', searchBlogs);

// search by category
//@desc     Search a blog by Title
//@route    GET /api/blogs/search/category
// @access  Private
router.get('/search/category', searchBlogByCategory);


module.exports = router;
