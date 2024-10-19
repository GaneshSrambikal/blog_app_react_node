const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const { createBlogSchema } = require('../validators/blogValidator');

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
      return res.status(200).json({ message: `blog created. ${savedBlog}` });
    }
  } catch (error) {
    console.log(`error: ${error.message}`);
    next(error);
    return res
      .status(500)
      .json({ message: 'Server Error', error: error.message });
  }
};
