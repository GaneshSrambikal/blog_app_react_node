const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRouter = require('./routes/users/userRoutes');
const adminRouter = require('./routes/users/adminRoutes');
const blogRouter = require('./routes/blog/blogRoutes');
const razorpayRouter = require('./routes/payment/razorpay/razorpayRoutes');
const { corsOrigins } = require('./utils/constants/corsOrigins');
const app = express();

app.use(express.json());

// Middleware setup
app.use(corsOrigins);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof multer.MulterError) {
    return res
      .status(400)
      .json({ message: 'Multer error', error: err.message });
  }
  next(err);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// Routes
app.get('/api', (req, res) => {
  res.send('Blog app react + node api @GITHUB/GANESHSRAMBIKAL');
});

// Admin User Routes
app.use('/api/admin', adminRouter);
// User Routes
app.use('/api/users', userRouter);
// Blog routes
app.use('/api/blogs', blogRouter);
// Razorpay routes
app.use('/api/payment/razorpay', razorpayRouter);

module.exports = app;
