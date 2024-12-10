const mongoose = require('mongoose');
const { getReadingTime } = require('../utils/getReadingTime');

// comments
const commentSchema = mongoose.Schema({
  author: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    avatar_url: { type: String },
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const BlogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
    maxLength: 250,
  },
  category: {
    type: String,
    required: true,
  },
  readingTime: {
    type: Number,
  },
  heroImage: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    avatar_url: { type: String },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [commentSchema],
});

// pre-save middleware for calculating the read time of the blog
BlogSchema.pre('save', function (next) {
  this.readingTime = getReadingTime(this.content);
  // console.log(getReadingTime(this.content));
  next();
});

// Compile the Blog Model
const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
