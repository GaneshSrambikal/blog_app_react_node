const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const {
  createBlogSchema,
  updateBlogSchema,
  commentSchema,
  deleteCommentSchema,
} = require('../validators/blogValidator');
const { objectIdSchema } = require('../validators/userValidator');

// Get all Blogs
exports.getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    if (!blogs) {
      return res.status(404).json({ message: 'No Blogs found' });
    }
    return res.status(200).json({ blogs });
  } catch (error) {
    console.log(`error: ${error.message}`);
    next(error);
    return res
      .status(500)
      .json({ message: 'Server Error', error: error.message });
  }
};

// Create a Blog
exports.createBlog = async (req, res, next) => {
  const { error } = createBlogSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: 'Validation Error', error: error.message });
  }

  const { title, content, excerpt, category, heroImage } = req.body;
  console.log(req.body);
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    if (user) {
      const newBlog = new Blog({
        title,
        author: {
          id: req.user.id,
          name: req.user.name,
          avatar_url: user.avatar_url,
        },
        excerpt,
        heroImage, // for cloudinary uploads in backend using image url
        category,
        content,
      });
      const savedBlog = await newBlog.save();
      return res.status(200).json({
        message: `blog created. Blog id: ${savedBlog._id}`,
        id: savedBlog._id,
      });
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
exports.updateBlogById = async (req, res, next) => {
  // validate the id. Should be an ObjectId
  const { error } = objectIdSchema.validate(req.params);
  if (error) {
    return res
      .status(400)
      .json({ message: 'Validation Error', error: error.message });
  }

  try {
    // Check if blog exist
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ message: `No Blogs with id: ${req.params.id} exists.` });
    }
    // validate the body
    const { error } = updateBlogSchema.validate(req.body);
    console.log(error, req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: 'Validation Error', error: error.message });
    }

    const { title, content, excerpt, category, heroImage } = req.body;
    
    if (blog.author.id.toString() === req.user.id) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        {
          title,
          content,
          excerpt,
          category,
          heroImage: heroImage,
        },
        { new: true }
      );
      return res.status(200).json({
        message: 'Updated Blog successfully',
        blog_id: blog._id,
        blog: updatedBlog,
      });
    } else {
      return res.status(403).json({ message: 'UnAuthorized to update.' });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
    return res
      .status(500)
      .json({ message: 'Server Error', error: error.message });
  }
};

// Delete Blog by Id
exports.deleteBlogById = async (req, res, next) => {
  const { error } = objectIdSchema.validate(req.params);
  if (error) {
    return res
      .status(400)
      .json({ message: 'Validation Error', error: error.message });
  }
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ message: `Blog with id: ${req.params.id} does not exists.` });
    }
    if (blog.author.id.toString() === req.user.id) {
      await blog.deleteOne();
      return res
        .status(200)
        .json({ message: `Deleted Blog. Id:${req.params.id}` });
    } else {
      return res.status(403).json({ message: 'Unauthorized to delete' });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
    return res
      .status(500)
      .json({ message: 'Server Error', error: error.message });
  }
};

// LIKES AND COMMENTS

// like blog by id
exports.likeBlogById = async (req, res, next) => {
  // validate the blog post id
  const { error } = objectIdSchema.validate(req.params);
  if (error) {
    return res
      .status(400)
      .json({ message: 'Validation Error', error: error.message });
  }
  try {
    // find the blog post
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    // check if user already like the post
    if (blog.likes.includes(req.user.id)) {
      // unLike the blog post
      blog.likes = blog.likes.filter((like) => like.toString() !== req.user.id);
     
      await blog.save();
      return res.status(200).json({
        message: `Un Like the blog post ${req.params.id}`,
        userId: req.user.id,
      });
    } else {
      // like the post by addes user id
      blog.likes.push(req.user.id);
      await blog.save();
      return res.status(200).json({
        message: `Like the blog post ${req.params.id}`,
        userId: req.user.id,
      });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
    return res
      .status(500)
      .json({ message: 'Server Error', error: error.message });
  }
};
// get comment by blog id
exports.getCommentByBlogId = async (req, res, next) => {
  const { error } = objectIdSchema.validate(req.params);
  if (error) {
    return res
      .status(400)
      .json({ message: 'Validation Error', error: error.message });
  }
  try {
    const blog = await Blog.findById(req.params.id).populate('comments');
    if (!blog) {
      return res.status(404).json({ message: 'No blog found' });
    }
    return res.status(200).json({ comments: blog.comments.reverse() });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Failed to fetch Comments', error: error.message });
  }
};

// comment on a blog post by id
exports.commentOnBlog = async (req, res, next) => {
  const { error } = objectIdSchema.validate(req.params);
  if (error) {
    return res
      .status(400)
      .json({ message: 'Validation Error', error: error.message });
  }
  try {
    const { error } = commentSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: 'Validation Error', error: error.message });
    }
    const { comment } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      const newComment = {
        text: comment,
        author: {
          id: req.user.id,
          avatar_url: req.user.avatar_url,
          name: req.user.name,
        },
      };
      blog.comments.push(newComment);
      await blog.save();
      return res.status(200).json({ message: 'comment added.' });
    } else {
      return res
        .status(404)
        .json({ message: `No Blog post with id ${req.params.id} exists.` });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
    return res
      .status(500)
      .json({ message: 'Server Error', error: error.message });
  }
};

// delete a comment
exports.deleteCommentOnBlog = async (req, res, next) => {
  const { error } = deleteCommentSchema.validate(req.params);
  if (error) {
    return res
      .status(400)
      .json({ message: 'Validation Error', error: error.message });
  }
  const { commentId, blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId);
    if (blog) {
      const comment = blog.comments.id(commentId);
      if (!comment) {
        return res.status(404).json({ message: 'No comments found' });
      }
      if (comment.author.id.toString() !== req.user.id) {
        return res
          .status(403)
          .json({ message: 'Not Authorized to delete comment' });
      }
      comment.deleteOne();
      await blog.save();
      return res.status(200).json({ message: 'Comment deleted successfully.' });
    } else {
      return res
        .status(404)
        .json({ message: `No Blog with id: ${blogId} exists.` });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
    return res
      .status(500)
      .json({ message: 'Server Error', error: error.message });
  }
};

// Search blogs by Title and author data range
exports.searchBlogByTitle = async (req, res, next) => {
  try {
    const searchTerm = req.query.title || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Adding more fields to filter result

    // sorting
    const sortBy = req.query.sortBy || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;
    const sortOrder = { [sortBy]: order };

    // filtering by author and date range
    const author = req.query.author;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    // build filter query
    const filterQuery = {
      title: { $regex: searchTerm, $options: 'i' },
    };

    if (author) {
      filterQuery.author = author; // Ensure the author ID is passed correctly as an ObjectId
    }

    // date range i.e (2024-05-01 to 2024-05-30)
    if (startDate || endDate) {
      filterQuery.createdAt = {};
      if (startDate) {
        filterQuery.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        filterQuery.createAt.$lte = new Date(endDate);
      }
    }

    const blogs = await Blog.find(filterQuery)
      .sort(sortOrder)
      .skip(skip)
      .limit(limit);

    const totalBlogCount = await Blog.countDocuments({
      title: { $regex: searchTerm, $options: 'i' },
    });

    if (blogs.length === 0) {
      return res.status(200).json({
        message: 'No Blogs found with the given title',
        blogs: [],
        totalBlogs: totalBlogCount,
      });
    }
    const totalPages = Math.ceil(totalBlogCount / limit);
    if (page > totalPages) {
      return res.status(400).json({
        message: `Page ${page} does not exist. Only ${totalPages} available.`,
      });
    }

    return res.status(200).json({
      blogs: blogs,
      totalBlogs: totalBlogCount,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
    return res
      .status(500)
      .json({ message: 'Server Error', error: error.message });
  }
};

// Search blog by category
exports.searchBlogByCategory = async (req, res, next) => {
  try {
    const category = req.query.category || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find({}).select(['-__v']);
    const byCategory = blogs.filter((blog) => blog.category === category);


    return res.status(200).json({
      blogs: byCategory,
      // totalBlogs: totalBlogCount,
      // currentPage: page,
      // totalPages,
      totalBlogs: byCategory.length,
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
    return res
      .status(500)
      .json({ message: 'Server Error', error: error.message });
  }
};

// search by title content author
exports.searchBlogs = async (req, res, next) => {
  try {
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const limit = 6;

    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
        ],
      };
    }
    // fetch blogs with pagination
    const skip = (page - 1) * limit;
    const totalBlogs = await Blog.countDocuments(query);
    const blogs = await Blog.find(query).skip(skip).limit(limit);

    res.status(200).json({
      blogs,
      currentPage: page,
      totalPages: Math.ceil(totalBlogs / limit),
    });
  } catch (error) {
    next(error);
    res.status(500).json({ message: 'Failed to fetch blogs' });
  }
};


