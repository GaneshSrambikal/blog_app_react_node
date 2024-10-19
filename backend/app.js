const app = require('express')();
const morgan = require('morgan');
const cors = require('cors');
const userRouter = require('./routes/users/userRoutes');
const adminRouter = require('./routes/users/adminRoutes');
const blogRouter = require('./routes/blog/blogRoutes');
// Middleware setup
// app.use(cors());
app.use(morgan('dev'));
app.use(require('express').json());

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
