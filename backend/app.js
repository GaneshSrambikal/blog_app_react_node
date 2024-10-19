const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRouter = require('./routes/users/userRoutes');
const adminRouter = require('./routes/users/adminRoutes');
const blogRouter = require('./routes/blog/blogRoutes');
const app = express();

app.use(express.json());
// Middleware setup
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Blog app api');
});

// Admin User Routes
app.use('/api/admin', adminRouter);
// User Routes
app.use('/api/users', userRouter);
// Blog routes
app.use('/api/blogs', blogRouter);

module.exports = app;
