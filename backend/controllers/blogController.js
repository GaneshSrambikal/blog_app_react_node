const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const { createBlogSchema } = require('../validators/blogValidator');
const { objectIdSchema } = require('../validators/userValidator');

// Create a Blog
exports.createBlog = async (req, res, next) => {
  const { error } = createBlogSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: 'Validation Error', error: error.message });
  }

  const { title, content } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    if (user) {
      const newBlog = new Blog({
        title,
        author: req.user.id,
        content,
      });
      const savedBlog = await newBlog.save();
      return res
        .status(200)
        .json({ message: `blog created. Blog id: ${savedBlog._id}` });
    }
  } catch (error) {
    console.log(`error: ${error.message}`);
    next(error);
    return res
      .status(500)
      .json({ message: 'Server Error', error: error.message });
  }
};

// GEt Blogs by Id
exports.getBlogById = async (req, res, next) => {
  const { error } = objectIdSchema.validate(req.params);

  if (error) {
    return res
      .status(400)
      .json({ message: 'Validation Error', error: error.message });
  }
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      return res.status(200).json({ blog: blog });
    } else {
      return res
        .status(404)
        .json({ message: `Blog with id: ${req.params.id} does not exist.` });
    }
  } catch (error) {
    console.log(`Error Message: ${error.message}`);
    next(error);
    return res
      .status(500)
      .json({ message: 'Server Error', error: error.message });
  }
};

// Update Blog by Id
exports.updateBlogById = async(req,res,next) =>{
    const {error} = objectIdSchema.validate(req.params)
    if(error){
        return
    }
}